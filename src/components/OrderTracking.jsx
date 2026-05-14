import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChefHat, Coffee, Smile } from 'lucide-react';

const statuses = [
  { id: 1, label: 'Order Received', icon: CheckCircle2 },
  { id: 2, label: 'Preparing', icon: ChefHat },
  { id: 3, label: 'Ready', icon: Coffee },
  { id: 4, label: 'Served', icon: Smile },
];

const OrderTracking = () => {
  const [activeStep, setActiveStep] = useState(2); // Mocking "Preparing" state

  useEffect(() => {
    // Simulate progressing through states for demo purposes
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < 4 ? prev + 1 : 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-cafe-dark relative" id="tracking">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-cafe-cream mb-4">
            Live <span className="text-cafe-main italic">Tracking</span>
          </h2>
          <p className="text-cafe-beige/60">Watch your order come to life.</p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Ambient glow behind tracker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cafe-main/5 blur-[100px] pointer-events-none"></div>
          
          <div className="flex justify-between items-center relative z-10">
            {/* Background Line */}
            <div className="absolute top-8 left-[10%] right-[10%] h-[2px] bg-white/10 -z-10"></div>
            
            {/* Animated Active Line */}
            <motion.div 
              className="absolute top-8 left-[10%] h-[2px] bg-gradient-to-r from-cafe-main to-[#f08a5d] -z-10"
              initial={{ width: '0%' }}
              animate={{ width: `${((activeStep - 1) / (statuses.length - 1)) * 80}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {statuses.map((status, index) => {
              const Icon = status.icon;
              const isActive = index + 1 <= activeStep;
              const isCurrent = index + 1 === activeStep;

              return (
                <div key={status.id} className="flex flex-col items-center gap-4 relative">
                  <motion.div
                    animate={isCurrent ? {
                      boxShadow: ['0 0 0px rgba(107,45,20,0)', '0 0 20px rgba(107,45,20,0.6)', '0 0 0px rgba(107,45,20,0)']
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-500 ${
                      isActive ? 'bg-cafe-main text-white' : 'bg-[#2a1a14] border border-white/10 text-cafe-beige/40'
                    }`}
                  >
                    <Icon size={24} />
                  </motion.div>
                  <span className={`text-sm md:text-base font-medium transition-colors duration-500 ${
                    isActive ? 'text-cafe-cream' : 'text-cafe-beige/40'
                  }`}>
                    {status.label}
                  </span>

                  {/* Pulsing indicator for current step */}
                  {isCurrent && (
                    <motion.div 
                      className="absolute -bottom-6 w-2 h-2 bg-cafe-main rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center border-t border-white/10 pt-8">
            <p className="text-cafe-beige/60 text-sm uppercase tracking-widest mb-2">Order #LC-2048</p>
            <h3 className="text-2xl text-cafe-cream font-heading">
              {activeStep === 1 && "We've received your order."}
              {activeStep === 2 && "Our chefs are preparing your items."}
              {activeStep === 3 && "Your order is ready to be served!"}
              {activeStep === 4 && "Enjoy your meal!"}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderTracking;
