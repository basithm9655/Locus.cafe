import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Experience = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  const yImg1  = useTransform(scrollYProgress, [0, 1], ['6%', '-14%']);
  const yImg2  = useTransform(scrollYProgress, [0, 1], ['-6%', '12%']);
  const yText  = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  return (
    <section ref={sectionRef} className="py-40 bg-[#0a0604] relative overflow-hidden" id="experience">
      {/* Ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cafe-main/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-24 items-center">

          {/* Staggered parallax images */}
          <div className="lg:w-1/2 relative h-[580px] w-full flex-shrink-0">
            <motion.div style={{ y: yImg1 }} className="absolute left-0 top-0 w-[58%] z-10">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-[0_40px_80px_rgba(0,0,0,0.7)] border border-white/[0.06]">
                <img src="/hero-bg.png" alt="Cafe ambience" className="w-full h-full object-cover brightness-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060302]/60 to-transparent" />
              </div>
            </motion.div>

            <motion.div style={{ y: yImg2 }} className="absolute right-0 bottom-0 w-[52%] z-20">
              <div className="rounded-3xl overflow-hidden aspect-square shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-cafe-main/10">
                <img src="/hero-bg.png" alt="Coffee ritual" className="w-full h-full object-cover brightness-60" style={{ filter: 'sepia(0.2) saturate(1.3)' }} />
                <div className="absolute inset-0 bg-cafe-main/15 mix-blend-overlay" />
              </div>
            </motion.div>

            {/* Floating caption card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-16 left-1/4 z-30 px-5 py-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl shadow-xl"
            >
              <p className="text-cafe-cream text-sm font-medium">Coimbatore's Finest</p>
              <p className="text-cafe-beige/40 text-[11px] tracking-widest uppercase mt-0.5">Since 2022</p>
            </motion.div>
          </div>

          {/* Text */}
          <motion.div style={{ y: yText }} className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            >
              <p className="text-[11px] tracking-[0.4em] uppercase text-cafe-main/70 mb-6">The Space</p>
              <h2 className="text-5xl md:text-6xl font-bold text-cafe-cream mb-8 leading-tight tracking-tight">
                An Aesthetic<br />
                <em className="not-italic font-light text-cafe-main font-heading">Sanctuary</em>
              </h2>

              <div className="w-12 h-[1px] bg-cafe-main/40 mb-10" />

              <p className="text-cafe-beige/70 text-lg mb-5 leading-relaxed font-light">
                Inspired by modern Japanese minimal cafes, Locus is designed to be your calm within the chaos. Earthy tones, warm ambient lighting, and generous spacing create an environment that feels both luxurious and intimate.
              </p>
              <p className="text-cafe-beige/40 leading-relaxed font-light mb-12 text-base">
                Whether you're here for deep work, a casual date, or simply to savour our meticulously crafted coffee, every corner is curated for your comfort.
              </p>

              <button className="group relative overflow-hidden flex items-center gap-6 px-10 py-4 border border-cafe-main/30 rounded-full text-cafe-cream text-xs uppercase tracking-[0.2em] hover:border-cafe-main transition-all duration-500">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Explore Gallery</span>
                <motion.span className="relative z-10 w-6 h-[1px] bg-cafe-main group-hover:w-10 transition-all duration-300" />
                <div className="absolute inset-0 bg-cafe-main origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
