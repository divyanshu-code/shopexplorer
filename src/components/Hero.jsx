const STATS = [
  { value: '10K+', label: 'Products' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Avg Rating' },
];

const TRUST_BADGES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: 'Secure Checkout',
    pos: 'top-[28%] left-6 lg:left-20',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    label: 'Free Shipping',
    pos: 'top-[36%] right-6 lg:right-20',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l2.09 6.26L21 10l-6.91 1.74L12 22l-2.09-6.26L3 14l6.91-1.74L12 2z" />
      </svg>
    ),
    label: 'New Arrivals Daily',
    pos: 'bottom-[28%] left-6 lg:left-28',
  },
];

const FloatingBadge = ({ icon, label, pos }) => (
  <div
    className={`hidden sm:flex absolute ${pos} items-center gap-2 px-3.5 py-2 rounded-2xl border border-white/[0.12] bg-gray-900/70 backdrop-blur-xl shadow-xl text-white text-[12px] font-medium`}
    style={{ animation: 'floatBadge 3s ease-in-out infinite' }}
  >
    <span className="text-violet-400">{icon}</span>
    {label}
  </div>
);

const Hero = () => (
  <section
    id="hero"
    aria-label="Hero"
    className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]"
  >
    <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[860px] h-[560px] rounded-full bg-violet-700/[0.18] blur-[130px]" />
      <div className="absolute -bottom-20 -left-20 w-[480px] h-[480px] rounded-full bg-indigo-700/[0.14] blur-[110px]" />
      <div className="absolute bottom-0 -right-10 w-[380px] h-[380px] rounded-full bg-fuchsia-800/[0.10] blur-[110px]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '30px 30px' }}
      />
    </div>

    <div className="relative z-10 max-w-[820px] mx-auto px-5 sm:px-8 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-9 rounded-full bg-violet-500/[0.12] border border-violet-500/30 text-violet-300 text-[11.5px] font-semibold tracking-[0.08em] uppercase">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l2.09 6.26L21 10l-6.91 1.74L12 22l-2.09-6.26L3 14l6.91-1.74L12 2z" />
        </svg>
        Summer Sale — Up to 60% Off
      </div>

      <h1 className="text-[clamp(2.6rem,7vw,5rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.06] mb-6">
        Discover{' '}
        <span className="relative inline-block">
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            Amazing
          </span>
          <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-400 opacity-50" />
        </span>{' '}
        Products
      </h1>

      <p className="max-w-[760px] mx-auto text-[1.05rem] text-slate-400 leading-[1.75] mb-11">
        Shop thousands of curated products across every category — electronics, fashion, home essentials and more, all at prices you'll love.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-5 mb-16">
        <a
          href="#products"
          className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-[14px] font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-violet-600/25 hover:shadow-violet-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
        >
          Shop Now
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>

        <a
          href="#categories"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-[14px] font-semibold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.09] hover:border-white/[0.18] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
        >
          Browse Categories
        </a>
      </div>

      <div className="flex items-center justify-center gap-0 sm:gap-2 flex-wrap">
        {STATS.map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-2 sm:gap-4">
            <div className="text-center px-5 py-1">
              <p className="text-[1.9rem] font-extrabold text-white tracking-tight leading-none">{value}</p>
              <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-[0.1em]">{label}</p>
            </div>
            {i < STATS.length - 1 && (
              <div aria-hidden="true" className="hidden sm:block h-9 w-px bg-white/[0.08]" />
            )}
          </div>
        ))}
      </div>
    </div>

    <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />

    <style>{`
      @keyframes floatBadge {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-6px); }
      }
    `}</style>
  </section>
);

export default Hero;
