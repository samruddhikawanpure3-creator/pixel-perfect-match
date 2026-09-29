export type Product = {
  id: string;
  name: string;
  unit: string;
  price: number;
  mrp: number;
  category: string;
  emoji: string;
  tone: string;
  tags: string[];
  eta: string;
};

export const categories = [
  { id: "fruits", label: "Fruits & Veg", emoji: "🥬" },
  { id: "dairy", label: "Dairy & Eggs", emoji: "🥛" },
  { id: "bakery", label: "Bakery", emoji: "🍞" },
  { id: "snacks", label: "Snacks", emoji: "🍿" },
  { id: "beverages", label: "Beverages", emoji: "🧃" },
  { id: "staples", label: "Staples", emoji: "🌾" },
  { id: "household", label: "Household", emoji: "🧼" },
  { id: "personal", label: "Personal Care", emoji: "🧴" },
];

export const products: Product[] = [
  { id: "p1", name: "Baby Spinach", unit: "250 g", price: 39, mrp: 55, category: "fruits", emoji: "🥬", tone: "bg-[oklch(0.94_0.06_140)]", tags: ["healthy", "salad"], eta: "9 min" },
  { id: "p2", name: "Alphonso Mangoes", unit: "1 kg", price: 249, mrp: 320, category: "fruits", emoji: "🥭", tone: "bg-[oklch(0.94_0.07_85)]", tags: ["seasonal", "fruit"], eta: "11 min" },
  { id: "p3", name: "Cherry Tomatoes", unit: "400 g", price: 64, mrp: 80, category: "fruits", emoji: "🍅", tone: "bg-[oklch(0.94_0.06_30)]", tags: ["salad", "pasta"], eta: "9 min" },
  { id: "p4", name: "Hass Avocado", unit: "2 pcs", price: 189, mrp: 240, category: "fruits", emoji: "🥑", tone: "bg-[oklch(0.94_0.06_140)]", tags: ["healthy", "breakfast"], eta: "12 min" },
  { id: "p5", name: "Farm Full Cream Milk", unit: "1 L", price: 72, mrp: 78, category: "dairy", emoji: "🥛", tone: "bg-[oklch(0.96_0.02_240)]", tags: ["daily", "breakfast"], eta: "8 min" },
  { id: "p6", name: "Free-Range Eggs", unit: "6 pcs", price: 89, mrp: 105, category: "dairy", emoji: "🥚", tone: "bg-[oklch(0.96_0.03_90)]", tags: ["protein", "breakfast"], eta: "8 min" },
  { id: "p7", name: "Greek Yoghurt", unit: "400 g", price: 129, mrp: 150, category: "dairy", emoji: "🍶", tone: "bg-[oklch(0.96_0.02_240)]", tags: ["protein", "healthy"], eta: "10 min" },
  { id: "p8", name: "Aged Cheddar Block", unit: "200 g", price: 219, mrp: 260, category: "dairy", emoji: "🧀", tone: "bg-[oklch(0.95_0.06_85)]", tags: ["pasta", "party"], eta: "12 min" },
  { id: "p9", name: "Sourdough Loaf", unit: "400 g", price: 149, mrp: 170, category: "bakery", emoji: "🍞", tone: "bg-[oklch(0.95_0.05_70)]", tags: ["breakfast"], eta: "14 min" },
  { id: "p10", name: "Butter Croissants", unit: "4 pcs", price: 169, mrp: 199, category: "bakery", emoji: "🥐", tone: "bg-[oklch(0.95_0.05_75)]", tags: ["breakfast", "treat"], eta: "14 min" },
  { id: "p11", name: "Multigrain Buns", unit: "6 pcs", price: 59, mrp: 70, category: "bakery", emoji: "🥯", tone: "bg-[oklch(0.95_0.04_70)]", tags: ["healthy"], eta: "12 min" },
  { id: "p12", name: "Sea Salt Potato Chips", unit: "130 g", price: 55, mrp: 70, category: "snacks", emoji: "🥔", tone: "bg-[oklch(0.95_0.05_80)]", tags: ["party", "movie"], eta: "9 min" },
  { id: "p13", name: "Roasted Almonds", unit: "200 g", price: 279, mrp: 340, category: "snacks", emoji: "🥜", tone: "bg-[oklch(0.94_0.04_60)]", tags: ["healthy", "protein"], eta: "10 min" },
  { id: "p14", name: "Dark Chocolate 70%", unit: "90 g", price: 145, mrp: 170, category: "snacks", emoji: "🍫", tone: "bg-[oklch(0.92_0.04_45)]", tags: ["treat", "movie"], eta: "9 min" },
  { id: "p15", name: "Butter Popcorn", unit: "150 g", price: 75, mrp: 90, category: "snacks", emoji: "🍿", tone: "bg-[oklch(0.96_0.04_90)]", tags: ["movie", "party"], eta: "9 min" },
  { id: "p16", name: "Cold Brew Coffee", unit: "200 ml", price: 159, mrp: 190, category: "beverages", emoji: "☕", tone: "bg-[oklch(0.9_0.04_50)]", tags: ["breakfast", "treat"], eta: "10 min" },
  { id: "p17", name: "Fresh Orange Juice", unit: "1 L", price: 139, mrp: 165, category: "beverages", emoji: "🧃", tone: "bg-[oklch(0.95_0.07_75)]", tags: ["breakfast", "healthy"], eta: "10 min" },
  { id: "p18", name: "Sparkling Water", unit: "6 x 300 ml", price: 199, mrp: 240, category: "beverages", emoji: "💧", tone: "bg-[oklch(0.96_0.02_220)]", tags: ["party"], eta: "11 min" },
  { id: "p19", name: "Basmati Rice", unit: "5 kg", price: 549, mrp: 680, category: "staples", emoji: "🌾", tone: "bg-[oklch(0.96_0.03_95)]", tags: ["daily", "cooking"], eta: "16 min" },
  { id: "p20", name: "Cold Pressed Olive Oil", unit: "1 L", price: 899, mrp: 1100, category: "staples", emoji: "🫒", tone: "bg-[oklch(0.94_0.06_130)]", tags: ["cooking", "pasta"], eta: "16 min" },
  { id: "p21", name: "Durum Penne Pasta", unit: "500 g", price: 119, mrp: 145, category: "staples", emoji: "🍝", tone: "bg-[oklch(0.96_0.04_85)]", tags: ["pasta", "cooking"], eta: "13 min" },
  { id: "p22", name: "Dish Wash Gel", unit: "750 ml", price: 199, mrp: 249, category: "household", emoji: "🧼", tone: "bg-[oklch(0.95_0.03_200)]", tags: ["cleaning"], eta: "15 min" },
  { id: "p23", name: "Bamboo Kitchen Towels", unit: "2 rolls", price: 179, mrp: 220, category: "household", emoji: "🧻", tone: "bg-[oklch(0.96_0.02_120)]", tags: ["cleaning"], eta: "15 min" },
  { id: "p24", name: "Aloe Face Wash", unit: "150 ml", price: 249, mrp: 299, category: "personal", emoji: "🧴", tone: "bg-[oklch(0.95_0.05_150)]", tags: ["selfcare"], eta: "14 min" },
];

export type Recipe = { id: string; title: string; blurb: string; items: string[] };

export const aiBaskets: Recipe[] = [
  {
    id: "pasta",
    title: "Creamy tomato pasta night",
    blurb: "Everything for a restaurant-style dinner for two.",
    items: ["p21", "p3", "p8", "p20"],
  },
  {
    id: "breakfast",
    title: "Protein-rich breakfast week",
    blurb: "Seven mornings sorted with balanced macros.",
    items: ["p6", "p7", "p5", "p9", "p4"],
  },
  {
    id: "movie",
    title: "Friday movie snack box",
    blurb: "Salty, sweet and fizzy — balanced the fun way.",
    items: ["p15", "p14", "p18", "p12"],
  },
  {
    id: "essentials",
    title: "Monthly essentials top-up",
    blurb: "Based on how often you usually reorder these.",
    items: ["p19", "p5", "p22", "p23", "p13"],
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);
