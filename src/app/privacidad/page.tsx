import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | PreparaOSS",
  description: "Cómo PreparaOSS recolecta, usa y protege tus datos personales conforme a la Ley 1581 de 2012 (Habeas Data).",
  alternates: { canonical: "/privacidad" },
};

const ACTUALIZADA = "26 de agosto de 2026";
const CONTACTO = "preparaoss@gmail.com";

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen noise-overlay" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-app section max-w-3xl">
        <Link href="/" className="text-sm" style={{ color: "var(--text-muted)" }}>← Inicio</Link>
        <h1 className="display-2 mt-4">Política de Privacidad</h1>
        <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>Última actualización: {ACTUALIZADA}</p>

        <div className="mt-8 space-y-6 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <p>
            En <b>PreparaOSS</b> respetamos tu privacidad. Esta política explica qué datos recolectamos, cómo los
            usamos y qué derechos tienes, conforme a la <b>Ley 1581 de 2012</b> y el Decreto 1377 de 2013 de Colombia
            (régimen de protección de datos personales — Habeas Data). PreparaOSS es un producto independiente y no
            tiene afiliación con la CNSC.
          </p>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">1. Datos que recolectamos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><b>De registro:</b> nombre, correo electrónico y contraseña (almacenada cifrada).</li>
              <li><b>De uso:</b> el cargo/OPEC que preparas, tus simulacros, respuestas y resultados.</li>
              <li><b>De pago:</b> cuando compras un pase, procesamos el pago a través de Wompi; nosotros no almacenamos los datos de tu tarjeta.</li>
              <li><b>De mensajería:</b> si escribes a nuestros bots de Telegram o WhatsApp, guardamos tu identificador de chat para responderte y, si lo autorizas, enviarte novedades.</li>
              <li><b>Técnicos:</b> datos de navegación necesarios para operar el servicio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">2. Para qué usamos tus datos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Crear y administrar tu cuenta.</li>
              <li>Generar simulacros a la medida de tu cargo y mostrarte tus resultados.</li>
              <li>Procesar los pagos de tus pases.</li>
              <li>Responder tus mensajes y, con tu autorización, informarte sobre nuevas convocatorias.</li>
              <li>Mejorar y mantener seguro el servicio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">3. Con quién los compartimos</h2>
            <p>
              No vendemos tus datos. Los compartimos únicamente con proveedores que hacen funcionar el servicio, bajo
              sus propias políticas de privacidad: alojamiento (Vercel), base de datos (Neon), pagos (Wompi), correo
              (Resend), y las plataformas de mensajería (Telegram, WhatsApp/Meta). Para generar las preguntas usamos
              proveedores de inteligencia artificial, a los que enviamos el contenido de los manuales de funciones, no
              tus datos personales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">4. Tus derechos (Habeas Data)</h2>
            <p>
              Puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos, así como revocar la
              autorización para su tratamiento. Para ejercer cualquiera de estos derechos, escríbenos a{" "}
              <a href={`mailto:${CONTACTO}`} className="text-gradient-gold">{CONTACTO}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">5. Eliminación de tus datos</h2>
            <p>
              Puedes solicitar la eliminación de tu cuenta y de tus datos personales escribiendo a{" "}
              <a href={`mailto:${CONTACTO}`} className="text-gradient-gold">{CONTACTO}</a>. Atenderemos tu solicitud
              en los términos que exige la ley.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">6. Contacto</h2>
            <p>
              Responsable del tratamiento: PreparaOSS. Para cualquier consulta sobre esta política o tus datos,
              escríbenos a <a href={`mailto:${CONTACTO}`} className="text-gradient-gold">{CONTACTO}</a>.
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm">
          <Link href="/terminos" className="text-gradient-gold">Ver también los Términos y Condiciones →</Link>
        </p>
      </div>
    </main>
  );
}
