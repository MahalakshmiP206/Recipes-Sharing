"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Plus, Pencil, Trash2 } from "lucide-react";
import { useRecipeStore } from "@/lib/store/recipeStore";
import type { Recipe } from "@/lib/store/recipeStore";

type RecipeInput = Omit<Recipe, "id" | "reviews">;

export default function AddRecipePage() {
  const router = useRouter();

  const recipes = useRecipeStore((state) => state.recipes);
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const [newRecipe, setNewRecipe] = useState<RecipeInput>({
    title: "",
    ingredients: "",
    steps: "",
    imageUrl: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setNewRecipe({ title: "", ingredients: "", steps: "", imageUrl: "" });
  };

  const isFormValid = () =>
    newRecipe.title.trim() &&
    newRecipe.ingredients.trim() &&
    newRecipe.steps.trim();

  const handleAddRecipe = () => {
    if (!isFormValid()) return;
    addRecipe(newRecipe); // ✅ No need to pass id or reviews
    resetForm();
  };

  const handleDelete = (id: number) => {
    deleteRecipe(id);
    if (editingId === id) resetForm();
  };

  const handleEdit = (id: number) => {
    const recipe = recipes.find((r) => r.id === id);
    if (recipe) {
      setNewRecipe({
        title: recipe.title,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        imageUrl: recipe.imageUrl || "",
      });
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (!isFormValid() || editingId === null) return;
    updateRecipe(editingId, newRecipe); // ✅ Correct usage
    resetForm();
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 text-gray-800">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="text-orange-500" />
          Add Your Delicious Recipes
        </h1>
        <button
          onClick={() => router.push("/")}
          className="text-sm bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-md shadow-sm"
        >
          ← Back to Home
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      {/* 📝 Recipe Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 space-y-4">
        <input
          name="title"
          value={newRecipe.title}
          onChange={handleInputChange}
          placeholder="🍽️ Recipe Title"
          className="w-full border p-3 rounded-lg"
        />
        <input
          name="ingredients"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
          placeholder="🥕 Ingredients (comma-separated)"
          className="w-full border p-3 rounded-lg"
        />
        <textarea
          name="steps"
          value={newRecipe.steps}
          onChange={handleInputChange}
          placeholder="👩‍🍳 Preparation Steps"
          rows={3}
          className="w-full border p-3 rounded-lg"
        />
        <input
          name="imageUrl"
          value={newRecipe.imageUrl}
          onChange={handleInputChange}
          placeholder="🖼️ Image URL (optional)"
          className="w-full border p-3 rounded-lg"
        />

        {editingId ? (
          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-md transition"
            >
              ✏️ Update Recipe
            </button>
            <button
              onClick={resetForm}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddRecipe}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md transition"
          >
            <Plus className="inline-block mr-2 -mt-1" />
            Add Recipe
          </button>
        )}
      </div>

      {/* 🍲 Recipe List */}
      <div className="space-y-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border border-gray-200 shadow-md p-5 rounded-xl hover:shadow-lg transition relative group"
            >
              {recipe.imageUrl && (
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title || "Recipe image"}
                  className="rounded-md mb-4 max-h-52 w-full object-cover"
                />
              )}
              <h2 className="text-xl font-bold mb-1">{recipe.title}</h2>

              <div className="mb-2 text-sm text-gray-600">
                <strong>Ingredients:</strong>
                <div className="mt-1 flex flex-wrap gap-2">
                  {recipe.ingredients.split(",").map((item, i) => (
                    <span
                      key={i}
                      className="bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-xs"
                    >
                      {item.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-600">
                <strong>Steps:</strong> {recipe.steps}
              </p>

              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleEdit(recipe.id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 text-xs rounded-md shadow"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded-md shadow"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-20">
            <img
              src="/images/empty-recipes.png"
              alt="No recipes"
              className="w-48 mx-auto mb-4"
            />
            <p>No recipes found. Add your first delicious recipe above! 🍲</p>
          </div>
        )}
      </div>
    </main>
  );
}
