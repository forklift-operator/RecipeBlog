import type { UserModel } from '../models/userModel'
import type { RecipeModel } from '../models/recipeModel';
import RecipeForm from './RecipeForm';

type Props = {
    currentUser: UserModel; 
    onPublish: (recipe: RecipeModel) => Promise<void>;
}

export default function PublishRecipe({currentUser, onPublish}: Props) {
  return (
    <div className='PublishRecipe section'>
        <h1>Publish Recipe</h1>
        <RecipeForm currentUser={currentUser} onPublish={onPublish}/>
    </div>
  )
}
