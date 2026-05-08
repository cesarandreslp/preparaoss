import mammoth from 'mammoth';
import { extractText } from 'unpdf';
import { ocrPdfPages, ocrImage } from './ocr-processor';

// Tipos de archivo soportados
const SUPPORTED_TYPES = {
    PDF: 'application/pdf',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    TXT: 'text/plain',
    PNG: 'image/png',
    JPG: 'image/jpeg',
    WEBP: 'image/webp',
};

// Umbral mínimo de caracteres para considerar que un PDF tiene texto extraíble
const PDF_TEXT_THRESHOLD = 50;

/**
 * Extrae texto de un PDF.
 * 1. Intenta extracción directa con unpdf (PDF con texto digital)
 * 2. Si falla o texto es insuficiente, ejecuta OCR pipeline (PDF escaneado)
 */
async function extractTextFromPDF(fileBuffer: Buffer): Promise<{ text: string; ocrUsed: boolean }> {
    console.log('📄 Procesando PDF con unpdf...');

    let directText = '';

    try {
        const uint8Array = new Uint8Array(fileBuffer);
        const { text, totalPages } = await extractText(uint8Array, { mergePages: true });

        console.log(`📑 PDF tiene ${totalPages} página(s)`);
        console.log(`📝 Texto directo extraído: ${text.trim().length} caracteres`);

        directText = text.trim();
    } catch (error) {
        console.warn('⚠️ unpdf no pudo procesar el PDF, intentando OCR...', error);
    }

    // Si el texto extraído es suficiente, usar directamente (no es escaneado)
    if (directText.length >= PDF_TEXT_THRESHOLD) {
        return { text: directText, ocrUsed: false };
    }

    // PDF escaneado detectado → ejecutar OCR pipeline
    console.log('🔍 PDF escaneado detectado. Ejecutando OCR pipeline...');

    try {
        const ocrText = await ocrPdfPages(fileBuffer);

        if (ocrText.length === 0) {
            throw new Error(
                'OCR_LOW_QUALITY: El OCR no pudo extraer texto suficiente. ' +
                'El documento puede ser de muy baja calidad o no contener texto legible.'
            );
        }

        return { text: ocrText, ocrUsed: true };
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes('OCR_') ||
            error.message.includes('too large')
        )) {
            throw error;
        }
        console.error('❌ OCR pipeline falló:', error);
        throw new Error(
            'OCR_FAILED: No se pudo procesar el PDF escaneado. ' +
            'Intente con un documento de mejor calidad o un PDF con texto digital.'
        );
    }
}

/**
 * Parser principal de documentos.
 * Soporta: PDF (digital y escaneado), DOCX, TXT, imágenes (PNG, JPG, WEBP)
 *
 * @returns Object with extracted text and metadata about processing
 */
export async function parseDocument(
    fileBuffer: Buffer,
    fileType: string
): Promise<{ text: string; ocrUsed: boolean }> {
    console.log(`📁 Procesando documento tipo: ${fileType}`);

    try {
        switch (fileType) {
            case SUPPORTED_TYPES.PDF: {
                return await extractTextFromPDF(fileBuffer);
            }

            case SUPPORTED_TYPES.DOCX: {
                const result = await mammoth.extractRawText({ buffer: fileBuffer });
                console.log(`📝 DOCX procesado. Caracteres: ${result.value.length}`);
                return { text: result.value, ocrUsed: false };
            }

            case SUPPORTED_TYPES.TXT: {
                const textContent = fileBuffer.toString('utf-8');
                console.log(`📄 TXT procesado. Caracteres: ${textContent.length}`);
                return { text: textContent, ocrUsed: false };
            }

            case SUPPORTED_TYPES.PNG:
            case SUPPORTED_TYPES.JPG:
            case SUPPORTED_TYPES.WEBP: {
                const ocrText = await ocrImage(fileBuffer);
                return { text: ocrText, ocrUsed: true };
            }

            default:
                throw new Error(
                    `Formato no soportado: ${fileType}. ` +
                    `Use: PDF, DOCX, TXT o imágenes (PNG, JPG, WEBP).`
                );
        }
    } catch (error) {
        console.error('❌ Error procesando documento:', error);
        if (error instanceof Error) {
            if (error.message.includes('Formato no soportado') ||
                error.message.includes('OCR_')) {
                throw error;
            }
        }
        throw new Error('Error al procesar el documento. Verifique que el archivo no esté dañado.');
    }
}

/**
 * Cleans raw text for storage and AI processing.
 * Normalizes whitespace, removes noise characters, preserves Spanish punctuation.
 */
export function cleanText(text: string): string {
    return text
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s.,;:?!¿¡()"\-/áéíóúÁÉÍÓÚñÑüÜ]/g, '')
        .trim();
}
