import Tesseract from 'tesseract.js';
import sharp from 'sharp';

// --- Configurable Limits ---
export const OCR_CONFIG = {
    /** Maximum file size in bytes before rejecting (15MB) */
    MAX_FILE_SIZE_BYTES: 15 * 1024 * 1024,
    /** Maximum number of pages to OCR (CPU-intensive) */
    MAX_OCR_PAGES: 10,
    /** Minimum total OCR text length to consider valid output */
    OCR_MIN_TEXT_LENGTH: 20,
    /** Maximum image width for OCR preprocessing (pixels) */
    OCR_IMAGE_MAX_WIDTH: 2000,
    /** DPI for PDF-to-PNG rendering */
    PDF_RENDER_DPI: 200,
} as const;

/**
 * Optimizes an image buffer for OCR accuracy and memory efficiency.
 * - Converts to grayscale (reduces data 3x)
 * - Normalizes contrast
 * - Resizes if wider than MAX_WIDTH (reduces Tesseract processing time)
 * - Outputs PNG buffer
 */
async function optimizeImageForOcr(pngBuffer: Buffer): Promise<Buffer> {
    let pipeline = sharp(pngBuffer)
        .grayscale()
        .normalize();

    const metadata = await sharp(pngBuffer).metadata();
    if (metadata.width && metadata.width > OCR_CONFIG.OCR_IMAGE_MAX_WIDTH) {
        pipeline = pipeline.resize(OCR_CONFIG.OCR_IMAGE_MAX_WIDTH);
    }

    return pipeline.png().toBuffer();
}

/**
 * OCR a single page image buffer.
 * Returns extracted text or empty string on failure.
 */
async function ocrSinglePage(imageBuffer: Buffer, pageNum: number): Promise<string> {
    try {
        const optimized = await optimizeImageForOcr(imageBuffer);

        const { data: { text } } = await Tesseract.recognize(
            optimized,
            'spa+eng',
            {
                logger: (m) => {
                    if (m.status === 'recognizing text') {
                        console.log(`  📝 OCR página ${pageNum}: ${Math.round(m.progress * 100)}%`);
                    }
                }
            }
        );

        console.log(`  ✅ Página ${pageNum}: ${text.trim().length} caracteres`);
        return text.trim();
    } catch (error) {
        console.error(`  ❌ OCR falló en página ${pageNum}:`, error);
        return '';
    }
}

/**
 * Main OCR pipeline for scanned PDFs.
 * Converts each PDF page to a PNG buffer, OCRs it, concatenates results.
 * All processing happens in memory — no files are written to disk.
 *
 * @param pdfBuffer - The raw PDF file as a Buffer
 * @returns The concatenated OCR text from all pages, or empty string on total failure
 */
export async function ocrPdfPages(pdfBuffer: Buffer): Promise<string> {
    // Dynamic import: pdf-to-png-converter uses ESM-style export
    const { pdfToPng } = await import('pdf-to-png-converter');

    console.log('🔍 Iniciando OCR pipeline para PDF escaneado...');

    // Validate file size
    if (pdfBuffer.length > OCR_CONFIG.MAX_FILE_SIZE_BYTES) {
        throw new Error(
            `OCR_FILE_TOO_LARGE: El archivo (${Math.round(pdfBuffer.length / 1024 / 1024)}MB) ` +
            `excede el límite de ${OCR_CONFIG.MAX_FILE_SIZE_BYTES / 1024 / 1024}MB para OCR.`
        );
    }

    // Convert PDF pages to PNG buffers
    console.log('📄 Convirtiendo páginas PDF a imágenes...');

    // pdf-to-png-converter expects ArrayBuffer, not Node Buffer
    const arrayBuffer = pdfBuffer.buffer.slice(
        pdfBuffer.byteOffset,
        pdfBuffer.byteOffset + pdfBuffer.byteLength
    );

    let pngPages;
    try {
        pngPages = await pdfToPng(arrayBuffer, {
            viewportScale: OCR_CONFIG.PDF_RENDER_DPI / 72, // 72 DPI is the PDF default
            pagesToProcess: Array.from(
                { length: OCR_CONFIG.MAX_OCR_PAGES },
                (_, i) => i + 1
            ),
        });
    } catch (error) {
        console.error('❌ Error convirtiendo PDF a imágenes:', error);
        throw new Error(
            'OCR_CONVERSION_FAILED: No se pudo convertir el PDF a imágenes. ' +
            'El archivo puede estar corrupto o protegido.'
        );
    }

    console.log(`📑 ${pngPages.length} página(s) renderizadas. Iniciando OCR...`);

    // OCR each page sequentially to control memory
    const pageTexts: string[] = [];

    for (let i = 0; i < pngPages.length; i++) {
        const page = pngPages[i];
        if (!page.content) {
            console.warn(`  ⚠️ Página ${i + 1}: sin contenido de imagen`);
            continue;
        }

        const pageText = await ocrSinglePage(Buffer.from(page.content), i + 1);
        pageTexts.push(pageText);

        // Release page buffer immediately to reduce memory pressure
        (page as { content: Uint8Array | null }).content = null;
    }

    const fullText = pageTexts.join('\n\n');

    if (fullText.trim().length < OCR_CONFIG.OCR_MIN_TEXT_LENGTH) {
        console.warn(
            `⚠️ OCR produjo muy poco texto (${fullText.trim().length} chars). ` +
            `El documento puede ser de muy baja calidad.`
        );
        return '';
    }

    console.log(`✅ OCR completado: ${fullText.length} caracteres totales de ${pngPages.length} páginas`);
    return fullText;
}

/**
 * OCR a standalone image file (PNG, JPG, WEBP).
 * Used when the user uploads an image directly instead of a PDF.
 */
export async function ocrImage(imageBuffer: Buffer): Promise<string> {
    console.log('🔍 Iniciando OCR para imagen individual...');
    const text = await ocrSinglePage(imageBuffer, 1);

    if (text.length < OCR_CONFIG.OCR_MIN_TEXT_LENGTH) {
        console.warn(`⚠️ OCR de imagen produjo muy poco texto (${text.length} chars)`);
        return '';
    }

    return text;
}
