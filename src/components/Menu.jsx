import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Plus, Minus, ShoppingBag, X, CheckCircle2, User, Hash } from 'lucide-react';
import menuItems from '../data/menu.json';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLjFkHCq85bgUsFcVGflzvDCS4Fc30bGW0xK5aXVGBvMNAD6-XXvdDLhLWjCDqzoF2/exec";

const categories = ['All', 'Coffee', 'Burgers', 'Vietnamese', 'Desserts', 'Beverages'];

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
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tableNo, setTableNo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start 0.3'] });
  const headingY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    // Auto-detect table from URL
    const params = new URLSearchParams(window.location.search);
    const table = params.get("table");
    if (table) {
      setTableNo(table);
    }
  }, []);

  const filtered = activeCat === 'All' ? menuItems : menuItems.filter(i => i.category === activeCat);

  // Cart Functions
  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: {
        ...item,
        quantity: (prev[item.id]?.quantity || 0) + 1
      }
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id].quantity > 1) {
        newCart[id].quantity -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const cartItems = Object.values(cart);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    setStatus('submitting');
    
    // Format items string for Google Sheets: "2x Dark Mocha, 1x Truffle Burger"
    const itemsString = cartItems.map(item => `${item.quantity}x ${item.name}`).join(', ');
    
    const payload = {
      action: 'createOrder',
      tableNo: tableNo || 'Walk-in',
      name: customerName,
      items: itemsString,
      totalAmount: `₹${totalPrice}`
    };

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      setStatus('success');
      setTimeout(() => {
        setCart({});
        setStatus('idle');
        setIsCartOpen(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <section ref={sectionRef} className="py-32 bg-[#0e0806] relative overflow-hidden" id="menu">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-cafe-main/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Floating Cart Button */}
        <AnimatePresence>
          {totalItems > 0 && !isCartOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={() => setIsCartOpen(true)}
              className="fixed bottom-8 right-8 z-50 bg-cafe-main text-white p-4 rounded-full shadow-[0_10px_40px_rgba(107,45,20,0.6)] flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <div className="relative">
                <ShoppingBag size={24} />
                <span className="absolute -top-2 -right-2 bg-white text-cafe-main text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              </div>
              <span className="font-semibold hidden sm:inline">View Order</span>
            </motion.button>
          )}
        </AnimatePresence>

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
        <div className="overflow-x-auto pb-4 mb-10 sm:mb-14 -mx-6 px-6 lg:mx-0 lg:px-0 hide-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex lg:flex-wrap justify-start lg:justify-center gap-3 w-max lg:w-auto"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`relative px-6 py-2.5 rounded-full text-[11px] sm:text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-500 border whitespace-nowrap ${
                  activeCat === cat
                    ? 'text-white border-cafe-main bg-cafe-main shadow-[0_0_25px_rgba(107,45,20,0.6)] scale-105'
                    : 'text-cafe-beige/60 border-white/10 hover:border-cafe-main/40 hover:text-cafe-cream hover:bg-white/5 bg-[#110a08]/50 hover:scale-105'
                }`}
              >
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Menu grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const cartItem = cart[item.id];
              return (
                <motion.div
                  key={item.id}
                  layout
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-b from-[#1a100c]/80 to-[#0e0806]/90 backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0806] via-transparent to-transparent" />
                    
                    {item.tag && (
                      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide border ${tagColors[item.tag] || ''}`}>
                        {item.tag}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 w-6 h-6 bg-black/60 rounded border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5 relative z-10">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="text-cafe-cream font-semibold text-base leading-snug">{item.name}</h3>
                      <span className="text-cafe-main font-bold text-sm shrink-0 mt-0.5">₹{item.price}</span>
                    </div>
                    <p className="text-cafe-beige/50 text-xs font-light leading-relaxed flex-1 mb-5">
                      {item.desc}
                    </p>
                    
                    {/* Add to Cart / Quantity Controller */}
                    {cartItem ? (
                      <div className="flex items-center justify-between bg-cafe-main/10 border border-cafe-main/30 rounded-xl p-1">
                        <button onClick={() => removeFromCart(item.id)} className="w-10 h-10 flex items-center justify-center text-cafe-cream hover:bg-cafe-main/20 rounded-lg transition-colors">
                          <Minus size={16} />
                        </button>
                        <span className="text-cafe-cream font-bold">{cartItem.quantity}</span>
                        <button onClick={() => addToCart(item)} className="w-10 h-10 flex items-center justify-center text-cafe-cream hover:bg-cafe-main/20 rounded-lg transition-colors">
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(item)} className="w-full py-3 rounded-xl text-xs font-semibold tracking-[0.1em] uppercase border border-cafe-main/20 text-cafe-cream/70 flex items-center justify-center gap-2 hover:bg-cafe-main hover:border-cafe-main hover:text-white transition-all duration-400">
                        <Plus size={14} />
                        Add to Order
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Cart / Checkout Modal */}
        <AnimatePresence>
          {isCartOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setIsCartOpen(false)}
                className="absolute inset-0 bg-[#060302]/80 backdrop-blur-sm"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="bg-[#110a08] border border-white/10 rounded-3xl w-full max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative z-10 flex flex-col max-h-[85vh] overflow-hidden"
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#1a100c]">
                  <h3 className="text-xl font-bold text-cafe-cream flex items-center gap-2">
                    <ShoppingBag className="text-cafe-main" size={20} /> Your Order
                  </h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-cafe-beige/50 hover:text-cafe-cream">
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                  {status === 'success' ? (
                     <div className="py-12 flex flex-col items-center justify-center text-center">
                       <CheckCircle2 size={64} className="text-green-500 mb-4" />
                       <h4 className="text-2xl font-bold text-cafe-cream mb-2">Order Sent to Kitchen!</h4>
                       <p className="text-cafe-beige/60">Your order has been placed successfully. Please wait while we prepare it.</p>
                     </div>
                  ) : cartItems.length === 0 ? (
                    <div className="py-12 text-center text-cafe-beige/50">
                      Your cart is empty. Add some delicious items!
                    </div>
                  ) : (
                    <>
                      {/* Cart Items List */}
                      <div className="space-y-4">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex justify-between items-center bg-[#1a100c] p-3 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                              <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                              <div>
                                <h5 className="text-cafe-cream text-sm font-semibold">{item.name}</h5>
                                <span className="text-cafe-main text-xs font-bold">₹{item.price}</span>
                              </div>
                            </div>
                            <div className="flex items-center bg-black/40 rounded-lg border border-white/10">
                              <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 flex items-center justify-center text-cafe-cream/70 hover:text-cafe-cream">
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center text-sm text-cafe-cream">{item.quantity}</span>
                              <button onClick={() => addToCart(item)} className="w-8 h-8 flex items-center justify-center text-cafe-cream/70 hover:text-cafe-cream">
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <hr className="border-white/5" />

                      {/* Checkout Form */}
                      <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-cafe-cream/50 uppercase tracking-widest">Table Number (Required)</label>
                          <div className="relative">
                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cafe-cream/40" />
                            <input 
                              type="text" 
                              required
                              value={tableNo}
                              onChange={(e) => setTableNo(e.target.value)}
                              className="w-full bg-[#1a100c] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-cafe-cream focus:outline-none focus:border-cafe-main transition-colors placeholder:text-cafe-cream/20"
                              placeholder="e.g. T-04"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-cafe-cream/50 uppercase tracking-widest">Name (Optional)</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cafe-cream/40" />
                            <input 
                              type="text" 
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              className="w-full bg-[#1a100c] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-cafe-cream focus:outline-none focus:border-cafe-main transition-colors placeholder:text-cafe-cream/20"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                </div>

                {/* Modal Footer */}
                {cartItems.length > 0 && status !== 'success' && (
                  <div className="p-6 border-t border-white/10 bg-[#1a100c]">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-cafe-beige/60 text-sm">Total ({totalItems} items)</span>
                      <span className="text-2xl font-bold text-cafe-cream">₹{totalPrice}</span>
                    </div>
                    <button 
                      type="submit"
                      form="checkout-form"
                      disabled={status === 'submitting'}
                      className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm bg-cafe-main text-white hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                    >
                      {status === 'submitting' ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        `Place Order • ₹${totalPrice}`
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Menu;
