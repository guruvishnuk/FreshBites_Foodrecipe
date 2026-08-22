import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Truck, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const features = [
  {
    icon: <Utensils className="w-8 h-8 text-emerald-500" />,
    title: "Curated Recipes",
    desc: "Step-by-step instructions with exact measurements and pro cooking tips."
  },
  {
    icon: <Truck className="w-8 h-8 text-amber-500" />,
    title: "Fresh Delivery",
    desc: "Farm-fresh ingredients delivered straight to your kitchen hassle-free."
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    title: "Quality Guaranteed",
    desc: "Not 100% fresh? We replace it instantly. No questions asked."
  }
];

export const AboutPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full max-w-7xl mx-auto px-4 py-12"
    >
      <section className="relative rounded-3xl overflow-hidden shadow-2xl mb-24">
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2168&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        
        <div className="relative z-10 p-12 md:p-24 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Welcome to <span className="text-emerald-400">Savora</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
            Your ultimate culinary companion. We bridge the gap between premium chef-curated recipes and hyper-local fresh ingredient delivery.
          </p>
        </div>
      </section>

      <div className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Why Savora?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Savora brings you mouth-watering recipes and lets you order all the fresh ingredients you need in just a few clicks. Transform your kitchen into a fine dining experience tonight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow group">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 mx-auto bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{f.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="bg-emerald-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to start cooking?</h3>
          <p className="text-emerald-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">Join thousands of foodies who have elevated their home dining experience with Savora.</p>
          <Link to="/recipes">
            <Button size="lg" variant="secondary" className="text-emerald-700 hover:text-emerald-800 px-8 py-6 text-lg rounded-full shadow-xl">
              Explore Our Library <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
