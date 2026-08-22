import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChefHat, Truck, ShieldCheck, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Hero3D } from '../components/Hero3D';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export const HomePage: React.FC = () => {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show" 
      exit="exit"
      className="w-full flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-10 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/20 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-[100px]" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Copy */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-8 z-10">
              <Badge variant="secondary" className="w-max px-4 py-1 text-sm font-medium border-emerald-500/30">
                🚀 The Future of Culinary Delivery
              </Badge>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Master the Art of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                  Premium Dining.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-light">
                Savora combines world-class chef-curated recipes with hyper-local, farm-fresh ingredient delivery. Experience gastronomy reinvented.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/recipes">
                  <Button size="lg" className="rounded-full px-8 text-base shadow-lg shadow-emerald-500/25 group">
                    Explore Recipes
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="rounded-full px-8 text-base bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    How it Works
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800" />
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Trusted by 10,000+ Foodies</span>
                </div>
              </div>
            </motion.div>

            {/* Right 3D Canvas */}
            <motion.div variants={itemVariants} className="relative hidden lg:block">
              <Hero3D />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/20 blur-[80px] -z-10 rounded-full" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Enterprise-Grade <span className="text-emerald-500">Excellence</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              We've engineered every aspect of Savora to deliver an unparalleled culinary experience straight to your kitchen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Large Feature Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2"
            >
              <Card className="h-full w-full overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 text-white border-slate-200 dark:border-slate-800 relative group">
                <div className="absolute top-0 right-0 w-full h-1/2 md:w-1/2 md:h-full bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a882a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
                
                <CardContent className="p-10 h-full flex flex-col justify-center relative z-10 w-full md:w-2/3">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-emerald-500/30">
                    <ChefHat className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Michelin-Inspired Recipes</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Unlock exclusive recipes crafted by world-renowned chefs. Our step-by-step interactive guides ensure perfect results, every single time.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Small Feature Cards */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full bg-slate-50 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 transition-colors border-slate-200 dark:border-slate-800 overflow-hidden relative">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
                <CardContent className="p-8 flex flex-col justify-start h-full relative z-10">
                  <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <Truck size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Hyper-Local Sourcing</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Ingredients picked at peak freshness from local farms and delivered in hours.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full bg-slate-50 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 transition-colors border-slate-200 dark:border-slate-800 overflow-hidden relative">
                <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                <CardContent className="p-8 flex flex-col justify-start h-full relative z-10">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <ShieldCheck size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Quality Guarantee</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">100% satisfaction guarantee. Not fresh? We replace it instantly, no questions asked.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
