// Contenido SEO data-driven para las páginas de convocatoria y entidad.
// Todo sale de los datos reales (no hay texto inventado): así cada página es
// única y "gruesa" sin riesgo de thin content ni de alucinaciones.
// Incluye un bloque FAQ con JSON-LD FAQPage (rich results en Google).

type Props = {
  tipo: "convocatoria" | "entidad";
  nombre: string;
  totalCargos: number;
  totalVacantes: number;
  niveles: string[];
  municipios: string[];
  salarioMin: number | null;
  salarioMax: number | null;
};

function cop(n: number) {
  return n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

// Deriva los agregados que consume el componente a partir de las OPECs ya
// cargadas por la página (mismos campos en convocatoria y entidad).
type Fila = { nivelJerarquico: string; municipio: string; asignacionBasica: number | null };
export function agregadosHub(opecs: Fila[]) {
  const niveles = [...new Set(opecs.map((o) => o.nivelJerarquico).filter(Boolean))];
  // El campo municipio suele traer varias ciudades separadas por coma.
  const municipios = [
    ...new Set(opecs.flatMap((o) => (o.municipio ?? "").split(",").map((s) => s.trim())).filter(Boolean)),
  ];
  const salarios = opecs.map((o) => o.asignacionBasica).filter((n): n is number => n != null && n > 0);
  return {
    niveles,
    municipios,
    salarioMin: salarios.length ? Math.min(...salarios) : null,
    salarioMax: salarios.length ? Math.max(...salarios) : null,
  };
}

function listar(xs: string[]): string {
  if (xs.length === 0) return "";
  if (xs.length === 1) return xs[0];
  return xs.slice(0, -1).join(", ") + " y " + xs[xs.length - 1];
}

export default function HubContenido(p: Props) {
  const { tipo, nombre, totalCargos, totalVacantes, niveles, municipios, salarioMin, salarioMax } = p;
  const sujeto = tipo === "convocatoria" ? `la convocatoria ${nombre}` : nombre;
  const vac = totalVacantes.toLocaleString("es-CO");

  const salarioTxt =
    salarioMin && salarioMax
      ? salarioMin === salarioMax
        ? ` La asignación básica mensual ronda ${cop(salarioMin)}.`
        : ` Las asignaciones básicas mensuales van desde ${cop(salarioMin)} hasta ${cop(salarioMax)}.`
      : "";
  const nivelesTxt = niveles.length ? ` Hay cargos de nivel ${listar(niveles.slice(0, 5))}.` : "";
  const ciudadesTxt = municipios.length
    ? ` Las vacantes se ubican en ciudades como ${listar(municipios.slice(0, 6))}${municipios.length > 6 ? ", entre otras" : ""}.`
    : "";

  // Preguntas y respuestas — datos reales + precios vigentes (acceso.ts).
  const faqs: { q: string; a: string }[] = [
    {
      q: `¿Cuántas vacantes ofrece ${sujeto}?`,
      a: `${sujeto.charAt(0).toUpperCase() + sujeto.slice(1)} ofrece ${vac} vacantes distribuidas en ${totalCargos} cargos del concurso de méritos de la CNSC.`,
    },
    {
      q: `¿Qué niveles de cargos incluye?`,
      a: niveles.length
        ? `Incluye cargos de nivel ${listar(niveles.slice(0, 6))}, cada uno con su propio manual de funciones y, por tanto, su propio temario.`
        : `Los cargos tienen cada uno su propio manual de funciones y temario específico.`,
    },
    {
      q: `¿Cómo me preparo para el examen?`,
      a: `En PreparaOSS generamos simulacros a la medida de las funciones de tu cargo: competencias comportamentales, funcionales y específicas. Practicas con preguntas tipo prueba y recibes retroalimentación para llegar listo al examen de la CNSC.`,
    },
    {
      q: `¿Es gratis practicar?`,
      a: `Sí. Cada cuenta tiene un simulacro gratis. Si quieres práctica ilimitada, el pase diario cuesta ${cop(6000)} (24 horas) y el pase trimestral ${cop(49900)} (3 meses en hasta 3 cargos).`,
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="mt-16 max-w-3xl">
      <h2 className="display-3 mb-6">Sobre {tipo === "convocatoria" ? `la convocatoria ${nombre}` : nombre}</h2>
      <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        <p>
          {sujeto.charAt(0).toUpperCase() + sujeto.slice(1)} hace parte de los concursos de méritos de la Comisión
          Nacional del Servicio Civil (CNSC). En total abre <b>{totalCargos} cargos</b> con <b>{vac} vacantes</b> para
          proveer por concurso abierto de méritos.{nivelesTxt}{salarioTxt}
        </p>
        <p>
          Cada empleo tiene un manual de funciones distinto, así que el temario y las competencias evaluadas cambian de
          un cargo a otro.{ciudadesTxt} Por eso la preparación genérica no basta: en PreparaOSS los simulacros se generan
          a la medida de las funciones específicas de tu OPEC.
        </p>
      </div>

      <h2 className="display-3 mt-14 mb-6">Preguntas frecuentes</h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="card">
            <summary className="cursor-pointer font-semibold text-base">{f.q}</summary>
            <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.a}</p>
          </details>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </section>
  );
}
