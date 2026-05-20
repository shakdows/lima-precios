'use client';
import { useState, useCallback } from 'react';
import s from './page.module.css';

const fmt = (n) => n > 0 ? `S/ ${Number(n).toLocaleString('es-PE',{minimumFractionDigits:2,maximumFractionDigits:2})}` : '—';

const POPULAR = ['laptop','celular','televisor','refrigeradora','lavadora','auriculares',
  'zapatillas','microondas','tablet','impresora','cocina','licuadora','ventilador'];

const STORE_COLORS = {
  'Ripley':'#e63946','Saga Falabella':'#457b9d','Wong':'#c1121f',
  'Metro':'#2a9d8f','Plaza Vea':'#2d6a4f','Tottus':'#40916c',
  'Hiraoka':'#f4a261','Oechsle':'#7b2d8b','Sodimac':'#d62828','Promart':'#b5448a',
};

function StoreTag({ store }) {
  const color = STORE_COLORS[store] || '#666';
  return (
    <span className={s.storeTag} style={{ borderColor: color, color }}>
      {store}
    </span>
  );
}

function ProductCard({ product, rank, isCheapest, onSelect }) {
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className={`${s.card} ${isCheapest ? s.cardBest : ''}`} onClick={() => onSelect(product)}>
      {isCheapest && <div className={s.bestBadge}>🏆 MÁS BARATO</div>}
      <div className={s.cardRank}>#{rank}</div>

      <div className={s.cardHead}>
        <StoreTag store={product.store} />
        {discount > 0 && <span className={s.discount}>-{discount}%</span>}
      </div>

      <p className={s.cardName}>{product.name}</p>

      <div className={s.cardPrices}>
        <div className={s.buyPrice}>
          <span className={s.buyLabel}>COMPRAS EN</span>
          <span className={s.buyNum}>{fmt(product.price)}</span>
        </div>
        <div className={s.sellPrice}>
          <span className={s.sellLabel}>VENDES A</span>
          <span className={s.sellNum}>{fmt(product.sellingPrice)}</span>
        </div>
      </div>

      <div className={s.cardProfit}>
        <span>Tu ganancia:</span>
        <span className={s.profitVal}>+{fmt(product.profit)}</span>
      </div>

      <div className={s.cardFooter}>
        <span className={s.cardAccess}>📍 {product.storeInfo?.district?.split('/')[0]?.trim()}</span>
        <span className={s.cardDetail}>Ver detalle →</span>
      </div>
    </div>
  );
}

