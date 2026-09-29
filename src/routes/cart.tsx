import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { products } from "@/data/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — GroceryAI" },
      {
        name: "description",
        content: "Review your GroceryAI basket, adjust quantities and check out in a tap.",
      },
      { property: "og:title", content: "Your cart — GroceryAI" },
      { property: "og:description", content: "Review your basket and check out with GroceryAI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, add, remove, subtotal, savings, clear, count } = useStore();
  const navigate = useNavigate();
  const delivery = subtotal > 499 || subtotal === 0 ? 0 : 29;
  const suggestions = products
    .filter((p) => !lines.some((l) => l.product.id === p.id))
    .slice(0, 4);

  return (
    <AppShell>
      <div className="space-y-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <h1 className="truncate text-xl font-extrabold">Your cart</h1>
          {count > 0 && (
            <button
              onClick={clear}
              className="flex shrink-0 items-center gap-1 text-xs font-semibold text-destructive"
            >
              <Trash2 className="size-3.5" /> Clear
            </button>
          )}
        </div>

        {lines.length === 0 ? (
          <div className="card-tile p-8 text-center">
            <ShoppingBag className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-3 font-bold">Your cart is empty</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Start shopping or let the assistant build a basket for you.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
            >
              Browse groceries
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-3">
              {lines.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="card-tile grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-3"
                >
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-xl text-2xl ${product.tone}`}
                  >
                    {product.emoji}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{product.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {product.unit} · ₹{product.price}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 rounded-full bg-primary px-2 py-1 text-primary-foreground">
                    <button aria-label="Remove one" onClick={() => remove(product.id)}>
                      <Minus className="size-3.5" />
                    </button>
                    <span className="min-w-4 text-center text-xs font-bold">{qty}</span>
                    <button aria-label="Add one" onClick={() => add(product.id)}>
                      <Plus className="size-3.5" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>

            <section className="card-tile p-4">
              <h2 className="flex items-center gap-1.5 text-sm font-bold">
                <Sparkles className="size-4 text-primary" /> Frequently added with your basket
              </h2>
              <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => add(p.id)}
                    className="w-32 shrink-0 rounded-2xl border border-border bg-card p-2 text-left"
                  >
                    <span className={`mb-2 grid h-14 place-items-center rounded-xl text-2xl ${p.tone}`}>
                      {p.emoji}
                    </span>
                    <span className="block truncate text-xs font-semibold">{p.name}</span>
                    <span className="block text-xs text-muted-foreground">₹{p.price}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="card-tile space-y-2 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item total</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-semibold text-success">
                  {delivery === 0 ? "Free" : `₹${delivery}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">You save</span>
                <span className="font-semibold text-success">₹{savings}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-extrabold">
                <span>To pay</span>
                <span>₹{subtotal + delivery}</span>
              </div>
            </section>

            <button
              onClick={() => {
                toast.success("Order placed — tracking is live");
                navigate({ to: "/track" });
              }}
              className="w-full rounded-full bg-primary py-3.5 text-sm font-extrabold text-primary-foreground shadow-lift transition-transform hover:scale-[1.01] active:scale-95"
            >
              Place order · ₹{subtotal + delivery}
            </button>
          </>
        )}
      </div>
    </AppShell>
  );
}
