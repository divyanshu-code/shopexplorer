import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#products' },
  { label: 'Categories', href: '#categories' },
];

const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        role="banner"
        className={`
          fixed top-0 inset-x-0 z-50
          transition-all duration-300 ease-in-out
          ${isScrolled
            ? 'bg-gray-950/80 backdrop-blur-2xl border-b border-white/[0.07] shadow-xl shadow-black/30'
            : 'bg-transparent border-b border-transparent'
          }
        `}
      >
        <nav
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between h-[62px]"
        >
          <a href="#" aria-label="ShopSphere home" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/40 group-hover:shadow-violet-500/60 group-hover:scale-105 transition-all duration-200 text-white">
              <BagIcon />
            </div>
            <span className="text-[17px] font-bold tracking-[-0.3px] text-white">
              Shop<span className="text-violet-400">Sphere</span>
            </span>
          </a>

          <ul role="list" className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="relative px-3.5 py-2 text-[13.5px] font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-150 group block"
                >
                  {label}
                  <span className="absolute bottom-[5px] left-3.5 right-3.5 h-px bg-violet-400/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-1">
            <button aria-label={`Shopping cart, ${cartCount} items`} className="relative p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all duration-150">
              <BagIcon />
              {cartCount > 0 && (
                <span aria-hidden="true" className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-violet-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href="#"
              className="ml-1.5 px-4 py-[7px] text-[13px] font-semibold text-white rounded-[10px] bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-600/20 hover:shadow-violet-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
            >
              Sign In
            </a>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <button aria-label={`Cart — ${cartCount} items`} className="relative p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all duration-150">
              <BagIcon />
              {cartCount > 0 && (
                <span aria-hidden="true" className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-violet-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((p) => !p)}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all duration-150"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div
          aria-hidden="true"
          onClick={closeMenu}
          className="fixed inset-0 z-40 md:hidden bg-black/70 backdrop-blur-sm"
        />
      )}

      <div
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={`
          fixed top-[62px] inset-x-0 z-40 md:hidden
          bg-gray-900/98 backdrop-blur-2xl border-b border-white/[0.07]
          shadow-2xl shadow-black/50
          transition-all duration-250 ease-in-out
          ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0 pointer-events-none'}
        `}
      >
        <div className="px-5 py-5 space-y-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              className="flex items-center px-3.5 py-2.5 rounded-xl text-[14px] font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
            >
              {label}
            </a>
          ))}

          <div className="pt-2 border-t border-white/[0.07]" />
          <a
            href="#"
            onClick={closeMenu}
            className="flex items-center justify-center mt-1 px-4 py-2.5 rounded-xl text-[13.5px] font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-150"
          >
            Sign In
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
