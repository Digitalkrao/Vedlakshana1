import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/seedData';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Filter, ShoppingCart, Search, ChevronDown, Star } from 'lucide-react';
import { motion } from 'motion/react';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const { addToCart } = useCart();

  const categories = ['All', 'Ghee', 'Wellness', 'Body Care'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
        if (items.length === 0) {
          setProducts(INITIAL_PRODUCTS.map((p, i) => ({ ...p, id: `seed-${i}` })) as Product[]);
        } else {
          setProducts(items);
        }
      } catch (err) {
        setProducts(INITIAL_PRODUCTS.map((p, i) => ({ ...p, id: `seed-${i}` })) as Product[]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = category === 'All' 
    ? products 
    : products.filter(p => p.category === category);

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Gaushala Collection</h1>
          <p className="text-gray-500 max-w-xl mx-auto font-medium leading-relaxed">
            Every purchase supports the welfare of our Gir cows and promotes the preservation of ancient Vedic traditions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 bg-white rounded-3xl p-6 shadow-sm border border-stone-100 gap-6">
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  category === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-12 pr-4 py-3 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="group"
            >
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 flex flex-col h-full">
                <Link to={`/shop/${product.id}`} className="block relative aspect-square overflow-hidden bg-stone-100">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </Link>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{product.category}</span>
                    <div className="flex items-center space-x-1 text-secondary">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-[10px] font-bold">4.9</span>
                    </div>
                  </div>
                  
                  <Link to={`/shop/${product.id}`} className="text-xl font-serif font-bold text-gray-900 mb-3 hover:text-primary transition-colors leading-tight block">
                    {product.name}
                  </Link>
                  
                  <p className="text-sm text-gray-500 line-clamp-2 mb-6 font-medium leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-stone-50 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-primary-light transition-all shadow-md shadow-primary/10 flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
