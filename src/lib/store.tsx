import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { productById, type Product } from "@/data/catalog";

export type CartLine = { id: string; qty: number };
export type ListItem = { id: string; text: string; done: boolean };
export type Address = { id: string; label: string; line: string; active: boolean };

type StoreValue = {
  cart: CartLine[];
  qtyOf: (id: string) => number;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  savings: number;
  lines: { product: Product; qty: number }[];
  list: ListItem[];
  addToList: (text: string) => void;
  toggleListItem: (id: string) => void;
  removeListItem: (id: string) => void;
  addresses: Address[];
  setActiveAddress: (id: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "groceryai.cart";
const LIST_KEY = "groceryai.list";

const seedList: ListItem[] = [
  { id: "l1", text: "Baby spinach for salads", done: false },
  { id: "l2", text: "Milk + eggs for the week", done: true },
  { id: "l3", text: "Something sweet for Friday", done: false },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [list, setList] = useState<ListItem[]>(seedList);
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "a1", label: "Home", line: "14B Palm Grove, Whitefield, Bengaluru 560066", active: true },
    { id: "a2", label: "Work", line: "Level 7, Orion Tech Park, Bengaluru 560103", active: false },
  ]);

  useEffect(() => {
    try {
      const rawCart = localStorage.getItem(CART_KEY);
      if (rawCart) setCart(JSON.parse(rawCart));
      const rawList = localStorage.getItem(LIST_KEY);
      if (rawList) setList(JSON.parse(rawList));
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LIST_KEY, JSON.stringify(list));
    } catch {
      /* ignore */
    }
  }, [list]);

  const add = useCallback((id: string) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, qty: 1 }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setCart((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const value = useMemo<StoreValue>(() => {
    const lines = cart
      .map((l) => ({ product: productById(l.id), qty: l.qty }))
      .filter((l): l is { product: Product; qty: number } => Boolean(l.product));

    return {
      cart,
      qtyOf: (id) => cart.find((l) => l.id === id)?.qty ?? 0,
      add,
      remove,
      clear: () => setCart([]),
      count: cart.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.product.price * l.qty, 0),
      savings: lines.reduce((n, l) => n + (l.product.mrp - l.product.price) * l.qty, 0),
      lines,
      list,
      addToList: (text) =>
        setList((prev) => [
          { id: `l${Date.now()}`, text, done: false },
          ...prev,
        ]),
      toggleListItem: (id) =>
        setList((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i))),
      removeListItem: (id) => setList((prev) => prev.filter((i) => i.id !== id)),
      addresses,
      setActiveAddress: (id) =>
        setAddresses((prev) => prev.map((a) => ({ ...a, active: a.id === id }))),
    };
  }, [cart, list, addresses, add, remove]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
