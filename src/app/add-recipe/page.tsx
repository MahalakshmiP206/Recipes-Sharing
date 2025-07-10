"use client";

import { useState } from "react";

export default function AddRecipePage() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "My Recipe",
      ingredients: "Flour, Sugar, Eggs",
      steps: "Mix ingredients. Bake at 180°C for 20 mins.",
      imageUrl: "/images/img4.jpg",
    },
  ]);

  const [newRecipe, setNewRecipe] = useState({
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
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const handleAddRecipe = () => {
    if (!newRecipe.title.trim()) return;
    setRecipes([
      ...recipes,
      {
        ...newRecipe,
        id: Date.now(),
      },
    ]);
    setNewRecipe({ title: "", ingredients: "", steps: "", imageUrl: "" });
  };

  const handleDelete = (id: number) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  const handleEdit = (id: number) => {
    const recipe = recipes.find((r) => r.id === id);
    if (recipe) {
      setNewRecipe(recipe);
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (editingId !== null) {
      setRecipes(
        recipes.map((r) =>
          r.id === editingId ? { ...newRecipe, id: editingId } : r
        )
      );
      setEditingId(null);
      setNewRecipe({ title: "", ingredients: "", steps: "", imageUrl: "" });
    }
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Logout</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border p-2 mb-4"
      />

      {/* Add / Edit Form */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <input
          name="title"
          value={newRecipe.title}
          onChange={handleInputChange}
          placeholder="Recipe Title"
          className="w-full border p-2 mb-2"
        />
        <input
          name="ingredients"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
          placeholder="Ingredients"
          className="w-full border p-2 mb-2"
        />
        <textarea
          name="steps"
          value={newRecipe.steps}
          onChange={handleInputChange}
          placeholder="Steps"
          className="w-full border p-2 mb-2"
        />
        <input
          name="imageUrl"
          value={newRecipe.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="w-full border p-2 mb-2"
        />
        {editingId ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Recipe
          </button>
        ) : (
          <button
            onClick={handleAddRecipe}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Recipe
          </button>
        )}
      </div>

      {/* Recipe List */}
      <div className="space-y-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="relative border rounded p-2 shadow">
              <div>
                {recipe.imageUrl && (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="rounded mb-2 max-h-48 w-full object-cover"
                  />
                )}
                <h2 className="text-xl font-semibold">{recipe.title}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Ingredients:</strong> {recipe.ingredients}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Steps:</strong> {recipe.steps}
                </p>
              </div>
              <div className="absolute top-2 right-2 space-x-2">
                <button
                  onClick={() => handleEdit(recipe.id)}
                  className="bg-yellow-400 text-sm px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="bg-red-500 text-white text-sm px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recipes found.</p>
        )}
      </div>
    </div>
  );
}
