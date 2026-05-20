'use client';

import { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, STORES, getProductAnalysis } from '../data/products';
import styles from './page.module.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('profit'); // profit | price | name

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (category !== 'Todos') list = list.filter(p => p.category === category);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    
    return list.sort((a, b) => {
      const aa = getProductAnalysis(a);
      const bb = getProductAnalysis(b);
      if (sortBy === 'profit') return bb.profit - aa.profit;
      if (sortBy === 'price') return aa.cheapestPrice - bb.cheapestPrice;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [search, category, sortBy]);

  const analysis = selectedProduct ? getProductAnalysis(selectedProduct) : null;

  const formatSoles = (n) => `S/ ${n.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <div>
              <h1 className={styles.logoTitle}>PrecioLima</h1>
              <p className={styles.logoSub}>Comparador de precios para revendedores</p>
            </div>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{PRODUCTS.length}</span>
              <span className={styles.statLabel}>Productos</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{Object.keys(STORES).length}</span>
              <span className={styles.statLabel}>Tiendas</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>+25%</span>
              <span className={styles.statLabel}>Tu ganancia</span>
            </div>
          </div>
        </div>
      </header>

      {/* EXPLANATION BANNER */}
      <div className={styles.banner}>
        <div className={styles.bannerInner}>
          <div className={styles.bannerItem}>
            <span className={styles.bannerIcon}>🔍</span>
            <div>
              <strong>TÚ ves</strong>
              <p>Dónde comprar más barato</p>
            </div>
          </div>
          <div className={styles.bannerArrow}>→</div>
          <div className={styles.bannerItem}>
            <span className={styles.bannerIcon}>🏷️</span>
            <div>
              <strong>CLIENTE paga</strong>
              <p>Precio + IGV 18% + Ganancia 25%</p>
            </div>
          </div>
          <div className={styles.bannerArrow}>→</div>
          <div className={styles.bannerItem}>
            <span className={styles.bannerIcon}>💰</span>
            <div>
              <strong>TÚ ganas</strong>
              <p>La diferencia es tuya</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔎</span>
          <input
            className={styles.search}
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.sortWrap}>
          <label className={styles.sortLabel}>Ordenar:</label>
          <select className={styles.sort} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="profit">Mayor ganancia</option>
            <option value="price">Menor precio</option>
            <option value="name">A-Z</option>
          </select>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className={styles.cats}>
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`${styles.cat} ${category === c ? styles.catActive : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* RESULTS COUNT */}
      <div className={styles.resultsInfo}>
        <span>{filtered.length} productos encontrados</span>
        {category !== 'Todos' && <span className={styles.filterTag}>{category} ✕</span>}
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {filtered.map(product => {
          const a = getProductAnalysis(product);
          return (
            <div
              key={product.id}
              className={styles.card}
              onClick={() => setSelectedProduct(product)}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardEmoji}>{product.image}</span>
                <div className={styles.cardCategory}>{product.category}</div>
              </div>
              <h3 className={styles.cardName}>{product.name}</h3>
              
              {/* DONDE COMPRAR - para el revendedor */}
              <div className={styles.cardBuySection}>
                <div className={styles.cardBuyLabel}>📍 COMPRAR EN:</div>
                <div className={styles.cardStore} style={{ borderColor: a.cheapestStore.color }}>
                  <span className={styles.cardStoreName}>{a.cheapestStore.name}</span>
                  <span className={styles.cardStoreAccess}>{a.cheapestStore.access}</span>
                </div>
                <div className={styles.cardBuyPrice}>{formatSoles(a.cheapestPrice)}</div>
              </div>

              {/* PRECIO AL CLIENTE */}
              <div className={styles.cardPricing}>
                <div className={styles.cardPricingRow}>
                  <span>Precio al cliente:</span>
                  <strong className={styles.sellingPrice}>{formatSoles(a.sellingPrice)}</strong>
                </div>
                <div className={styles.cardPricingRow}>
                  <span>Tu ganancia:</span>
                  <strong className={styles.profit}>+{formatSoles(a.profit)}</strong>
                </div>
              </div>

              <div className={styles.cardCta}>Ver detalle →</div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {selectedProduct && analysis && (
        <div className={styles.overlay} onClick={() => setSelectedProduct(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedProduct(null)}>✕</button>
            
            <div className={styles.modalHeader}>
              <span className={styles.modalEmoji}>{selectedProduct.image}</span>
              <div>
                <div className={styles.modalCategory}>{selectedProduct.category}</div>
                <h2 className={styles.modalTitle}>{selectedProduct.name}</h2>
              </div>
            </div>

            {/* RECOMENDACIÓN PRINCIPAL */}
            <div className={styles.recommendation}>
              <div className={styles.recLabel}>✅ MEJOR OPCIÓN PARA COMPRAR</div>
              <div className={styles.recStore} style={{ borderColor: analysis.cheapestStore.color }}>
                <div className={styles.recStoreInfo}>
                  <h3 style={{ color: analysis.cheapestStore.color }}>{analysis.cheapestStore.name}</h3>
                  <p className={styles.recStoreType}>{analysis.cheapestStore.type}</p>
                  <p className={styles.recStoreDistrict}>📍 {analysis.cheapestStore.district}</p>
                  <p className={styles.recStoreAccess}>♿ Acceso: {analysis.cheapestStore.access}</p>
                </div>
                <div className={styles.recPrice}>
                  <div className={styles.recPriceNum}>{formatSoles(analysis.cheapestPrice)}</div>
                  {analysis.cheapestStore.url !== '#' && (
                    <a href={analysis.cheapestStore.url} target="_blank" rel="noopener noreferrer" className={styles.recLink} onClick={e => e.stopPropagation()}>
                      Ir a la web →
                    </a>
                  )}
                </div>
              </div>
              {analysis.savings > 0 && (
                <p className={styles.savingsNote}>💡 Ahorras {formatSoles(analysis.savings)} vs la tienda más cara</p>
              )}
            </div>

            {/* CALCULADORA DE PRECIOS */}
            <div className={styles.calculator}>
              <h3 className={styles.calcTitle}>📊 Calculadora de reventa</h3>
              <div className={styles.calcRows}>
                <div className={styles.calcRow}>
                  <span>Precio de compra (más barato)</span>
                  <span className={styles.calcVal}>{formatSoles(analysis.cheapestPrice)}</span>
                </div>
                <div className={styles.calcRow}>
                  <span>+ IGV (18%)</span>
                  <span className={styles.calcVal}>+{formatSoles(analysis.priceWithIGV - analysis.cheapestPrice)}</span>
                </div>
                <div className={`${styles.calcRow} ${styles.calcRowSub}`}>
                  <span>= Precio con IGV</span>
                  <span>{formatSoles(analysis.priceWithIGV)}</span>
                </div>
                <div className={styles.calcRow}>
                  <span>+ Ganancia (25%)</span>
                  <span className={styles.calcVal}>+{formatSoles(analysis.sellingPrice - analysis.priceWithIGV)}</span>
                </div>
                <div className={`${styles.calcRow} ${styles.calcRowTotal}`}>
                  <span>💲 PRECIO AL CLIENTE</span>
                  <span className={styles.totalPrice}>{formatSoles(analysis.sellingPrice)}</span>
                </div>
                <div className={`${styles.calcRow} ${styles.calcRowProfit}`}>
                  <span>🤑 TU GANANCIA NETA</span>
                  <span className={styles.profitPrice}>+{formatSoles(analysis.profit)}</span>
                </div>
              </div>
            </div>

            {/* COMPARACIÓN DE TIENDAS */}
            <div className={styles.comparison}>
              <h3 className={styles.compTitle}>📋 Comparación de precios</h3>
              <div className={styles.compList}>
                {analysis.allPrices.map((p, i) => (
                  <div key={i} className={`${styles.compRow} ${i === 0 ? styles.compRowBest : ''}`}>
                    <div className={styles.compRank}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}º`}</div>
                    <div className={styles.compStore}>
                      <span className={styles.compStoreName}>{p.store.name}</span>
                      <span className={styles.compStoreType}>{p.store.type}</span>
                    </div>
                    <div className={styles.compPrice}>
                      {formatSoles(p.price)}
                      {i > 0 && <span className={styles.compDiff}>+{formatSoles(p.price - analysis.cheapestPrice)}</span>}
                      {i === 0 && <span className={styles.compBestTag}>MEJOR</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>PrecioLima © 2025 — Precios referenciales. Verificar antes de comprar.</p>
        <p>IGV: 18% | Margen de ganancia sugerido: 25%</p>
      </footer>
    </div>
  );
}
