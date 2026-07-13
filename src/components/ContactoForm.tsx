import { useState, type FormEvent } from "react";
import { Send, Mail, Music2 } from "lucide-react";

export default function ContactoForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Contacto
          </h2>
          <p className="mt-4 text-muted-foreground">
            Escribinos, seguinos en redes o unite a la conversación.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-secondary/20 bg-secondary/5 p-8 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Send className="h-5 w-5" />
                </div>
                <p className="font-heading text-lg font-semibold">
                  ¡Mensaje enviado!
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Gracias por comunicarte. Te responderemos pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="faculty" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Facultad
                  </label>
                  <input
                    id="faculty"
                    type="text"
                    required
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    placeholder="Ej: Ingeniería"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Contanos tu idea, duda o propuesta..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
                >
                  <Send className="h-4 w-4" />
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div>
              <p className="font-heading text-sm font-semibold">Seguinos en redes</p>
              <div className="mt-4 flex gap-3">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  aria-label="TikTok"
                >
                  <Music2 className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
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
            <div>
              <p className="font-heading text-sm font-semibold">Contacto directo</p>
              <p className="mt-2 text-sm text-muted-foreground">
                contacto@eresunc.edu
              </p>
              <p className="text-sm text-muted-foreground">
                +54 351 555-0100
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
