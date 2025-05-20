import React, { useEffect, useState } from 'react'
import type { RecipeModel } from '../models/recipeModel'
import RecipeCard from './RecipeCard';
import "./ExploreRecipes.css"
import "./RecipesGrid.css"

type Props = {
    recipes: RecipeModel[];
    getRecipes: (limit: number, tags?: string[], author?: string) => Promise<void>;
}

export default function ExploreRecipes({recipes, getRecipes}: Props) {
    const [limit, setLimit] = useState<number>(10);
    const [tags, setTags] = useState<string[]>([]);
    const [author, setAuthor] = useState<string>('');
    const [ascending, setAscending] = useState<boolean>(true);
    
    const searchRecipes = async (e: React.FormEvent) => {
        e.preventDefault();
        
        await getRecipes(limit, tags, author);
    }
    
    useEffect(() => {
        const fetchRecipes = async () => {
            await getRecipes(10);
        };
        fetchRecipes();
    }, [])
    
  return (
    <div className='ExploreRecipes section'>
        <h1>Explore Recipes</h1>
        <form onSubmit={searchRecipes}>
            <input type="number" min={10} max={50} placeholder='Limit' onChange={e => setLimit(Number(e.target.value))}/>
            <input type="text" placeholder='Tags (comma separated)' onChange={e => setTags(e.target.value.split(',').map(tag => tag.trim()))} />
            <input type="text" placeholder='Author' onChange={e => setAuthor(e.target.value)}/>
            <button type='submit'>Search</button>
        </form>
        <div className="RecipesGrid">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe}/>
            ))}
        </div>
    </div>
  )
}
