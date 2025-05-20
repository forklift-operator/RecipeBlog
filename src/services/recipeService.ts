import { ApiClient } from './api-client';
import { RecipeModel, type Recipe } from '../models/recipeModel';
import type { IdType } from '../types/commonTypes';

export class RecipeService {
    private apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    async getRecipes(limit: number , tags?: string[], author?: string): Promise<Recipe[]> {
        const recipes = await this.apiClient.findAll(RecipeModel);
        if (tags && tags.length > 0) {
            const filteredTags = tags.filter(tag => tag.trim() !== '');
            if (filteredTags.length > 0) {
            return recipes.filter(recipe => recipe.tags?.some(tag => filteredTags.includes(tag)));
            }
        }
        if (author) {
            return recipes.filter(recipe => recipe.author === author);
        }
        if (limit) {
            return recipes.slice(0, limit);
        }
        return recipes;
    }
    
    async createRecipe(recipe: Recipe): Promise<Recipe> {
        return this.apiClient.create(RecipeModel, recipe);
    }

    async getRecipeById(id: string): Promise<Recipe | null> {
        return this.apiClient.findById(RecipeModel, id);
    }

    async updateRecipe(recipe: RecipeModel): Promise<Recipe> {
        return this.apiClient.update(RecipeModel, recipe);
    }    

    async deleteRecipeById(id: IdType): Promise<Recipe> {
        return this.apiClient.deleteById(RecipeModel, id);
    }

}
