/**
 * Interceptar TODAS las llamadas de red de SIMO
 */
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const allRequests = [];
  page.on("request", (req) => {
    const url = req.url();
    const type = req.resourceType();
    if (type !== "image" && type !== "stylesheet" && type !== "font" && !url.endsWith(".ico")) {
      allRequests.push({ type, method: req.method(), url: url.slice(0, 150) });
    }
  });

  await page.goto("https://simo.cnsc.gov.co/#ofertaEmpleo", {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.waitForTimeout(5000);

  console.log(`\n=== TODAS LAS REQUESTS (${allRequests.length}) ===`);
  allRequests
    .filter((r) => r.type === "xhr" || r.type === "fetch" || r.type === "document")
    .forEach((r) => console.log(`  [${r.type}][${r.method}] ${r.url}`));

  // Paginación
  const pagHtml = await page.locator(".dgrid-pagination").first().innerHTML().catch(() => "no encontrado");
  console.log("\n=== PAGINACIÓN HTML ===");
  console.log(pagHtml);

  // Información sobre la fila expandida - intentar con diferente click
  const firstDataRow = page.locator(".dgrid-row.dgrid-row-even, .dgrid-row.dgrid-row-odd").first();
  
  // Es un Dojo widget, intentar click en el expander icon
  const expanderIcon = firstDataRow.locator(".dgrid-expando-icon, [class*='expando']").first();
  const expanderCount = await expanderIcon.count();
  console.log(`\nExpander icons: ${expanderCount}`);

  // Intentar expandir via keyboard o métodos alternativos
  await firstDataRow.press("Enter");
  await page.waitForTimeout(2000);

  // ¿Qué filas nuevas aparecieron?
  const expandedContent = page.locator(".dgrid-expando-row, .dgrid-row-expanded, [class*='dgrid-expando-row']");
  const expCount = await expandedContent.count();
  console.log(`Contenido expandido: ${expCount}`);

  // Buscar sección estudio/experiencia
  const studySection = await page.locator("text=Estudio requerido").first().innerHTML().catch(() => "");
  const expSection = await page.locator("text=Experiencia requerida").first().innerHTML().catch(() => "");
  console.log("Sección estudio:", studySection.slice(0, 200));
  console.log("Sección experiencia:", expSection.slice(0, 200));

  // Extraer datos de la fila expandida completamente
  const bodyText = await page.locator("body").innerText();
  const propIdx = bodyText.indexOf("Propósito");
  const estIdx = bodyText.indexOf("Estudio requerido");
  const expIdx = bodyText.indexOf("Experiencia requerida");
  
  if (propIdx >= 0) {
    console.log("\n=== PROPÓSITO (500 chars) ===");
    console.log(bodyText.slice(propIdx, propIdx + 500));
  }
  if (estIdx >= 0) {
    console.log("\n=== ESTUDIO REQUERIDO (500 chars) ===");
    console.log(bodyText.slice(estIdx, estIdx + 500));
  }
  if (expIdx >= 0) {
    console.log("\n=== EXPERIENCIA REQUERIDA (500 chars) ===");
    console.log(bodyText.slice(expIdx, expIdx + 500));
  }

  await browser.close();
})().catch((e) => console.error("ERROR:", e.message));
