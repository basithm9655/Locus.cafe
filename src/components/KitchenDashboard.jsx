import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Check, Bell } from 'lucide-react';

const KitchenDashboard = () => {
  return (
    <section className="py-24 bg-[#110a08] relative border-y border-white/5 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-cafe-cream mb-4">
              Kitchen <span className="text-cafe-main italic">Sync</span>
            </h2>
            <p className="text-cafe-beige/60 max-w-md font-light">
              Our seamless digital ecosystem connects your table directly to the kitchen. No lost tickets, no delays.
            </p>
          </div>
          <div className="mt-6 md:mt-0 px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs tracking-widest uppercase text-cafe-beige/80">System Live</span>
          </div>
        </div>

        {/* Dashboard Mockup */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-xl border border-white/10 bg-[#1a100c]/80 backdrop-blur-xl shadow-2xl overflow-hidden max-w-5xl mx-auto relative z-10"
        >
          {/* Dashboard Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
            <div className="flex gap-4">
              <span className="text-cafe-cream font-medium">Active Orders (12)</span>
              <span className="text-cafe-beige/40">Completed (45)</span>
            </div>
            <Bell size={18} className="text-cafe-beige/60" />
          </div>

          {/* Order Cards Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 - New */}
            <div className="bg-[#221510] rounded-xl border border-cafe-main/50 p-5 shadow-[0_0_15px_rgba(107,45,20,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cafe-main"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-cafe-cream">T-04</h4>
                  <span className="text-xs text-cafe-beige/60">Order #2048</span>
                </div>
                <span className="px-2 py-1 rounded bg-cafe-main/20 text-cafe-main text-xs font-bold tracking-wider">NEW</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="text-cafe-beige flex justify-between"><span>1x Dark Mocha</span></li>
                <li className="text-cafe-beige flex justify-between"><span>2x Truffle Burger</span></li>
              </ul>
              <button className="w-full py-2 bg-cafe-main text-white rounded font-medium hover:bg-cafe-main/80 transition-colors">
                Accept Order
              </button>
            </div>

            {/* Card 2 - Preparing */}
            <div className="bg-[#1a100c] rounded-xl border border-white/5 p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-cafe-cream">T-12</h4>
                  <span className="text-xs text-cafe-beige/60">Order #2045</span>
                </div>
                <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-xs font-bold tracking-wider flex items-center gap-1">
                  <Clock size={12} /> 04:20
                </span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="text-cafe-beige flex justify-between items-center">
                  <span className="line-through opacity-50">2x Iced Coffee</span>
                  <Check size={14} className="text-green-500" />
                </li>
                <li className="text-cafe-beige flex justify-between"><span>1x Matcha Tiramisu</span></li>
              </ul>
              <button className="w-full py-2 bg-white/10 text-white rounded font-medium hover:bg-white/20 transition-colors">
                Mark Ready
              </button>
            </div>

            {/* Card 3 - Ready */}
            <div className="bg-[#1a100c] rounded-xl border border-green-500/20 p-5 hidden lg:block">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-cafe-cream">T-07</h4>
                  <span className="text-xs text-cafe-beige/60">Order #2041</span>
                </div>
                <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs font-bold tracking-wider">READY</span>
              </div>
              <ul className="space-y-2 mb-6 opacity-60">
                <li className="text-cafe-beige flex justify-between"><span>1x Classic Slider</span></li>
                <li className="text-cafe-beige flex justify-between"><span>1x Lemonade</span></li>
              </ul>
              <button className="w-full py-2 bg-transparent border border-white/20 text-white/50 rounded font-medium cursor-not-allowed">
                Waiting Pickup
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KitchenDashboard;
