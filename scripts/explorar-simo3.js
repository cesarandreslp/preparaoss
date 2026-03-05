/**
 * Explorar contenido expandido de una fila de SIMO
 */
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://simo.cnsc.gov.co/#ofertaEmpleo", {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.waitForTimeout(5000);

  // Obtener las primeras 2 filas de datos
  const rows = page.locator(".dgrid-row:not(.dgrid-row-table)");
  const rowCount = await rows.count();
  console.log(`Filas de datos: ${rowCount}`);

  // Información de cada fila (sin expandir)
  for (let i = 0; i < Math.min(3, rowCount); i++) {
    const row = rows.nth(i);
    const rowId = await row.getAttribute("id");
    const ariaLabels = await row
      .locator("[aria-label]")
      .evaluateAll((els) => els.map((el) => el.getAttribute("aria-label")));
    console.log(`\nFila ${i + 1} (${rowId}):`);
    ariaLabels.slice(0, 20).forEach((l) => console.log("  ", l));
  }

  // Hacer click en la primera fila para expandirla
  const firstRow = rows.first();
  console.log("\n=== EXPANDIENDO PRIMERA FILA ===");
  const clickTarget = firstRow.locator("a.empleoRequ, .linkCampo, td.dgrid-cell").first();
  await clickTarget.click();
  await page.waitForTimeout(3000);

  // Ver qué cambió
  const expandedRows = await page.locator("[class*='dgrid-expando'], [class*='expanded'], .dgrid-row.expanded").count();
  console.log("Filas expandidas:", expandedRows);

  // Ver contenido completo de la primera fila ahora
  const firstRowHtml = await firstRow.innerHTML().catch(() => "");
  console.log("\nHTML primera fila expandida (3000 chars):\n", firstRowHtml.slice(0, 3000));

  // Ver texto completo
  const bodyText = await page.locator("body").innerText();
  const idx = bodyText.indexOf("Gestor ii");
  console.log("\nTexto visible tras click (1500 chars desde 'Gestor ii'):");
  console.log(bodyText.slice(idx, idx + 1500));

  // Verificar si abrió una nueva URL o modal
  console.log("\nURL actual:", page.url());

  // Buscar modal
  const modal = await page.locator("[class*='modal'], [class*='dialog'], [role='dialog']").count();
  console.log("Modales visibles:", modal);

  // Buscar sección de detalle
  const detail = await page.locator("[class*='detalle'], [class*='detail'], #detalleEmpleo").count();
  console.log("Elementos detalle:", detail);

  await page.screenshot({ path: "scripts/simo-expanded.png", fullPage: true });
  console.log("\nScreenshot guardado: scripts/simo-expanded.png");

  await browser.close();
})().catch((e) => console.error("ERROR:", e.message));
