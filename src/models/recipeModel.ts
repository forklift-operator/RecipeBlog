import type { Identifiable, IdType } from "../types/commonTypes";

export interface Recipe extends Identifiable<IdType> {
    author: string;
    title: string;
    short_desc: string;
    time: number;
    products: string[];
    img_url: string;
    long_desc: string;
    tags?: string[];
    createdAt?: Date;
    updatedAt: Date;
}

export class RecipeModel implements Recipe {
    static className = "recipe";
    
    id: IdType;
    author: string;
    title: string;
    short_desc: string;
    time: number;
    products: string[];
    img_url: string;
    long_desc: string;
    tags?: string[];
    createdAt?: Date;
    updatedAt: Date;

    constructor(recipe: Recipe) {
        this.id = recipe.id || crypto.randomUUID();
        this.author = recipe.author;
        this.title = recipe.title;
        this.short_desc = recipe.short_desc;
        this.time = recipe.time;
        this.products = recipe.products;
        this.img_url = recipe.img_url;
        this.long_desc = recipe.long_desc;
        this.tags = recipe.tags || [];
        this.createdAt = recipe.createdAt || new Date();
        this.updatedAt = new Date();
    }
}