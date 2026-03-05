// Explorar campos de fecha y otros en la API de SIMO
const https = require("https");

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "Accept": "application/json" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { resolve(data); }
      });
    }).on("error", reject);
  });
}

(async () => {
  const opecs = await get("https://simo.cnsc.gov.co/empleos/ofertaPublica/?page=0&size=1");
  const op = opecs[0];
  
  // Mostrar solo campos del nivel raíz
  console.log("=== CAMPOS RAÍZ DEL OPEC ===");
  Object.keys(op).forEach(k => {
    const v = op[k];
    if (typeof v !== "object" || v === null) {
      console.log(`  ${k}:`, v);
    } else {
      console.log(`  ${k}: [objeto]`);
    }
  });
  
  // Mostrar campos de empleo (sin arrays)
  console.log("\n=== CAMPOS DE empleo (no arrays) ===");
  Object.keys(op.empleo).forEach(k => {
    const v = op.empleo[k];
    if (!Array.isArray(v)) {
      console.log(`  ${k}:`, typeof v === "object" ? JSON.stringify(v) : v);
    } else {
      console.log(`  ${k}: [array de ${v.length}]`);
    }
  });

  // Convocatoria completa
  console.log("\n=== CONVOCATORIA COMPLETA ===");
  console.log(JSON.stringify(op.empleo.convocatoria, null, 2));

  // Verificar el total de OPECs disponibles con size=100
  const test = await get("https://simo.cnsc.gov.co/empleos/ofertaPublica/?page=0&size=100");
  console.log(`\n=== PAGE=0, SIZE=100: ${test.length} resultados ===`);
  
  // Buscar si existe endpoint con total count
  console.log("\n=== VACANTES PRIMER OPEC ===");
  const vacantes = op.empleo.vacantes || [];
  console.log(`Total vacantes registradas: ${vacantes.length}`);
  const totalCantidad = vacantes.reduce((sum, v) => sum + (v.cantidad || 0), 0);
  console.log(`Total cantidad: ${totalCantidad}`);
  
  // Mostrar municipios únicos
  const municipios = [...new Set(vacantes.map(v => v.municipio?.nombre).filter(Boolean))];
  const deptos = [...new Set(vacantes.map(v => v.municipio?.departamento?.nombre).filter(Boolean))];
  console.log("Municipios:", municipios.slice(0, 5).join(", "));
  console.log("Departamentos:", deptos.slice(0, 5).join(", "));

})().catch(e => console.error("ERROR:", e.message));
