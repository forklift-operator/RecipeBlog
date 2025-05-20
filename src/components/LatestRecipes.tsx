import { useEffect } from 'react'
import type { RecipeModel } from '../models/recipeModel'
import RecipeCard from './RecipeCard';
import "./RecipesGrid.css"

type Props = {
    recipes: RecipeModel[];
    getRecipes: (limit: number, tags?: string[], author?: string) => Promise<void>;
    
}

export default function LatestRecipes({recipes, getRecipes}: Props) {
    useEffect(() => {
        const fetchRecipes = async () => {
            await getRecipes(10);
        };
        fetchRecipes();
    }, [])
    
  return (
    <div className="LatestRecipes">
        <h1>Latest Recipes</h1>
        <div className="RecipesGrid">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div> 

    </div>
  )
}
