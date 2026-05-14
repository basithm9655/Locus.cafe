import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);   // line draws
    const t2 = setTimeout(() => setPhase(2), 900);   // logo reveals
    const t3 = setTimeout(() => setPhase(3), 1800);  // subtitle + glow pulse
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <motion.div
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#060302] flex flex-col items-center justify-center"
    >
      {/* Blurred hero bg slowly reveals */}
      <motion.div
        initial={{ opacity: 0, scale: 1.3 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-[#060302]/75 backdrop-blur-2xl" />

      {/* Corner ornaments */}
      {['top-6 left-6 border-t border-l', 'top-6 right-6 border-t border-r',
        'bottom-6 left-6 border-b border-l', 'bottom-6 right-6 border-b border-r'].map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 1, delay: i * 0.08 }}
          className={`absolute ${cls} w-8 h-8 border-cafe-main/25 pointer-events-none`}
        />
      ))}

      {/* Vertical entry line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="absolute w-[1px] h-24 bg-gradient-to-b from-transparent via-cafe-main to-transparent origin-top"
        style={{ top: '50%', marginTop: '-10rem' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5">

        {/* ── Logo with multi-stage animation ── */}
        <div className="relative flex items-center justify-center">
          
          {/* Animated SVG ring around the logo */}
          <motion.svg
            className="absolute z-0 w-80 h-80 md:w-96 md:h-96 text-cafe-main/40"
            viewBox="0 0 100 100"
            initial={{ rotate: -90 }}
            animate={phase >= 1 ? { rotate: 270 } : {}}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          >
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={phase >= 1 ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.svg>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={phase >= 2
              ? { opacity: 1, y: 0, scale: 1 }
              : {}}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="relative w-56 md:w-80"
          >
            {/* Glow behind logo — pulses after reveal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={phase >= 3
                ? { opacity: [0.4, 0.9, 0.4] }
                : { opacity: 0 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-cafe-main/30 blur-[40px] rounded-full scale-110"
            />

            {/* Shimmer sweep over the logo */}
            <motion.div
              initial={{ x: '-120%', opacity: 0 }}
              animate={phase >= 3 ? { x: '220%', opacity: [0, 0.6, 0] } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none z-10"
            />

            <img
              src="/logo.png"
              alt="Cafe Locus"
              className="relative z-10 w-full h-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 30px rgba(107,45,20,0.6))' }}
            />
          </motion.div>
        </div>

        {/* Horizontal divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="h-[1px] w-56 bg-gradient-to-r from-transparent via-cafe-main to-transparent origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.8em' }}
          animate={phase >= 3 ? { opacity: 1, letterSpacing: '0.45em' } : {}}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="text-[10px] md:text-xs text-cafe-beige/50 uppercase tracking-[0.45em] font-light"
        >
          Peelamedu · Coimbatore
        </motion.p>

      </div>

      {/* Bottom progress bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.3, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cafe-main to-transparent origin-left"
      />
    </motion.div>
  );
};

export default Loader;
