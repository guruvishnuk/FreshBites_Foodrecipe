import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface Recipe {
  id: string | number;
  title: string;
  image: string;
  category: string;
  description: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  // Mock data for Zomato/Swiggy style metrics
  const rating = (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1);
  const time = Math.floor(Math.random() * (45 - 20) + 20);
  const price = Math.floor(Math.random() * (500 - 150) + 150);
  const isVeg = Math.random() > 0.3; // 70% chance to be veg

  return (
    <Link to={`/recipe/${recipe.id}`} className="block group">
      <Card className="flex flex-col h-full overflow-hidden border-0 shadow-none bg-transparent hover:scale-[1.02] transition-transform duration-300">
        <div className="relative h-48 sm:h-64 overflow-hidden rounded-[24px] shadow-sm ring-1 ring-border group-hover:ring-primary/30 transition-all">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            loading="lazy" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Offer overlay at bottom of image */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
            <span className="text-white font-display font-bold text-lg uppercase tracking-tight">
              50% OFF <span className="text-primary font-bold">up to ₹100</span>
            </span>
          </div>
          
          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold border border-border flex items-center gap-1 shadow-sm">
             {isVeg ? (
               <span className="w-2 h-2 rounded-full bg-accent-green" />
             ) : (
               <span className="w-2 h-2 rounded-full bg-accent-red" />
             )}
             {isVeg ? "VEG" : "NON-VEG"}
          </div>
        </div>
        
        <CardContent className="p-2 pt-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-xl font-display font-bold text-foreground leading-tight truncate group-hover:text-primary transition-colors">
              {recipe.title}
            </h3>
            
            {/* Rating Badge */}
            <div className="flex items-center gap-1 bg-accent-green text-green-950 px-2 py-1 rounded-lg text-xs font-bold shrink-0 shadow-sm">
              {rating} <Star className="w-3 h-3 fill-current" />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-muted-foreground text-sm mb-2">
            <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md font-medium text-xs">
              <Clock className="w-3 h-3" />
              <span>{time} mins</span>
            </div>
            <span className="font-semibold text-foreground">₹{price} for two</span>
          </div>

          <p className="text-muted-foreground text-sm truncate font-medium">
            {recipe.category} • North Indian, Fast Food
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
