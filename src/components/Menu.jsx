import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Plus, Leaf } from 'lucide-react';

const categories = ['All', 'Coffee', 'Burgers', 'Vietnamese', 'Desserts', 'Beverages'];

const menuItems = [
  { id: 1, category: 'Coffee',     name: 'Caramel Macchiato',    price: '₹240', desc: 'Vanilla syrup, espresso, steamed milk and a generous caramel drizzle.',  isVeg: true,  tag: 'Bestseller', img: '/coffee.png' },
  { id: 2, category: 'Coffee',     name: 'Dark Mocha',           price: '₹280', desc: 'Rich espresso, bittersweet mocha sauce, and silky steamed milk.',          isVeg: true,  tag: 'Chef\'s Pick', img: '/coffee.png' },
  { id: 3, category: 'Burgers',    name: 'Truffle Mushroom',      price: '₹350', desc: 'Premium beef patty, black truffle mayo, Swiss cheese & sautéed mushrooms.', isVeg: false, tag: 'Signature',  img: '/burger.png' },
  { id: 4, category: 'Burgers',    name: 'Classic Sliders',       price: '₹320', desc: 'Crispy chicken, house slaw, and spicy aioli in a brioche bun.',            isVeg: false, tag: null,         img: '/burger.png' },
  { id: 5, category: 'Vietnamese', name: 'Iced Viet Coffee',      price: '₹220', desc: 'Dark roast drip coffee poured slowly over sweet condensed milk and ice.',  isVeg: true,  tag: 'Popular',    img: '/viet.png' },
  { id: 6, category: 'Desserts',   name: 'Matcha Tiramisu',       price: '₹290', desc: 'Matcha-soaked ladyfingers layered with silky mascarpone cream.',           isVeg: true,  tag: 'New',        img: '/dessert.png' },
  { id: 7, category: 'Beverages',  name: 'Yuzu Lemonade',         price: '₹180', desc: 'Sparkling lemonade infused with yuzu extract and fresh mint leaves.',      isVeg: true,  tag: null,         img: '/viet.png' },
  { id: 8, category: 'Beverages',  name: 'Rose Cold Brew',        price: '₹240', desc: '18-hour cold brewed coffee with rose water and a touch of honey.',        isVeg: true,  tag: 'Seasonal',   img: '/coffee.png' },
];

const tagColors = {
  'Bestseller': 'bg-amber-700/30 text-amber-400 border-amber-600/30',
  "Chef's Pick": 'bg-cafe-main/20 text-cafe-main border-cafe-main/30',
  'Signature':  'bg-purple-900/30 text-purple-300 border-purple-700/30',
  'Popular':    'bg-emerald-900/30 text-emerald-400 border-emerald-700/30',
  'New':        'bg-blue-900/30 text-blue-300 border-blue-700/30',
  'Seasonal':   'bg-rose-900/30 text-rose-300 border-rose-700/30',
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] } }),
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.3 } }
};

const Menu = () => {
  const [activeCat, setActiveCat] = useState('All');
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start 0.3'] });
  const headingY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const filtered = activeCat === 'All' ? menuItems : menuItems.filter(i => i.category === activeCat);

  return (
    <section ref={sectionRef} className="py-32 bg-[#0e0806] relative overflow-hidden" id="menu">
      {/* Ambient bg glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-cafe-main/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div style={{ y: headingY, opacity: headingOpacity }} className="text-center mb-20">
          <p className="text-[11px] tracking-[0.4em] uppercase text-cafe-main/70 mb-4">The Craft</p>
          <h2 className="text-5xl md:text-6xl font-bold text-cafe-cream tracking-tight">
            Our <em className="not-italic font-light text-cafe-main font-heading">Offerings</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-cafe-main/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-cafe-main/60" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-cafe-main/40" />
          </div>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase font-medium transition-all duration-400 border ${
                activeCat === cat
                  ? 'bg-cafe-main text-white border-cafe-main shadow-[0_0_25px_rgba(107,45,20,0.5)]'
                  : 'text-cafe-beige/50 border-white/10 hover:border-cafe-main/30 hover:text-cafe-cream bg-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-b from-[#1a100c]/80 to-[#0e0806]/90 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0806] via-transparent to-transparent" />

                  {/* Tag badge */}
                  {item.tag && (
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide border ${tagColors[item.tag] || ''}`}>
                      {item.tag}
                    </div>
                  )}

                  {/* Veg/Non-veg */}
                  <div className="absolute top-3 right-3 w-6 h-6 bg-black/60 rounded border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-cafe-cream font-semibold text-base leading-snug">{item.name}</h3>
                    <span className="text-cafe-main font-bold text-sm shrink-0 mt-0.5">{item.price}</span>
                  </div>
                  <p className="text-cafe-beige/50 text-xs font-light leading-relaxed flex-1 mb-5">
                    {item.desc}
                  </p>
                  <button className="w-full py-3 rounded-xl text-xs font-semibold tracking-[0.1em] uppercase border border-cafe-main/20 text-cafe-cream/70 flex items-center justify-center gap-2 group-hover:bg-cafe-main group-hover:border-cafe-main group-hover:text-white transition-all duration-400">
                    <Plus size={14} />
                    Add to Order
                  </button>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_30px_rgba(107,45,20,0.08)]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;
