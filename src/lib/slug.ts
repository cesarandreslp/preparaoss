// Helpers de slug para las páginas SEO por convocatoria y por entidad.
// Slug = texto url-safe, sin acentos. No es reversible, así que la búsqueda
// slug→registro se hace comparando slugs sobre la lista distinta (86 / 167).

export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Una convocatoria es "válida" para SEO si su número no es nulo/vacío.
export function convocatoriaValida(num: string | null | undefined): boolean {
  if (!num) return false;
  const n = num.trim().toLowerCase();
  return n.length > 0 && !n.startsWith("null/") && n !== "null";
}
