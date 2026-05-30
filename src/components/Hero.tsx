import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Globe, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden silver-gradient">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-600/10 text-medical-700 text-xs font-bold uppercase tracking-wider mb-6">
                Certified Medical Equipment Supplier
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-8">
                Premium Medical <span className="text-medical-600">Equipment</span> for Every Facility.
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-10">
                MENMED supplies hospitals, private clinics, and diagnostic centers with 
                high-performance Ventilators, MRI machines, Ultrasound systems, and Point-of-Care tools.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="#equipment" className="w-full sm:w-auto px-8 py-4 bg-medical-600 text-white rounded-xl font-semibold hover:bg-medical-700 transition-all shadow-lg shadow-medical-600/20 flex items-center justify-center gap-3">
                  Shop Equipment
                  <ArrowRight size={20} />
                </a>
                <a href="#quote" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                  Request Bulk Quote
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-16 flex flex-wrap gap-8"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-medical-600" size={20} />
                <span className="text-sm font-medium text-slate-600">ISO 13485 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="text-medical-600" size={20} />
                <span className="text-sm font-medium text-slate-600">Global Logistics</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-medical-600" size={20} />
                <span className="text-sm font-medium text-slate-600">24/7 Technical Support</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-square"
            >
              {/* This would be a high-quality medical image of an MRI or Ultrasound */}
              <div className="absolute inset-0 bg-slate-200 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2070" 
                  alt="Modern MRI Scanner"
                  className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                />
              </div>
              
              {/* Floating Tech Elements to give that "Apple" feel */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-[200px]"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                   <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</div>
                  <div className="text-sm font-bold text-slate-900 leading-none">Enterprise Secure</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
