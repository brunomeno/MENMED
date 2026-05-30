/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import CategoryGrid from "./components/CategoryGrid.tsx";
import TrustSection from "./components/TrustSection.tsx";
import FeaturedProducts from "./components/FeaturedProducts.tsx";
import Services from "./components/Services.tsx";
import QuoteForm from "./components/QuoteForm.tsx";
import Footer from "./components/Footer.tsx";
import AIAssistant from "./components/AIAssistant.tsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustSection />
        <CategoryGrid />
        <FeaturedProducts />
        <Services />
        <QuoteForm />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
