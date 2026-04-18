import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-lg font-bold">V</span>
              </div>
              <span className="text-xl font-serif font-bold text-primary">Vedlakshana</span>
            </Link>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed italic">
              "Honoring the ancient wisdom of A2 Ghee and the sacred bond between humans and Gir cows at our ethical Gaushala."
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-all shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-all shadow-sm">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-all shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-bold text-gray-900 mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-sm text-gray-600 hover:text-primary transition-colors">Shop Products</Link></li>
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-600 hover:text-primary transition-colors">Wellness Blog</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-primary transition-colors">Wholesale Inquiries</Link></li>
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h4 className="font-serif font-bold text-gray-900 mb-6">The Essence</h4>
            <ul className="space-y-4">
              <li><Link to="/shop/ghee" className="text-sm text-gray-600 hover:text-primary transition-colors">Pure A2 Ghee</Link></li>
              <li><Link to="/shop/wellness" className="text-sm text-gray-600 hover:text-primary transition-colors">Ayurvedic Formulations</Link></li>
              <li><Link to="/shop/bodycare" className="text-sm text-gray-600 hover:text-primary transition-colors">Organic Body Care</Link></li>
              <li><Link to="/about#mission" className="text-sm text-gray-600 hover:text-primary transition-colors">Our Ethical Standard</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-gray-900 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-600">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Vedlakshana Gaushala, Panchkula-Delhi Highway, Haryana, India</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-600">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-600">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@vedlakshana.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-medium tracking-widest uppercase">
          <p>© 2026 VEDLAKSHANA GAUSHALA. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
