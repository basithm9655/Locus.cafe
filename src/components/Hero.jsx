import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Coffee, Award, Star, Clock, Calendar } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  const yBg     = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const yContent= useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const stats = [
    { icon: Award,  val: '#1',           sub: 'Cafe in CBE' },
    { icon: Coffee, val: 'Single Origin', sub: 'Ethically Sourced' },
    { icon: Star,   val: '4.9 / 5',      sub: '2,000+ Reviews' },
    { icon: Clock,  val: '10–11 PM',     sub: 'Open Daily' },
  ];

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-black">

      {/* ── Parallax Background ── */}
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 z-0 origin-center will-change-transform">
        <img src="/hero-bg.png" alt="Cafe Locus Interior" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
        {/* Warm cinematic glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-2/3 bg-cafe-main/15 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-cafe-main/8 blur-[80px] rounded-full" />
      </motion.div>

      {/* ── Corner ornaments (desktop only) ── */}
      {['top-5 left-5 border-t border-l', 'top-5 right-5 border-t border-r',
        'bottom-14 left-5 border-b border-l', 'bottom-14 right-5 border-b border-r'].map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3.5 + i * 0.1 }}
          className={`absolute hidden md:block ${cls} w-8 h-8 border-cafe-main/20 pointer-events-none z-10`}
        />
      ))}

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width:  Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left:   `${Math.random() * 100}%`,
              top:    `${Math.random() * 100}%`,
              background: `rgba(244,232,216,${Math.random() * 0.3 + 0.1})`,
            }}
            animate={{ y: [0, -(Math.random() * 300 + 80)], opacity: [0, 0.7, 0] }}
            transition={{ duration: Math.random() * 12 + 8, repeat: Infinity, delay: Math.random() * 8, ease: 'linear' }}
          />
        ))}
      </div>

      {/* ── Main Content ── */}
      <motion.div
        style={{ y: yContent, opacity: fadeOut }}
        className="relative z-10 w-full flex flex-col items-center text-center px-5 pt-16 pb-10"
      >


        {/* Logo */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.5, ease: [0.76, 0, 0.24, 1] }}
          className="w-48 sm:w-56 md:w-64 lg:w-76 mx-auto mb-4"
          style={{ filter: 'drop-shadow(0 0 50px rgba(107,45,20,0.8)) drop-shadow(0 0 80px rgba(107,45,20,0.4))' }}
        >
          <img src="/logo.png" alt="Cafe Locus" className="w-full h-auto object-contain" />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.9, ease: [0.25, 1, 0.5, 1] }}
          className="h-px w-32 sm:w-44 bg-gradient-to-r from-transparent via-cafe-main/60 to-transparent mb-3 origin-center"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3, ease: [0.25, 1, 0.5, 1] }}
          className="text-[10px] sm:text-xs font-light tracking-[0.45em] text-cafe-beige/50 uppercase mb-6 sm:mb-8"
        >
          A Symphony of Taste
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="grid grid-cols-2 md:grid-cols-4 w-full max-w-xs sm:max-w-sm md:max-w-2xl mb-8 sm:mb-10 rounded-2xl overflow-hidden border border-white/[0.08] bg-black/40 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.6)]"
        >
          {stats.map(({ icon: Icon, val, sub }, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-1.5 py-4 sm:py-5 px-2 sm:px-3
                ${i % 2 === 0 ? 'border-r border-white/[0.06]' : ''}
                ${i === 1 ? 'md:border-r md:border-white/[0.06]' : ''}
                ${i >= 2 ? 'border-t border-white/[0.06] md:border-t-0' : ''}
              `}
            >
              <Icon className="text-cafe-main" size={16} strokeWidth={1.5} />
              <span className="text-cafe-cream font-heading font-semibold text-sm sm:text-base leading-tight text-center">{val}</span>
              <span className="text-cafe-beige/35 text-[9px] sm:text-[10px] tracking-[0.1em] uppercase text-center leading-tight">{sub}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
          <button
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative overflow-hidden w-full sm:w-auto px-8 py-3.5 rounded-full bg-cafe-cream text-cafe-dark text-xs font-semibold tracking-[0.12em] uppercase hover:scale-105 active:scale-95 transition-transform duration-300 shadow-[0_0_30px_rgba(244,232,216,0.15)]"
          >
            <span className="relative z-10">View Our Menu</span>
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </button>

          <button
            onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-cafe-cream/60 text-xs font-medium tracking-wide hover:border-cafe-main/40 hover:text-cafe-cream hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
          >
            <Calendar size={12} className="text-cafe-main" strokeWidth={2} />
            Book a Table
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fadeOut }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 flex items-center justify-center text-cafe-beige/30 hover:border-cafe-main hover:text-cafe-main transition-colors duration-400 backdrop-blur-md"
        >
          <ArrowDown size={12} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
