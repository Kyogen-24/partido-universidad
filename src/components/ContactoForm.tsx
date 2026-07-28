import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Mail, Send, CheckCircle2 } from "lucide-react";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/BX0OWcAWv0r0rX4nOtDW4s?s=qs&p=i&ilr=1";
const SUGGESTIONS_EMAIL = "eres.unc.cajamarca@gmail.com";

const SUGGESTION_TYPES = [
  { value: "propuesta", label: "Propuesta o idea" },
  { value: "evento", label: "Evento o actividad" },
  { value: "problema", label: "Problema o queja" },
  { value: "otro", label: "Otro" },
];

function SugerenciasForm() {
  const [type, setType] = useState("propuesta");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const buildGmailUrl = () => {
    const subject = `[${type.toUpperCase()}] Sugerencia de ${name || "anónimo"} - Eres UNC`;
    const body = `Hola equipo de Eres UNC,\n\n${message}\n\n--\nEnviado desde la web de Eres UNC\nTipo: ${type}\nNombre: ${name || "Anónimo"}`;
    const params = new URLSearchParams({
      view: "cm",
      to: SUGGESTIONS_EMAIL,
      su: subject,
      body: body,
    });
    return `https://mail.google.com/mail/?${params.toString()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const gmailUrl = buildGmailUrl();
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => {
      setMessage("");
      setName("");
      setSent(false);
    }, 5000);
  };

  if (sent) {
    return (
      <div className="rounded-3xl bg-white shadow-xl border border-slate-100/80 p-8 sm:p-10 text-center w-full">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-5">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">¡Se abrió Gmail en una pestaña nueva!</h3>
        <p className="text-slate-500 text-sm sm:text-base">
          Revisa la pestaña que se abrió, completa tu mensaje y haz clic en{" "}
          <span className="font-semibold text-slate-700">Enviar</span> en Gmail para enviarlo a{" "}
          <a href={`mailto:${SUGGESTIONS_EMAIL}`} className="text-emerald-600 font-semibold underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-500">
            {SUGGESTIONS_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white shadow-xl border border-slate-100/80 p-6 sm:p-8 w-full"
      >
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">
            ¿Tienes una idea o sugerencia?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Se abrirá Gmail con tu mensaje prellenado a{" "}
            <a href={`mailto:${SUGGESTIONS_EMAIL}`} className="text-emerald-600 font-semibold underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-500">
              {SUGGESTIONS_EMAIL}
            </a>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 block">
            Tu nombre (opcional)
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Juan Pérez"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 block">
            Tipo de aporte
          </span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
          >
            {SUGGESTION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block mb-5">
        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 block">
          Tu mensaje
        </span>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Cuéntanos tu idea, propuesta, problema o sugerencia..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all resize-y focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
        />
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-slate-500">
          Al enviar, se abrirá Gmail en una pestaña nueva con el mensaje listo.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2.5 text-sm transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
        >
          <Send className="h-4 w-4" />
          Enviar sugerencia
        </button>
      </div>
    </form>
  );
}

export default function ContactoForm() {
  return (
    <section
      id="contacto"
      style={{ background: "#F3F9FF" }}
    >
      {/* ── Header centrado de la sección ── */}
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:pt-20 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight leading-tight text-slate-800">
            ¿Y tú, ya{" "}
            <span className="block text-emerald-500">ERES UNC?</span>
          </h2>
          <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Forma parte de nuestra comunidad y mantente informado sobre
            actividades, propuestas y próximos encuentros.
          </p>
        </div>
      </div>

      {/* ── Bloque unificado: Sugerencias + WhatsApp ── */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 pb-12 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
          {/* Izquierda: Buzón de sugerencias */}
          <div className="flex flex-col gap-6 lg:items-start">
            <div className="text-center lg:text-left">
              <h3 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-slate-800">
                Tu voz construye la UNC
              </h3>
              <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-md">
                Comparte tus ideas, propuestas o problemas. Leemos cada mensaje y lo canalizamos con el equipo.
              </p>
            </div>
            <SugerenciasForm />
          </div>

          {/* Derecha: WhatsApp QR + mascota + botón */}
          <div className="flex flex-col items-center lg:items-end gap-6 pt-2">
            <div className="text-center lg:text-right w-full max-w-md">
              <h3 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-slate-800">
                Únete al grupo oficial
              </h3>
              <p className="mt-2 text-slate-500 text-sm sm:text-base">
                Recibe actualizaciones, eventos y propuestas directamente en tu WhatsApp.
              </p>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute -top-4 right-8 lg:right-16 z-10 rounded-2xl bg-white shadow-md px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-100">
                ¡Te estamos esperando!
              </div>

              <div className="relative z-0 rounded-3xl bg-white shadow-xl border border-slate-100/80 p-6 w-80">
                <a
                  href={WHATSAPP_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir grupo de WhatsApp"
                >
                  <img
                    src="/QR.webp"
                    alt="Código QR del grupo de WhatsApp de Eres UNC"
                    className="h-64 w-64 rounded-2xl object-contain"
                  />
                </a>
                <p className="mt-3 text-center text-sm font-semibold text-slate-800">
                  Escanéame para unirte.
                </p>
                <p className="text-center text-xs text-slate-400 mt-0.5">
                  o escríbenos por WhatsApp
                </p>
              </div>

              <img
                src="/yupi-pixel1-sin fondo.png"
                alt="Mascota Yupi de Eres UNC"
                className="absolute -bottom-6 -right-10 lg:-right-25 h-44 w-auto drop-shadow-lg z-10 pointer-events-none"
              />
            </div>
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-emerald-500 bg-white text-emerald-600 font-semibold px-7 py-3 text-sm sm:text-base transition-all hover:bg-emerald-50 hover:-translate-y-0.5"
            >
              <FaWhatsapp className="h-5 w-5" />
              Unirme al grupo oficial
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
