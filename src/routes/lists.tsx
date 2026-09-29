import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { aiBaskets, productById, type Product } from "@/data/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/lists")({
  head: () => ({
    meta: [
      { title: "Grocery lists — GroceryAI" },
      {
        name: "description",
        content:
          "Keep a running grocery list, tick items off and turn AI-suggested baskets into a cart in one tap.",
      },
      { property: "og:title", content: "Grocery lists — GroceryAI" },
      {
        property: "og:description",
        content: "Plan your shopping with smart lists and ready-made baskets.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ListsPage,
});

function ListsPage() {
  const { list, addToList, toggleListItem, removeListItem, add } = useStore();
  const [text, setText] = useState("");

  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-extrabold">Grocery list</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Jot things down through the week, then add them when you shop.
          </p>
        </div>

        <form
          className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            addToList(text.trim());
            setText("");
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add an item…"
            className="min-w-0 rounded-full border border-input bg-card px-4 py-2.5 text-sm shadow-soft outline-none focus:border-ring"
          />
          <button
            type="submit"
            className="grid shrink-0 place-items-center rounded-full bg-primary px-4 text-primary-foreground"
            aria-label="Add to list"
          >
            <Plus className="size-4" />
          </button>
        </form>

        <ul className="space-y-2">
          {list.map((item) => (
            <li
              key={item.id}
              className="card-tile grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-3"
            >
              <button
                onClick={() => toggleListItem(item.id)}
                aria-label="Toggle item"
                className={`grid size-6 shrink-0 place-items-center rounded-full border ${
                  item.done ? "border-primary bg-primary text-primary-foreground" : "border-border"
                }`}
              >
                {item.done && <Check className="size-3.5" />}
              </button>
              <span
                className={`min-w-0 truncate text-sm ${
                  item.done ? "text-muted-foreground line-through" : "font-medium"
                }`}
              >
                {item.text}
              </span>
              <button
                onClick={() => removeListItem(item.id)}
                aria-label="Delete item"
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>

        <section className="space-y-3">
          <h2 className="flex items-center gap-1.5 text-base font-bold">
            <Sparkles className="size-4 text-primary" /> AI-suggested baskets
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {aiBaskets.map((basket) => {
              const picks = basket.items
                .map(productById)
                .filter((p): p is Product => Boolean(p));
              const total = picks.reduce((n, p) => n + p.price, 0);
              return (
                <article key={basket.id} className="card-tile p-4">
                  <h3 className="text-sm font-bold">{basket.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{basket.blurb}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {picks.map((p) => p.emoji).join(" ")} · {picks.length} items · ₹{total}
                  </p>
                  <button
                    onClick={() => {
                      picks.forEach((p) => add(p.id));
                      toast.success(`${basket.title} added to cart`);
                    }}
                    className="mt-3 w-full rounded-full bg-primary py-2 text-xs font-bold text-primary-foreground"
                  >
                    Add basket to cart
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
