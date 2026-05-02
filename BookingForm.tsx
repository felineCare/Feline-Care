import React from 'react';
import { motion } from 'motion/react';
import { Send, Calendar as CalendarIcon, Clock, User, Mail, MessageSquare, Heart, Cat, ChevronDown } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

export default function BookingForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorHeader, setErrorHeader] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    ownerName: '',
    petName: '',
    catAge: '',
    ageUnit: 'Years',
    gender: 'Male',
    email: '', // Keep it in state but not required
    date: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user types
    if (errorMessage) {
      setErrorHeader(null);
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorHeader(null);
    setErrorMessage(null);
    
    console.log('Submitting booking...');
    
    try {
      // 0. Pre-check Server Connectivity
      console.log('Checking server connectivity...');
      try {
        const pingRes = await fetch('/api/ping');
        if (!pingRes.ok) throw new Error('Server unreachable');
        console.log('Server is alive');
      } catch (e) {
        console.warn('Server offline, notifications will fail but trying Firestore anyway...', e);
      }

      // 1. Save to Firestore
      console.log('Saving to Firestore...');
      const path = 'appointments';
      await addDoc(collection(db, path), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      console.log('Saved to Firestore successfully');

      // 2. Call the server API for Email/Telegram notifications
      try {
        console.log('Triggering server notifications...');
        const response = await fetch('/api/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          console.error('Server error response:', result);
          setErrorHeader('Notification System Warning');
          setErrorMessage('The booking was saved to our database, but the notification system (Email/Telegram) failed. Please contact us directly if you don\'t hear back.');
        } else if (result.warnings) {
          console.warn('Notification warnings:', result.warnings);
          setErrorHeader('Configuration Warning');
          setErrorMessage(`The appointment is saved, but alerts failed: ${result.warnings}. Please check your Secrets in AI Studio Settings.`);
        } else {
          console.log('All notifications sent successfully');
        }
      } catch (err) {
        console.error('Notification failed to reach server:', err);
        setErrorHeader('Network Warning');
        setErrorMessage('Booking was saved, but we couldn\'t connect to the notification server. This usually happens during server restart.');
      }

      // If we got here and didn't crash, we consider it a success in terms of saving data
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Submission error:', error);
      setErrorHeader('Booking Failed');
      
      let msg = 'An error occurred while saving your booking. Please check your internet and try again.';
      if (error.message?.includes('permission-denied') || error.message?.includes('insufficient-permissions')) {
        msg = 'Database permission denied. This may be due to missing a required field like Email or an invalid format.';
      }
      setErrorMessage(msg);
      
      try {
        handleFirestoreError(error, OperationType.CREATE, 'appointments');
      } catch (e) {
        // Already handled logging in handleFirestoreError
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="book" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-[3rem] overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left: Info */}
            <div className="p-12 lg:p-20 bg-brand-navy text-white relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-20 right-20 w-40 h-40 border-4 border-white rounded-full" />
                <div className="absolute bottom-40 left-10 w-20 h-20 border-2 border-white rounded-full" />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                  Book Your <span className="text-brand-orange">Consultation</span>
                </h2>
                <p className="text-white/70 text-lg mb-12 leading-relaxed">
                  Ready to give your cat the best care possible? Fill out the form below and our team will get in touch to confirm your appointment.
                </p>

                {/* Quote Box */}
                <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-brand-orange/20 transition-colors" />
                  <p className="text-xl font-display italic text-white/90 leading-relaxed relative z-10">
                    "Providing professional medical care for cats, and emotional support for the humans they tolerate."
                  </p>
                  <div className="mt-4 flex items-center gap-2 relative z-10">
                    <div className="w-10 h-[1px] bg-brand-orange" />
                    <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Our Philosophy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="p-12 lg:p-20 bg-white">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                    <Send className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-brand-navy">Request Received!</h3>
                  <p className="text-brand-navy/60">
                    Thank you for trusting Feline Care. We have received your request and will get in touch with you shortly.
                  </p>
                  
                  {errorMessage && (
                    <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-xl text-left">
                      <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-1">{errorHeader || 'Note'}</p>
                      <p className="text-sm text-orange-700">{errorMessage}</p>
                    </div>
                  )}

                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setErrorHeader(null);
                      setErrorMessage(null);
                    }}
                    className="text-brand-navy/40 text-sm hover:text-brand-orange transition-colors"
                  >
                    Book another appointment
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                      <p className="text-xs font-bold text-red-800 uppercase tracking-wider mb-1">{errorHeader || 'Error'}</p>
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-navy/50 uppercase tracking-widest px-1">Your Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30" size={18} />
                        <input 
                          required 
                          type="text" 
                          name="ownerName"
                          value={formData.ownerName}
                          onChange={handleChange}
                          placeholder="" 
                          className="w-full pl-12 pr-4 py-4 bg-brand-sand/50 border border-brand-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-navy/50 uppercase tracking-widest px-1">Cat's Name</label>
                      <div className="relative">
                        <Cat className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30" size={18} />
                        <input 
                          required 
                          type="text" 
                          name="petName"
                          value={formData.petName}
                          onChange={handleChange}
                          placeholder="" 
                          className="w-full pl-12 pr-4 py-4 bg-brand-sand/50 border border-brand-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-navy/50 uppercase tracking-widest px-1">Cat's Age</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30" size={18} />
                          <input 
                            required 
                            type="number" 
                            name="catAge"
                            value={formData.catAge}
                            onChange={handleChange}
                            placeholder="" 
                            min="0"
                            className="w-full pl-12 pr-4 py-4 bg-brand-sand/50 border border-brand-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all placeholder:text-brand-navy/20" 
                          />
                        </div>
                        <div className="relative w-36">
                          <select 
                            name="ageUnit"
                            value={formData.ageUnit}
                            onChange={handleChange}
                            className="w-full pl-5 pr-10 py-4 bg-brand-sand/50 border border-brand-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange appearance-none transition-all cursor-pointer font-medium text-brand-navy/70"
                          >
                            <option value="Years">Years</option>
                            <option value="Months">Months</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-navy/30 pointer-events-none" size={16} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-navy/50 uppercase tracking-widest px-1">Cat's Gender</label>
                      <div className="grid grid-cols-2 gap-4 h-[60px]">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, gender: 'Male' }))}
                          className={`flex items-center justify-center gap-3 rounded-2xl border transition-all ${
                            formData.gender === 'Male' 
                              ? 'bg-brand-navy text-white border-brand-navy shadow-lg shadow-brand-navy/20' 
                              : 'bg-brand-sand/50 border-brand-navy/5 text-brand-navy/40 hover:bg-brand-sand'
                          }`}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="14" r="5"/><path d="M15 9l5-5"/><path d="M15 4h5v5"/></svg>
                          <span className="font-bold text-sm">Male</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, gender: 'Female' }))}
                          className={`flex items-center justify-center gap-3 rounded-2xl border transition-all ${
                            formData.gender === 'Female' 
                              ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/20' 
                              : 'bg-brand-sand/50 border-brand-navy/5 text-brand-navy/40 hover:bg-brand-sand'
                          }`}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6"/><path d="M12 15v7"/><path d="M9 19h6"/></svg>
                          <span className="font-bold text-sm">Female</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-navy/50 uppercase tracking-widest px-1">Email (Optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30" size={18} />
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Owner's email" 
                        className="w-full pl-12 pr-4 py-4 bg-brand-sand/50 border border-brand-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all" 
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-navy/50 uppercase tracking-widest px-1">Choose a suitable date</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30" size={18} />
                        <input 
                           required 
                          type="date" 
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-brand-sand/50 border border-brand-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-navy/50 uppercase tracking-widest px-1">Reason for Visit</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 text-brand-navy/30" size={18} />
                      <textarea 
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4} 
                        placeholder="Tell us about your cat and the reason for the visit..." 
                        className="w-full pl-12 pr-4 py-4 bg-brand-sand/50 border border-brand-navy/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="btn-primary w-full py-5 text-lg shadow-xl shadow-brand-orange/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Heart size={20} />
                      </motion.div>
                    ) : (
                      <>
                        Submit Request
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ size }: { size: number }) {
  return <Send size={size} />;
}
