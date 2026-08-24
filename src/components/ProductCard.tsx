import { MessageCircle } from "lucide-react";
import { PhoneItem, WHATSAPP_NUMBER } from "@/data/products";

export function ProductCard({ p }: { p: PhoneItem }) {
  const whatsapp = (msg: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-secondary/60 to-background p-4 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground shadow-sm">
          In Stock
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">{p.brand}</span>
        <h3 className="mt-1 font-display text-lg font-bold leading-tight group-hover:text-primary transition-colors">{p.name}</h3>

        {p.description && (
          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{p.description}</p>
        )}

        <div className="mt-auto pt-4 border-t border-border">
          <a
            href={whatsapp(`Assalam o Alaikum, mujhe ${p.name} ke baare mein puchna tha. Kya yeh available hai?`)}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Inquiry on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
