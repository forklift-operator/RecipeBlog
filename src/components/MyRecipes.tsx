import { useEffect } from 'react'
import type { RecipeModel } from '../models/recipeModel';
import type { UserModel } from '../models/userModel';
import RecipeCard from './RecipeCard';
import type { IdType } from '../types/commonTypes';
import "./MyRecipes.css"
import "./RecipesGrid.css"

type Props = {
    currentUser: UserModel;
    recipes: RecipeModel[];
    getRecipes: (limit: number, tags?: string[], author?: string) => Promise<void>;
    onDelete: (recipeId: IdType) => Promise<void>;
}

export default function MyRecipes({currentUser , recipes, getRecipes, onDelete}: Props) {
    useEffect(() => {
        const fetchRecipes = () => {
            getRecipes(10,undefined,currentUser.username);
        }
        fetchRecipes();
    }, [])
    
  return (
    <div className="MyRecipes section">
        <h1>MyRecipes</h1>
        <div className="RecipesGrid">
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} onDelete={onDelete} editable />
            ))}
        </div>
    </div>
  )
}
