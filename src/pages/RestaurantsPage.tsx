import React from 'react';
import { motion } from 'framer-motion';
import { Store, Star, Clock, MapPin, ChevronRight, Utensils } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export const RestaurantsPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-4 py-1.5 rounded-full text-sm font-bold shadow-none">
          <Store className="w-4 h-4 mr-2" />
          Savora Kitchens
        </Badge>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-foreground tracking-tight mb-6">
          Hot Food, <span className="text-primary">Delivered Fast.</span>
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          Not in the mood to cook? Order ready-made meals from our top-rated partner kitchens and enjoy restaurant-quality food at home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants.map((rest, index) => (
          <motion.div
            key={rest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-border hover:border-primary/50 transition-colors shadow-lg hover:shadow-xl rounded-[2rem] overflow-hidden group cursor-pointer bg-card">
              <div className="h-40 bg-muted relative overflow-hidden flex items-center justify-center">
                <Utensils className="w-16 h-16 text-muted-foreground opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
              </div>
              <CardContent className="p-8 relative -mt-12">
                <div className="w-20 h-20 rounded-[1rem] bg-background border border-border shadow-md flex items-center justify-center mb-4 overflow-hidden relative z-10 group-hover:scale-105 transition-transform">
                  <Store className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {rest.name}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {rest.categories.map(cat => (
                    <span key={cat} className="text-xs font-bold px-2 py-1 bg-muted text-muted-foreground rounded-lg">
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5 text-accent-yellow font-bold">
                    <Star className="w-4 h-4 fill-accent-yellow" /> {rest.rating}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {rest.eta} min
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> Nearby
                  </div>
                </div>

                <Link to="/recipes" className="inline-flex items-center text-primary font-bold hover:underline">
                  View Menu <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
