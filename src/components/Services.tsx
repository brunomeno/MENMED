import { motion } from "motion/react";
import { Settings, PenTool, Layout, Network } from "lucide-react";

const services = [
  {
    title: "Equipment Installation",
    description: "Professional assembly and calibration of heavy diagnostic hardware by certified engineers.",
    icon: Layout,
  },
  {
    title: "Repair & Spare Parts",
    description: "Direct access to original manufacturer parts and 24/7 emergency repair services.",
    icon: Settings,
  },
  {
    title: "Inventory Training",
    description: "Staff onboarding for new ventilators, monitors, and surgical tools.",
    icon: PenTool,
  },
  {
    title: "Cold Chain Supply",
    description: "Specialized logistics for sensitive diagnostic kits and laboratory analyzers.",
    icon: Network,
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-white overflow-hidden" id="support">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {services.map((s, idx) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all cursor-default"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-medical-600 shadow-sm mb-6">
                    <s.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-bold">{s.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Background Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-medical-600/5 blur-3xl rounded-full" />
          </div>

          <div>
            <span className="text-xs font-black text-medical-600 uppercase tracking-[0.2em] mb-4 block">Certified Supply Chain</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">Full-Service Equipment <br />Sales & Logistics</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10">
              Procuring equipment for your facility should be seamless. MENMED provides the hardware, 
              the installation, and the long-term part support your team needs to stay operational.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-medical-600 flex items-center justify-center text-white text-[10px] font-bold">1</div>
                <div>
                  <div className="font-bold text-slate-900">Technical Advisory</div>
                  <p className="text-sm text-slate-500">Expert guidance on technology roadmaps and equipment scaling.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-medical-600 flex items-center justify-center text-white text-[10px] font-bold">2</div>
                <div>
                  <div className="font-bold text-slate-900">Rapid Deployment</div>
                  <p className="text-sm text-slate-500">Logistics optimized for sensitive medical hardware across 120+ countries.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-medical-600 flex items-center justify-center text-white text-[10px] font-bold">3</div>
                <div>
                  <div className="font-bold text-slate-900">Compliance Assurance</div>
                  <p className="text-sm text-slate-500">Continuous monitoring of equipment for global regulatory adherence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
