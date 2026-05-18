import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';

const infoItems = [
  {
    icon: MapPin,
    title: 'Peelamedu, Coimbatore',
    text: '123 Avinashi Road, Near Hope College\nCoimbatore, Tamil Nadu 641004',
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    text: 'Mon – Sun: 10:00 AM – 11:00 PM',
  },
  {
    icon: Phone,
    title: 'Call Us',
    text: '+91 98765 43210',
  },
];

const Location = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#060302]" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-cafe-main/60 mb-3">Visit Us</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cafe-cream">
            Find <em className="not-italic font-light text-cafe-main font-heading">Locus</em>
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col lg:flex-row rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06] bg-[#0e0806] shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
        >
          {/* Info panel */}
          <div className="lg:w-1/2 p-6 sm:p-10 lg:p-14 flex flex-col justify-center gap-7 sm:gap-8">
            {infoItems.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cafe-main/10 border border-cafe-main/20 flex items-center justify-center text-cafe-main mt-0.5">
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-cafe-cream font-medium text-sm sm:text-base mb-0.5">{title}</h4>
                  <p className="text-cafe-beige/50 font-light text-sm leading-relaxed whitespace-pre-line">{text}</p>
                </div>
              </motion.div>
            ))}

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              href="https://www.google.com/maps/dir/?api=1&destination=123+Avinashi+Road,+Near+Hope+College,+Peelamedu,+Coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 self-start inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 bg-cafe-cream text-cafe-dark text-xs font-semibold tracking-[0.12em] uppercase rounded-full hover:bg-white transition-colors duration-300 hover:scale-105 active:scale-95 transform"
            >
              Get Directions
              <ExternalLink size={13} />
            </motion.a>
          </div>

          {/* Decorative map panel */}
          <div className="lg:w-1/2 relative min-h-[220px] sm:min-h-[300px] lg:min-h-[420px] bg-[#110a08] overflow-hidden">
            {/* Grid lines */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'linear-gradient(rgba(107,45,20,1) 1px, transparent 1px), linear-gradient(90deg, rgba(107,45,20,1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* Radial glow at pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cafe-main/20 blur-[60px] rounded-full" />

            {/* Road lines */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />
            <div className="absolute top-0 left-1/2 h-full w-[1px] bg-white/5" />
            <div className="absolute top-1/2 left-0 w-full h-8 bg-white/[0.02] -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 h-full w-8 bg-white/[0.02] -translate-x-1/2" />

            {/* Location pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -8, 0], boxShadow: ['0 0 20px rgba(107,45,20,0.5)', '0 0 40px rgba(107,45,20,0.9)', '0 0 20px rgba(107,45,20,0.5)'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-11 h-11 sm:w-13 sm:h-13 bg-cafe-main rounded-full flex items-center justify-center text-white relative z-10 border-2 border-cafe-cream/20"
              >
                <MapPin size={20} />
              </motion.div>
              <div className="w-3 h-1.5 bg-black/60 blur-sm rounded-full mt-1.5 scale-x-150" />

              {/* Callout label */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-4 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-center"
              >
                <p className="text-cafe-cream text-xs font-semibold">Cafe Locus</p>
                <p className="text-cafe-beige/40 text-[9px] tracking-widest uppercase mt-0.5">Peelamedu</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
