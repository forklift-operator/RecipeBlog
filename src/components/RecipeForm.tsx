import React, { useEffect } from 'react'
import { RecipeModel } from '../models/recipeModel'
import type { UserModel } from '../models/userModel';
import { useNavigate, useParams } from 'react-router';

type Props = {
    currentUser: UserModel;
    onPublish?: (recipe: RecipeModel) => Promise<void>;
    onEdit?: (recipe: RecipeModel) => Promise<void>;
    oldRecipe?: RecipeModel; 
}

export default function RecipeForm({currentUser, onPublish, oldRecipe, onEdit}: Props) {
    const [recipe, setRecipe] = React.useState<RecipeModel>({} as RecipeModel);
    const {recipeId} = useParams();
    
    const navigate = useNavigate();
    
    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const completeRecipe: RecipeModel = {...recipe, author: currentUser.username};
        
        const newRecipe = new RecipeModel(completeRecipe);
        await onPublish!(newRecipe);

        navigate("/recipes/my");
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedRecipe = new RecipeModel({...recipe, id:recipeId!});
        await onEdit!(updatedRecipe);
    
        navigate("/recipes/my")
    }
    
    useEffect(() => {
        if (oldRecipe) {
            setRecipe(oldRecipe);
        }
    }, [])

  return (
    <div className='RecipeForm'>
        <form onSubmit={onEdit ? handleEdit : handlePublish}>
            <input value={recipe.title || ''} type="text" placeholder="Title (80 characters max)" maxLength={80} onChange={e => setRecipe({ ...recipe, title: e.target.value })} required />
            <input value={recipe.short_desc || ''} type="text" placeholder="Short description (256 characters max)" maxLength={256} onChange={e => setRecipe({ ...recipe, short_desc: e.target.value })} required />
            <input value={recipe.time || ''} type="number" placeholder="Estimated time (mins)" onChange={e => setRecipe({ ...recipe, time: Number(e.target.value) })} required />
            <input value={recipe.products?.join(', ') || ''} type="text" placeholder="Products (comma separated)" onChange={e => setRecipe({ ...recipe, products: e.target.value.split(',').map(p => p.trim()) })} required />
            <input value={recipe.long_desc || ''} type="text" placeholder="Long description (2048 characters max)" maxLength={2048} onChange={e => setRecipe({ ...recipe, long_desc: e.target.value })} required />
            <input value={recipe.tags?.join(', ') || ''} type="text" placeholder="Tags (comma separated)" onChange={e => setRecipe({ ...recipe, tags: e.target.value.split(',').map(t => t.trim()) })} />
            <input value={recipe.img_url || ''} type="text" placeholder="Image URL" onChange={e => setRecipe({ ...recipe, img_url: e.target.value })} required />
            <button type="submit">{onEdit ? "Edit" : "Publish"}</button>
        </form>

    </div>
  )
}
