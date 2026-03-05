/**
 * Interceptar llamadas de red de SIMO para encontrar API JSON
 */
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const apiCalls = [];
  page.on("request", (req) => {
    const url = req.url();
    const type = req.resourceType();
    if (
      (type === "xhr" || type === "fetch") &&
      !url.includes(".png") &&
      !url.includes(".css") &&
      !url.includes(".js")
    ) {
      apiCalls.push({ method: req.method(), url, type });
    }
  });

  const apiResponses = [];
  page.on("response", async (res) => {
    const url = res.url();
    if (
      (url.includes("oferta") ||
        url.includes("opec") ||
        url.includes("empleo") ||
        url.includes("api") ||
        url.includes("rest") ||
        url.includes("json")) &&
      !url.includes(".js") &&
      !url.includes(".css")
    ) {
      try {
        const body = await res.text();
        if (body.length < 50000 && body.trim().startsWith("{") || body.trim().startsWith("[")) {
          apiResponses.push({ url, status: res.status(), body: body.slice(0, 2000) });
        } else {
          apiResponses.push({ url, status: res.status(), bodyPreview: body.slice(0, 200) });
        }
      } catch (e) {}
    }
  });

  await page.goto("https://simo.cnsc.gov.co/#ofertaEmpleo", {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.waitForTimeout(5000);

  console.log("\n=== XHR/FETCH REQUESTS ===");
  apiCalls.forEach((r) => console.log(`  [${r.method}] ${r.url}`));

  console.log("\n=== API RESPONSES (con JSON) ===");
  apiResponses.forEach((r) => {
    console.log(`\n  ${r.status} ${r.url}`);
    if (r.body) console.log("  BODY:", r.body.slice(0, 500));
    else console.log("  PREVIEW:", r.bodyPreview);
  });

  // También interceptar la llamada de paginación
  apiCalls.length = 0;
  apiResponses.length = 0;

  // Click en siguiente página
  const nextBtn = page.locator(".dgrid-next, [class*='dgrid-next'], .nextPageLink");
  const nextCount = await nextBtn.count();
  console.log(`\nBotón siguiente: ${nextCount} encontrado(s)`);

  if (nextCount > 0) {
    const nextHtml = await page.locator(".dgrid-pagination").innerHTML();
    console.log("Paginación HTML:", nextHtml.slice(0, 500));
  }

  // Buscar todos los botones de paginación
  const pagBtns = await page.locator(".dgrid-pagination button, .dgrid-pagination a").evaluateAll(
    (els) => els.map((el) => ({ text: el.textContent?.trim(), class: el.className, title: el.title }))
  );
  console.log("\nBotones de paginación:");
  pagBtns.forEach((b) => console.log("  ", JSON.stringify(b)));

  await browser.close();
})().catch((e) => console.error("ERROR:", e.message));
