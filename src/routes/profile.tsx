import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, CreditCard, Gift, HelpCircle, MapPin, Package } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — GroceryAI" },
      {
        name: "description",
        content: "Manage your GroceryAI addresses, past orders, payments and rewards.",
      },
      { property: "og:title", content: "Your profile — GroceryAI" },
      { property: "og:description", content: "Addresses, orders and rewards in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

const pastOrders = [
  { id: "GA-48120", date: "24 Sep", items: 12, total: 1420, status: "Delivered" },
  { id: "GA-47893", date: "18 Sep", items: 6, total: 640, status: "Delivered" },
  { id: "GA-47512", date: "11 Sep", items: 9, total: 1180, status: "Delivered" },
];

const links = [
  { label: "Payment methods", icon: CreditCard },
  { label: "Rewards & offers", icon: Gift },
  { label: "Help & support", icon: HelpCircle },
];

function ProfilePage() {
  const { addresses, setActiveAddress } = useStore();

  return (
    <AppShell>
      <div className="space-y-5">
        <section className="card-tile grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-4">
          <span className="bg-fresh grid size-14 shrink-0 place-items-center rounded-2xl text-xl font-extrabold text-primary-foreground">
            S
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold">Samruddhi</span>
            <span className="block truncate text-xs text-muted-foreground">
              +91 98765 43210 · GroceryAI Plus member
            </span>
          </span>
        </section>

        <section className="space-y-3">
          <h2 className="flex items-center gap-1.5 text-base font-bold">
            <MapPin className="size-4 text-primary" /> Saved addresses
          </h2>
          {addresses.map((a) => (
            <button
              key={a.id}
              onClick={() => setActiveAddress(a.id)}
              className={`card-tile grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 text-left ${
                a.active ? "border-primary" : ""
              }`}
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold">{a.label}</span>
                <span className="block truncate text-xs text-muted-foreground">{a.line}</span>
              </span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  a.active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {a.active ? "Delivering here" : "Select"}
              </span>
            </button>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="flex items-center gap-1.5 text-base font-bold">
            <Package className="size-4 text-primary" /> Past orders
          </h2>
          {pastOrders.map((o) => (
            <div
              key={o.id}
              className="card-tile grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold">#{o.id}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {o.date} · {o.items} items · ₹{o.total}
                </span>
              </span>
              <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-secondary-foreground">
                {o.status}
              </span>
            </div>
          ))}
          <Link
            to="/track"
            className="block rounded-full border border-primary py-2.5 text-center text-sm font-bold text-primary"
          >
            Track current order
          </Link>
        </section>

        <section className="card-tile divide-y divide-border">
          {links.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4"
            >
              <Icon className="size-4 shrink-0 text-primary" />
              <span className="min-w-0 truncate text-sm font-medium">{label}</span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </div>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
