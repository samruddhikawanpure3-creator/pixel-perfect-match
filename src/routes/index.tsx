import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Sparkles, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { AiAssistant } from "@/components/AiAssistant";
import { AppShell } from "@/components/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GroceryAI — smart grocery delivery in 10 minutes" },
      {
        name: "description",
        content:
          "Shop fresh groceries in minutes and let the GroceryAI assistant build smart baskets for your meals, snacks and monthly restock.",
      },
      { property: "og:title", content: "GroceryAI — smart grocery delivery in 10 minutes" },
      {
        property: "og:description",
        content: "AI-built baskets, fresh picks and 10-minute delivery from GroceryAI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)) ||
        p.category.includes(q);
      const matchesCat = !category || p.category === category;
      return matchesQuery && matchesCat;
    });
  }, [query, category]);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search milk, mangoes, pasta…"
            className="w-full rounded-full border border-input bg-card py-3 pl-11 pr-4 text-sm shadow-soft outline-none focus:border-ring"
          />
        </div>

        <section className="bg-fresh relative overflow-hidden rounded-3xl p-5 text-primary-foreground shadow-lift">
          <span className="absolute -right-10 -top-10 size-40 rounded-full bg-primary-foreground/10" />
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide opacity-90">
            <Zap className="size-3.5" /> Delivering in 10 minutes
          </p>
          <h1 className="mt-2 max-w-md text-2xl font-extrabold sm:text-3xl">
            Fresh groceries, planned for you by AI.
          </h1>
          <p className="mt-2 max-w-md text-sm opacity-90">
            Tell the assistant what you're cooking — it picks the produce, staples and extras so
            you don't forget a thing.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="#assistant"
              className="flex items-center gap-1.5 rounded-full bg-primary-foreground px-4 py-2 text-sm font-bold text-primary-deep"
            >
              <Sparkles className="size-4" /> Try the assistant
            </a>
            <Link
              to="/lists"
              className="rounded-full border border-primary-foreground/40 px-4 py-2 text-sm font-bold"
            >
              My grocery list
            </Link>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold">Shop by category</h2>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setCategory(null)}
              className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                category === null
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(category === c.id ? null : c.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                  category === c.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card"
                }`}
              >
                <span aria-hidden>{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
        </section>

        <div id="assistant">
          <AiAssistant />
        </div>

        <section>
          <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <h2 className="truncate text-base font-bold">
              {category ? categories.find((c) => c.id === category)?.label : "Fresh for you"}
            </h2>
            <p className="shrink-0 text-xs text-muted-foreground">{visible.length} items</p>
          </div>

          {visible.length === 0 ? (
            <p className="card-tile p-6 text-center text-sm text-muted-foreground">
              Nothing matched that search. Try “milk”, “snacks” or ask the assistant.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
