import { Mail } from "@/lib/icons";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa6";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/BX0OWcAWv0r0rX4nOtDW4s?s=qs&p=i&ilr=1";

export default function ContactoForm() {
  return (
    <section id="contacto" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Contacto
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl items-start gap-8 md:grid-cols-2">
          <div className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">
            <p className="font-heading text-sm font-semibold">Únete a nuestro grupo de WhatsApp</p>
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-2xl border border-border bg-background p-2 transition-all hover:border-primary/50"
              aria-label="Abrir grupo de WhatsApp"
            >
              <img
                src="/QR.webp"
                alt="Código QR del grupo de WhatsApp de Eres UNC"
                className="h-60 w-60 rounded-xl object-contain"
              />
            </a>
          </div>

          <div className="order-1 flex flex-col items-center text-center md:order-2 md:items-start md:text-left">
            <p className="font-heading text-sm font-semibold">Síguenos en redes sociales</p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/eres.unc.cajamarca/"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-[#E4405F] transition-all hover:bg-muted"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@eres.unc.cajamarca"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-all hover:bg-muted"
                aria-label="TikTok"
              >
                <FaTiktok className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/eres.unc.cajamarca"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-[#1877F2] transition-all hover:bg-muted"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:contacto@eresunc.edu"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                aria-label="Correo"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
