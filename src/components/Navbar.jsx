import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlignRight } from 'lucide-react';

const navLinks = [
  { label: 'Menu',       href: 'menu' },
  { label: 'Experience', href: 'experience' },
  { label: 'Location',   href: 'location' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const scrollTo = (id) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.4, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#060302]/85 backdrop-blur-2xl border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'py-4 sm:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center z-50 shrink-0"
          >
            <img
              src="/logo.png"
              alt="Cafe Locus"
              className="h-8 sm:h-10 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 2px 10px rgba(107,45,20,0.4))' }}
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="relative text-[11px] uppercase tracking-[0.18em] text-cafe-beige/50 hover:text-cafe-cream transition-colors duration-300 group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cafe-main transition-all duration-400 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => scrollTo('menu')}
              className="group relative overflow-hidden px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.15em] font-semibold border border-cafe-main/60 text-cafe-cream transition-all duration-400 hover:shadow-[0_0_20px_rgba(107,45,20,0.4)]"
            >
              <span className="relative z-10">Order Now</span>
              <div className="absolute inset-0 bg-cafe-main origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-cafe-cream/80 z-50 relative p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <AlignRight size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 bg-[#060302]/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {/* Logo in mobile menu */}
            <motion.img
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              src="/logo.png"
              alt="Cafe Locus"
              className="w-32 mb-4 opacity-80"
            />

            {navLinks.map(({ label, href }, i) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                onClick={() => scrollTo(href)}
                className="text-2xl sm:text-3xl font-bold tracking-[0.15em] text-cafe-cream/80 hover:text-cafe-cream transition-colors duration-300 uppercase"
              >
                {label}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              onClick={() => scrollTo('menu')}
              className="mt-4 px-10 py-4 bg-cafe-main text-white rounded-full text-sm font-semibold tracking-[0.12em] uppercase shadow-[0_0_30px_rgba(107,45,20,0.4)]"
            >
              Order Now
            </motion.button>

            {/* Contact in mobile menu */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-cafe-beige/30 text-xs tracking-widest mt-4"
            >
              +91 98765 43210  ·  Peelamedu, Coimbatore
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
