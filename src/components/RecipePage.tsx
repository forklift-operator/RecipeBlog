import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { RecipeModel } from '../models/recipeModel';
import type { IdType } from '../types/commonTypes';
import "./RecipePage.css"

type Params = {
    onGetRecipeById: (recipeId: IdType) => Promise<RecipeModel|null>;
}

export default function RecipePage({onGetRecipeById}: Params) {
    const {recipeId} = useParams<IdType>();
    const [recipe, setRecipe] = useState<RecipeModel|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchRecipe = async () => {
            if (recipeId) {
                try {
                    const fetchedRecipe = await onGetRecipeById(recipeId);
                    setRecipe(fetchedRecipe);
                } catch (error) {
                    console.error('Error fetching recipe:', error);
                } 
            } 
            setLoading(false);
        };

        fetchRecipe();
    }, []);
    
    if (loading) {
        return <h1>Loading...</h1>
    }

    if (!recipe) {
        return <h1>Recipe with this id does not exist</h1>
    }
    
  return (
    <div className='RecipePage section'>
        <h1>{recipe.title}</h1>
        {/* userCard */}
        <p>{recipe.short_desc}</p>
        <div className="overview">
            <div className="products">
                <h3>Products:</h3>
                <ul>
                    {recipe.products.map((product,i) => (
                        <li key={i}>{product}</li>
                    ))}
                </ul>
                <hr />
                <h3>Time: {recipe.time} mins</h3>
            </div>
            <img src={recipe.img_url} alt="Recipe image" onError={e => (e.currentTarget as HTMLImageElement).src = '/images/no_img.png'}/>
        </div>
        <div className="instructions">
            <h3>Instructions:</h3>
            <p>{recipe.long_desc}</p>
        </div>
    </div>
  )
}
