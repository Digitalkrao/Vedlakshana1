import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/seedData';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck, RefreshCcw, Star } from 'lucide-react';
import { motion } from 'motion/react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      if (id.startsWith('seed-')) {
        const index = parseInt(id.split('-')[1]);
        setProduct({ ...INITIAL_PRODUCTS[index], id } as Product);
        setLoading(false);
        return;
      }
      const docSnap = await getDoc(doc(db, 'products', id));
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" /></div>;
  if (!product) return <div className="min-h-screen pt-32 text-center text-2xl font-serif">Product not found</div>;

  return (
    <div className="bg-[#FBFAF8] min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/shop" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-primary mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Shop
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-white shadow-xl shadow-stone-100 border border-stone-100">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 bg-white rounded-3xl shadow-lg border border-stone-50 flex flex-col items-center">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xl font-bold text-gray-900">4.9</span>
              <span className="text-[10px] uppercase font-bold text-gray-400">Rating</span>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">{product.category}</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                In Stock & Ready to Ship
              </div>
            </div>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
              {product.description}
            </p>

            <div className="space-y-6 mb-12">
              <div className="p-5 bg-white rounded-2xl border border-stone-100 flex items-start space-x-4 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Sacred Quality Guarantee</h4>
                  <p className="text-xs text-gray-400 font-medium mt-1">Ethically sourced from Gir cows grazing on pesticide-free pastures.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center bg-white rounded-2xl border border-stone-100 p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 text-gray-400 hover:text-primary transition-colors"
                >
                  <span className="text-xl">−</span>
                </button>
                <span className="px-6 font-bold text-lg text-gray-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 text-gray-400 hover:text-primary transition-colors"
                >
                  <span className="text-xl">+</span>
                </button>
              </div>

              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-grow bg-primary text-white py-4 px-10 rounded-2xl font-bold text-lg hover:bg-primary-light transition-all shadow-xl shadow-primary/20 flex items-center justify-center space-x-3"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Add to Cart</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-stone-100 pt-10">
              <div className="flex items-center space-x-3 text-gray-500 font-medium">
                <Truck className="w-5 h-5 text-gray-300" />
                <span className="text-sm">Express Shipping across India</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-500 font-medium">
                <RefreshCcw className="w-5 h-5 text-gray-400" />
                <span className="text-sm">10-Day Easy Exchange</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Tabs / Benefits */}
        <div className="mt-24 pt-16 border-t border-stone-100">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Healing Benefits of {product.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {product.benefits?.map((benefit, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <h4 className="text-xl font-serif font-bold text-gray-900 mb-4">{benefit}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Deeply rooted in ancient Ayurvedic science, this benefit helps in restoring natural balance to your mind and body.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
