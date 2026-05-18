import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Check, Bell, RefreshCw } from 'lucide-react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLjFkHCq85bgUsFcVGflzvDCS4Fc30bGW0xK5aXVGBvMNAD6-XXvdDLhLWjCDqzoF2/exec";

const mockOrders = [
  { rowId: 2, timestamp: '2026-05-18T10:00:00Z', tableNo: 'T-04', items: '1x Dark Mocha, 2x Truffle Burger', status: 'New', totalAmount: '₹850' },
  { rowId: 3, timestamp: '2026-05-18T09:45:00Z', tableNo: 'T-12', items: '2x Iced Coffee, 1x Matcha Tiramisu', status: 'Preparing', totalAmount: '₹600' },
  { rowId: 4, timestamp: '2026-05-18T09:30:00Z', tableNo: 'T-07', items: '1x Classic Slider, 1x Lemonade', status: 'Ready', totalAmount: '₹450' }
];

const KitchenDashboard = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!SCRIPT_URL) return;
    setLoading(true);
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getDashboardData`);
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch (err) {
      console.error("Failed to fetch", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (rowId, newStatus) => {
    // Optimistic UI update
    setOrders(orders.map(o => o.rowId === rowId ? { ...o, status: newStatus } : o));
    
    if (!SCRIPT_URL) return;
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'updateOrderStatus', rowId, status: newStatus })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const newOrders = orders.filter(o => o.status === 'New');
  const preparingOrders = orders.filter(o => o.status === 'Preparing');
  const readyOrders = orders.filter(o => o.status === 'Ready');

  return (
    <section className="min-h-screen py-12 bg-[#110a08] relative border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-cafe-cream mb-2">
              Kitchen <span className="text-cafe-main italic">Sync</span>
            </h2>
            <p className="text-cafe-beige/60 font-light">Real-time order management.</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button onClick={fetchOrders} className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-cafe-cream">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs tracking-widest uppercase text-cafe-beige/80">System Live</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* NEW ORDERS COLUMN */}
          <div className="flex flex-col gap-4">
            <h3 className="text-cafe-cream/80 text-sm tracking-widest uppercase border-b border-cafe-main/30 pb-2">New ({newOrders.length})</h3>
            {newOrders.map(order => (
              <motion.div layout key={order.rowId} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-[#221510] rounded-xl border border-cafe-main/50 p-5 shadow-[0_0_15px_rgba(107,45,20,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cafe-main"></div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-bold text-cafe-cream">{order.tableNo}</h4>
                  <span className="px-2 py-1 rounded bg-cafe-main/20 text-cafe-main text-xs font-bold tracking-wider">NEW</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {order.items.split(',').map((item, i) => (
                    <li key={i} className="text-cafe-beige">{item.trim()}</li>
                  ))}
                </ul>
                <button onClick={() => updateStatus(order.rowId, 'Preparing')} className="w-full py-2 bg-cafe-main text-white rounded font-medium hover:bg-cafe-main/80 transition-colors">
                  Accept Order
                </button>
              </motion.div>
            ))}
          </div>

          {/* PREPARING COLUMN */}
          <div className="flex flex-col gap-4">
            <h3 className="text-yellow-500/80 text-sm tracking-widest uppercase border-b border-yellow-500/30 pb-2">Preparing ({preparingOrders.length})</h3>
            {preparingOrders.map(order => (
              <motion.div layout key={order.rowId} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-[#1a100c] rounded-xl border border-yellow-500/30 p-5">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-bold text-cafe-cream">{order.tableNo}</h4>
                  <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-xs font-bold tracking-wider flex items-center gap-1">
                    <Clock size={12} /> PREP
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {order.items.split(',').map((item, i) => (
                    <li key={i} className="text-cafe-beige">{item.trim()}</li>
                  ))}
                </ul>
                <button onClick={() => updateStatus(order.rowId, 'Ready')} className="w-full py-2 bg-yellow-500/20 text-yellow-500 rounded font-medium hover:bg-yellow-500/30 transition-colors">
                  Mark Ready
                </button>
              </motion.div>
            ))}
          </div>

          {/* READY COLUMN */}
          <div className="flex flex-col gap-4">
            <h3 className="text-green-500/80 text-sm tracking-widest uppercase border-b border-green-500/30 pb-2">Ready ({readyOrders.length})</h3>
            {readyOrders.map(order => (
              <motion.div layout key={order.rowId} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-[#1a100c] rounded-xl border border-green-500/20 p-5">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-bold text-cafe-cream">{order.tableNo}</h4>
                  <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs font-bold tracking-wider">READY</span>
                </div>
                <ul className="space-y-2 mb-6 opacity-60">
                  {order.items.split(',').map((item, i) => (
                    <li key={i} className="text-cafe-beige">{item.trim()}</li>
                  ))}
                </ul>
                <button onClick={() => updateStatus(order.rowId, 'Served')} className="w-full py-2 border border-green-500/30 text-green-500 rounded font-medium hover:bg-green-500/10 transition-colors">
                  Mark Served
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default KitchenDashboard;
