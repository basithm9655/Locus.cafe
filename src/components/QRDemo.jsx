import React from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Smartphone } from 'lucide-react';

const QRDemo = () => {
  return (
    <section className="py-24 bg-cafe-dark relative overflow-hidden" id="qr-demo">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cafe-main/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cafe-cream mb-6">
              Seamless <span className="text-cafe-main italic">Ordering</span>
            </h2>
            <p className="text-cafe-beige/80 text-lg mb-8 max-w-md leading-relaxed font-light">
              Experience the future of cafe dining. No waiting for menus. 
              Just scan, browse our cinematic digital menu, and order directly from your table.
            </p>
            
            <div className="space-y-6">
              {[
                { step: '01', title: 'Scan the QR Code on your table' },
                { step: '02', title: 'Browse the visual digital menu' },
                { step: '03', title: 'Place order & track live status' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-2xl font-heading text-cafe-main/40">{item.step}</span>
                  <span className="text-cafe-cream text-lg">{item.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative flex justify-center items-center"
          >
            {/* Phone Mockup Frame */}
            <div className="relative w-[300px] h-[600px] rounded-[3rem] border-8 border-gray-900 bg-black shadow-2xl overflow-hidden z-10 flex flex-col items-center justify-center">
              {/* Screen Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-cafe-dark to-[#1a100c] flex flex-col items-center justify-center p-8 text-center">
                <Smartphone className="text-cafe-main/30 w-24 h-24 mb-8" />
                <h3 className="text-2xl font-bold text-cafe-cream mb-2">Table 04</h3>
                <p className="text-cafe-beige/60 text-sm">Ready to order?</p>
              </div>

              {/* Floating QR Card */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-20 glass-card p-6 rounded-2xl shadow-[0_0_40px_rgba(107,45,20,0.3)] border border-cafe-main/30"
              >
                <div className="relative w-32 h-32 bg-white rounded-xl p-2">
                  {/* Fake QR pattern */}
                  <div className="w-full h-full border-4 border-black p-1 flex flex-wrap gap-1">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`w-[22%] h-[22%] bg-black ${i%3===0 ? 'opacity-0' : ''}`}></div>
                    ))}
                  </div>
                  {/* Scanning Laser */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-1 bg-cafe-main shadow-[0_0_15px_rgba(107,45,20,1)] z-30"
                  />
                </div>
              </motion.div>
            </div>
            
            {/* Background blur effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cafe-main/10 rounded-full blur-[80px] -z-10"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default QRDemo;
