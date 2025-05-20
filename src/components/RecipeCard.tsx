import { useNavigate } from "react-router";
import type { RecipeModel } from "../models/recipeModel"
import "./RecipeCard.css"
import type { IdType } from "../types/commonTypes";
import type React from "react";

type Props = {
    recipe: RecipeModel;
    editable?: boolean;
    onDelete?: (recipeId: IdType) => Promise<void>;
}

export default function RecipeCard({recipe, editable=false, onDelete}: Props) {
  const navigate = useNavigate();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`${recipe.id}/edit`);    
  } 

  const handleClick = () => {
    navigate(`/recipes/${recipe.id}`);    
  }

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await onDelete!(recipe.id);
  }
  
  return (
    <div  className="RecipeCard" onClick={handleClick}>
        <h2>{recipe.title}</h2>
        <div className="img-wrapper">
          <img
            src={recipe.img_url}
            alt="recipe img"
            onError={(e) => (e.currentTarget as HTMLImageElement).src = '/images/no_img.png'}
          />

          {editable && (
            <div className="actions">
              <button className="edit" onClick={handleEditClick}>
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button className="delete" onClick={handleDeleteClick}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          )}
        </div>
        <p>{recipe.short_desc}</p>
        <p>Author: {recipe.author}</p>
        <p>Tags: {recipe.tags?.join(', ')}</p>

    </div>
  )
}
