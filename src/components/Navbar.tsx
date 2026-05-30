import { motion } from "motion/react";
import { ChevronRight, Search, Menu, Phone } from "lucide-react";
import { ReactNode } from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-medical-600 rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">MEN<span className="text-medical-600">MED</span></span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#equipment">Medical Equipment</NavLink>
            <NavLink href="#imaging">Imaging Systems</NavLink>
            <NavLink href="#poc">Point of Care</NavLink>
            <NavLink href="#support">Support & Parts</NavLink>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-500">
            <Phone size={16} />
            <span>Procurement Hotline: +2348089770474</span>
          </div>
          
          <a href="#quote" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
            Request Equipment Quote
            <ChevronRight size={16} />
          </a>

          <button className="md:hidden text-slate-900">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-sm font-medium text-slate-600 hover:text-medical-600 transition-colors"
    >
      {children}
    </a>
  );
}
