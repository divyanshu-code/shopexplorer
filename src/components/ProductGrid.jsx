import ProductCard from './ProductCard.jsx';

const SkeletonCard = () => (
  <div className="flex flex-col rounded-[18px] overflow-hidden border border-white/[0.06] bg-[#0f1117] animate-pulse">
    <div className="aspect-square bg-white/[0.05]" />
    <div className="px-4 pt-4 pb-4 flex flex-col gap-3">
      <div className="h-2.5 w-20 bg-white/[0.08] rounded-full" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-white/[0.07] rounded-full" />
        <div className="h-3 w-4/5 bg-white/[0.07] rounded-full" />
      </div>
      <div className="space-y-1.5">
        <div className="h-2.5 w-full bg-white/[0.04] rounded-full" />
        <div className="h-2.5 w-3/4 bg-white/[0.04] rounded-full" />
      </div>
      <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-4 w-14 bg-white/[0.09] rounded-full" />
          <div className="h-2.5 w-10 bg-white/[0.04] rounded-full" />
        </div>
        <div className="h-8 w-[72px] bg-violet-500/[0.12] rounded-[10px]" />
      </div>
    </div>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 gap-6">
    <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    </div>
    <div className="text-center max-w-xs">
      <p className="text-[15px] font-semibold text-slate-300 mb-1.5">No products found</p>
      <p className="text-[13px] text-slate-500 leading-relaxed">{message}</p>
    </div>
  </div>
);

const ProductGrid = ({
  products = [],
  loading = false,
  emptyMessage = 'Try adjusting your filters or check back later.',
  skeletonCount = 8,
}) => (
  <section id="products-grid" aria-label="Product grid" className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-24">
    {!loading && products.length > 0 && (
      <p className="text-[11.5px] text-slate-600 uppercase tracking-[0.09em] mb-10">
        Showing{' '}
        <span className="text-violet-400 font-semibold">{products.length}</span>{' '}
        {products.length === 1 ? 'result' : 'results'}
      </p>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading && Array.from({ length: skeletonCount }, (_, i) => (
        <SkeletonCard key={`sk-${i}`} />
      ))}

      {!loading && products.length > 0 && products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {!loading && products.length === 0 && (
        <EmptyState message={emptyMessage} />
      )}
    </div>
  </section>
);

export default ProductGrid;
