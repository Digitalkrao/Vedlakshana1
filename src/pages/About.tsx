import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, Sun, Leaf, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-stone-50 overflow-hidden">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/aboutgaushala/1920/1080" 
            alt="Gaushala" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.4em] text-sm font-bold text-secondary mb-6 block"
          >
            Since 2012
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif font-bold mb-8"
          >
            Sacred Tradition. <br />Ethical Compassion.
          </motion.h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-8 leading-tight">Our Mission: To Restore the Divine Status of Desi Cows</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed font-medium italic">
              "We believe that a happy cow produces the most nutritious milk. Our Gaushala is a testament to the fact that commercial viability and deep spiritual care can coexist."
            </p>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">The Calf's Right First</h4>
                  <p className="text-sm text-gray-500 font-medium">Unlike industrial dairies, we ensure the calf is fully satiated before we collect any milk for ghee production.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Zero Chemical Policy</h4>
                  <p className="text-sm text-gray-500 font-medium">Our cows graze on pesticide-free pastures and are never given hormones or antibiotics for yield enhancement.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/seed/gir/800/1000" alt="Gir Cow" className="rounded-[4rem] shadow-2xl" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-10 -left-10 bg-primary p-12 rounded-[3rem] text-white shadow-xl max-w-xs">
              <p className="text-5xl font-serif font-bold mb-2">500+</p>
              <p className="uppercase tracking-widest text-xs font-bold text-white/70">Native Gir Cows Under Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif font-bold mb-4">The Vedic Bilona Process</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Fresh A2 Milk", desc: "Sourced daily from our healthy Gir cows during Brahma Muhurta." },
              { step: "02", title: "Whole Curd Churning", desc: "Milk is converted to curd and then hand-churned (Bilona) clockwise-anticlockwise." },
              { step: "03", title: "Slow Fire Extraction", desc: "Makhan is melted over low heat (traditionally in earthen pots) to retain nutrients." }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <span className="text-8xl font-serif font-bold text-white/5 absolute -top-12 -left-4">{item.step}</span>
                <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">{item.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed relative z-10">{item.desc}</p>
                <div className="mt-8 h-1 w-0 bg-secondary group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
