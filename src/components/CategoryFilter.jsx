const formatLabel = (str) =>
  str.replace(/\b\w/g, (c) => c.toUpperCase());

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h2" />
  </svg>
);

const ChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const CategoryFilter = ({ categories = [], selectedCategory, setSelectedCategory }) => {
  const allSelected = selectedCategory === '';

  return (
    <div id="categories" className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-6">
      <div className="flex items-center gap-2 mb-4">
        <FilterIcon />
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.1em]">
          Filter by Category
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="hidden sm:flex flex-wrap gap-2 flex-1">
          <button
            onClick={() => setSelectedCategory('')}
            className={`
              px-3.5 py-1.5 rounded-[10px] text-[13px] font-semibold border
              transition-all duration-150 hover:scale-[1.03] active:scale-[0.97]
              ${allSelected
                ? 'bg-violet-600 border-violet-500/60 text-white shadow-md shadow-violet-600/25'
                : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200 hover:border-white/[0.14]'
              }
            `}
          >
            All
          </button>

          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-3.5 py-1.5 rounded-[10px] text-[13px] font-semibold border
                  transition-all duration-150 hover:scale-[1.03] active:scale-[0.97]
                  ${active
                    ? 'bg-violet-600 border-violet-500/60 text-white shadow-md shadow-violet-600/25'
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200 hover:border-white/[0.14]'
                  }
                `}
              >
                {formatLabel(cat)}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-52 shrink-0">
          <label htmlFor="category-select" className="sr-only">Filter by category</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="
              w-full appearance-none pl-3.5 pr-9 py-2.5 rounded-[10px]
              bg-white/[0.04] border border-white/[0.08]
              text-[13px] font-medium text-slate-300
              hover:bg-white/[0.07] hover:border-white/[0.14]
              focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40
              transition-all duration-150 cursor-pointer
            "
          >
            <option value="" className="bg-gray-900 text-white">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-900 text-white capitalize">
                {formatLabel(cat)}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronIcon />
          </span>
        </div>
      </div>

      {!allSelected && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[11px] text-slate-600">Active:</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-500/[0.12] border border-violet-500/25 text-violet-300 text-[11.5px] font-semibold">
            {formatLabel(selectedCategory)}
            <button
              aria-label="Clear category filter"
              onClick={() => setSelectedCategory('')}
              className="hover:text-white transition-colors ml-0.5 leading-none"
            >
              ×
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
