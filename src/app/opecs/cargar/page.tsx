"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NIVELES = ["Asistencial", "Técnico", "Profesional", "Asesor", "Directivo"];

export default function CargarOpecPage() {
  const router = useRouter();
  const [nombreCargo, setNombreCargo] = useState("");
  const [entidad, setEntidad] = useState("");
  const [nivel, setNivel] = useState("Profesional");
  const [file, setFile] = useState<File | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Adjunta el manual de funciones de tu cargo.");
      return;
    }
    setEnviando(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("nombreCargo", nombreCargo);
      fd.append("entidad", entidad);
      fd.append("nivelJerarquico", nivel);
      const r = await fetch("/api/opecs/cargar", { method: "POST", body: fd });
      const data = await r.json();
      if (!r.ok || !data.opecId) {
        setError(data.error ?? "No se pudo cargar la OPEC.");
        setEnviando(false);
        return;
      }
      // La generación corre en segundo plano; ya puede practicar los pools globales.
      router.push(`/opecs/${data.opecId}`);
    } catch {
      setError("Falla de red. Intenta de nuevo.");
      setEnviando(false);
    }
  }

  const inputStyle = {
    background: "rgba(10,10,10,0.03)",
    border: "1px solid var(--border-default)",
    color: "var(--text-primary)",
  } as const;

  return (
    <div className="max-w-xl mx-auto py-10">
      <Link href="/opecs" className="text-sm" style={{ color: "var(--text-muted)" }}>
        ← Volver a OPECs
      </Link>
      <h1 className="text-2xl font-bold mt-3">Carga tu OPEC</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
        ¿Tu OPEC no aparece en el buscador? Sube el <strong>manual de funciones</strong> de
        tu cargo (PDF, Word, txt o una foto legible) y la IA genera tu banco de preguntas.
        Mientras se genera, ya puedes practicar las transversales y comportamentales.
      </p>

      <form onSubmit={enviar} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Nombre del cargo</label>
          <input
            type="text" required value={nombreCargo}
            onChange={(e) => setNombreCargo(e.target.value)}
            placeholder="Ej: Profesional Universitario Grado 12"
            className="w-full px-4 py-3 rounded-xl outline-none" style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Entidad</label>
          <input
            type="text" required value={entidad}
            onChange={(e) => setEntidad(e.target.value)}
            placeholder="Ej: DIAN"
            className="w-full px-4 py-3 rounded-xl outline-none" style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Nivel jerárquico</label>
          <select
            value={nivel} onChange={(e) => setNivel(e.target.value)}
            className="w-full px-4 py-3 rounded-xl outline-none" style={inputStyle}
          >
            {NIVELES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Manual de funciones</label>
          <input
            type="file" required
            accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,.webp,application/pdf,image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full text-sm"
          />
          <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
            PDF, Word, txt o imagen. Si es escaneado, aplicamos OCR.
          </p>
        </div>

        {error && <p className="text-sm" style={{ color: "var(--error)" }}>{error}</p>}

        <button type="submit" disabled={enviando} className="btn-primary w-full py-3 rounded-2xl disabled:opacity-60">
          {enviando ? "Procesando tu documento…" : "Cargar y generar mi banco →"}
        </button>
      </form>
    </div>
  );
}
