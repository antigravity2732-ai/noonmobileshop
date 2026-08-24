import { Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(180deg, oklch(0.08 0 0 / 0.88), oklch(0.14 0 0 / 0.7)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Premium animated hero background */}
      <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden" aria-hidden="true">
        {/* Soft blue/purple light blobs */}
        <div className="hero-blob hero-blob--a" />
        <div className="hero-blob hero-blob--b" />
        <div className="hero-blob hero-blob--c" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 text-primary-foreground sm:px-6 sm:pt-24 lg:pb-28 lg:pt-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-2 text-sm font-extrabold uppercase tracking-wider text-black shadow-lg sm:text-base animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Star className="h-4 w-4 fill-black text-black" /> Trusted in Khushab since 2024
          </span>
          <h1 className="mt-5 font-display text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
            Original smartphones.<br />
            <span className="inline-block rounded-md bg-white px-3 py-1 font-black text-black shadow-lg">Genuine stock.</span> Master repairs.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            Budget se le kar mid-range tak — har phone 100% genuine, tested aur warranty ke sath.
            Repairs owner <strong className="text-white">Muhammad Imran</strong> khud handle karte hain.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
            <a href="#phones" className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-lg transition hover:brightness-105 hover:scale-105">
              Browse Phones
            </a>
            <a href="#services" className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 hover:scale-105">
              Repair Services
            </a>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 text-white animate-in fade-in duration-1000 delay-700">
            <div><dt className="text-xs uppercase tracking-wider text-white/60">Phones sold</dt><dd className="mt-1 font-display text-2xl font-bold">12,400+</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-white/60">Repairs done</dt><dd className="mt-1 font-display text-2xl font-bold">8,600+</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-white/60">Google rating</dt><dd className="mt-1 font-display text-2xl font-bold">4.9 ★</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
