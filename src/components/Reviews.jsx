import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { id: 1, name: 'Arjun K.',  initials: 'AK', text: "The ordering system is brilliant. Didn't have to wait for a waiter, and tracking the order live feels so premium. Oh, and the Dark Mocha is insane.", rating: 5 },
  { id: 2, name: 'Priya S.',  initials: 'PS', text: "Aesthetic 10/10. It feels like I walked into a cafe in Tokyo. Very calm, great ambient lighting, and the Truffle Burger was out of this world.", rating: 5 },
  { id: 3, name: 'Rahul V.',  initials: 'RV', text: "Best coffee shop in Coimbatore, hands down. The whole experience from scanning the QR to getting the food is seamless. Very Apple-esque.", rating: 5 },
];

const Reviews = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden bg-[#060302]" id="reviews">
      {/* Parallax subtle bg */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-10 blur-sm"
      />
      <div className="absolute inset-0 bg-[#060302]/80" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-20"
        >
          <p className="text-[11px] tracking-[0.4em] uppercase text-cafe-main/70 mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-cafe-cream">
            Word on the <em className="not-italic font-light text-cafe-main font-heading">Street</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
              className="group relative p-8 rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md hover:-translate-y-2 transition-transform duration-500 overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cafe-main/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quote mark */}
              <div className="text-cafe-main/10 text-8xl font-serif leading-none mb-4 select-none">"</div>

              {/* Stars */}
              <div className="flex gap-1 text-cafe-main mb-5 -mt-8">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-cafe-beige/70 font-light leading-relaxed text-sm mb-8 italic">
                "{r.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cafe-main/60 to-cafe-dark flex items-center justify-center text-cafe-cream font-bold text-sm border border-cafe-main/20">
                  {r.initials}
                </div>
                <div>
                  <p className="text-cafe-cream font-medium text-sm">{r.name}</p>
                  <p className="text-cafe-beige/30 text-xs tracking-wider">Verified Guest</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
