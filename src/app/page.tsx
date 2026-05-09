"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Reveal } from "@/components/landing/Reveal";
import { Counter } from "@/components/landing/Counter";
import { FAQ } from "@/components/landing/FAQ";
import { ConcursosSlider } from "@/components/landing/ConcursosSlider";

export default function LandingPage() {
  const { status } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAuthed = status === "authenticated";

  return (
    <main className="relative noise-overlay" style={{ background: "var(--gradient-hero)" }}>
      {/* ─── NAV ─── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all"
        style={{
          background: scrolled ? "rgba(250, 247, 242, 0.78)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        }}
      >
        <div className="container-app flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
            <span
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: "var(--gradient-gold)", color: "#FFFFFF" }}
            >
              P
            </span>
            <span className="text-gradient-gold">PreparaOSS</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="btn-ghost">Cómo funciona</a>
            <a href="#opecs" className="btn-ghost">OPECs</a>
            <Link href="/biblioteca" className="btn-ghost">Biblioteca</Link>
            <a href="#planes" className="btn-ghost">Planes</a>
            <a href="#faq" className="btn-ghost">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            {isAuthed ? (
              <Link href="/dashboard" className="btn-primary">Mi dashboard →</Link>
            ) : (
              <>
                <Link href="/login" className="btn-ghost hidden sm:inline-flex">Iniciar sesión</Link>
                <Link href="/registro" className="btn-primary">Empezar gratis</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            right: "-10%",
            width: "560px",
            height: "560px",
            background: "radial-gradient(circle, rgba(208, 74, 28, 0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "0%",
            left: "-15%",
            width: "640px",
            height: "640px",
            background: "radial-gradient(circle, rgba(44, 84, 122, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div className="container-app relative">
          <Reveal>
            <span className="eyebrow">Concursos de méritos · CNSC</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-1 mt-4 max-w-5xl">
              Conquista tu cargo público con{" "}
              <span className="text-gradient-gold">simulacros de IA</span> hechos a la medida.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
              Genera bancos de preguntas únicos para tu OPEC, mide tu progreso por niveles
              y compite con otros aspirantes. Sin libros viejos. Sin academias caras.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {isAuthed ? (
                <Link href="/dashboard" className="btn-primary text-base px-8 py-4">
                  Ir al dashboard →
                </Link>
              ) : (
                <>
                  <Link href="/registro" className="btn-primary text-base px-8 py-4">
                    Empezar gratis · 3 simulacros/mes
                  </Link>
                  <Link href="/login" className="btn-secondary text-base px-8 py-4">
                    Ya tengo cuenta
                  </Link>
                </>
              )}
            </div>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
              Sin tarjeta de crédito · Datos directos de SIMO-CNSC · Cancela cuando quieras
            </p>
          </Reveal>

          {/* Stats row */}
          <Reveal delay={480}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t" style={{ borderColor: "var(--border-subtle)" }}>
              {[
                { v: 3126, label: "OPECs sincronizadas", suffix: "+" },
                { v: 24, label: "Entidades nacionales", suffix: "" },
                { v: 5, label: "Niveles jerárquicos", suffix: "" },
                { v: 100, label: "Preguntas por banco", suffix: "" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="display-3 text-gradient-gold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <Counter value={s.v} suffix={s.suffix} />
                  </p>
                  <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CONCURSOS EN DESARROLLO (slider scraping CNSC) ─── */}
      <section id="concursos-en-desarrollo" className="section-sm">
        <div className="container-app">
          <Reveal>
            <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
              <div>
                <span className="eyebrow">Concursos CNSC</span>
                <h2 className="display-3 mt-3 max-w-2xl">
                  En desarrollo ahora mismo
                </h2>
                <p className="mt-3 text-base max-w-xl" style={{ color: "var(--text-secondary)" }}>
                  Sincronizado a diario con cnsc.gov.co. Click para ver el detalle oficial.
                </p>
              </div>
            </div>
            <ConcursosSlider />
          </Reveal>
        </div>
      </section>

      {/* ─── CÓMO FUNCIONA ─── */}
      <section id="como-funciona" className="section">
        <div className="container-app">
          <Reveal>
            <span className="eyebrow">Tres pasos</span>
            <h2 className="display-2 mt-4 max-w-3xl">
              Estudias mejor cuando el material{" "}
              <span className="text-gradient-blue">está hecho para ti</span>.
            </h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                t: "Encuentra tu OPEC",
                d: "Buscamos en SIMO-CNSC y traemos las 3.000+ vacantes activas con todos los detalles: requisitos, vacantes, salario, fecha límite.",
              },
              {
                n: "02",
                t: "Generamos tu banco con IA",
                d: "Llama 3.3 produce 100 preguntas únicas a partir de las funciones, requisitos y manuales del cargo. Sin contenido genérico.",
              },
              {
                n: "03",
                t: "Practicas y subes en el ranking",
                d: "Simulacros gamificados, racha diaria, XP por cada acierto y rankings semanales contra otros aspirantes a tu mismo cargo.",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <div className="card-elevated h-full p-8">
                  <span
                    className="display-3 text-gradient-gold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.n}
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{s.t}</h3>
                  <p className="mt-3 leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3 TIPOS DE PRUEBA ─── */}
      <section className="section">
        <div className="container-app">
          <Reveal>
            <span className="eyebrow">Tipos de prueba</span>
            <h2 className="display-2 mt-4 max-w-3xl">
              Practicas exactamente <span className="text-gradient-gold">como será el examen</span>.
            </h2>
            <p className="mt-6 text-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
              La CNSC evalúa tres dimensiones. Nuestro generador produce las tres en proporciones
              ajustadas a tu nivel jerárquico.
            </p>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "Funcional específica",
                tagClass: "tag-gold",
                title: "Juicio situacional",
                desc: "Escenarios reales del cargo con 3 preguntas asociadas, 3 opciones cada una. Mide tu criterio profesional.",
                example: "«Recibes una solicitud de un ciudadano fuera del horario reglamentario y…»",
              },
              {
                tag: "Funcional transversal",
                tagClass: "tag-blue",
                title: "Conocimientos directos",
                desc: "Preguntas de respuesta única, 4 opciones. Evalúan dominio técnico de las funciones del empleo.",
                example: "«¿Cuál es el plazo máximo para responder un derecho de petición de información…»",
              },
              {
                tag: "Comportamental",
                tagClass: "tag-success",
                title: "Escala Likert 1-5",
                desc: "Auto-percepción de competencias comportamentales calibrada por nivel de responsabilidad.",
                example: "«Cuando enfrento un problema complejo, descompongo la tarea en pasos manejables.»",
              },
            ].map((t, i) => (
              <Reveal key={t.title} delay={i * 100}>
                <div className="card h-full">
                  <span className={`tag ${t.tagClass}`}>{t.tag}</span>
                  <h3 className="mt-5 text-xl font-bold">{t.title}</h3>
                  <p className="mt-3 leading-relaxed">{t.desc}</p>
                  <div
                    className="mt-6 p-4 rounded-xl text-sm italic"
                    style={{
                      background: "rgba(10, 10, 10, 0.03)",
                      color: "var(--text-secondary)",
                      borderLeft: "2px solid var(--gold-500)",
                    }}
                  >
                    {t.example}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PREVIEW SIMULACRO MOCK ─── */}
      <section className="section">
        <div className="container-app grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="eyebrow">Vista previa</span>
            <h2 className="display-2 mt-4">
              Cada pregunta viene con{" "}
              <span className="text-gradient-blue">explicación detallada</span>.
            </h2>
            <p className="mt-6 text-lg" style={{ color: "var(--text-secondary)" }}>
              No solo te decimos si fallaste. Te mostramos por qué la respuesta correcta es la
              correcta y dónde profundizar. Aprendes con cada error.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "100 preguntas por banco · regenerable cuando quieras",
                "Tiempo por pregunta: 90s para conocimientos, sin límite en comportamental",
                "XP variable según dificultad y velocidad",
                "Historial completo: revisa simulacros pasados",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3" style={{ color: "var(--text-secondary)" }}>
                  <span
                    className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0"
                    style={{ background: "rgba(208, 74, 28, 0.15)", color: "var(--gold-500)" }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {li}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <div className="card-glow p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span
                    className="inline-block w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "var(--success)" }}
                  />
                  Simulacro en progreso
                </div>
                <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "var(--gold-300)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  01:24
                </div>
              </div>

              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                Pregunta 12 de 30 · Funcional transversal
              </p>
              <p className="text-base font-medium leading-relaxed mb-6">
                ¿Cuál es el término máximo para resolver una petición de copias o información, según el
                Art. 14 de la Ley 1755 de 2015?
              </p>

              <div className="space-y-2">
                {[
                  { l: "A", t: "5 días hábiles", state: "default" },
                  { l: "B", t: "10 días hábiles", state: "correct" },
                  { l: "C", t: "15 días hábiles", state: "default" },
                  { l: "D", t: "30 días hábiles", state: "wrong" },
                ].map((opt) => (
                  <div
                    key={opt.l}
                    className="flex items-center gap-3 p-3 rounded-lg border transition-colors"
                    style={{
                      background:
                        opt.state === "correct"
                          ? "rgba(34,197,94,0.08)"
                          : opt.state === "wrong"
                          ? "rgba(239,68,68,0.06)"
                          : "rgba(10, 10, 10, 0.02)",
                      borderColor:
                        opt.state === "correct"
                          ? "rgba(34,197,94,0.40)"
                          : opt.state === "wrong"
                          ? "rgba(239,68,68,0.30)"
                          : "var(--border-subtle)",
                    }}
                  >
                    <span
                      className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
                      style={{
                        background:
                          opt.state === "correct"
                            ? "var(--success)"
                            : opt.state === "wrong"
                            ? "var(--error)"
                            : "rgba(10, 10, 10, 0.06)",
                        color: opt.state === "default" ? "var(--text-secondary)" : "white",
                      }}
                    >
                      {opt.l}
                    </span>
                    <span
                      className="text-sm flex-1"
                      style={{
                        color:
                          opt.state === "correct"
                            ? "var(--success)"
                            : opt.state === "wrong"
                            ? "var(--error)"
                            : "var(--text-primary)",
                      }}
                    >
                      {opt.t}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                <span>+15 XP por acierto</span>
                <span>🔥 Racha actual: 7 días</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── OPECs ACTIVAS ─── */}
      <section id="opecs" className="section">
        <div className="container-app">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <span className="eyebrow">OPECs activas</span>
                <h2 className="display-2 mt-4 max-w-2xl">
                  3.000+ vacantes esperándote ahora mismo.
                </h2>
              </div>
              <Link href="/opecs" className="btn-secondary">
                Explorar todas →
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                entidad: "Procuraduría General de la Nación",
                cargo: "Profesional Universitario · Grado 12",
                vac: 248,
                nivel: "Profesional",
              },
              {
                entidad: "DIAN",
                cargo: "Inspector III · Tributario",
                vac: 156,
                nivel: "Asesor",
              },
              {
                entidad: "Fiscalía General de la Nación",
                cargo: "Asistente de Fiscal II",
                vac: 412,
                nivel: "Técnico",
              },
              {
                entidad: "Ministerio de Educación",
                cargo: "Profesional en Pedagogía",
                vac: 89,
                nivel: "Profesional",
              },
              {
                entidad: "ICBF",
                cargo: "Defensor de Familia",
                vac: 67,
                nivel: "Profesional",
              },
              {
                entidad: "Contraloría General",
                cargo: "Auxiliar Administrativo",
                vac: 134,
                nivel: "Asistencial",
              },
            ].map((o, i) => (
              <Reveal key={o.entidad + o.cargo} delay={(i % 3) * 80}>
                <div className="card h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="tag tag-blue">{o.nivel}</span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "var(--gold-300)", fontFamily: "var(--font-display)" }}
                    >
                      {o.vac} vacantes
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{o.entidad}</p>
                  <h3 className="mt-1 text-lg font-bold leading-snug">{o.cargo}</h3>
                  <div className="mt-auto pt-5 flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>📅 Inscripciones abiertas</span>
                    <span>→</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIOS ─── */}
      <section className="section">
        <div className="container-app">
          <Reveal>
            <span className="eyebrow">Casos de éxito</span>
            <h2 className="display-2 mt-4 max-w-3xl">
              Aspirantes reales, <span className="text-gradient-gold">cargos reales</span>.
            </h2>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                nombre: "María C.",
                cargo: "Asistencial · Auxiliar Administrativo",
                entidad: "Alcaldía de Medellín",
                texto:
                  "Llevaba 2 años intentando pasar. Con simulacros diarios y la racha gamificada, por fin entré al puesto 3 de mi OPEC.",
              },
              {
                nombre: "Andrés R.",
                cargo: "Técnico · Inspector de Tránsito",
                entidad: "Secretaría de Movilidad",
                texto:
                  "Lo que más me gustó fue la explicación de cada respuesta. No memorizo, entiendo. Eso hace la diferencia el día del examen.",
              },
              {
                nombre: "Diana O.",
                cargo: "Profesional · Abogada Senior",
                entidad: "Ministerio de Justicia",
                texto:
                  "Las preguntas de juicio situacional son idénticas en formato a las del examen real. Llegué con un nivel de confianza enorme.",
              },
            ].map((t, i) => (
              <Reveal key={t.nombre} delay={i * 100}>
                <figure className="card h-full">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" style={{ color: "var(--gold-500)" }}>
                    <path
                      d="M0 24V14C0 6.27 4.5 1 12 0v4c-3.5 1-5 4-5 7h5v13H0zm17 0V14c0-7.73 4.5-13 12-14v4c-3.5 1-5 4-5 7h5v13H17z"
                      fill="currentColor"
                      opacity="0.5"
                    />
                  </svg>
                  <blockquote className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-primary)" }}>
                    {t.texto}
                  </blockquote>
                  <figcaption className="mt-6 pt-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                    <p className="font-semibold">{t.nombre}</p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{t.cargo}</p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{t.entidad}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="planes" className="section">
        <div className="container-app">
          <Reveal>
            <span className="eyebrow">Planes</span>
            <h2 className="display-2 mt-4 max-w-3xl">
              Inversión mínima.{" "}
              <span className="text-gradient-gold">Resultados máximos</span>.
            </h2>
            <p className="mt-6 text-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
              Empieza gratis. Sube de plan cuando estés listo. Cancela cuando quieras.
            </p>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Gratuito",
                price: "$0",
                period: "para siempre",
                features: ["3 simulacros/mes", "10 preguntas por simulacro", "1 OPEC inscrita", "Ranking básico"],
                cta: "Empezar",
                href: "/registro",
                highlight: false,
              },
              {
                name: "Básico",
                price: "$15.000",
                period: "/mes",
                features: ["10 simulacros/mes", "20 preguntas", "3 OPECs inscritas", "Estadísticas detalladas"],
                cta: "Suscribirme",
                href: "/registro",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$35.000",
                period: "/mes",
                features: ["Simulacros ilimitados", "40 preguntas", "OPECs ilimitadas", "Rankings avanzados", "Modo carrera"],
                cta: "Más popular",
                href: "/registro",
                highlight: true,
              },
              {
                name: "Premium",
                price: "$60.000",
                period: "/mes",
                features: ["Todo lo del Pro", "60 preguntas", "Tutor IA personalizado", "Análisis de debilidades", "Plan de estudio semanal"],
                cta: "Suscribirme",
                href: "/registro",
                highlight: false,
              },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div
                  className={p.highlight ? "card-glow h-full flex flex-col" : "card h-full flex flex-col"}
                  style={p.highlight ? { background: "linear-gradient(180deg, rgba(208, 74, 28, 0.06), var(--bg-card))" } : {}}
                >
                  {p.highlight && (
                    <span className="tag tag-gold mb-4 self-start animate-pulse">✨ Más elegido</span>
                  )}
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="mt-3 flex items-baseline gap-1.5">
                    <span
                      className="text-4xl font-extrabold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: p.highlight ? "var(--gold-500)" : "var(--text-primary)",
                      }}
                    >
                      {p.price}
                    </span>
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {p.period}
                    </span>
                  </p>
                  <ul className="mt-6 space-y-2.5 text-sm flex-1" style={{ color: "var(--text-secondary)" }}>
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span
                          className="mt-1 inline-flex items-center justify-center w-4 h-4 rounded-full shrink-0"
                          style={{
                            background: p.highlight ? "var(--gold-500)" : "rgba(10, 10, 10, 0.06)",
                            color: p.highlight ? "#FFFFFF" : "var(--text-secondary)",
                          }}
                        >
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={p.href}
                    className={p.highlight ? "btn-primary mt-8 w-full" : "btn-secondary mt-8 w-full"}
                  >
                    {p.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="section">
        <div className="container-narrow">
          <Reveal>
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2 className="display-2 mt-4">
              ¿Lo de siempre?
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12">
              <FAQ
                items={[
                  {
                    q: "¿De dónde salen las preguntas?",
                    a: "Las genera Llama 3.3 70B (Groq) usando como contexto las funciones, requisitos y manuales del cargo específico al que aspiras. No son preguntas genéricas reutilizadas: cada banco es único para tu OPEC.",
                  },
                  {
                    q: "¿Las preguntas son las mismas que saldrán en el examen real?",
                    a: "No, eso es imposible — las preguntas reales son secretas hasta el día del examen. Lo que hacemos es entrenarte con preguntas en el formato exacto, dificultad calibrada por nivel y temas alineados con el manual oficial.",
                  },
                  {
                    q: "¿Cuántas OPECs puedo seguir simultáneamente?",
                    a: "En el plan gratuito, 1. Plan Básico: 3. Pro y Premium: ilimitadas. Cada OPEC genera su propio banco de preguntas y rankings independientes.",
                  },
                  {
                    q: "¿Funciona desde el celular?",
                    a: "Sí — la app es PWA (puedes instalarla como app nativa desde el navegador). Está optimizada para celular: simulacros en vertical, una pregunta a la vez, y guarda tu progreso si pierdes la conexión.",
                  },
                  {
                    q: "¿Qué pasa si cancelo el plan?",
                    a: "Mantienes tu progreso, racha y XP. Vuelves al plan gratuito (3 simulacros/mes, 1 OPEC) sin perder nada. Puedes reactivar cuando quieras.",
                  },
                  {
                    q: "¿Cómo se actualiza la información de las OPECs?",
                    a: "Sincronizamos con la API pública de SIMO-CNSC todos los días a las 6 AM Colombia. Si una OPEC cierra inscripciones o cambia fechas, lo verás reflejado al día siguiente.",
                  },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="section">
        <div className="container-narrow">
          <Reveal>
            <div
              className="rounded-3xl p-12 text-center relative overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(208, 74, 28, 0.20) 0%, transparent 70%), linear-gradient(180deg, var(--bg-card) 0%, var(--bg-elevated) 100%)",
                border: "1px solid var(--border-default)",
              }}
            >
              <h2 className="display-2 max-w-2xl mx-auto">
                Tu próximo cargo público{" "}
                <span className="text-gradient-gold">empieza con un click</span>.
              </h2>
              <p className="mt-6 text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
                Crea tu cuenta gratis. Inscríbete a una OPEC. Genera tu primer banco. Todo en 90 segundos.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                {isAuthed ? (
                  <Link href="/dashboard" className="btn-primary text-base px-8 py-4">
                    Ir al dashboard →
                  </Link>
                ) : (
                  <Link href="/registro" className="btn-primary text-base px-8 py-4">
                    Crear cuenta gratis →
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative" style={{ borderColor: "var(--border-subtle)" }}>
        {/* Tricolor sello en el borde superior del footer */}
        <div className="flag-stripe absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="container-app py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ background: "var(--gradient-gold)", color: "#FFFFFF" }}
              >
                P
              </span>
              <span className="text-gradient-gold">PreparaOSS</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Preparación inteligente para concursos de méritos de la CNSC.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Producto</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <li><a href="#como-funciona" className="hover:text-[#D04A1C] transition-colors">Cómo funciona</a></li>
              <li><a href="#opecs" className="hover:text-[#D04A1C] transition-colors">OPECs activas</a></li>
              <li><a href="#planes" className="hover:text-[#D04A1C] transition-colors">Planes</a></li>
              <li><a href="#faq" className="hover:text-[#D04A1C] transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Cuenta</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <li><Link href="/login" className="hover:text-[#D04A1C] transition-colors">Iniciar sesión</Link></li>
              <li><Link href="/registro" className="hover:text-[#D04A1C] transition-colors">Crear cuenta</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#D04A1C] transition-colors">Mi dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Recursos</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <li><a href="https://www.cnsc.gov.co" target="_blank" rel="noopener noreferrer" className="hover:text-[#D04A1C] transition-colors">CNSC oficial ↗</a></li>
              <li><a href="https://simo.cnsc.gov.co" target="_blank" rel="noopener noreferrer" className="hover:text-[#D04A1C] transition-colors">SIMO ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="container-app pb-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
          <p>© 2026 PreparaOSS · Producto independiente, sin afiliación con CNSC.</p>
          <p>Hecho con ☕ en Colombia</p>
        </div>
      </footer>
    </main>
  );
}
