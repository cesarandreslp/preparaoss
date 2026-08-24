/**
 * Arma los documentos de la biblioteca para publicarlos en GitHub Pages.
 *
 *   node --env-file=.env scripts/biblioteca-publicar.mjs
 *   BIBLIOTECA_DIR=C:/projects/biblioteca/docs node --env-file=.env scripts/...
 *
 * Toma RecursoBiblioteca.fuenteUrl (Senado / Gestor Normativo), descarga el
 * texto oficial y lo deja como HTML propio, legible en móvil y embebible en la
 * app. Los dos recursos que ya son PDF se copian tal cual.
 *
 * Se publica HTML y no PDF a propósito: el texto queda seleccionable, pesa
 * menos y se lee en un teléfono, que es donde estudia el aspirante.
 *
 * OJO: esto es una COPIA. Cuando reformen una norma hay que volver a correrlo.
 */
import { PrismaClient } from "@prisma/client";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const DESTINO = process.env.BIBLIOTECA_DIR ?? "C:/projects/biblioteca/docs";
const prisma = new PrismaClient();

// El cert de funcionpublica.gov.co viene sin la intermedia (el navegador la
// completa por AIA, node no).
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export function slugDe(r) {
  return (r.numeroNorma ?? r.titulo)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-de-/g, "-")
    .replace(/^-|-$/g, "");
}

/** El Senado corta conexiones seguidas; sin reintento se pierden documentos. */
async function traer(url, intentos = 5) {
  let ultimo;
  for (let i = 1; i <= intentos; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      ultimo = e;
      await new Promise((r) => setTimeout(r, 4000 * i));
    }
  }
  throw ultimo;
}

const ESTILO = `
:root { color-scheme: light dark; }
* { box-sizing: border-box; }
body {
  margin: 0; padding: 1.5rem 1.25rem 4rem;
  font: 16px/1.7 Georgia, "Times New Roman", serif;
  color: #1a1a1a; background: #fdfdfb;
  max-width: 46rem; margin-inline: auto;
  overflow-wrap: break-word;
}
@media (prefers-color-scheme: dark) {
  body { color: #e6e3dc; background: #14161a; }
  a { color: #d4af37; }
  header { border-color: #2a2e35 !important; }
  .aviso { background: #1b1e24 !important; color: #9aa0a8 !important; }
}
header { border-bottom: 1px solid #e3e0d8; padding-bottom: 1rem; margin-bottom: 1.5rem; }
header .norma { font: 600 0.75rem/1 system-ui, sans-serif; letter-spacing: .08em; text-transform: uppercase; opacity: .6; }
header h1 { font-size: 1.35rem; margin: .5rem 0 0; }
.aviso { font: 0.8rem/1.5 system-ui, sans-serif; background: #f4f2ec; padding: .75rem 1rem; border-radius: .5rem; color: #5c5a55; margin-bottom: 1.5rem; }
table { max-width: 100%; display: block; overflow-x: auto; border-collapse: collapse; }
td, th { padding: .35rem .5rem; }
a { color: #8a6d1f; }
`.trim();

function limpiar(html) {
  return html
    // Nada de scripts, formularios de navegación, imágenes ni marcos del sitio origen.
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<form[\s\S]*?<\/form>/gi, "")
    .replace(/<i?frame[\s\S]*?<\/i?frame>/gi, "")
    .replace(/<img[^>]*>/gi, "")
    .replace(/<link[^>]*>/gi, "")
    // Handlers inline (onclick, onchange…) del origen.
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    // El menú de artículos del Senado no sirve sin su JS.
    .replace(/<div id="selector_aj"[\s\S]*?<\/div>/gi, "")
    // Los enlaces relativos apuntarían a nuestro dominio: fuera.
    .replace(/<a\b[^>]*href\s*=\s*["'](?!https?:)[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi, "$1");
}

function cuerpoDe(html) {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return limpiar(m ? m[1] : html);
}

function documento({ titulo, numeroNorma, fuenteUrl, cuerpo }) {
  const esc = (s) => String(s ?? "").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(numeroNorma ? `${numeroNorma} — ${titulo}` : titulo)}</title>
<style>${ESTILO}</style>
</head>
<body>
<header>
  ${numeroNorma ? `<p class="norma">${esc(numeroNorma)}</p>` : ""}
  <h1>${esc(titulo)}</h1>
</header>
<p class="aviso">Copia del texto consolidado publicado por el Estado colombiano
(Ley 23 de 1982, art. 41: las leyes y actos oficiales no están amparados por
derecho de autor). Verifica la vigencia en
<a href="${esc(fuenteUrl)}" target="_blank" rel="noopener">la fuente oficial</a>.</p>
${cuerpo}
</body>
</html>
`;
}

const recursos = await prisma.recursoBiblioteca.findMany({
  where: { fuenteUrl: { not: null } },
  select: { id: true, titulo: true, numeroNorma: true, fuenteUrl: true, bloque: true, descripcion: true },
  orderBy: [{ bloque: "asc" }, { orden: "asc" }],
});

await mkdir(DESTINO, { recursive: true });

const publicados = [];
let errores = 0;

for (const r of recursos) {
  const slug = slugDe(r);
  try {
    const buf = await traer(r.fuenteUrl);
    let archivo, bytes;

    if (buf.subarray(0, 4).toString() === "%PDF") {
      archivo = `${slug}.pdf`;
      bytes = buf;
    } else {
      // El Senado sirve ISO-8859-1; Función Pública, UTF-8.
      const crudo = buf.toString("utf8");
      const esUtf8 = !crudo.includes("\uFFFD");
      const html = esUtf8 ? crudo : buf.toString("latin1");
      archivo = `${slug}.html`;
      bytes = Buffer.from(
        documento({
          titulo: r.titulo,
          numeroNorma: r.numeroNorma,
          fuenteUrl: r.fuenteUrl,
          cuerpo: cuerpoDe(html),
        }),
        "utf8"
      );
    }

    await writeFile(path.join(DESTINO, archivo), bytes);
    publicados.push({ id: r.id, archivo, titulo: r.titulo, numeroNorma: r.numeroNorma, kb: Math.round(bytes.length / 1024) });
    console.log(`✅ ${archivo} — ${Math.round(bytes.length / 1024)} KB`);
  } catch (e) {
    errores++;
    console.error(`❌ ${slug}: ${e instanceof Error ? e.message.slice(0, 100) : e}`);
  }
}

await writeFile(path.join(DESTINO, "indice.json"), JSON.stringify(publicados, null, 2) + "\n", "utf8");

const kb = publicados.reduce((s, p) => s + p.kb, 0);
console.log(`\n${publicados.length}/${recursos.length} documentos en ${DESTINO} (${(kb / 1024).toFixed(1)} MB), ${errores} errores`);

await prisma.$disconnect();
