import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones | PreparaOSS",
  description: "Términos de uso del servicio de simulacros de PreparaOSS para concursos de méritos de la CNSC.",
  alternates: { canonical: "/terminos" },
};

const ACTUALIZADA = "26 de agosto de 2026";
const CONTACTO = "preparaoss@gmail.com";

export default function TerminosPage() {
  return (
    <main className="min-h-screen noise-overlay" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-app section max-w-3xl">
        <Link href="/" className="text-sm" style={{ color: "var(--text-muted)" }}>← Inicio</Link>
        <h1 className="display-2 mt-4">Términos y Condiciones</h1>
        <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>Última actualización: {ACTUALIZADA}</p>

        <div className="mt-8 space-y-6 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <p>
            Al usar <b>PreparaOSS</b> aceptas estos términos. PreparaOSS es una herramienta independiente de
            preparación para concursos de méritos de la CNSC y <b>no tiene afiliación con la CNSC</b> ni con ninguna
            entidad del Estado.
          </p>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">1. El servicio</h2>
            <p>
              PreparaOSS ofrece simulacros y preguntas de práctica generadas a la medida de las funciones de cada
              cargo. Es material de <b>preparación</b>: no reproduce las pruebas oficiales ni garantiza resultados en
              el concurso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">2. Tu cuenta</h2>
            <p>
              Eres responsable de la veracidad de tus datos y de mantener segura tu contraseña. Un uso indebido del
              servicio puede llevar a la suspensión de la cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">3. Pagos</h2>
            <p>
              Los pases (diario y trimestral) se pagan a través de Wompi. El acceso pagado se activa una vez
              confirmado el pago, según el plan adquirido. Los precios pueden cambiar; el precio aplicable es el
              vigente al momento de la compra.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">4. Uso permitido</h2>
            <p>
              El contenido es para tu preparación personal. No puedes revender, redistribuir ni reproducir
              masivamente el material sin autorización.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">5. Limitación de responsabilidad</h2>
            <p>
              El servicio se ofrece "tal cual". PreparaOSS no se hace responsable por decisiones tomadas con base en
              el material de práctica ni por el resultado de ningún concurso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">6. Contacto</h2>
            <p>
              Dudas sobre estos términos:{" "}
              <a href={`mailto:${CONTACTO}`} className="text-gradient-gold">{CONTACTO}</a>.
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm">
          <Link href="/privacidad" className="text-gradient-gold">Ver la Política de Privacidad →</Link>
        </p>
      </div>
    </main>
  );
}
