/**
 * Script de exploración de la estructura DOM de SIMO
 * Ejecutar con: node scripts/explorar-simo.js
 */
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log("Navegando a SIMO...");
  await page.goto("https://simo.cnsc.gov.co/#ofertaEmpleo", {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.waitForTimeout(4000);

  const title = await page.title();
  console.log("Title:", title);
  console.log("URL actual:", page.url());

  // Buscar elementos candidatos a tarjetas y paginación
  const selectors = [
    "table tr",
    "table tbody tr",
    ".card",
    "[ng-repeat]",
    "[data-ng-repeat]",
    ".oferta",
    ".empleo",
    ".vacante",
    "tbody tr",
    ".resultado",
    "ul li",
    ".list-group-item",
    ".panel",
    ".btn",
    ".pagination li",
    ".pagination a",
    "a[ng-click]",
    "button[ng-click]",
    "[ui-sref]",
    "[href]",
  ];

  console.log("\n=== ELEMENTOS ENCONTRADOS ===");
  for (const sel of selectors) {
    try {
      const count = await page.locator(sel).count();
      if (count > 0 && count <= 200) {
        console.log(`  ${sel}: ${count} elementos`);
      }
    } catch (e) {
      // ignorar errores de selector
    }
  }

  // Extraer texto visible
  const bodyText = await page.locator("body").innerText().catch(() => "");
  console.log("\n=== TEXTO VISIBLE (primeros 800 chars) ===");
  console.log(bodyText.slice(0, 800));

  // HTML de las primeras filas de tabla si existen
  const tableRows = await page.locator("table tbody tr").count();
  if (tableRows > 0) {
    console.log(`\n=== PRIMER TR DE TABLA (${tableRows} filas total) ===`);
    const firstRow = await page.locator("table tbody tr").first().innerHTML();
    console.log(firstRow.slice(0, 1000));
  }

  // Buscar en el HTML completo pistas sobre la estructura
  const html = await page.content();
  const ngRepeat = html.match(/ng-repeat="[^"]+"/g) || [];
  const uiSref = html.match(/ui-sref="[^"]+"/g) || [];
  const ngClick = html.match(/ng-click="[^"]+"/g) || [];

  const unique = (arr) => [...new Set(arr)];
  if (ngRepeat.length) {
    console.log("\n=== ng-repeat ===");
    unique(ngRepeat)
      .slice(0, 10)
      .forEach((x) => console.log(" ", x));
  }
  if (uiSref.length) {
    console.log("\n=== ui-sref ===");
    unique(uiSref)
      .slice(0, 10)
      .forEach((x) => console.log(" ", x));
  }
  if (ngClick.length) {
    console.log("\n=== ng-click ===");
    unique(ngClick)
      .slice(0, 20)
      .forEach((x) => console.log(" ", x));
  }

  // Capturar screenshot para inspección visual
  await page.screenshot({ path: "scripts/simo-screenshot.png", fullPage: true });
  console.log("\nScreenshot guardado en scripts/simo-screenshot.png");

  await browser.close();
})().catch((e) => console.error("ERROR:", e.message));
