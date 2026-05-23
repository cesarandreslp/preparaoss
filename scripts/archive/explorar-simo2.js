/**
 * Exploración profunda de la estructura dGrid de SIMO
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

  // Buscar filas de dGrid
  const dGridSelectors = [
    "[class*='dgrid-row']",
    ".dgrid-row",
    ".dgrid-content > *",
    ".dgrid-scroller *[role='row']",
    "tr[class*='row']",
    "[role='row']",
    "[role='gridcell']",
    ".dgrid-cell",
  ];

  console.log("=== FILAS DGRID ===");
  for (const sel of dGridSelectors) {
    try {
      const count = await page.locator(sel).count();
      if (count > 0 && count <= 500) {
        console.log(`  ${sel}: ${count} elementos`);
      }
    } catch (e) {}
  }

  // HTML del grid completo
  const gridEl = page
    .locator(".dgrid, [class*='dgrid'], [dojoType*='Grid']")
    .first();
  const gridCount = await page
    .locator(".dgrid, [class*='dgrid']")
    .count();
  console.log(`\n=== CONTENEDOR DGRID: ${gridCount} elementos ===`);

  // Obtener HTML completo del grid
  const gridHtml = await page
    .locator(".dgrid-content, .dgrid-scroller")
    .first()
    .innerHTML()
    .catch(() => "no encontrado");
  console.log("Grid HTML (2000 chars):", gridHtml.slice(0, 2000));

  // Paginación
  console.log("\n=== PAGINACIÓN ===");
  const pagSelectors = [
    ".dgrid-pagination",
    "[class*='pagination']",
    ".nextPage",
    ".next-page",
    "button[title*='siguiente']",
    "button[title*='Next']",
    "a[title*='siguiente']",
    "[class*='pager']",
    ".dijitPagination",
    "[dojoType*='Pager']",
    ".pageSize",
    "[class*='page-size']",
  ];
  for (const sel of pagSelectors) {
    try {
      const count = await page.locator(sel).count();
      if (count > 0) {
        console.log(`  ${sel}: ${count} elementos`);
        const text = await page.locator(sel).first().innerText().catch(() => "");
        console.log(`    texto: "${text.slice(0, 100)}"`);
      }
    } catch (e) {}
  }

  // TEXTO COMPLETO de la primera fila de datos
  const bodyText = await page.locator("body").innerText();
  // Buscar sección de "Oferta de empleos"
  const idx = bodyText.indexOf("Oferta de empleos");
  if (idx >= 0) {
    console.log("\n=== SECCIÓN OFERTAS (1500 chars) ===");
    console.log(bodyText.slice(idx, idx + 1500));
  }

  // Obtener todos los links
  const links = await page.locator("a").evaluateAll((links) =>
    links
      .map((a) => ({ href: a.href, text: a.textContent?.trim() }))
      .filter((l) => l.href && !l.href.includes("javascript"))
  );
  console.log("\n=== LINKS ÚNICOS ===");
  links.slice(0, 20).forEach((l) => console.log(`  ${l.text}: ${l.href}`));

  // Capturar más info de la estructura de rows
  const rowInfo = await page.evaluate(() => {
    const rows = document.querySelectorAll("[class*='dgrid-row']");
    return Array.from(rows)
      .slice(0, 3)
      .map((row) => ({
        classes: row.className,
        html: row.innerHTML.slice(0, 500),
        dataId: row.getAttribute("data-dgrid-row-id") || row.id,
      }));
  });
  console.log("\n=== PRIMERAS FILAS DGRID ===");
  rowInfo.forEach((r, i) => {
    console.log(`\nFila ${i + 1}:`);
    console.log("  classes:", r.classes);
    console.log("  data-id:", r.dataId);
    console.log("  html:", r.html.slice(0, 400));
  });

  await browser.close();
})().catch((e) => console.error("ERROR:", e.message));
