import { useState } from 'react';

const StarIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-3 h-3 ${filled ? 'text-amber-400' : 'text-slate-700'}`}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke={filled ? 'none' : 'currentColor'}
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px]" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);


const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const formatCategory = (str = '') =>
  str.replace(/\b\w/g, (c) => c.toUpperCase());

const StarRating = ({ rate = 0, count = 0 }) => {
  const filled = Math.round(rate);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`${rate} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < filled} />
        ))}
      </div>
      <span className="text-[11.5px] text-slate-500 tabular-nums">
        {rate?.toFixed(1)}
        <span className="ml-1 text-slate-600">({count})</span>
      </span>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const { title, price, category, description, image, rating = {} } = product;

  const handleAddToCart = () => {
    if (addedToCart) return;
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };


  return (
    <article
      className="group relative flex flex-col rounded-[18px] mt-2 overflow-hidden border border-white/[0.07] bg-[#0f1117] hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-900/20 transition-all duration-300 hover:-translate-y-[3px]"
      style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
    >
      <div className="relative overflow-hidden bg-white aspect-square">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
        )}

        {!imgError ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-contain p-5 group-hover:scale-[1.06] transition-transform duration-500 ease-out ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400 bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="text-xs text-slate-400">No image</span>
          </div>
        )}

        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-gray-900/85 backdrop-blur-sm text-violet-300 text-[9.5px] font-semibold uppercase tracking-[0.07em] border border-violet-500/20">
          {formatCategory(category)}
        </span>

        <button
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
          onClick={() => setIsWishlisted((p) => !p)}
          className={`
            absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-lg border backdrop-blur-sm
            transition-all duration-200 hover:scale-110 active:scale-95
            ${isWishlisted
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
              : 'bg-gray-900/75 border-white/[0.1] text-slate-400 hover:text-rose-400 hover:border-rose-500/25'
            }
          `}
        >
          <HeartIcon filled={isWishlisted} />
        </button>


      </div>

      <div className="flex flex-col flex-1 px-4 pt-3.5 pb-4 gap-2.5">
        <StarRating rate={rating.rate} count={rating.count} />

        <h3 className="text-[13.5px] font-semibold text-slate-100 leading-[1.45] line-clamp-2 group-hover:text-violet-200 transition-colors duration-200">
          {title}
        </h3>

        <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2 border-t border-white/[0.06]">
          <div className="flex flex-col">
            <span className="text-[18px] font-extrabold text-white tracking-tight leading-tight">
              ₹{(price * 84).toFixed(0)}
            </span>
            <span className="text-[11px] text-slate-600 line-through leading-none">
              ₹{(price * 84 * 1.2).toFixed(0)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            aria-label={addedToCart ? 'Added to cart' : `Add ${title} to cart`}
            className={`
              flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-[12px] font-bold
              border transition-all duration-200 hover:scale-[1.04] active:scale-[0.96] shrink-0
              ${addedToCart
                ? 'bg-emerald-500/15 border-emerald-500/35 text-emerald-400'
                : 'bg-violet-600/15 border-violet-500/25 text-violet-300 hover:bg-violet-600 hover:border-violet-500 hover:text-white hover:shadow-lg hover:shadow-violet-500/25'
              }
            `}
          >
            {addedToCart ? <CheckIcon /> : <CartIcon />}
            {addedToCart ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
