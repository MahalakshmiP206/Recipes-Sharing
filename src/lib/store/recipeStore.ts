import { create } from "zustand";

export interface Review {
  id: number;
  name: string;
  comment: string;
  rating: number;
}

export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  steps: string;
  imageUrl?: string;
  description?: string;
  reviews: Review[]; // ✅ Make sure each recipe has reviews
}

interface RecipeStore {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, "id" | "reviews">) => void;
  updateRecipe: (id: number, updated: Partial<Recipe>) => void;
  deleteRecipe: (id: number) => void;
  addReview: (recipeId: number, review: Review) => void; // ✅ Add this
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  recipes: [],

  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [
        ...state.recipes,
        { ...recipe, id: Date.now(), reviews: [] }, // ✅ Add reviews array
      ],
    })),

  updateRecipe: (id, updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === id ? { ...r, ...updated } : r
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),

  addReview: (recipeId, review) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === recipeId ? { ...r, reviews: [...r.reviews, review] } : r
      ),
    })),
}));
