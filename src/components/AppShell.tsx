import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Home, ListChecks, MapPin, ShoppingCart, Truck, User } from "lucide-react";
import type { ReactNode } from "react";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/", label: "Shop", icon: Home },
  { to: "/lists", label: "Lists", icon: ListChecks },
  { to: "/track", label: "Track", icon: Truck },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { count, addresses } = useStore();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const active = addresses.find((a) => a.active) ?? addresses[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-fresh sticky top-0 z-30 text-primary-foreground shadow-lift">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-primary-foreground/15 text-lg">
              🛒
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-lg font-extrabold leading-none">
                GroceryAI
              </span>
              <span className="mt-1 flex items-center gap-1 text-[11px] opacity-90">
                <MapPin className="size-3 shrink-0" />
                <span className="truncate">{active?.label} · 10 min delivery</span>
                <ChevronDown className="size-3 shrink-0" />
              </span>
            </span>
          </Link>

          <Link
            to="/cart"
            className="relative shrink-0 rounded-full bg-primary-foreground/15 p-2.5 transition-colors hover:bg-primary-foreground/25"
            aria-label="Open cart"
          >
            <ShoppingCart className="size-5" />
            {count > 0 && (
              <span className="bg-offer absolute -right-1 -top-1 grid size-5 place-items-center rounded-full text-[11px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur">
        <ul className="mx-auto flex max-w-6xl items-stretch justify-between px-2 py-2">
          {nav.map(({ to, label, icon: Icon }) => {
            const isActive = to === "/" ? path === "/" : path.startsWith(to);
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-semibold transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="size-5" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
