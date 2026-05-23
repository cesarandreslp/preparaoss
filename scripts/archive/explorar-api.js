// Explorar estructura JSON de la API REST de SIMO
const https = require("https");

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "Accept": "application/json" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on("error", reject);
  });
}

(async () => {
  // Un solo OPEC en detalle
  const opecs = await get("https://simo.cnsc.gov.co/empleos/ofertaPublica/?page=0&size=2");
  console.log("=== PRIMER OPEC COMPLETO ===");
  console.log(JSON.stringify(opecs[0], null, 2));
})().catch((e) => console.error("ERROR:", e.message));
