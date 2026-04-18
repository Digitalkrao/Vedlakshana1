import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { BlogPost } from '../types';
import { INITIAL_BLOGS } from '../data/seedData';
import { motion } from 'motion/react';
import { Calendar, User as UserIcon, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blog'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[];
        if (items.length === 0) {
          setPosts(INITIAL_BLOGS.map((p, i) => ({ ...p, id: `seed-blog-${i}` })) as BlogPost[]);
        } else {
          setPosts(items);
        }
      } catch (err) {
        setPosts(INITIAL_BLOGS.map((p, i) => ({ ...p, id: `seed-blog-${i}` })) as BlogPost[]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="bg-stone-900 text-white pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="uppercase tracking-[0.4em] text-xs font-bold text-secondary mb-6 block"
          >
            Vedic Wisdom for Modern Living
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-8"
          >
            Wellness & Traditions
          </motion.h1>
          <p className="text-gray-400 max-w-xl mx-auto font-medium leading-relaxed">
            Exploring the science of Ayurveda, the benefits of A2 Ghee, and recipes for a balanced lifestyle.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 flex flex-col group"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 left-8 flex flex-wrap gap-2">
                  {post.tags?.map((tag, j) => (
                    <span key={j} className="bg-white/90 backdrop-blur-sm text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center space-x-6 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-4 h-4" />
                    <span>By {post.author}</span>
                  </div>
                </div>
                
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-gray-500 font-medium leading-relaxed mb-8 line-clamp-3">
                  {post.content}
                </p>
                
                <Link to="/blog" className="mt-auto inline-flex items-center space-x-2 text-primary font-bold hover:translate-x-3 transition-transform">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="py-24 text-center">
        <div className="bg-primary/5 rounded-[4rem] max-w-4xl mx-auto p-16 border border-primary/10">
          <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6 font-serif">Stay Connected to the Source</h3>
          <p className="text-gray-600 mb-10 font-medium max-w-xl mx-auto italic">
            Join 10,000+ wellness seekers receiving weekly Ayurvedic recipes and Gaushala updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-8 py-4 bg-white rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
            <button className="bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-lg shadow-stone-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
