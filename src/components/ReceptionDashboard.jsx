import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Phone, IndianRupee, RefreshCw, CheckCircle, Clock, MessageSquare } from 'lucide-react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLjFkHCq85bgUsFcVGflzvDCS4Fc30bGW0xK5aXVGBvMNAD6-XXvdDLhLWjCDqzoF2/exec";

const mockReservations = [
  { timestamp: '2026-05-18T09:30:00Z', name: 'Arjun Menon', phone: '+91 9876543210', people: '2 People', date: '2026-05-19', time: '19:00', tableNo: 'T-04' },
  { timestamp: '2026-05-18T10:15:00Z', name: 'Priya Raj', phone: '+91 9123456789', people: '4 People', date: '2026-05-19', time: '20:30', tableNo: 'T-12' },
];

const mockOrders = [
  { rowId: 2, timestamp: '2026-05-18T10:00:00Z', tableNo: 'T-04', items: '1x Dark Mocha, 2x Truffle Burger', status: 'Served', totalAmount: '850', paidStatus: 'Unpaid' },
  { rowId: 3, timestamp: '2026-05-18T09:45:00Z', tableNo: 'T-12', items: '2x Iced Coffee, 1x Matcha Tiramisu', status: 'Ready', totalAmount: '600', paidStatus: 'Unpaid' },
  { rowId: 4, timestamp: '2026-05-18T09:30:00Z', tableNo: 'T-07', items: '1x Classic Slider, 1x Lemonade', status: 'Served', totalAmount: '450', paidStatus: 'Paid' }
];

const ReceptionDashboard = () => {
  const [reservations, setReservations] = useState(mockReservations);
  const [orders, setOrders] = useState(mockOrders);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('billing'); // 'billing' or 'reservations'

  const fetchData = async () => {
    if (!SCRIPT_URL) return;
    setLoading(true);
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getDashboardData`);
      const data = await res.json();
      if (data.reservations) setReservations(data.reservations);
      if (data.orders) setOrders(data.orders);
    } catch (err) {
      console.error("Failed to fetch", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const updatePayment = async (rowId, newPaidStatus) => {
    setOrders(orders.map(o => o.rowId === rowId ? { ...o, paidStatus: newPaidStatus } : o));
    
    if (!SCRIPT_URL) return;
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'updatePaymentStatus', rowId, paidStatus: newPaidStatus })
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen py-12 bg-[#0a0705] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-cafe-cream mb-2">
              Reception <span className="text-cafe-main italic">Desk</span>
            </h2>
            <p className="text-cafe-beige/60 font-light">Billing & Reservations Management.</p>
          </div>
          <div className="flex items-center gap-6 mt-6 md:mt-0">
            <div className="flex bg-black/40 rounded-full p-1 border border-white/10">
              <button 
                onClick={() => setActiveTab('billing')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'billing' ? 'bg-cafe-main text-white shadow-lg' : 'text-cafe-beige/60 hover:text-cafe-cream'}`}
              >
                Billing
              </button>
              <button 
                onClick={() => setActiveTab('reservations')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'reservations' ? 'bg-cafe-main text-white shadow-lg' : 'text-cafe-beige/60 hover:text-cafe-cream'}`}
              >
                Reservations
              </button>
            </div>
            <button onClick={fetchData} className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-cafe-cream">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* TAB CONTENT: BILLING */}
        {activeTab === 'billing' && (
          <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map(order => (
              <div key={order.rowId} className={`rounded-xl border p-6 flex flex-col justify-between ${order.paidStatus === 'Paid' ? 'bg-[#1a1c1a] border-green-500/20' : 'bg-[#1a1513] border-cafe-main/30 shadow-[0_0_15px_rgba(107,45,20,0.1)]'}`}>
                
                <div>
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/5">
                    <div>
                      <h4 className="text-2xl font-bold text-cafe-cream">{order.tableNo}</h4>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs text-cafe-beige/50">Status: </span>
                        <span className="text-xs text-white/80">{order.status}</span>
                      </div>
                    </div>
                    {order.paidStatus === 'Paid' ? (
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold tracking-wider flex items-center gap-1">
                        <CheckCircle size={14} /> PAID
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold tracking-wider">
                        UNPAID
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-6 space-y-1">
                    <p className="text-xs text-cafe-beige/40 uppercase tracking-widest mb-2">Order Items</p>
                    {order.items.split(',').map((item, i) => (
                      <div key={i} className="text-cafe-beige text-sm">{item.trim()}</div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-cafe-beige/60 uppercase text-sm tracking-wider">Total</span>
                    <span className="text-2xl font-bold text-cafe-cream flex items-center">
                      <IndianRupee size={20} className="text-cafe-main mr-1" />
                      {order.totalAmount}
                    </span>
                  </div>
                  
                  {order.paidStatus === 'Unpaid' ? (
                    <button onClick={() => updatePayment(order.rowId, 'Paid')} className="w-full py-3 bg-cafe-main text-white rounded-lg font-medium hover:bg-cafe-main/80 transition-colors">
                      Mark as Paid
                    </button>
                  ) : (
                    <button onClick={() => updatePayment(order.rowId, 'Unpaid')} className="w-full py-3 bg-transparent border border-white/10 text-white/50 rounded-lg font-medium hover:bg-white/5 transition-colors">
                      Undo Payment
                    </button>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB CONTENT: RESERVATIONS */}
        {activeTab === 'reservations' && (
          <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map((res, i) => {
              // Extract and clean phone number for direct WhatsApp integration
              let cleanPhone = (res.phone || '').replace(/[^0-9]/g, '');
              if (cleanPhone.length === 10) {
                cleanPhone = '91' + cleanPhone; // Prefix Indian country code by default if 10-digit
              }
              const waUrl = `https://wa.me/${cleanPhone}`;

              return (
                <div key={i} className="bg-[#150d0a] rounded-xl border border-white/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div>
                      <h4 className="text-xl font-bold text-cafe-cream">{res.name}</h4>
                      <p className="text-cafe-beige/60 text-sm flex items-center gap-2 mt-1">
                        <Phone size={14} /> {res.phone}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-cafe-cream/80 bg-black/40 px-3 py-1.5 rounded-md border border-white/5">
                        <Calendar size={12} className="text-cafe-main" />
                        {res.date} • {res.time}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-cafe-cream/80 bg-black/40 px-3 py-1.5 rounded-md border border-white/5">
                        <Users size={12} className="text-cafe-main" />
                        {res.people}
                      </div>
                    </div>

                    {/* Direct Contact Action Buttons (Call / WhatsApp) */}
                    <div className="flex items-center gap-2 pt-2">
                      <a 
                        href={`tel:${res.phone}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cafe-main/15 border border-cafe-main/30 text-cafe-cream text-xs font-semibold hover:bg-cafe-main/35 transition-colors cursor-pointer"
                      >
                        <Phone size={12} className="text-cafe-main" /> Call Now
                      </a>
                      <a 
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold hover:bg-green-500/25 transition-colors cursor-pointer"
                      >
                        <MessageSquare size={12} className="text-green-500" /> WhatsApp
                      </a>
                    </div>
                  </div>
                  
                  <div className="text-left sm:text-right flex sm:flex-col items-start sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-2 border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                    <span className="text-xs text-cafe-beige/40 uppercase tracking-widest sm:block">Table Assigned</span>
                    <div className="w-14 h-14 rounded-full border-2 border-cafe-main flex items-center justify-center bg-cafe-main/10 text-cafe-cream font-bold text-lg">
                      {res.tableNo || '?'}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default ReceptionDashboard;
