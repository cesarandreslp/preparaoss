/**
 * Llena RecursoBiblioteca.pdfUrl con la fuente oficial de cada norma.
 *
 *   node --env-file=.env scripts/seed-biblioteca-urls.mjs
 *
 * No se alojan copias: se enlaza el texto CONSOLIDADO del Estado, que se
 * mantiene al día con las reformas. Un PDF congelado envejece — la Ley 1952
 * ya venía reformada por la 2094 de 2021.
 *
 * Senado va por http: su servidor no atiende en 443 (comprobado, timeout).
 * Es un enlace saliente, no un recurso embebido, así que no rompe el candado
 * de la app.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SENADO = "http://www.secretariasenado.gov.co/senado/basedoc/";
const FP = "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=";

// numeroNorma → URL oficial
const PORNORMA = {
  "Ley 909 de 2004": SENADO + "ley_0909_2004.html",
  "Ley 1474 de 2011": SENADO + "ley_1474_2011.html",
  "Decreto-Ley 19 de 2012": SENADO + "decreto_0019_2012.html",
  "Constitución 1991": SENADO + "constitucion_politica_1991.html",
  "Ley 1952 de 2019": SENADO + "ley_1952_2019.html",
  "Ley 2094 de 2021": SENADO + "ley_2094_2021.html",
  "Ley 734 de 2002": SENADO + "ley_0734_2002.html",
  "Ley 594 de 2000": SENADO + "ley_0594_2000.html",
  "Ley 1712 de 2014": SENADO + "ley_1712_2014.html",
  "Ley 1755 de 2015": SENADO + "ley_1755_2015.html",
  "Ley 1581 de 2012": SENADO + "ley_1581_2012.html",
  "Ley 87 de 1993": SENADO + "ley_0087_1993.html",
  "Ley 2294 de 2023": SENADO + "ley_2294_2023.html",
  "Ley 80 de 1993": SENADO + "ley_0080_1993.html",
  "Ley 1150 de 2007": SENADO + "ley_1150_2007.html",
  "Ley 2195 de 2022": SENADO + "ley_2195_2022.html",
  "Ley 100 de 1993": SENADO + "ley_0100_1993.html",
  // Decretos únicos reglamentarios: el Senado no los compila.
  // Ojo: el norma_pdf.php de Función Pública devuelve HTML de impresión, no un
  // PDF de verdad (comprobado: sin cabecera %PDF). Se enlaza el norma.php.
  "Decreto 1083 de 2015": FP + "62866",
  "Decreto 1499 de 2017": FP + "83433",
  "Decreto 111 de 1996": FP + "5306",
  "Decreto 1072 de 2015": FP + "72173",
  // NTC-ISO 9001:2015 no va: es norma privada de ICONTEC, se vende y está
  // protegida por derechos de autor. No hay copia oficial gratuita que enlazar.
};

// Las dos guías sin numeroNorma — estas sí son PDF de verdad.
const PORTITULO = {
  "Código de Integridad del Servidor Público":
    "https://www1.funcionpublica.gov.co/documents/28587425/34877072/2019-08-21_Codigo_integridad.pdf/da1a074a-8309-a46e-11a5-cfff0a3279e9?t=1566404916392",
  "Atención al ciudadano · PQRSD":
    "https://www1.funcionpublica.gov.co/documents/34645357/34703129/Protocolos_servicio_servicio_al_ciudadano_v8.pdf/c5827faa-d30f-4995-9e2c-f5f4c3e91cfe?t=1664555909377",
};

const recursos = await prisma.recursoBiblioteca.findMany({
  select: { id: true, titulo: true, numeroNorma: true, pdfUrl: true },
});

let puestas = 0;
const sinFuente = [];

for (const r of recursos) {
  const url = PORNORMA[r.numeroNorma ?? ""] ?? PORTITULO[r.titulo];
  if (!url) {
    sinFuente.push(`${r.numeroNorma ?? "—"} · ${r.titulo}`);
    continue;
  }
  if (r.pdfUrl === url) continue;
  await prisma.recursoBiblioteca.update({ where: { id: r.id }, data: { pdfUrl: url } });
  puestas++;
}

console.log(`✅ ${puestas} recursos enlazados de ${recursos.length}`);
if (sinFuente.length) {
  console.log("Sin fuente oficial enlazable:");
  for (const s of sinFuente) console.log("  ·", s);
}

await prisma.$disconnect();
