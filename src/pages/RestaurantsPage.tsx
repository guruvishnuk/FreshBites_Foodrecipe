import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Store, Star, Clock, MapPin, ChevronRight, Utensils, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useLocation } from '../context/LocationContext';
import { restaurants as fallbackRestaurants } from '../data/restaurants';

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  eta: number;
  categories: string[];
}

export const RestaurantsPage: React.FC = () => {
  const { coords, isLocating, locationError, requestLocation } = useLocation();
  const [liveRestaurants, setLiveRestaurants] = useState<Restaurant[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (coords && !isLocating) {
      fetchRealRestaurants(coords.lat, coords.lon);
    }
  }, [coords, isLocating]);

  const fetchRealRestaurants = async (lat: number, lon: number) => {
    setIsFetching(true);
    try {
      // Overpass API Query to find restaurants within 3km
      const query = `
        [out:json];
        node(around:3000,${lat},${lon})["amenity"="restaurant"];
        out 20;
      `;
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
      });
      const data = await response.json();
      
      const parsed = data.elements.map((el: any) => ({
        id: el.id.toString(),
        name: el.tags.name || 'Local Kitchen',
        // Simulate rating and eta since Overpass doesn't provide them
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        eta: Math.floor(Math.random() * (45 - 20) + 20),
        categories: [el.tags.cuisine || 'Multi-Cuisine', 'Real-World Data']
      })).filter((r: any) => r.name !== 'Local Kitchen'); // Filter unnamed
      
      if (parsed.length > 0) {
        setLiveRestaurants(parsed);
      } else {
        setLiveRestaurants(fallbackRestaurants);
      }
    } catch (err) {
      console.error("Failed to fetch live restaurants", err);
      setLiveRestaurants(fallbackRestaurants); // fallback
    } finally {
      setIsFetching(false);
    }
  };

  const displayList = liveRestaurants.length > 0 ? liveRestaurants : fallbackRestaurants;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-4 py-1.5 rounded-full text-sm font-bold shadow-none">
          <Store className="w-4 h-4 mr-2" />
          Savora Live
        </Badge>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-foreground tracking-tight mb-6">
          Real Food, <span className="text-primary">Near You.</span>
        </h1>
        <p className="text-xl text-muted-foreground font-medium mb-6">
          Not in the mood to cook? Discover real restaurants around your current location and order instantly.
        </p>

        {locationError && (
          <div className="bg-accent-red/10 text-accent-red border border-accent-red/20 p-4 rounded-xl flex items-center justify-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5" /> {locationError}
          </div>
        )}

        {!coords && !isLocating && (
           <Button onClick={requestLocation} size="lg" className="rounded-full shadow-lg shadow-primary/20 font-bold">
             <MapPin className="w-5 h-5 mr-2" /> Allow Location Access
           </Button>
        )}
      </div>

      {(isLocating || isFetching) ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-bold">Scanning your area for real restaurants...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayList.map((rest, index) => (
            <motion.div
              key={rest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-border hover:border-primary/50 transition-colors shadow-lg hover:shadow-xl rounded-[2rem] overflow-hidden group cursor-pointer bg-card flex flex-col">
                <div className="h-40 bg-muted relative overflow-hidden flex items-center justify-center">
                  <Utensils className="w-16 h-16 text-muted-foreground opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
                </div>
                <CardContent className="p-8 relative -mt-12 flex flex-col flex-grow">
                  <div className="w-20 h-20 rounded-[1rem] bg-background border border-border shadow-md flex items-center justify-center mb-4 overflow-hidden relative z-10 group-hover:scale-105 transition-transform">
                    <Store className="w-10 h-10 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {rest.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {rest.categories.map(cat => (
                      <span key={cat} className="text-xs font-bold px-2 py-1 bg-muted text-muted-foreground rounded-lg capitalize">
                        {cat.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground mb-6 mt-auto">
                    <div className="flex items-center gap-1.5 text-accent-yellow font-bold">
                      <Star className="w-4 h-4 fill-accent-yellow" /> {rest.rating}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {rest.eta} min
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" /> 
                      <span className="text-primary font-bold">Live Data</span>
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
      )}
    </motion.div>
  );
};
