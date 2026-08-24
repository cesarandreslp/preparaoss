"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Reveal } from "@/components/landing/Reveal";
import { Counter } from "@/components/landing/Counter";
import { FAQ } from "@/components/landing/FAQ";
import { ConcursosSlider } from "@/components/landing/ConcursosSlider";
import { ProbadorHero } from "@/components/landing/ProbadorHero";

export default function LandingPage() {
  const { status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil cuando el viewport vuelve a desktop, para que no
  // quede un panel huérfano si el usuario rota el dispositivo.
  useEffect(() => {
    if (!mobileNavOpen) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => setMobileNavOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [mobileNavOpen]);

  const isAuthed = status === "authenticated";

  return (
    <main
      className="relative noise-overlay"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* ─── NAV ─── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all"
        style={{
          background: scrolled ? "rgba(11, 23, 51, 0.78)" : "rgba(11, 23, 51, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        }}
      >
        <div className="container-app flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0" style={{ fontFamily: "var(--font-display)" }}>
            <img
              src="/logo-lockup.png"
              alt="PreparaOSS"
              className="h-12 md:h-14 w-auto max-w-none"
            />
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
              <Link href="/dashboard" className="btn-primary hidden md:inline-flex">Mi dashboard →</Link>
            ) : (
              <>
                <Link href="/login" className="btn-ghost hidden md:inline-flex">Iniciar sesión</Link>
                <Link href="/registro" className="btn-primary hidden md:inline-flex">Empezar gratis</Link>
              </>
            )}
            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{
                background: mobileNavOpen ? "rgba(0, 56, 147, 0.10)" : "transparent",
                color: "var(--text-primary)",
              }}
              aria-label={mobileNavOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Panel mobile */}
        {mobileNavOpen && (
          <div
            className="md:hidden border-t animate-fade-in"
            style={{
              background: "rgba(255, 255, 255, 0.96)",
              borderColor: "rgba(0, 56, 147, 0.12)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="container-app py-4 flex flex-col gap-1">
              <a href="#como-funciona" onClick={() => setMobileNavOpen(false)} className="px-4 py-3 rounded-lg text-base font-medium hover:bg-black/5 transition-colors">Cómo funciona</a>
              <a href="#opecs" onClick={() => setMobileNavOpen(false)} className="px-4 py-3 rounded-lg text-base font-medium hover:bg-black/5 transition-colors">OPECs</a>
              <Link href="/biblioteca" onClick={() => setMobileNavOpen(false)} className="px-4 py-3 rounded-lg text-base font-medium hover:bg-black/5 transition-colors">Biblioteca</Link>
              <a href="#planes" onClick={() => setMobileNavOpen(false)} className="px-4 py-3 rounded-lg text-base font-medium hover:bg-black/5 transition-colors">Planes</a>
              <a href="#faq" onClick={() => setMobileNavOpen(false)} className="px-4 py-3 rounded-lg text-base font-medium hover:bg-black/5 transition-colors">FAQ</a>

              {isAuthed && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                  <Link href="/dashboard" onClick={() => setMobileNavOpen(false)} className="btn-primary w-full text-center">
                    Mi dashboard →
                  </Link>
                </div>
              )}

              {!isAuthed && (
                <div className="mt-3 pt-3 border-t flex flex-col gap-2" style={{ borderColor: "var(--border-subtle)" }}>
                  <Link href="/login" onClick={() => setMobileNavOpen(false)} className="btn-secondary w-full text-center">
                    Iniciar sesión
                  </Link>
                  <Link href="/registro" onClick={() => setMobileNavOpen(false)} className="btn-primary w-full text-center">
                    Empezar gratis
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-16">
        <div className="container-app relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Izquierda: mensaje + CTA */}
            <div>
              <Reveal>
                <span className="eyebrow">Concursos de méritos · CNSC</span>
              </Reveal>
              <Reveal delay={80}>
                <h1
                  className="display-1 mt-4"
                  style={{ fontSize: "clamp(2.25rem, 3.4vw, 3.5rem)", lineHeight: 1.05 }}
                >
                  Conquista tu cargo público con{" "}
                  <span className="text-gradient-gold">simulacros de IA</span> a tu medida.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 text-lg" style={{ color: "var(--text-secondary)" }}>
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
                        Empezar gratis · sin tarjeta
                      </Link>
                      <Link href="/login" className="btn-secondary text-base px-8 py-4">
                        Ya tengo cuenta
                      </Link>
                    </>
                  )}
                </div>
              </Reveal>
              <Reveal delay={320}>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {["Preguntas de tu cargo específico", "Datos directos de SIMO-CNSC", "Practica gratis, sin tarjeta"].map((li) => (
                    <li key={li} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full shrink-0" style={{ background: "var(--gold-500)", color: "#0B1733" }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {li}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Derecha: vista del producto (simulacro real) */}
            <Reveal delay={200}>
              <div className="card-glow p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--success)" }} />
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
                      className="flex items-center gap-3 p-3 rounded-lg border"
                      style={{
                        background: opt.state === "correct" ? "rgba(34,197,94,0.08)" : opt.state === "wrong" ? "rgba(239,68,68,0.06)" : "rgba(10, 10, 10, 0.02)",
                        borderColor: opt.state === "correct" ? "rgba(34,197,94,0.40)" : opt.state === "wrong" ? "rgba(239,68,68,0.30)" : "var(--border-subtle)",
                      }}
                    >
                      <span
                        className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
                        style={{
                          background: opt.state === "correct" ? "var(--success)" : opt.state === "wrong" ? "var(--error)" : "rgba(10, 10, 10, 0.06)",
                          color: opt.state === "default" ? "var(--text-secondary)" : "white",
                        }}
                      >
                        {opt.l}
                      </span>
                      <span
                        className="text-sm flex-1"
                        style={{ color: opt.state === "correct" ? "var(--success)" : opt.state === "wrong" ? "var(--error)" : "var(--text-primary)" }}
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

          {/* Stats row */}
          <Reveal delay={480}>
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t" style={{ borderColor: "var(--border-subtle)" }}>
              {[
                { v: 5000, label: "OPECs de SIMO", suffix: "+" },
                { v: 100, label: "Preguntas por simulacro", suffix: "" },
                { v: 3, label: "Tipos de prueba oficiales", suffix: "" },
                { v: 5, label: "Niveles jerárquicos", suffix: "" },
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

      {/* ─── PROBADOR (gancho interactivo, sin registro) ─── */}
      <section className="section-sm">
        <div className="container-app">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <span className="eyebrow">Sin registro · sin tarjeta</span>
                <h2 className="display-3 mt-3">
                  No nos creas. <span className="text-gradient-gold">Pruébalo.</span>
                </h2>
                <p className="mt-5 text-lg" style={{ color: "var(--text-secondary)" }}>
                  Digita tu OPEC y enfréntate a 5 preguntas reales de tu cargo ahora mismo.
                  Ve tu puntaje al instante — sin crear cuenta.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Preguntas alineadas al manual de funciones de tu cargo",
                    "Explicación de por qué cada respuesta es correcta",
                    "En menos de 60 segundos",
                  ].map((li) => (
                    <li key={li} className="flex items-start gap-3" style={{ color: "var(--text-secondary)" }}>
                      <span
                        className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0"
                        style={{ background: "rgba(212, 175, 55, 0.15)", color: "var(--gold-500)" }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <ProbadorHero />
            </Reveal>
          </div>
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
                d: "Sincronizamos SIMO-CNSC a diario y traemos miles de vacantes con todos los detalles: requisitos, vacantes, salario, fecha límite. Si la tuya no está, la cargas tú.",
              },
              {
                n: "02",
                t: "Generamos tu banco con IA",
                d: "Nuestra IA produce hasta 100 preguntas únicas a partir de las funciones, requisitos y manuales de tu cargo. Sin contenido genérico.",
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

      {/* ─── OPECs ACTIVAS ─── */}
      <section id="opecs" className="section">
        <div className="container-app">
          <Reveal>
            <span className="eyebrow">OPECs reales de SIMO</span>
            <h2 className="display-2 mt-4 max-w-3xl">
              Miles de OPECs sincronizadas a diario.{" "}
              <span className="text-gradient-gold">La tuya está aquí.</span>
            </h2>
            <p className="mt-6 text-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
              Traemos las ofertas directo de SIMO-CNSC. Busca tu cargo, practica su banco
              específico, y si no aparece, la cargas tú en segundos.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/opecs" className="btn-primary text-base px-8 py-4">
                Explorar todas las OPECs →
              </Link>
              <Link href="/opecs/cargar" className="btn-secondary text-base px-8 py-4">
                Cargar mi OPEC
              </Link>
            </div>
          </Reveal>

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
              Practica gratis con el manual general del funcionario. Cuando quieras las
              preguntas específicas de tu cargo, pagas por evento — sin suscripciones.
            </p>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-3 gap-5 max-w-5xl">
            {[
              {
                name: "Gratis",
                price: "$0",
                period: "un simulacro",
                features: ["Un simulacro de prueba con el manual general del funcionario", "Transversales + comportamentales", "Una vez por cuenta", "Sin tarjeta"],
                cta: "Empezar gratis",
                href: "/registro",
                highlight: false,
              },
              {
                name: "Pase diario",
                price: "$6.000",
                period: "por simulacro",
                features: ["Un simulacro completo de tu OPEC", "Incluye las preguntas de tu cargo", "Válido 24 horas", "Perfecto para foguearte"],
                cta: "Registrarme",
                href: "/registro",
                highlight: false,
              },
              {
                name: "Pase trimestral",
                price: "$49.900",
                period: "pago único · 3 meses",
                features: ["Práctica ILIMITADA por 3 meses", "Hasta 3 OPECs con el mismo pase", "Todas las preguntas de tu cargo", "El menor costo por día de estudio"],
                cta: "Registrarme",
                href: "/registro",
                highlight: true,
              },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div
                  className={p.highlight ? "card-glow h-full flex flex-col" : "card h-full flex flex-col"}
                  style={p.highlight ? { background: "linear-gradient(180deg, rgba(212, 175, 55, 0.06), var(--bg-card))" } : {}}
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
        <div className="container-app">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <span className="eyebrow">Preguntas frecuentes</span>
                <h2 className="display-2 mt-4">Lo que todos preguntan.</h2>
                <p className="mt-5 text-lg" style={{ color: "var(--text-secondary)" }}>
                  Cómo funciona, los pagos, de dónde salen las preguntas. Y si te queda
                  una duda, escríbenos por WhatsApp.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <FAQ
                items={[
                  {
                    q: "¿De dónde salen las preguntas?",
                    a: "Las genera nuestra IA especializada usando como contexto las funciones, requisitos y manuales del cargo específico al que aspiras. No son preguntas genéricas reutilizadas: cada banco es único para tu OPEC.",
                  },
                  {
                    q: "¿Las preguntas son las mismas que saldrán en el examen real?",
                    a: "No, eso es imposible — las preguntas reales son secretas hasta el día del examen. Lo que hacemos es entrenarte con preguntas en el formato exacto, dificultad calibrada por nivel y temas alineados con el manual oficial.",
                  },
                  {
                    q: "¿Cómo se paga? ¿Hay suscripción?",
                    a: "No hay suscripción. Al registrarte tienes un simulacro de prueba gratis con el manual general del funcionario (preguntas transversales y comportamentales). Después pagas solo lo que uses: pase diario de $6.000 (un simulacro completo válido 24h) o pase trimestral de $49.900 (práctica ilimitada durante 3 meses en hasta 3 OPECs). Pago único, sin mensualidades — no se renueva solo.",
                  },
                  {
                    q: "¿Funciona desde el celular?",
                    a: "Sí — la app es PWA (puedes instalarla como app nativa desde el navegador). Está optimizada para celular: simulacros en vertical, una pregunta a la vez, y guarda tu progreso si pierdes la conexión.",
                  },
                  {
                    q: "¿Puedo practicar sin pagar?",
                    a: "Sí. Al registrarte haces un simulacro de prueba con el manual general del funcionario (preguntas transversales y comportamentales), en la OPEC que quieras. Las preguntas específicas de tu cargo, y seguir practicando, van con el pase diario ($6.000) o el trimestral ($49.900).",
                  },
                  {
                    q: "¿Cómo se actualiza la información de las OPECs?",
                    a: "Sincronizamos con la API pública de SIMO-CNSC todos los días a las 6 AM Colombia. Si una OPEC cierra inscripciones o cambia fechas, lo verás reflejado al día siguiente.",
                  },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="section">
        <div className="container-app">
          <Reveal>
            <div
              className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.20) 0%, transparent 70%), linear-gradient(180deg, var(--bg-card) 0%, var(--bg-elevated) 100%)",
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
      <footer
        className="relative"
        style={{
          background: "rgba(11, 23, 51, 0.55)",
          borderColor: "var(--border-subtle)",
        }}
      >
        {/* Tricolor sello en el borde superior del footer */}
        <div className="flag-stripe absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="container-app py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
              <img
                src="/logo-lockup.png"
                alt="PreparaOSS"
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Preparación inteligente para concursos de méritos de la CNSC.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Producto</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <li><a href="#como-funciona" className="hover:text-[#D4AF37] transition-colors">Cómo funciona</a></li>
              <li><a href="#opecs" className="hover:text-[#D4AF37] transition-colors">OPECs activas</a></li>
              <li><a href="#planes" className="hover:text-[#D4AF37] transition-colors">Planes</a></li>
              <li><a href="#faq" className="hover:text-[#D4AF37] transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Cuenta</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <li><Link href="/login" className="hover:text-[#D4AF37] transition-colors">Iniciar sesión</Link></li>
              <li><Link href="/registro" className="hover:text-[#D4AF37] transition-colors">Crear cuenta</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#D4AF37] transition-colors">Mi dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Recursos</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <li><a href="https://www.cnsc.gov.co" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">CNSC oficial ↗</a></li>
              <li><a href="https://simo.cnsc.gov.co" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">SIMO ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="container-app pb-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
          <p>© 2026 PreparaOSS · Producto independiente, sin afiliación con CNSC.</p>
          <p>Hecho con ☕ en Colombia</p>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp — soporte/captación directa */}
      <a
        href="https://wa.me/573150593505?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20PreparaOSS"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed right-5 bottom-5 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-transform hover:scale-110"
        style={{ background: "#25D366" }}
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="#FFFFFF" aria-hidden="true">
          <path d="M16.02 3.2c-7.06 0-12.79 5.72-12.79 12.78 0 2.25.59 4.45 1.71 6.39L3.2 28.8l6.6-1.73a12.76 12.76 0 0 0 6.22 1.59h.01c7.05 0 12.78-5.73 12.78-12.79 0-3.42-1.33-6.63-3.75-9.04a12.7 12.7 0 0 0-9.04-3.63zm0 23.34h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.56 10.56 0 0 1-1.62-5.65c0-5.87 4.78-10.64 10.65-10.64 2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.11 7.53c0 5.87-4.78 10.65-10.64 10.65zm5.84-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.08 1.3 3.29.16.21 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z"/>
        </svg>
      </a>
    </main>
  );
}
