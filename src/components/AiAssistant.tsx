import { Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { aiBaskets, productById, products, type Product } from "@/data/catalog";
import { useStore } from "@/lib/store";

const prompts = [
  "Dinner for two tonight",
  "Healthy breakfast week",
  "Snacks for movie night",
  "Restock my essentials",
];

function matchPrompt(query: string): { title: string; picks: Product[] } {
  const q = query.toLowerCase();
  const basket =
    aiBaskets.find((b) => q.includes(b.id)) ??
    (q.match(/dinner|pasta|cook/) ? aiBaskets[0] : null) ??
    (q.match(/breakfast|healthy|protein/) ? aiBaskets[1] : null) ??
    (q.match(/movie|snack|party|friday/) ? aiBaskets[2] : null) ??
    (q.match(/restock|essential|monthly|refill/) ? aiBaskets[3] : null);

  if (basket) {
    return {
      title: basket.title,
      picks: basket.items.map(productById).filter((p): p is Product => Boolean(p)),
    };
  }

  const words = q.split(/\s+/).filter((w) => w.length > 2);
  const picks = products
    .filter((p) =>
      words.some(
        (w) =>
          p.name.toLowerCase().includes(w) ||
          p.tags.some((t) => t.includes(w)) ||
          p.category.includes(w),
      ),
    )
    .slice(0, 5);

  return {
    title: picks.length ? `Smart picks for “${query}”` : "Popular right now",
    picks: picks.length ? picks : products.slice(0, 5),
  };
}

export function AiAssistant() {
  const { add } = useStore();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ title: string; picks: Product[] } | null>(null);

  const run = (value: string) => {
    if (!value.trim()) return;
    setQuery(value);
    setResult(matchPrompt(value));
  };

  return (
    <section className="card-tile p-4 sm:p-5">
      <div className="flex min-w-0 items-center gap-2">
        <span className="bg-fresh grid size-9 shrink-0 place-items-center rounded-2xl text-primary-foreground">
          <Sparkles className="size-4" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold">Ask the GroceryAI assistant</h2>
          <p className="truncate text-xs text-muted-foreground">
            Describe a meal or a moment and get a ready basket.
          </p>
        </div>
      </div>

      <form
        className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          run(query);
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. quick pasta dinner for two"
          className="min-w-0 rounded-full border border-input bg-muted/60 px-4 py-2.5 text-sm outline-none focus:border-ring focus:bg-card"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
        >
          <Wand2 className="size-4" />
          <span className="hidden sm:inline">Build basket</span>
        </button>
      </form>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
        {prompts.map((p) => (
          <button
            key={p}
            onClick={() => run(p)}
            className="shrink-0 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary"
          >
            {p}
          </button>
        ))}
      </div>

      {result && (
        <div className="mt-4 rounded-2xl bg-surface p-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <p className="truncate text-sm font-bold">{result.title}</p>
            <button
              onClick={() => {
                result.picks.forEach((p) => add(p.id));
                toast.success("Basket added to your cart");
              }}
              className="shrink-0 rounded-full bg-primary-deep px-3 py-1.5 text-xs font-bold text-primary-foreground"
            >
              Add all
            </button>
          </div>
          <ul className="mt-3 space-y-2">
            {result.picks.map((p) => (
              <li
                key={p.id}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-card p-2"
              >
                <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${p.tone}`}>
                  {p.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{p.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {p.unit} · ₹{p.price}
                  </span>
                </span>
                <button
                  onClick={() => add(p.id)}
                  className="shrink-0 rounded-full border border-primary px-3 py-1 text-xs font-bold text-primary"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
