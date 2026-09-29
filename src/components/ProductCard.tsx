import { Minus, Plus, Timer } from "lucide-react";
import type { Product } from "@/data/catalog";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { qtyOf, add, remove } = useStore();
  const qty = qtyOf(product.id);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <article className="card-tile flex flex-col overflow-hidden">
      <div className={`relative grid h-28 place-items-center ${product.tone}`}>
        <span className="text-5xl" aria-hidden>
          {product.emoji}
        </span>
        {off > 0 && (
          <span className="bg-offer absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
            {off}% off
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
          <Timer className="size-3 shrink-0" />
          <span className="truncate">{product.eta}</span>
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{product.unit}</p>

        <div className="mt-auto grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2 pt-2">
          <div className="min-w-0">
            <p className="text-sm font-bold">₹{product.price}</p>
            {off > 0 && (
              <p className="text-xs text-muted-foreground line-through">₹{product.mrp}</p>
            )}
          </div>

          {qty === 0 ? (
            <button
              onClick={() => add(product.id)}
              className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              Add
            </button>
          ) : (
            <div className="flex shrink-0 items-center gap-2 rounded-full bg-primary px-2 py-1 text-primary-foreground">
              <button aria-label="Remove one" onClick={() => remove(product.id)}>
                <Minus className="size-3.5" />
              </button>
              <span className="min-w-4 text-center text-xs font-bold">{qty}</span>
              <button aria-label="Add one" onClick={() => add(product.id)}>
                <Plus className="size-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
