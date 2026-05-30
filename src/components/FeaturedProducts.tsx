import { motion } from "motion/react";
import { Plus, Info } from "lucide-react";

const products = [
  {
    id: "mri-3t",
    name: "Lumax 3T MRI Machine",
    category: "Diagnostic Imaging",
    specs: ["High-resolution imaging", "Advanced Oncology Suite", "Full installation included"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ventilator-v5",
    name: "AeroForce V5 ICU Ventilator",
    category: "Critical Care",
    specs: ["Pediatric & Adult modes", "Mobile battery backup", "Synchronized breathing AI"],
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "glucometer-pro",
    name: "GlucoCheck Pro Analyzer",
    category: "Diagnostics",
    specs: ["5-second test time", "Hospital data sync", "Bulk strips available"],
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=800",
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-white border-t border-slate-100" id="equipment">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Best-Selling Hospital Equipment</h2>
          <p className="text-slate-500 text-lg">
            Direct supply of certified medical hardware for hospitals and diagnostic centers. 
            All units are in-stock and ready for immediate deployment.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {products.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:border-medical-600/30 transition-all hover:shadow-2xl hover:shadow-slate-200/50"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-4 right-4 py-1.5 px-3 rounded-full glass text-[10px] font-bold text-medical-700 uppercase tracking-widest uppercase">
                  {p.category}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{p.name}</h3>
                
                <div className="space-y-3 mb-8">
                  {p.specs.map(spec => (
                    <div key={spec} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-medical-600/40" />
                      {spec}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex-1 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <Info size={16} />
                    Specifications
                  </button>
                  <button className="w-12 h-12 bg-medical-600 text-white rounded-xl flex items-center justify-center hover:bg-medical-700 transition-all group-hover:scale-105">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
