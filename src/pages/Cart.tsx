import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="w-10 h-10 text-stone-300" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-10 text-center font-medium max-w-sm">
          It looks like you haven't added any A2 Ghee or Gaushala products to your cart yet.
        </p>
        <Link to="/shop" className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center space-x-2 shadow-xl shadow-primary/20">
          <span>Start Shopping</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-12">Your Cart ({totalItems} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex items-center gap-6"
                >
                  <div className="w-24 h-24 bg-stone-100 rounded-2xl flex-shrink-0 overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${item.productId}/200`} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="flex items-center bg-stone-50 rounded-xl p-1 border border-stone-100">
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-2 text-gray-500 hover:text-primary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-2 text-gray-500 hover:text-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-right min-w-[100px]">
                    <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    <button 
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-400 hover:text-red-600 transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-stone-200 border border-stone-100 sticky top-32">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 pb-4 border-b border-stone-50">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-primary font-bold uppercase text-xs">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Tax (GST)</span>
                  <span>{formatPrice(totalPrice * 0.05)}</span>
                </div>
                <div className="pt-4 border-t border-stone-50 flex justify-between items-center">
                  <span className="text-xl font-serif font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice * 1.05)}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-light transition-all shadow-lg shadow-primary/20 flex items-center justify-center space-x-3"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="mt-8 flex items-center justify-center space-x-2">
                <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-6" />
                <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="Master" className="h-6" />
                <img src="https://cdn-icons-png.flaticon.com/512/196/196572.png" alt="Amex" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
