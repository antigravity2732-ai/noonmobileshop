import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Phone, MapPin, Clock, Wrench, ShieldCheck, Truck, Star, Search, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/hero.jpg";
import repairImg from "@/assets/repair.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://id-preview--3512d454-57b3-45b2-b651-9767ab7e7da2.lovable.app/og.jpg" },
    ],
  }),
  component: Home,
});

type PhoneItem = {
  id: string;
  brand: string;
  name: string;
  price: number;
  ram: string;
  storage: string;
  display: string;
  battery: string;
  chip: string;
  camera: string;
};

const PHONES: PhoneItem[] = [
  // Apple
  { id: "ip15pm", brand: "Apple", name: "iPhone 15 Pro Max 256GB", price: 549000, ram: "8GB", storage: "256GB", display: "6.7\" LTPO OLED 120Hz", battery: "4422 mAh", chip: "A17 Pro", camera: "48MP + 12MP + 12MP" },
  { id: "ip15", brand: "Apple", name: "iPhone 15 128GB", price: 305000, ram: "6GB", storage: "128GB", display: "6.1\" OLED", battery: "3349 mAh", chip: "A16 Bionic", camera: "48MP + 12MP" },
  { id: "ip14", brand: "Apple", name: "iPhone 14 128GB", price: 259000, ram: "6GB", storage: "128GB", display: "6.1\" OLED", battery: "3279 mAh", chip: "A15 Bionic", camera: "12MP + 12MP" },
  { id: "ip13", brand: "Apple", name: "iPhone 13 128GB", price: 199000, ram: "4GB", storage: "128GB", display: "6.1\" OLED", battery: "3240 mAh", chip: "A15 Bionic", camera: "12MP + 12MP" },
  { id: "ip11", brand: "Apple", name: "iPhone 11 64GB", price: 105000, ram: "4GB", storage: "64GB", display: "6.1\" LCD", battery: "3110 mAh", chip: "A13 Bionic", camera: "12MP + 12MP" },

  // Samsung
  { id: "s24u", brand: "Samsung", name: "Galaxy S24 Ultra 256GB", price: 429999, ram: "12GB", storage: "256GB", display: "6.8\" QHD+ AMOLED 120Hz", battery: "5000 mAh", chip: "Snapdragon 8 Gen 3", camera: "200MP quad" },
  { id: "s24", brand: "Samsung", name: "Galaxy S24 256GB", price: 249999, ram: "8GB", storage: "256GB", display: "6.2\" FHD+ AMOLED", battery: "4000 mAh", chip: "Exynos 2400", camera: "50MP triple" },
  { id: "a55", brand: "Samsung", name: "Galaxy A55 5G 8/256", price: 119999, ram: "8GB", storage: "256GB", display: "6.6\" AMOLED 120Hz", battery: "5000 mAh", chip: "Exynos 1480", camera: "50MP triple" },
  { id: "a35", brand: "Samsung", name: "Galaxy A35 5G 8/128", price: 89999, ram: "8GB", storage: "128GB", display: "6.6\" AMOLED", battery: "5000 mAh", chip: "Exynos 1380", camera: "50MP triple" },
  { id: "a15", brand: "Samsung", name: "Galaxy A15 4/128", price: 44999, ram: "4GB", storage: "128GB", display: "6.5\" Super AMOLED", battery: "5000 mAh", chip: "Helio G99", camera: "50MP triple" },

  // Xiaomi
  { id: "mi14", brand: "Xiaomi", name: "Xiaomi 14 12/256", price: 264999, ram: "12GB", storage: "256GB", display: "6.36\" LTPO AMOLED", battery: "4610 mAh", chip: "Snapdragon 8 Gen 3", camera: "Leica 50MP triple" },
  { id: "note13pro", brand: "Xiaomi", name: "Redmi Note 13 Pro 8/256", price: 74999, ram: "8GB", storage: "256GB", display: "6.67\" AMOLED 120Hz", battery: "5100 mAh", chip: "Helio G99 Ultra", camera: "200MP triple" },
  { id: "note13", brand: "Xiaomi", name: "Redmi Note 13 8/256", price: 54999, ram: "8GB", storage: "256GB", display: "6.67\" AMOLED", battery: "5000 mAh", chip: "Snapdragon 685", camera: "108MP triple" },
  { id: "redmi13c", brand: "Xiaomi", name: "Redmi 13C 4/128", price: 32999, ram: "4GB", storage: "128GB", display: "6.74\" HD+", battery: "5000 mAh", chip: "Helio G85", camera: "50MP triple" },

  // Infinix
  { id: "note40pro", brand: "Infinix", name: "Note 40 Pro 8/256", price: 69999, ram: "8GB", storage: "256GB", display: "6.78\" AMOLED 120Hz", battery: "5000 mAh", chip: "Helio G99 Ultra", camera: "108MP triple" },
  { id: "hot40", brand: "Infinix", name: "Hot 40 Pro 8/256", price: 44999, ram: "8GB", storage: "256GB", display: "6.78\" 120Hz", battery: "5000 mAh", chip: "Helio G99", camera: "108MP triple" },
  { id: "smart8", brand: "Infinix", name: "Smart 8 Pro 4/128", price: 26999, ram: "4GB", storage: "128GB", display: "6.6\" 90Hz", battery: "5000 mAh", chip: "Unisoc T606", camera: "50MP dual" },

  // Oppo
  { id: "renoi11", brand: "Oppo", name: "Reno 11 8/256", price: 99999, ram: "8GB", storage: "256GB", display: "6.7\" AMOLED 120Hz", battery: "5000 mAh", chip: "Dimensity 7050", camera: "50MP triple" },
  { id: "a78", brand: "Oppo", name: "Oppo A78 8/256", price: 54999, ram: "8GB", storage: "256GB", display: "6.43\" AMOLED", battery: "5000 mAh", chip: "Snapdragon 680", camera: "50MP dual" },
  { id: "a18", brand: "Oppo", name: "Oppo A18 4/128", price: 34999, ram: "4GB", storage: "128GB", display: "6.56\" HD+ 90Hz", battery: "5000 mAh", chip: "Helio G85", camera: "8MP dual" },

  // Vivo
  { id: "v30", brand: "Vivo", name: "Vivo V30 12/256", price: 149999, ram: "12GB", storage: "256GB", display: "6.78\" AMOLED 120Hz", battery: "5000 mAh", chip: "Snapdragon 7 Gen 3", camera: "50MP triple" },
  { id: "y28", brand: "Vivo", name: "Vivo Y28 8/128", price: 49999, ram: "8GB", storage: "128GB", display: "6.68\" 90Hz", battery: "6000 mAh", chip: "Helio G85", camera: "50MP dual" },
  { id: "y18", brand: "Vivo", name: "Vivo Y18 4/128", price: 33999, ram: "4GB", storage: "128GB", display: "6.56\" 90Hz", battery: "5000 mAh", chip: "Helio G85", camera: "50MP dual" },

  // Tecno
  { id: "camon30", brand: "Tecno", name: "Camon 30 8/256", price: 74999, ram: "8GB", storage: "256GB", display: "6.78\" AMOLED 120Hz", battery: "5000 mAh", chip: "Helio G99 Ultra", camera: "50MP triple" },
  { id: "spark20", brand: "Tecno", name: "Spark 20 Pro 8/256", price: 49999, ram: "8GB", storage: "256GB", display: "6.78\" 120Hz", battery: "5000 mAh", chip: "Helio G99", camera: "108MP dual" },

  // Realme / Honor / Nothing
  { id: "realme12", brand: "Realme", name: "Realme 12 Pro+ 12/256", price: 129999, ram: "12GB", storage: "256GB", display: "6.7\" AMOLED 120Hz", battery: "5000 mAh", chip: "Snapdragon 7s Gen 2", camera: "50MP periscope" },
  { id: "realmec67", brand: "Realme", name: "Realme C67 8/256", price: 54999, ram: "8GB", storage: "256GB", display: "6.72\" 90Hz", battery: "5000 mAh", chip: "Snapdragon 685", camera: "108MP dual" },
  { id: "honorx9b", brand: "Honor", name: "Honor X9b 8/256", price: 89999, ram: "8GB", storage: "256GB", display: "6.78\" AMOLED 120Hz", battery: "5800 mAh", chip: "Snapdragon 6 Gen 1", camera: "108MP triple" },
  { id: "nothing2a", brand: "Nothing", name: "Nothing Phone (2a) 12/256", price: 119999, ram: "12GB", storage: "256GB", display: "6.7\" AMOLED 120Hz", battery: "5000 mAh", chip: "Dimensity 7200 Pro", camera: "50MP dual" },
];

