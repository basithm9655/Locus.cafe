import React from 'react';
import { motion } from 'framer-motion';
import { Camera, MessageCircle, Globe, Phone, Clock, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-[#020100] border-t border-white/[0.05]">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-14">
          
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="/logo.png"
              alt="Cafe Locus"
              className="h-14 sm:h-16 w-auto object-contain mb-4"
              style={{ filter: 'drop-shadow(0 0 14px rgba(107,45,20,0.5))' }}
            />
            <p className="text-cafe-beige/40 text-xs sm:text-sm leading-relaxed font-light max-w-xs">
              A premium Japanese-inspired cafe experience in the heart of Coimbatore. Where every cup tells a story.
            </p>
            <div className="flex gap-4 mt-6">
              {[Camera, MessageCircle, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-cafe-beige/40 hover:border-cafe-main hover:text-cafe-main transition-all duration-300 hover:scale-110"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-cafe-cream text-xs font-semibold tracking-[0.2em] uppercase mb-5">Navigate</h4>
            <ul className="space-y-3">
              {[['Menu', 'menu'], ['Experience', 'experience'], ['Reviews', 'reviews'], ['Location', 'location']].map(([label, id]) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-cafe-beige/40 text-sm hover:text-cafe-cream transition-colors duration-300 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-cafe-cream text-xs font-semibold tracking-[0.2em] uppercase mb-5">Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cafe-beige/40 text-sm">
                <Clock size={12} className="text-cafe-main shrink-0" />
                Mon – Fri: 10 AM – 11 PM
              </div>
              <div className="flex items-center gap-2 text-cafe-beige/40 text-sm">
                <Clock size={12} className="text-cafe-main shrink-0" />
                Sat – Sun: 9 AM – 11 PM
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cafe-cream text-xs font-semibold tracking-[0.2em] uppercase mb-5">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-start gap-2 text-cafe-beige/40 text-sm hover:text-cafe-cream transition-colors duration-300">
                <Phone size={12} className="text-cafe-main mt-0.5 shrink-0" />
                +91 98765 43210
              </a>
              <div className="flex items-start gap-2 text-cafe-beige/40 text-sm">
                <MapPin size={12} className="text-cafe-main mt-0.5 shrink-0" />
                <span>123 Avinashi Rd,<br/>Peelamedu, Coimbatore</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6 sm:mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-cafe-beige/25 text-[11px] sm:text-xs">
          <p>&copy; {new Date().getFullYear()} Cafe Locus. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-cafe-cream/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cafe-cream/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
