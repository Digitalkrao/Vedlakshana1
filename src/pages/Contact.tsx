import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Instagram, Facebook, Send } from 'lucide-react';
import { motion } from 'motion/react';

const Contact = () => {
  return (
    <div className="bg-[#FBFAF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Info */}
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="uppercase tracking-[0.4em] text-[10px] font-bold text-gray-400 mb-6 block"
            >
              Get In Touch
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-7xl font-serif font-bold text-gray-900 mb-10 leading-tight"
            >
              We're here to <br />help you thrive.
            </motion.h1>
            
            <p className="text-lg text-gray-600 font-medium leading-relaxed mb-12 max-w-md">
              Whether you have questions about our Bilona process, wholesale inquiries, or just want to share your A2 Ghee journey, we'd love to hear from you.
            </p>

            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-stone-100">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                  <p className="text-gray-500 font-medium">info@vedlakshana.org</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">Response within 24 hours</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-stone-100">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Call Our Gaushala</h4>
                  <p className="text-gray-500 font-medium">+91 98765 43210</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">Mon - Sat, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-stone-100">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Visit Us</h4>
                  <p className="text-gray-500 font-medium max-w-xs">Vedlakshana Gaushala, Plot 12, Agro Hub, Haryana, IN - 134109</p>
                  <a href="#" className="text-primary text-xs font-bold uppercase tracking-widest mt-3 inline-block hover:underline underline-offset-4">Get Directions</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-stone-200 border border-stone-100"
          >
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Name</label>
                  <input type="text" className="w-full px-6 py-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Email</label>
                  <input type="email" className="w-full px-6 py-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Subject</label>
                <select className="w-full px-6 py-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none">
                  <option>General Inquiry</option>
                  <option>Wholesale/B2B</option>
                  <option>Ghee Quality Question</option>
                  <option>Gaushala Visit</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Message</label>
                <textarea rows={5} className="w-full px-6 py-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none" />
              </div>
              <button className="w-full bg-primary text-white py-5 rounded-3xl font-bold text-lg hover:bg-primary-light transition-all flex items-center justify-center space-x-3 shadow-lg shadow-primary/20">
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
