import { FaInstagram, FaTiktok, FaFacebook, FaWhatsapp } from "react-icons/fa6";
import { Mail } from "@/lib/icons";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/BX0OWcAWv0r0rX4nOtDW4s?s=qs&p=i&ilr=1";

export default function ContactoForm() {
  return (
    <section
      id="contacto"
      style={{ background: "linear-gradient(135deg, #F7FCFF 0%, #F7FFF9 100%)" }}
    >
      {/* ── Bloque WhatsApp Hero ── */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 sm:pt-20 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Izquierda: texto + botón */}
          <div>
            {/* Label */}
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-5">
              <span className="inline-block h-px w-6 bg-emerald-500" />
              Súmate al cambio
            </p>

            {/* Heading */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-slate-800">
              ¿Y tú, ya{" "}
              <span className="block text-emerald-500">ERES UNC?</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-5 text-slate-500 text-sm sm:text-base leading-relaxed max-w-md">
              Forma parte de nuestra comunidad y mantente informado sobre
              actividades, propuestas y próximos encuentros.
            </p>

            {/* CTA Button */}
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3.5 text-sm sm:text-base shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/40 hover:-translate-y-0.5"
            >
              <FaWhatsapp className="h-5 w-5" />
              Unirme al grupo oficial de WhatsApp
            </a>
          </div>

          {/* Derecha: tarjeta QR + mascota */}
          <div className="relative flex justify-center lg:justify-end">

            {/* Tooltip "¡Te estamos esperando!" */}
            <div className="absolute -top-4 right-8 lg:right-16 z-10 rounded-2xl bg-white shadow-md px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-100">
              ¡Te estamos esperando!
            </div>

            {/* QR Card */}
            <div className="relative z-0 rounded-3xl bg-white shadow-xl border border-slate-100/80 p-5 w-64">
              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir grupo de WhatsApp"
              >
                <img
                  src="/QR.webp"
                  alt="Código QR del grupo de WhatsApp de Eres UNC"
                  className="h-52 w-52 rounded-2xl object-contain"
                />
              </a>
              <p className="mt-3 text-center text-sm font-semibold text-slate-800">
                Escanéame para unirte.
              </p>
              <p className="text-center text-xs text-slate-400 mt-0.5">
                o escríbenos por WhatsApp
              </p>
            </div>

            {/* Mascota Yupi */}
            <img
              src="/yupi-pixel1-sin fondo.png"
              alt="Mascota Yupi de Eres UNC"
              className="absolute -bottom-6 -right-2 lg:right-2 h-36 w-auto drop-shadow-lg z-10 pointer-events-none"
            />
          </div>

        </div>
      </div>

      {/* Divisor */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-emerald-100/60" />
      </div>

      {/* ── Bloque Redes Sociales ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="font-heading text-sm font-semibold text-slate-700">
            Síguenos en redes sociales
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/eres.unc.cajamarca/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#E4405F] shadow-sm transition-all hover:scale-105 hover:shadow-md"
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@eres.unc.cajamarca"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all hover:scale-105 hover:shadow-md"
              aria-label="TikTok"
            >
              <FaTiktok className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/eres.unc.cajamarca"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#1877F2] shadow-sm transition-all hover:scale-105 hover:shadow-md"
              aria-label="Facebook"
            >
              <FaFacebook className="h-5 w-5" />
            </a>
            <a
              href="mailto:contacto@eresunc.edu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:scale-105 hover:shadow-md"
              aria-label="Correo"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
