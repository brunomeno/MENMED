import { Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-medical-600 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">MEN<span className="text-medical-600">MED</span></span>
            </a>
            <p className="text-slate-500 max-w-sm mb-6 leading-relaxed">
              MENMED is a premium medical equipment supplier. 
              Certified sales and installation of diagnostic hardware for global healthcare facilities.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-medical-600 transition-colors cursor-pointer">
                <Linkedin size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-medical-600 transition-colors cursor-pointer">
                <Twitter size={18} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Equipment Sales</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-medical-600 transition-colors">MRI Machines</a></li>
              <li><a href="#" className="hover:text-medical-600 transition-colors">Ventilators</a></li>
              <li><a href="#" className="hover:text-medical-600 transition-colors">Glucometers</a></li>
              <li><a href="#" className="hover:text-medical-600 transition-colors">Ultraound Systems</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-medical-600 transition-colors">About MENMED</a></li>
              <li><a href="#" className="hover:text-medical-600 transition-colors">Global Network</a></li>
              <li><a href="#" className="hover:text-medical-600 transition-colors">Quality Control</a></li>
              <li><a href="#" className="hover:text-medical-600 transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li>procurement@menmed.tech</li>
              <li>support@menmed.tech</li>
              <li>+2348089770474</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            © 2026 MENMED MEDICAL TECHNOLOGY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Sale</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
