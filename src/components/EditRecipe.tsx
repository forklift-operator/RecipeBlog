import { useEffect, useState } from 'react'
import RecipeForm from './RecipeForm'
import type { RecipeModel } from '../models/recipeModel'
import type { UserModel } from '../models/userModel'
import type { IdType } from '../types/commonTypes'
import { useParams } from 'react-router'

type Props = {
    currentUser: UserModel;
    onEdit: (recipe: RecipeModel) => Promise<void>;
    onGetRecipeById: (recipeId: IdType) => Promise<RecipeModel|null>;
}

export default function EditRecipe({currentUser, onEdit, onGetRecipeById}: Props) {
    const {recipeId} = useParams();
    const [oldRecipe, setOldRecipe] = useState<RecipeModel|null>(null);
    const [loading, setLoading] =useState<boolean>(true)
    const [allowed, setAllowed] =useState<boolean>(false)
    
   useEffect(() => {
    const fetchOldRecipe = async () => {
        if (recipeId && onGetRecipeById) {
        const fetchedRecipe = await onGetRecipeById(recipeId);
        setOldRecipe(fetchedRecipe);
        if (fetchedRecipe) {
            if (fetchedRecipe.author !== currentUser.username) {
            return;
            }
        }
        setAllowed(true);
        }
        setLoading(false);
    }
    fetchOldRecipe();
    }, []);


    if (loading) {
        return <h1>Loading...</h1>
    }

    if (!oldRecipe) {
        return <h1>Recipe with this id does not exist</h1>
    }

    if (!allowed) {
        return <h1>Not allowed to edit this recipe!</h1>
    }
    
    
  return (
    <div className='EditRecipe section'>
        <h1>Edit Recipe</h1>
        <RecipeForm currentUser={currentUser} onEdit={onEdit} oldRecipe={oldRecipe!}/>
    </div>
  )
}
