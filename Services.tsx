import { motion } from 'motion/react';
import { Syringe, Stethoscope, Scissors, Heart, Shield, Clock } from 'lucide-react';

const services = [
  {
    id: 'routine',
    title: 'Check-ups',
    description: 'Comprehensive health assessments in the comfort of your home, reducing cat stress.',
    icon: <Stethoscope size={24} />,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'vax',
    title: 'Vaccination',
    description: 'Safe and convenient vaccinations administered by feline specialists during home visits.',
    icon: <Syringe size={24} />,
    color: 'bg-green-50 text-green-600',
  },
  {
    id: 'followup',
    title: 'Regular Follow-up',
    description: 'Ongoing monitoring and evaluation of your cat\'s progress and chronic condition management.',
    icon: <Clock size={24} />,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    id: 'patientcare',
    title: 'Patient Care',
    description: 'Dedicated nursing and therapeutic care for recovering or elderly cats at home.',
    icon: <Heart size={24} />,
    color: 'bg-red-50 text-red-600',
  },
  {
    id: 'grooming',
    title: 'Grooming',
    description: 'Personalized grooming sessions designed to keep your cat comfortable and clean.',
    icon: <Scissors size={24} />,
    color: 'bg-orange-50 text-orange-600',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-brand-navy mb-4"
          >
            Feline Home Visit Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-navy/60 max-w-2xl mx-auto"
          >
            We don't just see cats; we understand them. Our services are designed to minimize stress and maximize feline wellness.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl border border-brand-navy/10 hover:border-brand-orange/30 hover:shadow-xl transition-all group bg-brand-sand/30"
            >
              <div className={`w-12 h-12 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-navy mb-3">
                {service.title}
              </h3>
              <p className="text-brand-navy/70 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
