import React, { useEffect, useState } from 'react';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { Product } from '../types';
import { INITIAL_PRODUCTS, INITIAL_BLOGS } from '../data/seedData';
import { ArrowRight, Star, Heart, ShieldCheck, Leaf, HeartIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeatured = async () => {
      const q = query(collection(db, 'products'), limit(4));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
      
      if (items.length === 0) {
        // Fallback for demo if DB is empty
        setFeaturedProducts(INITIAL_PRODUCTS.map((p, i) => ({ ...p, id: `seed-${i}` })) as Product[]);
      } else {
        setFeaturedProducts(items);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="organic-gradient">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/vediccow/1920/1080" 
            alt="Vedic Cow" 
            className="w-full h-full object-cover brightness-[0.7]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-secondary/90 text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full mb-6">
              Ancient Wisdom, Modern Wellness
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight mb-6">
              Purest A2 Ghee from <span className="text-secondary italic underline decoration-white/20">Ahimsa</span> Gaushala
            </h1>
            <p className="text-xl text-gray-200 mb-10 font-medium max-w-lg leading-relaxed">
              Ethically sourced from free-grazing native Gir cows. Handcrafted using the traditional Vedic Bilona method.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/shop" 
                className="bg-secondary text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform flex items-center justify-center space-x-2 shadow-xl shadow-secondary/20"
              >
                <span>Shop Pure Ghee</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/about" 
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all text-center"
              >
                Our Mission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Icons */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "100% Organic", desc: "No chemicals, purely natural" },
              { icon: ShieldCheck, title: "Lab Tested", desc: "Guaranteed A2 protein" },
              { icon: Heart, title: "Cruelty Free", desc: "Calf's right is our priority" },
              { icon: Star, title: "Vedic Method", desc: "Traditional Bilona churning" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-xs text-gray-500 font-medium mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Featured collection</h2>
            <div className="h-1 w-20 bg-secondary mt-4 rounded-full" />
          </div>
          <Link to="/shop" className="text-primary font-bold flex items-center space-x-1 hover:space-x-2 transition-all group">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col"
            >
              <div className="relative aspect-square">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors">
                    <HeartIcon className="w-5 h-5" />
                  </button>
                </div>
                {product.stock < 10 && (
                  <div className="absolute top-4 left-4 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    Low Stock
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">{product.category}</span>
                <Link to={`/shop/${product.id}`} className="text-lg font-serif font-bold text-gray-900 mb-2 hover:text-primary transition-colors leading-tight">
                  {product.name}
                </Link>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow font-medium leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="p-3 bg-stone-900 text-white rounded-2xl hover:bg-primary transition-colors shadow-lg shadow-stone-200"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission / About Teaser */}
      <section className="py-24 bg-stone-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <Leaf className="w-full h-full text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">The Soul of Vedlakshana</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">Where Every Drop Tells a Story of Ethical Care</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed font-medium">
                Our Gaushala is more than a farm; it's a sanctuary. We follow the principle of 'Ahimsa' (non-violence). The calf is always fed first, and our cows graze freely on organic pastures, listening to Vedic chants.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Calf-first feeding policy",
                  "Free-grazing indigenous Gir cows",
                  "Vedic chants for cow wellness",
                  "Eco-friendly waste management"
                ].map((point, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-300 font-medium">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="inline-flex items-center space-x-2 text-white font-bold border-b-2 border-secondary pb-1 hover:border-white transition-all">
                <span>Explore Our Gaushala</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/seed/gaushala1/600/800" alt="Cows" className="rounded-3xl object-cover h-[400px] w-full" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/gaushala2/600/600" alt="Process" className="rounded-3xl object-cover h-[300px] w-full mt-12" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Teaser */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-gray-900 mb-4">Ayurvedic Wisdom</h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto uppercase tracking-widest text-xs">Recipes, Health Tips & Ancient Traditions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {INITIAL_BLOGS.map((blog, i) => (
            <motion.div key={i} whileHover={{ x: 10 }} className="group cursor-pointer">
              <div className="relative h-80 rounded-3xl overflow-hidden mb-6">
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-6 left-6 bg-white py-2 px-4 rounded-full text-xs font-bold text-primary shadow-lg uppercase tracking-wider">
                  {blog.tags?.[0]}
                </div>
              </div>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors leading-snug">{blog.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2 font-medium">{blog.content}</p>
              <Link to="/blog" className="text-primary font-bold inline-flex items-center space-x-2 hover:translate-x-3 transition-transform">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

// Add some tailwind icon for Cart
const ShoppingCart = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);
