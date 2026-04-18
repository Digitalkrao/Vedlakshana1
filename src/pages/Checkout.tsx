import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../lib/utils';
import { ShieldCheck, Lock, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Checkout = () => {
  const { user, profile } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    if (!address || !phone) {
      alert('Please fill in all details');
      return;
    }

    setIsProcessing(true);
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: cart,
        totalAmount: totalPrice * 1.05,
        status: 'pending',
        createdAt: new Date().toISOString(),
        shippingAddress: address,
        customerPhone: phone
      });
      
      setIsSuccess(true);
      clearCart();
      setTimeout(() => navigate('/account'), 3000);
    } catch (err) {
      console.error('Order error:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-10 text-white shadow-2xl shadow-green-200"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Jai Gau Mata!</h1>
        <p className="text-xl text-gray-500 mb-10 font-medium text-center">Your pure A2 Ghee order has been placed successfully.</p>
        <p className="text-gray-400 text-sm animate-pulse">Redirecting to your order history...</p>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-stone-100 mb-10">
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-10">Delivery Details</h1>
              
              <form onSubmit={handlePlaceOrder} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={profile?.displayName}
                      className="w-full px-6 py-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 00000 00000"
                      className="w-full px-6 py-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900" 
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Full Shipping Address</label>
                  <textarea 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={4}
                    className="w-full px-6 py-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900 resize-none" 
                    placeholder="Enter house no, street, city, state, pincode..."
                    required
                  />
                </div>

                <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100 flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Cash on Delivery (Standard)</h4>
                    <p className="text-xs text-gray-400 font-medium">Pay securely at your doorstep. Online payments coming soon.</p>
                  </div>
                </div>

                <button 
                  disabled={isProcessing}
                  type="submit"
                  className="w-full bg-stone-900 text-white py-6 rounded-3xl font-bold text-xl hover:bg-stone-800 transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-stone-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Place Order & Pay {formatPrice(totalPrice * 1.05)}</span>
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </form>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Ahimsa Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Safe & Secure</span>
              </div>
            </div>
          </motion.div>

          {/* Cart Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-stone-100 sticky top-32">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-stone-50 pb-4">In Your Bag</h2>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 mb-8 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-stone-50 rounded-xl overflow-hidden shrink-0">
                      <img src={`https://picsum.photos/seed/${item.productId}/100`} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-serif font-bold text-gray-900 truncate leading-tight">{item.name}</h4>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xl font-serif font-bold text-gray-900">Final Total</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice * 1.05)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
