import { MessageCircle, Smartphone } from "lucide-react";
import { PhoneItem, WHATSAPP_NUMBER, DEFAULT_PHONE_IMAGE, fmt } from "@/data/products";

export function ProductCard({ p }: { p: PhoneItem }) {
  const hasPrice = typeof p.price === "number" && !isNaN(p.price) && p.price > 0;
  const formattedPrice = hasPrice ? fmt(p.price) : "";

  const whatsappMsg = hasPrice
    ? `Assalam o Alaikum, I want to order ${p.name} (${formattedPrice}). Please confirm availability.`
    : `Assalam o Alaikum, mujhe ${p.name} ke baare mein puchna tha. Kya yeh available hai?`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

  const hasAnySpec = Boolean(
    p.chip || p.ram || p.display || p.battery || p.storage || p.camera
  );

  const imgSrc = p.image && p.image.trim() !== "" ? p.image : DEFAULT_PHONE_IMAGE;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-secondary/60 to-background p-4 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
        <img
          src={imgSrc}
          alt={p.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_PHONE_IMAGE;
          }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground shadow-sm">
          In Stock
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {p.brand && (
          <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">{p.brand}</span>
        )}
        <h3 className="mt-1 font-display text-lg font-bold leading-tight group-hover:text-primary transition-colors">{p.name}</h3>

        {p.description && (
          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{p.description}</p>
        )}

        {hasAnySpec && (
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-xs text-muted-foreground">
            {p.chip && (
              <li className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-primary/50 shrink-0" />
                <span className="text-foreground/80">Chip:</span> {p.chip}
              </li>
            )}
            {p.ram && (
              <li className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-primary/50 shrink-0" />
                <span className="text-foreground/80">RAM:</span> {p.ram}
              </li>
            )}
            {p.display && (
              <li className="col-span-2 flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-primary/50 shrink-0" />
                <span className="text-foreground/80">Display:</span> {p.display}
              </li>
            )}
            {p.battery && (
              <li className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-primary/50 shrink-0" />
                <span className="text-foreground/80">Battery:</span> {p.battery}
              </li>
            )}
            {p.storage && (
              <li className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-primary/50 shrink-0" />
                <span className="text-foreground/80">Storage:</span> {p.storage}
              </li>
            )}
            {p.camera && (
              <li className="col-span-2 flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-primary/50 shrink-0" />
                <span className="text-foreground/80">Camera:</span> {p.camera}
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
          {hasPrice ? (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Cash Price</div>
              <div className="font-display text-xl font-bold text-primary">{formattedPrice}</div>
            </div>
          ) : (
            <div />
          )}

          <a
            href={whatsappUrl}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-105 ${
              hasPrice ? "" : "w-full"
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {hasPrice ? "Order" : "Inquiry on WhatsApp"}
          </a>
        </div>
      </div>
    </article>
  );
}

