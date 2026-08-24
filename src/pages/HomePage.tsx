import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ArrowRight, Star } from 'lucide-react';
import { recipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { Button } from '../components/ui/button';

const categories = [
  { name: 'Biryani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=200&auto=format&fit=crop' },
  { name: 'Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop' },
  { name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop' },
  { name: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop' },
  { name: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=200&auto=format&fit=crop' },
  { name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=200&auto=format&fit=crop' },
  { name: 'Rolls', image: 'https://images.unsplash.com/photo-1626237307044-83955b46e338?q=80&w=200&auto=format&fit=crop' },
  { name: 'Thali', image: 'https://images.unsplash.com/photo-1626779848529-57778b40974b?q=80&w=200&auto=format&fit=crop' },
];

const offers = [
  { title: "Get 50% OFF", subtitle: "On your first order", code: "WELCOME50", bg: "bg-primary" },
  { title: "Free Delivery", subtitle: "On orders above ₹199", code: "FREEDEL", bg: "bg-secondary" },
  { title: "Flat ₹150 OFF", subtitle: "On HDFC Credit Cards", code: "HDFC150", bg: "bg-accent-yellow text-yellow-950" },
  { title: "20% Cashback", subtitle: "Pay via Paytm Wallet", code: "PAYTM20", bg: "bg-accent-green text-green-950" },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="w-full flex flex-col min-h-screen"
    >
      {/* Animated Hero Section */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center overflow-hidden bg-background">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Decorative Background Elements */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" 
          />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center mt-12 flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-yellow/20 text-yellow-700 dark:text-yellow-400 font-bold mb-6"
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Top Rated Food Delivery</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-bold text-foreground tracking-tight mb-6"
          >
            Craving <span className="text-primary italic">something</span><br /> delicious?
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground font-medium mb-12 max-w-2xl"
          >
            Discover the best local restaurants and fresh ingredients delivered straight to your door.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-full shadow-2xl p-2 flex flex-col md:flex-row items-center gap-2 w-full max-w-3xl mx-auto border border-border"
          >
            <div className="flex items-center gap-2 px-6 py-3 w-full md:w-auto text-foreground md:border-r border-border">
              <MapPin className="text-primary w-6 h-6 shrink-0" />
              <input type="text" placeholder="Your Location" className="outline-none w-full md:w-32 text-lg bg-transparent font-medium" defaultValue="Bengaluru" />
            </div>
            <form onSubmit={handleSearch} className="flex items-center gap-2 px-6 py-3 flex-1 w-full">
              <Search className="text-muted-foreground w-6 h-6 shrink-0" />
              <input 
                type="text" 
                placeholder="Search for restaurants, cuisines..." 
                className="outline-none w-full text-lg bg-transparent text-foreground placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="lg" className="hidden md:flex rounded-full">
                Search
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-24">
        
        {/* Categories Carousel */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-display font-bold text-foreground">What's on your mind?</h2>
          </div>
          <div className="flex overflow-x-auto gap-8 pb-8 custom-scrollbar snap-x px-2">
            {categories.map((cat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-4 shrink-0 snap-start cursor-pointer group" 
                onClick={() => navigate(`/recipes?search=${cat.name}`)}
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-300 ring-4 ring-transparent group-hover:ring-primary/20">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Promotional Offers */}
        <section>
          <h2 className="text-3xl font-display font-bold text-foreground mb-8">Top offers for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((offer, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-[2rem] p-8 text-white ${offer.bg} cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-150 group-hover:rotate-12 transition-transform duration-500">
                  <Star size={64} fill="currentColor" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2 relative z-10">{offer.title}</h3>
                <p className="font-medium opacity-90 mb-6 relative z-10">{offer.subtitle}</p>
                <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest relative z-10 border border-white/30">
                  {offer.code}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Dishes Grid */}
        <section className="pb-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-display font-bold text-foreground">Trending Dishes</h2>
            <Button variant="ghost" className="hidden sm:flex text-primary hover:text-primary-hover hover:bg-primary/10 rounded-full" onClick={() => navigate('/recipes')}>
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {recipes.slice(0, 8).map((recipe, i) => (
              <motion.div 
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
              >
                <RecipeCard recipe={recipe} />
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Button size="lg" className="w-full rounded-full" onClick={() => navigate('/recipes')}>
              View All Dishes
            </Button>
          </div>
        </section>

      </div>
    </motion.div>
  );
};
