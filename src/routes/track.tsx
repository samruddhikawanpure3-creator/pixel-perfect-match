import { createFileRoute } from "@tanstack/react-router";
import { Bike, Check, PackageCheck, Phone, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track your order — GroceryAI" },
      {
        name: "description",
        content: "Live status for your GroceryAI delivery, from picking to doorstep.",
      },
      { property: "og:title", content: "Track your order — GroceryAI" },
      { property: "og:description", content: "Follow your GroceryAI delivery in real time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackPage,
});

const steps = [
  { label: "Order confirmed", detail: "We got your order", icon: Check },
  { label: "Picking items", detail: "Fresh picks being packed", icon: ShoppingBasket },
  { label: "Out for delivery", detail: "Rider is on the way", icon: Bike },
  { label: "Delivered", detail: "Enjoy your groceries", icon: PackageCheck },
];

function TrackPage() {
  const { addresses } = useStore();
  const active = addresses.find((a) => a.active) ?? addresses[0];
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((s) => (s < steps.length - 1 ? s + 1 : s));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const eta = Math.max(2, 10 - stage * 3);

  return (
    <AppShell>
      <div className="space-y-5">
        <section className="bg-fresh rounded-3xl p-5 text-primary-foreground shadow-lift">
          <p className="text-xs font-bold uppercase tracking-wide opacity-90">Order #GA-48219</p>
          <h1 className="mt-1 text-2xl font-extrabold">Arriving in {eta} min</h1>
          <p className="mt-2 text-sm opacity-90">{active?.line}</p>
        </section>

        <ol className="card-tile p-4">
          {steps.map((step, i) => {
            const done = i <= stage;
            const Icon = step.icon;
            return (
              <li key={step.label} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-full ${
                      done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      className={`my-1 w-0.5 flex-1 rounded ${done ? "bg-primary" : "bg-border"}`}
                    />
                  )}
                </div>
                <div className={`min-w-0 pb-6 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                  <p className={`truncate text-sm font-bold ${done ? "" : "text-muted-foreground"}`}>
                    {step.label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <section className="card-tile grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-xl">
            🛵
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold">Ravi is delivering your order</span>
            <span className="block truncate text-xs text-muted-foreground">
              4.9 ★ · 1,280 deliveries
            </span>
          </span>
          <a
            href="tel:+910000000000"
            className="grid shrink-0 place-items-center rounded-full bg-primary p-2.5 text-primary-foreground"
            aria-label="Call rider"
          >
            <Phone className="size-4" />
          </a>
        </section>
      </div>
    </AppShell>
  );
}
