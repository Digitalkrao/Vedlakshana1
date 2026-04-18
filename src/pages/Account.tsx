import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Order } from '../types';
import { formatPrice } from '../lib/utils';
import { Package, User as UserIcon, MapPin, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const Account = () => {
  const { user, profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[]);
      } catch (err) {
        console.error('Fetch orders error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) return <div className="text-center pt-32">Please log in to view your account.</div>;

  return (
    <div className="bg-stone-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserIcon className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-1">{profile?.displayName}</h2>
              <p className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider">{user.email}</p>
              <div className="px-4 py-1.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-widest inline-block">
                {profile?.role || 'Valued Member'}
              </div>
            </div>

            <nav className="bg-white rounded-3xl p-4 shadow-sm border border-stone-100">
              <ul className="space-y-1">
                <li><button className="w-full text-left px-6 py-4 rounded-2xl bg-stone-50 text-gray-900 font-bold border-stone-100 border">My Orders</button></li>
                <li><button className="w-full text-left px-6 py-4 rounded-2xl text-gray-500 hover:bg-stone-50 transition-all font-bold">Profile Info</button></li>
                <li><button className="w-full text-left px-6 py-4 rounded-2xl text-gray-500 hover:bg-stone-50 transition-all font-bold">Address Book</button></li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Order History</h1>
                <p className="text-gray-500 font-medium">Manage and track your Gaushala product orders.</p>
              </div>
              <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center space-x-2 shadow-lg shadow-primary/20">
                <Package className="w-5 h-5" />
                <span>Shop More</span>
              </Link>
            </div>

            {loading ? (
              <div className="bg-white rounded-3xl p-20 text-center border border-stone-100 shadow-sm animate-pulse">
                <div className="w-12 h-12 bg-stone-100 rounded-full mx-auto mb-4" />
                <div className="h-4 bg-stone-100 w-48 mx-auto rounded mb-2" />
                <div className="h-3 bg-stone-100 w-32 mx-auto rounded" />
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-20 text-center border border-stone-100 shadow-sm">
                <Package className="w-16 h-16 text-stone-200 mx-auto mb-6" />
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">No orders yet</h3>
                <p className="text-gray-500 mb-8 font-medium max-w-sm mx-auto">Start your journey with Vedlakshana A2 Ghee and experience the purity of Gir cow products.</p>
                <Link to="/shop" className="text-primary font-bold underline underline-offset-8">Browse the collection</Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 group hover:shadow-xl transition-all"
                  >
                    <div className="p-8">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center">
                            <Package className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Order ID: {order.id.slice(-8).toUpperCase()}</span>
                            <div className="flex items-center space-x-3">
                              <span className="text-lg font-bold text-gray-900">{formatPrice(order.totalAmount)}</span>
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                order.status === 'delivered' ? 'bg-green-50 text-green-600' : 
                                order.status === 'shipped' ? 'bg-blue-50 text-blue-600' : 'bg-stone-50 text-gray-400'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-gray-500 font-medium text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          <button className="flex items-center space-x-2 text-primary hover:text-stone-900 transition-colors">
                            <span>Details</span>
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-stone-50">
                        {order.items.slice(0, 4).map((item, i) => (
                          <div key={i} className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-stone-50 rounded-xl overflow-hidden shrink-0">
                              <img src={`https://picsum.photos/seed/${item.productId}/100`} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-serif font-bold text-gray-900 truncate">{item.name}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 4 && (
                          <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-xs font-bold text-gray-400">
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
