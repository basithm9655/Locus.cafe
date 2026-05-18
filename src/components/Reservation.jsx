import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, User, Phone, CheckCircle2, MapPin, Mail } from 'lucide-react';

const Reservation = () => {
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  const [submitted, setSubmitted] = useState(false);
  const [tableNo, setTableNo] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get("table");
    if (table) {
      setTableNo(table);
    }
  }, []);

  return (
    <section id="reservation" className="py-24 relative overflow-hidden bg-cafe-dark">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cafe-main/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-cafe-main"></div>
              <span className="text-cafe-main uppercase tracking-widest text-sm font-medium">Book a Table</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-cafe-cream mb-6 leading-tight">
              Reserve Your <br />
              <span className="italic text-cafe-beige">Experience</span>
            </h2>
            
            <p className="text-cafe-cream/70 mb-10 text-lg max-w-md">
              Secure your spot at Cafe Locus. Whether it's an intimate coffee date or a gathering with friends, we'll ensure your table is waiting.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-cafe-main/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-cafe-main" />
                </div>
                <div>
                  <h4 className="text-cafe-cream text-lg mb-1">Need help?</h4>
                  <p className="text-cafe-cream/60">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-cafe-main/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-cafe-main" />
                </div>
                <div>
                  <h4 className="text-cafe-cream text-lg mb-1">Location</h4>
                  <p className="text-cafe-cream/60">123 Brew Lane, Coffee District, Coimbatore</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
              <iframe name="hidden_iframe" id="hidden_iframe" style={{display: 'none'}} onLoad={() => {
                if(status === 'submitting') {
                  setStatus('success');
                  setSubmitted(true);
                  setTimeout(() => {
                    setStatus('idle');
                    setSubmitted(false);
                    document.getElementById("reservationForm").reset();
                  }, 5000);
                }
              }}></iframe>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-16 text-center"
                >
                  <div className="w-20 h-20 bg-cafe-main/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-cafe-main" />
                  </div>
                  <h3 className="text-2xl text-cafe-cream mb-2">Reservation Requested</h3>
                  <p className="text-cafe-cream/70">
                    Thank you! We've received your request. A confirmation email will be sent shortly!
                  </p>
                </motion.div>
              ) : (
                <form 
                  id="reservationForm"
                  action="https://docs.google.com/forms/d/e/1FAIpQLSdKyPETIdjMOdHY80hmNgXVoj6orFoWBrCctwmNRIpzPNfrtA/formResponse" 
                  method="POST" 
                  target="hidden_iframe"
                  onSubmit={() => setStatus('submitting')}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm text-cafe-cream/70 uppercase tracking-wider">Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cafe-cream/40" />
                        <input 
                          type="text" 
                          name="entry.2005620554" 
                          required
                          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-cafe-cream focus:outline-none focus:border-cafe-main transition-colors placeholder:text-cafe-cream/30"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm text-cafe-cream/70 uppercase tracking-wider">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cafe-cream/40" />
                        <input 
                          type="email" 
                          name="entry.1611942278" 
                          required
                          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-cafe-cream focus:outline-none focus:border-cafe-main transition-colors placeholder:text-cafe-cream/30"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-sm text-cafe-cream/70 uppercase tracking-wider">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cafe-cream/40" />
                        <input 
                          type="tel" 
                          name="entry.1045781291" 
                          required
                          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-cafe-cream focus:outline-none focus:border-cafe-main transition-colors placeholder:text-cafe-cream/30"
                          placeholder="+91 00000 00000"
                        />
                      </div>
                    </div>

                    {/* People */}
                    <div className="space-y-2">
                      <label className="text-sm text-cafe-cream/70 uppercase tracking-wider">People</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cafe-cream/40" />
                        <select 
                          name="entry.493578863" 
                          required
                          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-cafe-cream focus:outline-none focus:border-cafe-main transition-colors appearance-none"
                        >
                          <option value="" className="bg-cafe-dark">Select guests</option>
                          <option value="1 Person" className="bg-cafe-dark">1 Person</option>
                          <option value="2 People" className="bg-cafe-dark">2 People</option>
                          <option value="3 People" className="bg-cafe-dark">3 People</option>
                          <option value="4 People" className="bg-cafe-dark">4 People</option>
                          <option value="5+ People" className="bg-cafe-dark">5+ People</option>
                        </select>
                      </div>
                    </div>

                    {/* Table No (Optional) */}
                    <div className="space-y-2">
                      <label className="text-sm text-cafe-cream/70 uppercase tracking-wider">Table No <span className="text-xs text-cafe-cream/40 normal-case">(Optional)</span></label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cafe-cream/40 font-serif text-lg leading-none italic">#</div>
                        <input 
                          type="text" 
                          name="entry.526511947" 
                          value={tableNo}
                          onChange={(e) => setTableNo(e.target.value)}
                          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-cafe-cream focus:outline-none focus:border-cafe-main transition-colors placeholder:text-cafe-cream/30"
                          placeholder="e.g. 5"
                        />
                      </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-sm text-cafe-cream/70 uppercase tracking-wider">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cafe-cream/40" />
                        <input 
                          type="date" 
                          name="entry.177104141" 
                          required
                          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-cafe-cream focus:outline-none focus:border-cafe-main transition-colors [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label className="text-sm text-cafe-cream/70 uppercase tracking-wider">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cafe-cream/40" />
                        <input 
                          type="time" 
                          name="entry.738295159" 
                          required
                          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-cafe-cream focus:outline-none focus:border-cafe-main transition-colors [color-scheme:dark]"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-cafe-main hover:bg-cafe-beige hover:text-cafe-dark text-white rounded-xl py-4 font-medium transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                  >
                    {status === 'submitting' ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Confirm Reservation'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Reservation;
