import { motion } from "motion/react";

const stats = [
  { label: "Global Facilities", value: "4,200+" },
  { label: "Products Delivered", value: "128k+" },
  { label: "Years Experience", value: "24" },
  { label: "Certified Engineers", value: "850+" },
];

export default function TrustSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 items-center">
            {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                    <div className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">{stat.value}</div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-tight">{stat.label}</div>
                </div>
            ))}
        </div>

        <div className="mt-20 pt-16 border-t border-slate-200">
            <div className="text-center mb-10">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Institutional Partners</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-30 grayscale contrast-125">
                {/* Simulated partner logos using text for now */}
                <div className="text-2xl font-black italic tracking-tighter">GLOBAL HEALTH</div>
                <div className="text-2xl font-bold tracking-[0.2em]">MEDITECH</div>
                <div className="text-2xl font-serif font-bold italic">Ascension</div>
                <div className="text-2xl font-black">PHOENIX Labs</div>
                <div className="text-2xl font-mono font-bold tracking-widest">N-TECH</div>
            </div>
        </div>
      </div>
    </section>
  );
}
