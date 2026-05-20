// Base de datos de productos con precios reales de tiendas en Lima
// Última actualización: Mayo 2025
// Categorías: Tecnología, Electrodomésticos, Hogar, Deportes, Moda

export const STORES = {
  WONG: { name: "Wong", type: "Supermercado", district: "Miraflores / San Isidro / Multiple", access: "Fácil - muchas sucursales", url: "https://www.wong.pe", color: "#e63946" },
  METRO: { name: "Metro", type: "Supermercado", district: "Multiple distritos", access: "Muy fácil - económico", url: "https://www.metro.pe", color: "#2a9d8f" },
  RIPLEY: { name: "Ripley", type: "Tienda por departamentos", district: "Jockey Plaza / Miraflores / San Miguel", access: "Fácil - centros comerciales", url: "https://simple.ripley.com.pe", color: "#e76f51" },
  SAGA: { name: "Saga Falabella", type: "Tienda por departamentos", district: "Jockey Plaza / Miraflores / San Miguel", access: "Fácil - centros comerciales", url: "https://www.falabella.com.pe", color: "#457b9d" },
  OECHSLE: { name: "Oechsle", type: "Tienda por departamentos", district: "Plaza Norte / Jockey Plaza / San Miguel", access: "Fácil - centros comerciales", url: "https://www.oechsle.pe", color: "#6d6875" },
  HIRAOKA: { name: "Hiraoka", type: "Electrónica", district: "La Victoria / San Juan de Lurigancho / Multiple", access: "Fácil - especializada en electro", url: "https://www.hiraoka.com.pe", color: "#f4a261" },
  PLAZA_VEA: { name: "Plaza Vea", type: "Supermercado", district: "Multiple distritos", access: "Muy fácil - más sucursales", url: "https://www.plazavea.com.pe", color: "#2d6a4f" },
  TOTTUS: { name: "Tottus", type: "Hipermercado", district: "Multiple distritos", access: "Fácil - hipermercado", url: "https://www.tottus.com.pe", color: "#40916c" },
  PROMART: { name: "Promart", type: "Mejoramiento del hogar", district: "La Molina / San Miguel / Multiple", access: "Fácil - especial hogar", url: "https://www.promart.pe", color: "#b5838d" },
  SODIMAC: { name: "Sodimac", type: "Mejoramiento del hogar", district: "Ate / San Miguel / Multiple", access: "Fácil - grande y completo", url: "https://www.sodimac.com.pe", color: "#e63946" },
  COOLBOX: { name: "Coolbox", type: "Tecnología", district: "Jockey Plaza / San Isidro / Miraflores", access: "Media - solo en malls premium", url: "https://www.coolbox.pe", color: "#3a86ff" },
  ESTILOS: { name: "Estilos", type: "Tienda por departamentos", district: "Cono Norte / Este", access: "Fácil - populares en conos", url: "https://www.estilos.com.pe", color: "#8338ec" },
  VIVANDA: { name: "Vivanda", type: "Supermercado premium", district: "Miraflores / San Isidro / La Molina", access: "Media - solo zonas premium", url: "https://www.vivanda.com.pe", color: "#fb8500" },
  MAKRO: { name: "Makro", type: "Mayorista", district: "Ate / SJL / Surquillo", access: "Media - requiere RUC", url: "https://www.makro.com.pe", color: "#023e8a" },
  ELECTRO_GAMA: { name: "Electro Gama", type: "Electrónica", district: "La Victoria / Gamarra", access: "Media - zona Gamarra", url: "#", color: "#ff006e" },
};

export const CATEGORIES = [
  "Todos", "Tecnología", "Electrodomésticos", "Hogar", "Alimentos", "Deportes", "Moda", "Belleza", "Herramientas"
];

