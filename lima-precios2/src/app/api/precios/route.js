// API Route: /api/precios?q=laptop
// Scrapea precios reales de tiendas peruanas via sus APIs públicas

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ── helpers ──────────────────────────────────────────────────────────────────
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
  'Accept': 'application/json, text/html, */*',
  'Accept-Language': 'es-PE,es;q=0.9',
};

async function fetchJSON(url, extra = {}) {
  try {
    const res = await fetch(url, {
      headers: { ...HEADERS, ...extra },
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ── SCRAPERS POR TIENDA ───────────────────────────────────────────────────────

// 1. RIPLEY — API JSON pública
async function scrapeRipley(query) {
  const url = `https://simple.ripley.com.pe/api/2.0/page/products?q=${encodeURIComponent(query)}&page=1&perPage=5`;
  const data = await fetchJSON(url);
  if (!data?.results) return [];
  return data.results.slice(0, 5).map(p => ({
    store: 'Ripley',
    name: p.displayName || p.name,
    price: p.prices?.salePrice || p.prices?.normalPrice || 0,
    originalPrice: p.prices?.normalPrice || 0,
    url: `https://simple.ripley.com.pe${p.url || ''}`,
    image: p.images?.[0]?.url || '',
    availability: p.quantity > 0 ? 'En stock' : 'Consultar',
    storeInfo: { district: 'Miraflores / Jockey Plaza / San Miguel', access: 'Fácil', color: '#e63946' }
  })).filter(p => p.price > 0);
}

// 2. SAGA FALABELLA — API JSON pública
async function scrapeFalabella(query) {
  const url = `https://www.falabella.com.pe/s/browse/v1/listing/pe?page=1&text=${encodeURIComponent(query)}&pgid=2&categoryId=cat10001`;
  const data = await fetchJSON(url, { 'x-catalog-region': 'PE' });
  if (!data?.data?.products) return [];
  return data.data.products.slice(0, 5).map(p => {
    const price = parseFloat(p.prices?.find(x => x.type === 'eventPrice')?.originalPrice || p.prices?.[0]?.originalPrice || 0);
    return {
      store: 'Saga Falabella',
      name: p.displayName,
      price,
      originalPrice: parseFloat(p.prices?.[0]?.originalPrice || price),
      url: `https://www.falabella.com.pe${p.url || ''}`,
      image: p.medias?.[0]?.url || '',
      availability: 'En stock',
      storeInfo: { district: 'Jockey Plaza / Miraflores / San Miguel', access: 'Fácil', color: '#457b9d' }
    };
  }).filter(p => p.price > 0);
}

// 3. WONG — API VTEX pública
async function scrapeWong(query) {
  const url = `https://www.wong.pe/api/catalog_system/pub/products/search/${encodeURIComponent(query)}?_from=0&_to=4&O=OrderByPriceDESC`;
  const data = await fetchJSON(url);
  if (!Array.isArray(data)) return [];
  return data.slice(0, 5).map(p => {
    const item = p.items?.[0];
    const seller = item?.sellers?.[0];
    const price = seller?.commertialOffer?.Price || 0;
    return {
      store: 'Wong',
      name: p.productName,
      price,
      originalPrice: seller?.commertialOffer?.ListPrice || price,
      url: `https://www.wong.pe${p.link || ''}`,
      image: item?.images?.[0]?.imageUrl || '',
      availability: seller?.commertialOffer?.AvailableQuantity > 0 ? 'En stock' : 'Agotado',
      storeInfo: { district: 'Miraflores / San Isidro / Múltiple', access: 'Muy fácil', color: '#e63946' }
    };
  }).filter(p => p.price > 0);
}

// 4. METRO — API VTEX pública
async function scrapeMetro(query) {
  const url = `https://www.metro.pe/api/catalog_system/pub/products/search/${encodeURIComponent(query)}?_from=0&_to=4&O=OrderByPriceDESC`;
  const data = await fetchJSON(url);
  if (!Array.isArray(data)) return [];
  return data.slice(0, 5).map(p => {
    const item = p.items?.[0];
    const seller = item?.sellers?.[0];
    const price = seller?.commertialOffer?.Price || 0;
    return {
      store: 'Metro',
      name: p.productName,
      price,
      originalPrice: seller?.commertialOffer?.ListPrice || price,
      url: `https://www.metro.pe${p.link || ''}`,
      image: item?.images?.[0]?.imageUrl || '',
      availability: seller?.commertialOffer?.AvailableQuantity > 0 ? 'En stock' : 'Agotado',
      storeInfo: { district: 'Múltiple distritos', access: 'Muy fácil - económico', color: '#2a9d8f' }
    };
  }).filter(p => p.price > 0);
}

// 5. PLAZA VEA — API VTEX pública
async function scrapePlazaVea(query) {
  const url = `https://www.plazavea.com.pe/api/catalog_system/pub/products/search/${encodeURIComponent(query)}?_from=0&_to=4&O=OrderByPriceDESC`;
  const data = await fetchJSON(url);
  if (!Array.isArray(data)) return [];
  return data.slice(0, 5).map(p => {
    const item = p.items?.[0];
    const seller = item?.sellers?.[0];
    const price = seller?.commertialOffer?.Price || 0;
    return {
      store: 'Plaza Vea',
      name: p.productName,
      price,
      originalPrice: seller?.commertialOffer?.ListPrice || price,
      url: `https://www.plazavea.com.pe${p.link || ''}`,
      image: item?.images?.[0]?.imageUrl || '',
      availability: seller?.commertialOffer?.AvailableQuantity > 0 ? 'En stock' : 'Agotado',
      storeInfo: { district: 'Múltiple distritos', access: 'Muy fácil', color: '#2d6a4f' }
    };
  }).filter(p => p.price > 0);
}

// 6. TOTTUS — API VTEX pública
async function scrapeTottus(query) {
  const url = `https://www.tottus.com.pe/api/catalog_system/pub/products/search/${encodeURIComponent(query)}?_from=0&_to=4&O=OrderByPriceDESC`;
  const data = await fetchJSON(url);
  if (!Array.isArray(data)) return [];
  return data.slice(0, 5).map(p => {
    const item = p.items?.[0];
    const seller = item?.sellers?.[0];
    const price = seller?.commertialOffer?.Price || 0;
    return {
      store: 'Tottus',
      name: p.productName,
      price,
      originalPrice: seller?.commertialOffer?.ListPrice || price,
      url: `https://www.tottus.com.pe${p.link || ''}`,
      image: item?.images?.[0]?.imageUrl || '',
      availability: seller?.commertialOffer?.AvailableQuantity > 0 ? 'En stock' : 'Agotado',
      storeInfo: { district: 'Múltiple distritos', access: 'Fácil - hipermercado', color: '#40916c' }
    };
  }).filter(p => p.price > 0);
}

// 7. HIRAOKA — API JSON pública
async function scrapeHiraoka(query) {
  const url = `https://www.hiraoka.com.pe/catalogsearch/result/index/?q=${encodeURIComponent(query)}&ajax=1&pageSize=5`;
  const data = await fetchJSON(url);
  if (!data?.items) return [];
  return data.items.slice(0, 5).map(p => ({
    store: 'Hiraoka',
    name: p.name,
    price: parseFloat(p.final_price || p.price || 0),
    originalPrice: parseFloat(p.price || 0),
    url: p.url_path ? `https://www.hiraoka.com.pe/${p.url_path}` : 'https://www.hiraoka.com.pe',
    image: p.small_image || '',
    availability: p.is_salable ? 'En stock' : 'Consultar',
    storeInfo: { district: 'La Victoria / SJL / Múltiple', access: 'Fácil - especialista en electro', color: '#f4a261' }
  })).filter(p => p.price > 0);
}

// 8. OECHSLE — API JSON pública
async function scrapeOechsle(query) {
  const url = `https://www.oechsle.pe/api/catalog_system/pub/products/search/${encodeURIComponent(query)}?_from=0&_to=4&O=OrderByPriceDESC`;
  const data = await fetchJSON(url);
  if (!Array.isArray(data)) return [];
  return data.slice(0, 5).map(p => {
    const item = p.items?.[0];
    const seller = item?.sellers?.[0];
    const price = seller?.commertialOffer?.Price || 0;
    return {
      store: 'Oechsle',
      name: p.productName,
      price,
      originalPrice: seller?.commertialOffer?.ListPrice || price,
      url: `https://www.oechsle.pe${p.link || ''}`,
      image: item?.images?.[0]?.imageUrl || '',
      availability: seller?.commertialOffer?.AvailableQuantity > 0 ? 'En stock' : 'Agotado',
      storeInfo: { district: 'Plaza Norte / Jockey / San Miguel', access: 'Fácil - centros comerciales', color: '#6d6875' }
    };
  }).filter(p => p.price > 0);
}

// 9. SODIMAC — API pública
async function scrapeSodimac(query) {
  const url = `https://www.sodimac.com.pe/sodimac-pe/search/?Nrpp=5&No=0&q=${encodeURIComponent(query)}&type=search&_data=routes%2F_catalog.search`;
  const data = await fetchJSON(url);
  if (!data?.products) return [];
  return data.products.slice(0, 5).map(p => ({
    store: 'Sodimac',
    name: p.displayName || p.name,
    price: parseFloat(p.prices?.our || p.prices?.original || 0),
    originalPrice: parseFloat(p.prices?.original || 0),
    url: `https://www.sodimac.com.pe/sodimac-pe/product/${p.productId}`,
    image: p.imageUrl || '',
    availability: 'En stock',
    storeInfo: { district: 'Ate / San Miguel / Múltiple', access: 'Fácil', color: '#e63946' }
  })).filter(p => p.price > 0);
}

// 10. PROMART — API pública
async function scrapePromart(query) {
  const url = `https://www.promart.pe/api/catalog_system/pub/products/search/${encodeURIComponent(query)}?_from=0&_to=4&O=OrderByPriceDESC`;
  const data = await fetchJSON(url);
  if (!Array.isArray(data)) return [];
  return data.slice(0, 5).map(p => {
    const item = p.items?.[0];
    const seller = item?.sellers?.[0];
    const price = seller?.commertialOffer?.Price || 0;
    return {
      store: 'Promart',
      name: p.productName,
      price,
      originalPrice: seller?.commertialOffer?.ListPrice || price,
      url: `https://www.promart.pe${p.link || ''}`,
      image: item?.images?.[0]?.imageUrl || '',
      availability: seller?.commertialOffer?.AvailableQuantity > 0 ? 'En stock' : 'Agotado',
      storeInfo: { district: 'La Molina / San Miguel / Múltiple', access: 'Fácil - hogar y herramientas', color: '#b5838d' }
    };
  }).filter(p => p.price > 0);
}

// ── MAIN HANDLER ──────────────────────────────────────────────────────────────
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const store = searchParams.get('store') || 'all';

  if (!query || query.length < 2) {
    return Response.json({ error: 'Ingresa al menos 2 caracteres' }, { status: 400 });
  }

  // Ejecutar todos los scrapers en paralelo
  const scrapers = [
    scrapeRipley, scrapeFalabella, scrapeWong, scrapeMetro,
    scrapePlazaVea, scrapeTottus, scrapeHiraoka, scrapeOechsle,
    scrapeSodimac, scrapePromart
  ];

  const results = await Promise.allSettled(scrapers.map(fn => fn(query)));

  // Aplanar todos los resultados
  let allProducts = [];
  for (const r of results) {
    if (r.status === 'fulfilled' && Array.isArray(r.value)) {
      allProducts = allProducts.concat(r.value);
    }
  }

  // Agrupar por nombre similar y encontrar el más barato por producto
  // Ordenar por precio ascendente
  allProducts.sort((a, b) => a.price - b.price);

  // Calcular precios de reventa
  const IGV = 0.18;
  const MARGEN = 0.25;

  allProducts = allProducts.map(p => ({
    ...p,
    priceWithIGV: parseFloat((p.price * (1 + IGV)).toFixed(2)),
    sellingPrice: parseFloat((p.price * (1 + IGV) * (1 + MARGEN)).toFixed(2)),
    profit: parseFloat((p.price * (1 + IGV) * (1 + MARGEN) - p.price).toFixed(2)),
  }));

  return Response.json({
    query,
    total: allProducts.length,
    cheapest: allProducts[0] || null,
    products: allProducts,
    timestamp: new Date().toISOString(),
  });
}
