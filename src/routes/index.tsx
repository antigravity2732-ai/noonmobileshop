import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  MapPin, Clock, Phone, MessageCircle, Search, ChevronDown,
} from "lucide-react";

import logo from "@/assets/logo.png";
import repairImg from "@/assets/repair.jpg";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { AccessoryCard } from "@/components/AccessoryCard";
import {
  PHONES, BRANDS, SERVICES, ACCESSORIES, KEYPAD_PHONES,
  WHATSAPP_NUMBER, DISPLAY_NUMBER,
} from "@/data/products";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { name: "description", content: "Noon Mobile & Repairing Shop — Khaliqabad, Jauharabad, Khushab. Original phones, accessories & expert repair services by Muhammad Imran." },
      { property: "og:title", content: "Noon Mobile & Repairing Shop — Jauharabad, Khushab" },
      { property: "og:description", content: "Buy original smartphones at honest prices. All major brands — Apple, Samsung, Xiaomi, Infinix, Oppo, Vivo & more. Expert repairs with 30-day warranty." },
    ],
  }),
  component: Home,
});

const WHATSAPP = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;


const ACC_CATS = ["All", ...Array.from(new Set(ACCESSORIES.map((a) => a.category)))];

function Home() {
  const [brand, setBrand] = useState("All");
  const [search, setSearch] = useState("");
  const [accCat, setAccCat] = useState("All");
  const [showAllPhones, setShowAllPhones] = useState(false);

  const filtered = useMemo(() => {
    return PHONES.filter((p) => {
      const matchBrand = brand === "All" || p.brand === brand;
      const matchSearch = search.trim() === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
      return matchBrand && matchSearch;
    });
  }, [brand, search]);

  const displayedPhones = showAllPhones ? filtered : filtered.slice(0, 12);


  const filteredAcc = useMemo(
    () => (accCat === "All" ? ACCESSORIES : ACCESSORIES.filter((a) => a.category === accCat)),
    [accCat]
  );

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Intro splash */}
      <div className="intro-splash" aria-hidden="true">
        <div className="intro-splash__ring" />
        <div className="intro-splash__inner">
          <img src={logo} alt="" className="intro-splash__logo" />
          <div className="intro-splash__name">Noon Mobile</div>
          <div className="intro-splash__line" />
          <div className="intro-splash__sub">Jauharabad · Khushab · Punjab</div>
        </div>
      </div>

      <Header />
      <Hero />

      {/* ── PHONES ─────────────────────────────────────────── */}
      <section id="phones" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">Our Inventory</span>
            <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">All Phones</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {filtered.length} model{filtered.length !== 1 ? "s" : ""} available · 100% Original &amp; Tested
            </p>
          </div>
          <a
            href={WHATSAPP("Assalam o Alaikum, I need help choosing a phone within my budget.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow transition hover:scale-105 hover:shadow-md sm:self-auto"
          >
            <MessageCircle className="h-4 w-4" /> Get Advice on WhatsApp
          </a>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search phones…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-full border border-border bg-secondary pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Brand filter */}
          <div className="relative">
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="h-10 appearance-none rounded-full border border-border bg-secondary pl-4 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {BRANDS.map((b) => <option key={b}>{b}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Phone grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center text-muted-foreground">
            <Search className="h-10 w-10 opacity-30" />
            <p className="text-lg font-medium">No phones match your filters.</p>
            <button onClick={() => { setBrand("All"); setSearch(""); }} className="rounded-full border border-border px-5 py-2 text-sm text-foreground hover:bg-secondary transition">
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedPhones.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
            {filtered.length > 12 && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setShowAllPhones((v) => !v)}
                  className="rounded-full border border-border bg-secondary px-8 py-3 text-sm font-semibold text-foreground transition hover:bg-card hover:shadow-md"
                >
                  {showAllPhones ? "Show Less" : `Show All ${filtered.length} Phones`}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ── KEYPAD PHONES ───────────────────────────────────── */}
      <section id="keypad-phones" className="border-t border-border bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">Feature Phones</span>
              <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Keypad Phones</h2>
              <p className="mt-2 text-sm text-muted-foreground">Nokia, Samsung, itel, Jazz — sabse reliable keypad phones</p>
            </div>
            <a
              href={WHATSAPP("Assalam o Alaikum, mujhe keypad phone ke baare mein puchna tha. Kaun sa available hai?")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow transition hover:scale-105 hover:shadow-md sm:self-auto"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp par Poochein
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {KEYPAD_PHONES.map((kp) => {
              const kpImg = kp.image && kp.image.trim() !== "" ? kp.image : "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80";
              const hasKpPrice = typeof kp.price === "number" && kp.price > 0;
              const kpMsg = hasKpPrice
                ? `Assalam o Alaikum, mujhe ${kp.name} (Rs. ${kp.price.toLocaleString("en-PK")}) ke baare mein puchna tha.`
                : `Assalam o Alaikum, mujhe ${kp.name} ke baare mein puchna tha. Kya yeh available hai?`;

              return (
                <a
                  key={kp.id}
                  href={WHATSAPP(kpMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl text-center"
                >
                  <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-secondary/60 to-background mb-3">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <img
                      src={kpImg}
                      alt={kp.name}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80";
                      }}
                    />
                  </div>
                  {kp.brand && (
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">{kp.brand}</span>
                  )}
                  <h3 className="mt-1 text-sm font-bold leading-tight group-hover:text-primary transition-colors">{kp.name}</h3>
                  {hasKpPrice && (
                    <span className="mt-1 text-xs font-bold text-primary">Rs. {kp.price?.toLocaleString("en-PK")}</span>
                  )}
                  <span className="mt-2 text-[10px] text-primary font-semibold">Tap to Inquire</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ACCESSORIES ────────────────────────────────────── */}
      <section id="accessories" className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">Accessories</span>
              <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">All Accessories</h2>
            </div>
          </div>

          {/* Category tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {ACC_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setAccCat(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${accCat === cat ? "bg-primary text-primary-foreground shadow" : "border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAcc.map((a) => <AccessoryCard key={a.id} a={a} />)}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────── */}
      <section id="services" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-10 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">Expert Technicians</span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Repair Services</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              All repairs done with genuine parts. 30-day service warranty on every job.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <a
                key={s.title}
                href={WHATSAPP(`Assalam o Alaikum, I need ${s.title}. Please guide me.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <s.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
                <div className="mt-auto text-xs font-semibold text-primary">Inquire on WhatsApp →</div>
              </a>
            ))}
          </div>

          {/* Repair image */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-border shadow-2xl">
            <img
              src={repairImg}
              alt="Phone repair workshop — Noon Mobile & Repairing Shop, Jauharabad"
              className="h-72 w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────── */}
      <section id="about" className="border-t border-border bg-secondary/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">The Owner</span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Muhammad Imran — Khushab ki trusted mobile shop.</h2>
            <p className="mt-5 text-muted-foreground">
              Noon Mobile ki bunyaad teen simple usoolon par rakhi gayi hai: <em>kabhi copy phone nahi</em>,
              <em> kabhi zyada price nahi</em>, aur <em>repair hamesha genuine parts ke sath</em>.
            </p>
            <p className="mt-4 text-muted-foreground">
              Har major brand — Apple, Samsung, Xiaomi, Infinix, Oppo, Vivo, Tecno, Realme, Honor aur itel — real market rates par available.
              Buying, selling aur repair — sab kuch aik hi jaga.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div><div className="font-display text-3xl font-bold text-primary">12+</div><div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Years experience</div></div>
              <div><div className="font-display text-3xl font-bold text-primary">100%</div><div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Original stock</div></div>
              <div><div className="font-display text-3xl font-bold text-primary">30-day</div><div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Repair warranty</div></div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-gold/10 to-transparent blur-2xl" />
            <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
              <img src={logo} alt="Noon Mobile logo" width={200} height={200} loading="lazy" className="mx-auto h-40 w-40 object-contain" />
              <blockquote className="mt-6 border-l-2 border-gold pl-4 font-display text-lg italic text-foreground">
                "Trust is the only thing you can't repair. We protect it with every phone we sell."
              </blockquote>
              <p className="mt-3 text-sm font-semibold text-muted-foreground">— Muhammad Imran, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISIT ──────────────────────────────────────────── */}
      <section id="visit" className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:py-20">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><MapPin className="h-5 w-5" /></div>
            <div>
              <h3 className="font-display text-lg font-bold">Visit the Shop</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Noon Mobile &amp; Repairing Shop<br />
                Khaliqabad, Jauharabad City<br />
                District Khushab, Punjab
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Phone className="h-5 w-5" /></div>
            <div>
              <h3 className="font-display text-lg font-bold">Call / WhatsApp</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-primary">{DISPLAY_NUMBER}</a><br />
                Muhammad Imran (Owner)<br />
                <span className="text-xs">Buy • Sell • Repair — WhatsApp anytime</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Clock className="h-5 w-5" /></div>
            <div>
              <h3 className="font-display text-lg font-bold">Opening Hours</h3>
              <p className="mt-1 text-sm text-muted-foreground">Mon – Sat: 10:00 AM – 10:00 PM<br />Friday: 2:30 PM – 10:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            <span>© {new Date().getFullYear()} Noon Mobile &amp; Repairing Shop, Khaliqabad Jauharabad. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#phones" className="hover:text-primary">Phones</a>
            <a href="#services" className="hover:text-primary">Repair</a>
            <a href="#visit" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP("Assalam o Alaikum, I need help with a phone (buy / sell / repair).")}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