function Modal({ product, onClose }) {
  if (!product) return null;
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <button className={s.closeBtn} onClick={onClose}>✕</button>

        <div className={s.modalHead}>
          <StoreTag store={product.store} />
          {discount > 0 && <span className={s.discount}>-{discount}% OFERTA</span>}
        </div>

        <h2 className={s.modalName}>{product.name}</h2>

        {/* DONDE COMPRAR */}
        <div className={s.section}>
          <div className={s.sectionLabel}>✅ DÓNDE COMPRAR (tú)</div>
          <div className={s.storeBox} style={{ borderColor: STORE_COLORS[product.store] || '#444' }}>
            <div>
              <div className={s.storeName} style={{ color: STORE_COLORS[product.store] }}>
                {product.store}
              </div>
              <div className={s.storeDistrict}>📍 {product.storeInfo?.district}</div>
              <div className={s.storeAccess}>♿ Acceso: {product.storeInfo?.access}</div>
              <div className={s.storeAvail}>
                {product.availability === 'En stock' ? '🟢' : '🟡'} {product.availability}
              </div>
            </div>
            <div className={s.storePriceBox}>
              <div className={s.storeBuyPrice}>{fmt(product.price)}</div>
              {product.originalPrice > product.price && (
                <div className={s.storeOrigPrice}>{fmt(product.originalPrice)}</div>
              )}
              <a href={product.url} target="_blank" rel="noopener noreferrer"
                className={s.goBtn} onClick={e => e.stopPropagation()}>
                Ir a la tienda →
              </a>
            </div>
          </div>
        </div>

        {/* CALCULADORA */}
        <div className={s.section}>
          <div className={s.sectionLabel}>📊 CALCULADORA DE REVENTA</div>
          <div className={s.calcBox}>
            <div className={s.calcRow}>
              <span>Precio de compra</span>
              <span>{fmt(product.price)}</span>
            </div>
            <div className={s.calcRow}>
              <span>+ IGV (18%)</span>
              <span className={s.calcAdd}>+{fmt(product.priceWithIGV - product.price)}</span>
            </div>
            <div className={`${s.calcRow} ${s.calcSub}`}>
              <span>= Con IGV</span>
              <span>{fmt(product.priceWithIGV)}</span>
            </div>
            <div className={s.calcRow}>
              <span>+ Ganancia (25%)</span>
              <span className={s.calcAdd}>+{fmt(product.sellingPrice - product.priceWithIGV)}</span>
            </div>
            <div className={`${s.calcRow} ${s.calcTotal}`}>
              <span>💲 PRECIO AL CLIENTE</span>
              <span className={s.calcTotalNum}>{fmt(product.sellingPrice)}</span>
            </div>
            <div className={`${s.calcRow} ${s.calcProfit}`}>
              <span>🤑 TU GANANCIA NETA</span>
              <span className={s.calcProfitNum}>+{fmt(product.profit)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState('price');

  const search = useCallback(async (q) => {
    const term = (q || query).trim();
    if (!term) return;
    setLoading(true);
    setError('');
    setResults(null);
    try {
      const res = await fetch(`/api/precios?q=${encodeURIComponent(term)}`);
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setResults(data);
    } catch {
      setError('Error al conectar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [query]);

  const sorted = results?.products ? [...results.products].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'profit') return b.profit - a.profit;
    if (sortBy === 'store') return a.store.localeCompare(b.store);
    return 0;
  }) : [];

  return (
    <div className={s.wrap}>
      {/* HEADER */}
      <header className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>⚡</span>
          <div>
            <h1 className={s.logoText}>PrecioLima</h1>
            <p className={s.logoSub}>Precios en tiempo real · 10 tiendas</p>
          </div>
        </div>
        <div className={s.headerBadges}>
          {Object.keys(STORE_COLORS).map(store => (
            <span key={store} className={s.hBadge} style={{ borderColor: STORE_COLORS[store] }}>
              {store}
            </span>
          ))}
        </div>
      </header>

      {/* HOW IT WORKS */}
      <div className={s.howto}>
        <div className={s.howStep}>
          <span className={s.howIcon}>🔍</span>
          <span><strong>TÚ</strong> buscas el producto</span>
        </div>
        <div className={s.howArrow}>→</div>
        <div className={s.howStep}>
          <span className={s.howIcon}>🏷️</span>
          <span><strong>APP</strong> consulta 10 tiendas</span>
        </div>
        <div className={s.howArrow}>→</div>
        <div className={s.howStep}>
          <span className={s.howIcon}>🏆</span>
          <span><strong>TÚ</strong> ves dónde comprar más barato</span>
        </div>
        <div className={s.howArrow}>→</div>
        <div className={s.howStep}>
          <span className={s.howIcon}>💰</span>
          <span><strong>CLIENTE</strong> paga precio + IGV + 25%</span>
        </div>
      </div>

      {/* SEARCH */}
      <div className={s.searchSection}>
        <div className={s.searchBox}>
          <input
            className={s.searchInput}
            type="text"
            placeholder="Ej: laptop hp, samsung galaxy, oster licuadora..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            autoFocus
          />
          <button className={s.searchBtn} onClick={() => search()} disabled={loading}>
            {loading ? <span className={s.spin}>⟳</span> : '🔎 BUSCAR'}
          </button>
        </div>

        {/* Popular */}
        <div className={s.popular}>
          <span className={s.popLabel}>Populares:</span>
          {POPULAR.map(p => (
            <button key={p} className={s.popBtn} onClick={() => { setQuery(p); search(p); }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className={s.loadingSection}>
          <div className={s.loadingSpinner}></div>
          <p className={s.loadingText}>Consultando precios en 10 tiendas de Lima...</p>
          <div className={s.loadingStores}>
            {Object.keys(STORE_COLORS).map((store, i) => (
              <span key={store} className={s.loadingStore} style={{ animationDelay: `${i * 0.15}s` }}>
                {store}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ERROR */}
      {error && <div className={s.error}>⚠️ {error}</div>}

      {/* RESULTS */}
      {results && !loading && (
        <div className={s.results}>
          {/* Summary bar */}
          <div className={s.summaryBar}>
            <div className={s.summaryLeft}>
              <span className={s.resultCount}>{results.total} resultados</span>
              <span className={s.resultQuery}>para "{results.query}"</span>
              <span className={s.resultTime}>
                {new Date(results.timestamp).toLocaleTimeString('es-PE')}
              </span>
            </div>
            <div className={s.sortWrap}>
              <span className={s.sortLabel}>Ordenar:</span>
              <select className={s.sortSelect} value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="price">Menor precio (compra)</option>
                <option value="profit">Mayor ganancia</option>
                <option value="store">Por tienda</option>
              </select>
            </div>
          </div>

          {/* CHEAPEST HIGHLIGHT */}
          {results.cheapest && (
            <div className={s.cheapestBanner}>
              <div className={s.cheapestLeft}>
                <div className={s.cheapestTitle}>🏆 MEJOR OPCIÓN PARA COMPRAR</div>
                <div className={s.cheapestStore} style={{ color: STORE_COLORS[results.cheapest.store] }}>
                  {results.cheapest.store}
                </div>
                <div className={s.cheapestName}>{results.cheapest.name}</div>
                <div className={s.cheapestLocation}>
                  📍 {results.cheapest.storeInfo?.district} &nbsp;|&nbsp; {results.cheapest.storeInfo?.access}
                </div>
              </div>
              <div className={s.cheapestRight}>
                <div className={s.cheapestBuyPrice}>
                  <span className={s.cheapestBuyLabel}>TÚ PAGAS</span>
                  <span className={s.cheapestBuyNum}>{fmt(results.cheapest.price)}</span>
                </div>
                <div className={s.cheapestArrow}>→</div>
                <div className={s.cheapestSellPrice}>
                  <span className={s.cheapestSellLabel}>CLIENTE PAGA</span>
                  <span className={s.cheapestSellNum}>{fmt(results.cheapest.sellingPrice)}</span>
                </div>
                <div className={s.cheapestProfit}>
                  Tu ganancia: <strong>{fmt(results.cheapest.profit)}</strong>
                </div>
                <a href={results.cheapest.url} target="_blank" rel="noopener noreferrer"
                  className={s.cheapestLink}>
                  Ir a comprar →
                </a>
              </div>
            </div>
          )}

          {results.total === 0 ? (
            <div className={s.noResults}>
              <p>😕 No encontramos resultados en las tiendas.</p>
              <p>Intenta con otro término más general.</p>
            </div>
          ) : (
            <div className={s.grid}>
              {sorted.map((product, i) => (
                <ProductCard
                  key={`${product.store}-${i}`}
                  product={product}
                  rank={i + 1}
                  isCheapest={i === 0 && sortBy === 'price'}
                  onSelect={setSelected}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* INITIAL STATE */}
      {!results && !loading && !error && (
        <div className={s.empty}>
          <div className={s.emptyIcon}>🛒</div>
          <h2 className={s.emptyTitle}>Busca cualquier producto de Lima</h2>
          <p className={s.emptySub}>
            Consultamos <strong>Ripley, Saga Falabella, Wong, Metro, Plaza Vea,
            Tottus, Hiraoka, Oechsle, Sodimac y Promart</strong> al mismo tiempo.<br/>
            Te mostramos dónde comprar más barato y cuánto cobrarle al cliente.
          </p>
          <div className={s.emptyStores}>
            {Object.entries(STORE_COLORS).map(([store, color]) => (
              <div key={store} className={s.emptyStore} style={{ borderColor: color }}>
                <div className={s.emptyStoreDot} style={{ background: color }}></div>
                {store}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL */}
      {selected && <Modal product={selected} onClose={() => setSelected(null)} />}

      <footer className={s.footer}>
        <p>PrecioLima · Precios en tiempo real de 10 tiendas de Lima</p>
        <p>Precios pueden variar. Verificar antes de comprar. IGV 18% | Margen 25%</p>
      </footer>
    </div>
  );
}
