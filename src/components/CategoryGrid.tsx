import { motion } from "motion/react";
import { Activity, Beaker, Brain, Heart, Microscope, Stethoscope } from "lucide-react";

const categories = [
  {
    title: "Diagnostic Imaging",
    description: "High-field MRI Machines, 128-Slice CT Scanners, and Digital X-Ray units.",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Life Support",
    description: "ICU Ventilators, heavy-duty ICU Beds, and automated external defibrillators.",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1581594658553-3595d0337824?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Point of Care",
    description: "Portable pulse oximeters, blood glucose monitors, and point-of-care analyzers.",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Surgical Equipment",
    description: "Hydraulic Surgical Tables, precision LED lighting, and autoclave sterilizers.",
    icon: Microscope,
    image: "https://images.unsplash.com/photo-1579154236594-c14846505927?auto=format&fit=crop&q=80&w=1200",
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-white" id="imaging">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Hospital & Clinic Equipment</h2>
            <p className="text-slate-600 text-lg">
              We manage the full procurement cycle for healthcare facilities. From large MRI installations 
              to bulk clinic supply of essential diagnostic tools.
            </p>
          </div>
          <button className="text-medical-600 font-bold hover:text-medical-700 transition-colors flex items-center gap-2 group">
            View All Categories
            <div className="w-8 h-px bg-medical-600 group-hover:w-12 transition-all" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl group-hover:shadow-medical-600/10 transition-all duration-500">
                <motion.img 
                  src={cat.image} 
                  alt={cat.title}
                  className="w-full h-full object-cover transition-all duration-700 brightness-[0.85] group-hover:brightness-100 group-hover:scale-110"
                />
                
                {/* Silver Overlay */}
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                
                <div className="absolute top-4 left-4 glass p-2.5 rounded-xl shadow-lg z-10 border border-white/40">
                  <cat.icon size={20} className="text-medical-600" />
                </div>

                {/* Subtle Hover Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                  <div className="glass px-5 py-2.5 rounded-full text-xs font-bold text-slate-900 shadow-xl border border-white/60 transform translate-y-4 group-hover:translate-y-0 transition-all">
                    View Sales Details
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-medical-600 transition-colors">{cat.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{cat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
