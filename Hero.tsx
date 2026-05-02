import { motion } from 'motion/react';
import { ArrowRight, Stethoscope } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-brand-sand">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-[-10%] w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-[-5%] w-72 h-72 bg-brand-navy/5 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-navy leading-[1.1] mb-6">
              Expert <span className="text-brand-orange">Feline Home Care</span> for Your Best Friend
            </h1>
            <p className="text-lg md:text-xl text-brand-navy/70 mb-10 max-w-lg leading-relaxed">
              Specialized veterinary care exclusively for cats, delivered right to your doorstep. We ensure your cat's comfort and health in their own environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#book" className="btn-primary text-lg">
                Book an Appointment
                <ArrowRight size={20} />
              </a>
              <a href="#services" className="btn-secondary text-lg flex items-center gap-2 group">
                <Stethoscope size={20} className="text-brand-orange" />
                View Services
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 py-3 px-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 inline-flex shadow-sm"
            >
              <div className="relative">
                <img 
                  src="https://drive.google.com/thumbnail?id=1_pmE6yxWPM1jlOH9oYXNd26q_bka_Ax9&sz=w500" 
                  className="w-14 h-14 rounded-full border-2 border-brand-orange object-cover shadow-inner" 
                  alt="Dr. Abdullah Profile" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=140&h=140&auto=format&fit=crop";
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest mb-0.5">Clinic Director</p>
                <p className="text-sm font-bold text-brand-navy">Dr. Abdullah</p>
                <p className="text-[11px] text-brand-navy/60 font-medium leading-tight">
                  Feline healthcare specialist <br /> Medical trainer
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-white/20 backdrop-blur-sm">
              <img
                src="https://drive.google.com/thumbnail?id=1_pmE6yxWPM1jlOH9oYXNd26q_bka_Ax9&sz=w1000"
                alt="Dr. Abdullah"
                className="w-full h-auto object-cover max-h-[600px]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1622253692010-333f2da60c8d?q=80&w=2070&auto=format&fit=crop";
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
