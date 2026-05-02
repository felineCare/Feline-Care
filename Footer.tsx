import { Youtube, Facebook, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer id="about" className="bg-brand-navy text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="inline-block bg-white p-3 rounded-2xl">
              <Logo />
            </div>
            <p className="text-white/60 leading-relaxed">
              Leading the standard in specialized feline home care. <br />
              Dedicated to the health and happiness of every cat.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://youtube.com/@feline.care23?si=mUaQmaqs2QhX1qdP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61580460344026" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://wa.me/201124333193" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>


          <div>
            <h4 className="text-lg font-display font-bold mb-8">Contact Us</h4>
            <ul className="space-y-6 text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-orange mt-1 shrink-0" size={18} />
                <span>Cairo, Egypt</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Phone className="text-brand-orange shrink-0" size={18} />
                  <MessageCircle className="text-brand-orange shrink-0" size={18} />
                </div>
                <span>01124333193</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-brand-orange shrink-0" size={18} />
                <span>abdullah.researcher99@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-6 text-xs font-bold text-white/40 uppercase tracking-widest">
          <p>© 2026 Feline Care Veterinary Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