const BRANDS = ["All", "Apple", "Samsung", "Xiaomi", "Infinix", "Oppo", "Vivo", "Tecno", "Realme", "Honor", "Nothing"];

const SERVICES = [
  { icon: Wrench, title: "Screen Replacement", desc: "Original LCD & OLED panels with 30-day warranty.", price: "From Rs. 3,500" },
  { icon: ShieldCheck, title: "Battery Replacement", desc: "100% health original batteries for all brands.", price: "From Rs. 2,200" },
  { icon: Phone, title: "Software & IMEI Repair", desc: "Flashing, unlocking, iCloud & FRP solutions.", price: "From Rs. 1,500" },
  { icon: Truck, title: "Free Home Delivery", desc: "COD available across Pakistan on all mobiles.", price: "Nationwide" },
];

const fmt = (n: number) => "Rs. " + n.toLocaleString("en-PK");

function Home() {
  const [brand, setBrand] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"popular" | "low" | "high">("popular");

  const filtered = useMemo(() => {
    let list = PHONES.filter((p) => p.price >= 20000);
    if (brand !== "All") list = list.filter((p) => p.brand === brand);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) => (p.name + " " + p.brand).toLowerCase().includes(s));
    }
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [brand, q, sort]);

  const whatsapp = (msg: string) =>
    `https://wa.me/923001234567?text=${encodeURIComponent(msg)}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="Noon Mobile logo" width={44} height={44} className="h-11 w-11 rounded-md object-contain" />
            <div className="leading-tight">
              <div className="font-display text-lg font-bold text-primary">Noon Mobile</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">& Repairing Shop</div>
            </div>
          </a>
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#phones" className="hover:text-primary">Phones</a>
            <a href="#services" className="hover:text-primary">Repair</a>
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#visit" className="hover:text-primary">Visit</a>
          </nav>
          <a
            href={whatsapp("Assalam o Alaikum, I want to inquire about a phone.")}
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(180deg, oklch(0.14 0.02 160 / 0.85), oklch(0.14 0.02 160 / 0.65)), url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 text-primary-foreground sm:px-6 sm:pt-24 lg:pb-28 lg:pt-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/30 px-3 py-1 text-xs font-medium tracking-wider text-gold uppercase">
              <Star className="h-3 w-3 fill-gold" /> Trusted since 2015
            </span>
            <h1 className="mt-5 font-display text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Original smartphones.<br />
              <span className="text-gold">Honest prices.</span> Master repairs.
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
              From flagship iPhones to budget Infinix — every device at Noon Mobile is 100% genuine,
              tested, and backed by warranty. Repairs done in-shop by Muhammad Imran, with over a decade of experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#phones" className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-lg transition hover:brightness-105">
                Browse Phones
              </a>
              <a href="#services" className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                Repair Services
              </a>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 text-white">
              <div><dt className="text-xs uppercase tracking-wider text-white/60">Phones sold</dt><dd className="mt-1 font-display text-2xl font-bold">12,400+</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-white/60">Repairs done</dt><dd className="mt-1 font-display text-2xl font-bold">8,600+</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-white/60">Google rating</dt><dd className="mt-1 font-display text-2xl font-bold">4.9 ★</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* BRAND STRIP */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground sm:px-6">
          {["Apple", "Samsung", "Xiaomi", "Infinix", "Oppo", "Vivo", "Tecno", "Realme", "Honor", "Nothing"].map((b) => (
            <span key={b} className="opacity-70 transition hover:opacity-100 hover:text-primary">{b}</span>
          ))}
        </div>
      </section>

      {/* PHONES */}
      <section id="phones" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Available now</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Original mobiles in stock</h2>
            <p className="mt-3 text-muted-foreground">
              {filtered.length} models from Rs. 20,000 and above — walk in, or order on WhatsApp for cash-on-delivery anywhere in Pakistan.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search model…"
                className="w-56 rounded-full border border-input bg-card py-2 pl-9 pr-4 text-sm outline-none ring-ring focus:ring-2"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "popular" | "low" | "high")}
              className="rounded-full border border-input bg-card px-4 py-2 text-sm outline-none ring-ring focus:ring-2"
            >
              <option value="popular">Sort: Popular</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Brand tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                brand === b
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">{p.brand}</span>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground">In Stock</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-bold leading-tight">{p.name}</h3>

              <ul className="mt-4 grid grid-cols-2 gap-y-1.5 text-xs text-muted-foreground">
                <li><span className="text-foreground/80">Chip:</span> {p.chip}</li>
                <li><span className="text-foreground/80">RAM:</span> {p.ram}</li>
                <li className="col-span-2"><span className="text-foreground/80">Display:</span> {p.display}</li>
                <li><span className="text-foreground/80">Battery:</span> {p.battery}</li>
                <li><span className="text-foreground/80">Storage:</span> {p.storage}</li>
                <li className="col-span-2"><span className="text-foreground/80">Camera:</span> {p.camera}</li>
              </ul>

              <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Cash Price</div>
                  <div className="font-display text-xl font-bold text-primary">{fmt(p.price)}</div>
                </div>
                <a
                  href={whatsapp(`Assalam o Alaikum, I want to order ${p.name} (${fmt(p.price)}). Please confirm availability.`)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Order
                </a>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">No models match your filters. Try another brand.</p>
        )}
      </section>

      {/* REPAIR */}
      <section id="services" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div className="relative overflow-hidden rounded-3xl">
            <img src={repairImg} alt="Mobile repair technician at Noon Mobile" width={1408} height={1008} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Repair Workshop</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Board-level repair, done right the first time.</h2>
            <p className="mt-4 text-primary-foreground/80">
              Every repair is handled personally by owner <strong className="text-gold">Muhammad Imran</strong>,
              using original parts and industry-grade equipment. Free diagnostic, transparent quote, warranty on every job.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <s.icon className="h-6 w-6 text-gold" />
                  <h3 className="mt-3 font-display text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{s.desc}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-gold">{s.price}</p>
                </div>
              ))}
            </div>
            <a
              href={whatsapp("I need a repair quote for my phone.")}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-lg transition hover:brightness-105"
            >
              <MessageCircle className="h-4 w-4" /> Get a repair quote
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">The Owner</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Muhammad Imran — 12 years serving the community.</h2>
            <p className="mt-5 text-muted-foreground">
              What began as a small counter in the neighborhood market has grown into one of the most trusted mobile destinations
              in the city. Muhammad Imran built Noon Mobile on three simple rules: <em>never sell a copy phone</em>,
              <em> never overcharge</em>, and <em>never hand back a device unless it's fixed properly.</em>
            </p>
            <p className="mt-4 text-muted-foreground">
              Today the shop stocks every major brand — Apple, Samsung, Xiaomi, Infinix, Oppo, Vivo, Tecno, Realme, Honor and Nothing —
              at real market rates, with EMI options and cash-on-delivery across Pakistan.
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

      {/* VISIT */}
      <section id="visit" className="border-t border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:py-20">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><MapPin className="h-5 w-5" /></div>
            <div>
              <h3 className="font-display text-lg font-bold">Visit the Shop</h3>
              <p className="mt-1 text-sm text-muted-foreground">Noon Mobile & Repairing Shop<br />Main Bazaar Road, Pakistan</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Phone className="h-5 w-5" /></div>
            <div>
              <h3 className="font-display text-lg font-bold">Call / WhatsApp</h3>
              <p className="mt-1 text-sm text-muted-foreground">+92 300 123 4567<br />Muhammad Imran (Owner)</p>
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

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            <span>© {new Date().getFullYear()} Noon Mobile & Repairing Shop. All rights reserved.</span>
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
        href={whatsapp("Assalam o Alaikum, I need help with a phone.")}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
