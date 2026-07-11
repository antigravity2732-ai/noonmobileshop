import { MapPin, Clock, Phone, MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { WHATSAPP_NUMBER, DISPLAY_NUMBER } from "@/data/products";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsapp = (msg: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      {/* Top utility strip */}
      <div className="hidden border-b border-border/60 bg-secondary/60 text-[11px] text-muted-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-semibold uppercase tracking-widest text-foreground">Shop Open</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> Khaliqabad, Jauharabad, Khushab
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Mon–Sat: 10 AM – 10 PM
            </span>
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-primary transition">
              <Phone className="h-3 w-3" /> {DISPLAY_NUMBER}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-3 sm:gap-4 transition hover:opacity-80">
          <div className="relative shrink-0">
            <img
              src={logo}
              alt="Noon Mobile logo"
              width={48}
              height={48}
              className="h-11 w-11 rounded-full border border-border bg-white object-contain shadow-sm sm:h-12 sm:w-12"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
          </div>
          <div className="flex flex-col">
            <h1
              className="text-xl font-bold uppercase italic leading-none tracking-tighter text-foreground sm:text-2xl"
              style={{ fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" }}
            >
              Noon Mobile
            </h1>
            <span
              className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:text-[10px]"
              style={{ fontFamily: "'Roboto Mono', ui-monospace, monospace" }}
            >
              &amp; Repairing Shop
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 rounded-full border border-border bg-secondary/40 px-2 py-1 lg:flex shadow-sm">
          {[
            { href: "#phones", label: "Phones" },
            { href: "#accessories", label: "Accessories" },
            { href: "#services", label: "Repair" },
            { href: "#about", label: "About" },
            { href: "#visit", label: "Visit" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition hover:bg-background hover:text-foreground hover:shadow-sm"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href={whatsapp("Assalam o Alaikum, I want to inquire about a phone.")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition hover:scale-105 hover:shadow-md sm:px-4 sm:text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden xs:inline sm:inline">WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:bg-secondary hover:shadow-md lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col divide-y divide-border px-2 sm:px-4">
            {[
              { href: "#phones", label: "Phones" },
              { href: "#accessories", label: "Accessories" },
              { href: "#services", label: "Repair" },
              { href: "#about", label: "About" },
              { href: "#visit", label: "Visit" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-4 text-sm font-semibold uppercase tracking-widest text-foreground transition hover:text-primary hover:bg-secondary/50"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="flex items-center gap-2 px-3 py-4 text-sm font-semibold text-muted-foreground transition hover:text-primary"
            >
              <Phone className="h-4 w-4" /> {DISPLAY_NUMBER}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
