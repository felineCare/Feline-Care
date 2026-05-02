import React from 'react';
import { Menu, X, Calendar, Youtube, Facebook, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Knowledge', href: '#knowledge' },
    { name: 'About', href: '#about' },
  ];

  const socialLinks = [
    { icon: Youtube, href: 'https://youtube.com/@feline.care23?si=mUaQmaqs2QhX1qdP', color: 'hover:text-[#FF0000]' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61580460344026', color: 'hover:text-[#1877F2]' },
    { icon: MessageCircle, href: 'https://wa.me/201124333193', color: 'hover:text-[#25D366]' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-brand-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-brand-navy/70 hover:text-brand-orange transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="#book" className="btn-primary py-2 text-sm">
              <Calendar size={18} />
              Book Appointment
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-navy p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-brand-navy/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-semibold text-brand-navy hover:bg-brand-sand transition-colors rounded-xl"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#book"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full mt-4"
              >
                <Calendar size={18} />
                Book Now
              </a>

              <div className="pt-8 flex items-center justify-center gap-8 border-t border-brand-navy/5 mt-4">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-brand-navy/40 transition-colors p-2 ${link.color}`}
                  >
                    <link.icon size={28} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