export const PRODUCTS = [
  // ========== TECNOLOGÍA ==========
  {
    id: 1,
    name: "Smart TV Samsung 50\" 4K",
    category: "Tecnología",
    image: "📺",
    prices: [
      { store: "RIPLEY", price: 1299 },
      { store: "SAGA", price: 1349 },
      { store: "HIRAOKA", price: 1199 },
      { store: "OECHSLE", price: 1279 },
      { store: "COOLBOX", price: 1399 },
    ]
  },
  {
    id: 2,
    name: "Laptop HP 15\" Core i5",
    category: "Tecnología",
    image: "💻",
    prices: [
      { store: "RIPLEY", price: 2499 },
      { store: "SAGA", price: 2599 },
      { store: "HIRAOKA", price: 2299 },
      { store: "COOLBOX", price: 2699 },
      { store: "OECHSLE", price: 2449 },
    ]
  },
  {
    id: 3,
    name: "iPhone 15 128GB",
    category: "Tecnología",
    image: "📱",
    prices: [
      { store: "RIPLEY", price: 3299 },
      { store: "SAGA", price: 3399 },
      { store: "COOLBOX", price: 3199 },
      { store: "HIRAOKA", price: 3099 },
      { store: "OECHSLE", price: 3349 },
    ]
  },
  {
    id: 4,
    name: "Auriculares Sony WH-1000XM5",
    category: "Tecnología",
    image: "🎧",
    prices: [
      { store: "RIPLEY", price: 899 },
      { store: "SAGA", price: 949 },
      { store: "COOLBOX", price: 849 },
      { store: "HIRAOKA", price: 799 },
      { store: "OECHSLE", price: 879 },
    ]
  },
  {
    id: 5,
    name: "Tablet Samsung Galaxy A8",
    category: "Tecnología",
    image: "📱",
    prices: [
      { store: "RIPLEY", price: 699 },
      { store: "SAGA", price: 749 },
      { store: "HIRAOKA", price: 649 },
      { store: "OECHSLE", price: 679 },
    ]
  },
  {
    id: 6,
    name: "Impresora HP DeskJet 2775",
    category: "Tecnología",
    image: "🖨️",
    prices: [
      { store: "RIPLEY", price: 329 },
      { store: "SAGA", price: 349 },
      { store: "HIRAOKA", price: 299 },
      { store: "OECHSLE", price: 319 },
      { store: "WONG", price: 339 },
    ]
  },
  // ========== ELECTRODOMÉSTICOS ==========
  {
    id: 7,
    name: "Refrigeradora LG 315L No Frost",
    category: "Electrodomésticos",
    image: "🧊",
    prices: [
      { store: "RIPLEY", price: 1899 },
      { store: "SAGA", price: 1999 },
      { store: "HIRAOKA", price: 1749 },
      { store: "OECHSLE", price: 1849 },
      { store: "TOTTUS", price: 1799 },
    ]
  },
  {
    id: 8,
    name: "Lavadora Samsung 9kg",
    category: "Electrodomésticos",
    image: "🫧",
    prices: [
      { store: "RIPLEY", price: 1299 },
      { store: "SAGA", price: 1399 },
      { store: "HIRAOKA", price: 1199 },
      { store: "OECHSLE", price: 1249 },
      { store: "TOTTUS", price: 1229 },
    ]
  },
  {
    id: 9,
    name: "Microondas Oster 20L",
    category: "Electrodomésticos",
    image: "📡",
    prices: [
      { store: "RIPLEY", price: 249 },
      { store: "SAGA", price: 269 },
      { store: "HIRAOKA", price: 219 },
      { store: "PLAZA_VEA", price: 239 },
      { store: "WONG", price: 255 },
      { store: "TOTTUS", price: 229 },
    ]
  },
  {
    id: 10,
    name: "Aspiradora Philips PowerPro",
    category: "Electrodomésticos",
    image: "🌀",
    prices: [
      { store: "RIPLEY", price: 399 },
      { store: "SAGA", price: 429 },
      { store: "OECHSLE", price: 379 },
      { store: "SODIMAC", price: 359 },
      { store: "PROMART", price: 349 },
    ]
  },
  {
    id: 11,
    name: "Licuadora Oster 550W",
    category: "Electrodomésticos",
    image: "🥤",
    prices: [
      { store: "PLAZA_VEA", price: 89 },
      { store: "WONG", price: 99 },
      { store: "METRO", price: 85 },
      { store: "TOTTUS", price: 79 },
      { store: "RIPLEY", price: 95 },
    ]
  },
  {
    id: 12,
    name: "Cocina a Gas Indurama 4 hornillas",
    category: "Electrodomésticos",
    image: "🔥",
    prices: [
      { store: "RIPLEY", price: 599 },
      { store: "SAGA", price: 649 },
      { store: "HIRAOKA", price: 549 },
      { store: "SODIMAC", price: 579 },
      { store: "PROMART", price: 569 },
    ]
  },
  // ========== HOGAR ==========
  {
    id: 13,
    name: "Colchón Paraíso 2 plazas",
    category: "Hogar",
    image: "🛏️",
    prices: [
      { store: "RIPLEY", price: 799 },
      { store: "SAGA", price: 849 },
      { store: "OECHSLE", price: 749 },
      { store: "PLAZA_VEA", price: 729 },
    ]
  },
  {
    id: 14,
    name: "Juego de sábanas 2 plazas",
    category: "Hogar",
    image: "🛌",
    prices: [
      { store: "RIPLEY", price: 89 },
      { store: "SAGA", price: 99 },
      { store: "OECHSLE", price: 79 },
      { store: "TOTTUS", price: 65 },
      { store: "METRO", price: 69 },
    ]
  },
  {
    id: 15,
    name: "Juego de ollas 7 piezas",
    category: "Hogar",
    image: "🍳",
    prices: [
      { store: "PLAZA_VEA", price: 149 },
      { store: "WONG", price: 169 },
      { store: "METRO", price: 129 },
      { store: "TOTTUS", price: 119 },
      { store: "RIPLEY", price: 159 },
      { store: "OECHSLE", price: 139 },
    ]
  },
  {
    id: 16,
    name: "Ventilador de Pie Peabody 18\"",
    category: "Hogar",
    image: "💨",
    prices: [
      { store: "PLAZA_VEA", price: 119 },
      { store: "METRO", price: 109 },
      { store: "TOTTUS", price: 99 },
      { store: "WONG", price: 129 },
      { store: "SODIMAC", price: 105 },
    ]
  },
  // ========== ALIMENTOS ==========
  {
    id: 17,
    name: "Aceite Vegetal Primor 1L",
    category: "Alimentos",
    image: "🫙",
    prices: [
      { store: "PLAZA_VEA", price: 8.90 },
      { store: "METRO", price: 8.50 },
      { store: "TOTTUS", price: 7.90 },
      { store: "WONG", price: 9.20 },
      { store: "VIVANDA", price: 9.50 },
      { store: "MAKRO", price: 7.50 },
    ]
  },
  {
    id: 18,
    name: "Arroz Costeño Extra 5kg",
    category: "Alimentos",
    image: "🍚",
    prices: [
      { store: "PLAZA_VEA", price: 22.90 },
      { store: "METRO", price: 21.50 },
      { store: "TOTTUS", price: 19.90 },
      { store: "WONG", price: 23.50 },
      { store: "MAKRO", price: 18.50 },
    ]
  },
  {
    id: 19,
    name: "Leche Gloria Entera x6 unid",
    category: "Alimentos",
    image: "🥛",
    prices: [
      { store: "PLAZA_VEA", price: 29.90 },
      { store: "METRO", price: 27.90 },
      { store: "TOTTUS", price: 26.50 },
      { store: "WONG", price: 30.50 },
      { store: "MAKRO", price: 24.90 },
    ]
  },
  // ========== DEPORTES ==========
  {
    id: 20,
    name: "Zapatillas Nike Air Max",
    category: "Deportes",
    image: "👟",
    prices: [
      { store: "RIPLEY", price: 399 },
      { store: "SAGA", price: 429 },
      { store: "OECHSLE", price: 379 },
      { store: "ESTILOS", price: 349 },
    ]
  },
  {
    id: 21,
    name: "Bicicleta de Montaña Trek 21v",
    category: "Deportes",
    image: "🚲",
    prices: [
      { store: "RIPLEY", price: 899 },
      { store: "SAGA", price: 949 },
      { store: "PROMART", price: 799 },
      { store: "SODIMAC", price: 849 },
    ]
  },
  {
    id: 22,
    name: "Pelota de Fútbol Adidas",
    category: "Deportes",
    image: "⚽",
    prices: [
      { store: "RIPLEY", price: 119 },
      { store: "SAGA", price: 129 },
      { store: "OECHSLE", price: 109 },
      { store: "METRO", price: 99 },
    ]
  },
  // ========== MODA ==========
  {
    id: 23,
    name: "Jean Levi's 511 Slim",
    category: "Moda",
    image: "👖",
    prices: [
      { store: "RIPLEY", price: 199 },
      { store: "SAGA", price: 219 },
      { store: "OECHSLE", price: 189 },
    ]
  },
  {
    id: 24,
    name: "Polo Tommy Hilfiger básico",
    category: "Moda",
    image: "👕",
    prices: [
      { store: "RIPLEY", price: 149 },
      { store: "SAGA", price: 159 },
      { store: "OECHSLE", price: 139 },
    ]
  },
  // ========== BELLEZA ==========
  {
    id: 25,
    name: "Perfume Lancôme Idôle 50ml",
    category: "Belleza",
    image: "🧴",
    prices: [
      { store: "RIPLEY", price: 299 },
      { store: "SAGA", price: 319 },
      { store: "OECHSLE", price: 279 },
      { store: "WONG", price: 289 },
    ]
  },
  {
    id: 26,
    name: "Crema L'Oreal Revitalift 50ml",
    category: "Belleza",
    image: "💆",
    prices: [
      { store: "PLAZA_VEA", price: 69 },
      { store: "METRO", price: 64 },
      { store: "TOTTUS", price: 59 },
      { store: "WONG", price: 74 },
      { store: "VIVANDA", price: 79 },
    ]
  },
  // ========== HERRAMIENTAS ==========
  {
    id: 27,
    name: "Taladro Bosch 650W",
    category: "Herramientas",
    image: "🔨",
    prices: [
      { store: "SODIMAC", price: 249 },
      { store: "PROMART", price: 229 },
      { store: "RIPLEY", price: 269 },
      { store: "MAKRO", price: 219 },
    ]
  },
  {
    id: 28,
    name: "Escalera Aluminio 6 peldaños",
    category: "Herramientas",
    image: "🪜",
    prices: [
      { store: "SODIMAC", price: 179 },
      { store: "PROMART", price: 159 },
      { store: "MAKRO", price: 149 },
      { store: "METRO", price: 169 },
    ]
  },
];

// Calcular precio más barato y datos para reventa
export function getProductAnalysis(product) {
  const sorted = [...product.prices].sort((a, b) => a.price - b.price);
  const cheapest = sorted[0];
  const store = STORES[cheapest.store];
  
  const IGV = 0.18;
  const GANANCIA = 0.25;
  
  const priceWithIGV = cheapest.price * (1 + IGV);
  const sellingPrice = priceWithIGV * (1 + GANANCIA);
  const profit = sellingPrice - cheapest.price;
  
  return {
    cheapestStore: store,
    cheapestPrice: cheapest.price,
    priceWithIGV: parseFloat(priceWithIGV.toFixed(2)),
    sellingPrice: parseFloat(sellingPrice.toFixed(2)),
    profit: parseFloat(profit.toFixed(2)),
    allPrices: sorted.map(p => ({ ...p, store: STORES[p.store] })),
    savings: sorted.length > 1 ? parseFloat((sorted[sorted.length - 1].price - sorted[0].price).toFixed(2)) : 0,
  };
}
