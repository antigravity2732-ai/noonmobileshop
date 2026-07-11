import { MessageCircle } from "lucide-react";
import { Accessory, WHATSAPP_NUMBER } from "@/data/products";

export function AccessoryCard({ a }: { a: Accessory }) {
  const whatsapp = (msg: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      <div className="flex items-start justify-between relative z-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">{a.emoji}</span>
        <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground shadow-sm">
          {a.category}
        </span>
      </div>
      <h3 className="mt-4 font-display text-base font-bold leading-tight relative z-10 group-hover:text-primary transition-colors">{a.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground relative z-10">{a.desc}</p>
      <div className="mt-auto flex items-end justify-between border-t border-border pt-4 relative z-10">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Price range</div>
          <div className="font-display text-base font-bold text-primary">{a.price}</div>
        </div>
        <a
          href={whatsapp(`Assalam o Alaikum, I want to buy ${a.name} (${a.price}). Please share available options.`)}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="h-3 w-3" /> Order
        </a>
      </div>
    </article>
  );
}
