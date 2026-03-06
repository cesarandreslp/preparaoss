"use client";

import { useEffect, useState } from "react";

interface ConfigRow {
  key: string;
  value: string;
  hasValue: boolean;
  updatedAt: string;
}

const FIELDS = [
  {
    key: "SMTP_HOST",
    label: "Servidor SMTP",
    placeholder: "smtp.gmail.com",
    hint: "Gmail: smtp.gmail.com · Hotmail: smtp.live.com · Yahoo: smtp.mail.yahoo.com",
    type: "text",
  },
  {
    key: "SMTP_PORT",
    label: "Puerto",
    placeholder: "587",
    hint: "587 (TLS, recomendado) · 465 (SSL) · 25 (sin cifrado)",
    type: "number",
  },
  {
    key: "SMTP_USER",
    label: "Correo de envío",
    placeholder: "tucorreo@gmail.com",
    hint: "La dirección desde la que se enviarán los emails",
    type: "email",
  },
  {
    key: "SMTP_PASS",
    label: "Contraseña de aplicación",
    placeholder: "••••••••••••••••",
    hint: "Gmail: crea una contraseña de app en myaccount.google.com → Seguridad → Contraseñas de aplicaciones",
    type: "password",
  },
  {
    key: "EMAIL_FROM",
    label: "Nombre de remitente (opcional)",
    placeholder: "PreparaOSS <tucorreo@gmail.com>",
    hint: "Si se deja vacío se usará: PreparaOSS <correo>",
    type: "text",
  },
];

export default function ConfiguracionPage() {
  const [configs, setConfigs] = useState<Record<string, ConfigRow>>({});
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; mensaje?: string; error?: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, ConfigRow> = {};
        for (const c of data.configs ?? []) map[c.key] = c;
        setConfigs(map);
        setLoading(false);
      });
  }, []);

  async function handleSave(key: string) {
    const value = form[key] ?? "";
    setSaving(key);
    const res = await fetch("/api/admin/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    const data = await res.json();
    if (data.ok) {
      setConfigs((prev) => ({
        ...prev,
        [key]: { key, value: key === "SMTP_PASS" ? "••••••••" : value, hasValue: !!value, updatedAt: new Date().toISOString() },
      }));
      setForm((prev) => ({ ...prev, [key]: "" }));
    }
    setSaving(null);
  }

  async function handleTest() {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/config/test-email", { method: "POST" });
      const data = await res.json();
      setTestResult(data);
    } catch {
      setTestResult({ ok: false, error: "Error de red al contactar el servidor" });
    }
    setTesting(false);
  }

  const allConfigured = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"].every(
    (k) => configs[k]?.hasValue
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
        <a href="/admin" className="hover:text-gray-300 transition">🛠️ Admin</a>
        <span>›</span>
        <span className="text-white">Configuración de Email</span>
      </div>

      <h1 className="text-3xl font-bold mb-1">✉️ Configuración de Email</h1>
      <p className="text-gray-400 mb-8">
        Configura el servidor SMTP desde donde se enviarán los recordatorios y notificaciones a los usuarios.
      </p>

      {/* Estado actual */}
      <div className={`rounded-xl p-4 mb-8 flex items-center gap-3 border ${
        allConfigured
          ? "bg-green-950 border-green-800 text-green-300"
          : "bg-yellow-950 border-yellow-800 text-yellow-300"
      }`}>
        <span className="text-xl">{allConfigured ? "✅" : "⚠️"}</span>
        <div>
          <p className="font-semibold">
            {allConfigured ? "Email configurado correctamente" : "Configuración incompleta"}
          </p>
          <p className="text-sm opacity-75">
            {allConfigured
              ? "Todos los campos requeridos están configurados. Puedes enviar un email de prueba."
              : "Completa los campos SMTP_HOST, SMTP_USER y SMTP_PASS para activar los emails."}
          </p>
        </div>
      </div>

      {/* Formulario de campos */}
      <div className="space-y-5 mb-8">
        {FIELDS.map((field) => {
          const saved = configs[field.key];
          const isDirty = form[field.key] !== undefined && form[field.key] !== "";

          return (
            <div key={field.key} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-sm text-gray-200">{field.label}</label>
                <span className="text-xs font-mono text-gray-500">{field.key}</span>
              </div>

              {saved?.hasValue && !isDirty && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-green-400 text-xs">✅ Guardado</span>
                  {field.key !== "SMTP_PASS" && (
                    <span className="text-gray-400 text-xs font-mono">{saved.value}</span>
                  )}
                  <span className="text-gray-600 text-xs ml-auto">
                    {new Date(saved.updatedAt).toLocaleDateString("es-CO")}
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key] ?? ""}
                  onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition"
                  onKeyDown={(e) => e.key === "Enter" && isDirty && handleSave(field.key)}
                />
                <button
                  onClick={() => handleSave(field.key)}
                  disabled={!isDirty || saving === field.key}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  {saving === field.key ? "⏳" : "Guardar"}
                </button>
              </div>

              <p className="text-gray-500 text-xs mt-2">{field.hint}</p>
            </div>
          );
        })}
      </div>

      {/* Sección de prueba */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-semibold mb-1">Probar configuración</h2>
        <p className="text-gray-400 text-sm mb-4">
          Envía un email de prueba a <strong>{configs["SMTP_USER"]?.value ?? "tu correo"}</strong> para verificar que todo funciona.
        </p>

        <button
          onClick={handleTest}
          disabled={testing || !allConfigured}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed px-6 py-2.5 rounded-lg font-semibold text-sm transition"
        >
          {testing ? "⏳ Enviando..." : "📧 Enviar email de prueba"}
        </button>

        {testResult && (
          <div className={`mt-4 p-4 rounded-lg border text-sm ${
            testResult.ok
              ? "bg-green-950 border-green-700 text-green-300"
              : "bg-red-950 border-red-700 text-red-300"
          }`}>
            {testResult.ok ? (
              <p>✅ {testResult.mensaje}</p>
            ) : (
              <div>
                <p className="font-semibold mb-1">❌ Error al enviar</p>
                <p className="font-mono text-xs opacity-80">{testResult.error}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Guía rápida */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-semibold mb-3 text-gray-300">📖 Guía rápida</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="font-semibold text-white mb-1">Gmail</p>
            <p className="font-mono text-xs">Host: smtp.gmail.com</p>
            <p className="font-mono text-xs">Puerto: 587</p>
            <p className="text-xs mt-1 text-yellow-400">
              ⚠️ Requiere <a href="https://myaccount.google.com/apppasswords" target="_blank" className="underline">contraseña de aplicación</a> (no la contraseña normal)
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="font-semibold text-white mb-1">Hotmail / Outlook</p>
            <p className="font-mono text-xs">Host: smtp-mail.outlook.com</p>
            <p className="font-mono text-xs">Puerto: 587</p>
            <p className="text-xs mt-1 text-blue-400">
              ✅ Usa tu contraseña normal de Microsoft
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
