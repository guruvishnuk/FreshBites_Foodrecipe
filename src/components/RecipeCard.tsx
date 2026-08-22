import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

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
  return (
    <Card className="flex flex-col h-full overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl dark:hover:shadow-emerald-900/20 border-slate-200 dark:border-slate-800">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          loading="lazy" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute top-3 right-3 shadow-md">
          {recipe.category}
        </Badge>
      </div>
      <CardContent className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {recipe.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow mb-4 line-clamp-3 leading-relaxed">
          {recipe.description}
        </p>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0 mt-auto">
        <Link to={`/recipe/${recipe.id}`} className="w-full">
          <Button variant="secondary" className="w-full group/btn">
            View Recipe 
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
