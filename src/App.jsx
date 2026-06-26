import { useState, useMemo } from 'react';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import Loading from './components/Loading.jsx';
import Error from './components/Error.jsx';
import useProducts from './hooks/useProducts.js';

const SearchBar = ({ value, onChange }) => (
  <div className="relative w-full sm:w-80">
    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
    </span>

    <label htmlFor="product-search" className="sr-only">Search products</label>
    <input
      id="product-search"
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search products…"
      autoComplete="off"
      className="
        w-full pl-10 pr-9 py-2.5 rounded-xl
        bg-white/[0.09] border border-white/[0.08]
        text-sm text-slate-200 placeholder-slate-600
      "
    />

    {value && (
      <button
        aria-label="Clear search"
        onClick={() => onChange('')}
        className="absolute inset-y-0 right-3 flex items-center text-slate-600 hover:text-slate-300 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
);

const App = () => {
  const { products, loading, error, refetch } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCat = selectedCategory ? p.category === selectedCategory : true;
      const matchesSearch = q ? p.title.toLowerCase().includes(q) : true;
      return matchesCat && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const emptyMessage = searchQuery
    ? `No results for "${searchQuery}"${selectedCategory ? ` in "${selectedCategory}"` : ''}. Try a different search.`
    : selectedCategory
      ? `No products in "${selectedCategory}". Try a different category.`
      : 'No products available right now. Please try again later.';

  if (loading && products.length === 0) {
    return <Loading message="Fetching products for you…" />;
  }

  if (error && products.length === 0) {
    return <Error message={error.message} status={error.status} onRetry={refetch} fullScreen />;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <main>
        <Hero />

        <section id="products" aria-label="Products" className="bg-[#030712]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 pb-0">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-violet-500 mb-1.5">Collection</p>
                <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Our Products</h2>
                <p className="text-[13px] text-slate-500 mt-1">Browse our full curated catalog</p>
              </div>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {error && !loading && (
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-8">
              <Error
                message={error.message}
                status={error.status}
                onRetry={refetch}
                fullScreen={false}
              />
            </div>
          )}

          {!error && (
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              skeletonCount={8}
              emptyMessage={emptyMessage}
            />
          )}
        </section>
      </main>

      <footer className="border-t border-white/[0.06] bg-[#030712]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[14px] font-bold text-white">
            Shop<span className="text-violet-400">Sphere</span>
          </span>
          <p className="text-[12px] text-slate-600">
            © {new Date().getFullYear()} ShopSphere. Built with React + Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
