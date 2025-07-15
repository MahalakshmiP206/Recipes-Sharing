"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecipeStore, Review } from "@/lib/store/recipeStore";

export default function ReviewsPage() {
  const router = useRouter();
  const { recipes, addReview } = useRecipeStore();

  const [reviewForms, setReviewForms] = useState<Record<number, Review>>({});

  const handleInputChange = (
    recipeId: number,
    field: keyof Review,
    value: string | number
  ) => {
    setReviewForms((prev) => ({
      ...prev,
      [recipeId]: {
        ...prev[recipeId],
        id: prev[recipeId]?.id || Date.now(),
        name: prev[recipeId]?.name || "",
        comment: prev[recipeId]?.comment || "",
        rating: prev[recipeId]?.rating || 0,
        [field]: value,
      },
    }));
  };

  const submitReview = (recipeId: number) => {
    const review = reviewForms[recipeId];
    if (!review || !review.name || !review.comment || !review.rating) return;

    addReview(recipeId, review);

    setReviewForms((prev) => ({
      ...prev,
      [recipeId]: { id: 0, name: "", comment: "", rating: 0 },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-700">
        🍽️ Recipe Reviews
      </h1>

      <button
        onClick={() => router.push("/")}
        className="mb-6 bg-orange-300 hover:bg-orange-400 text-black font-semibold px-4 py-2 rounded shadow"
      >
        ← Back to Home
      </button>

      <div className="space-y-8">
        {recipes.map((recipe) => {
          const form = reviewForms[recipe.id] || {
            id: 0,
            name: "",
            comment: "",
            rating: 0,
          };

          const avgRating =
            recipe.reviews.length > 0
              ? (
                  recipe.reviews.reduce(
                    (sum: number, r: Review) => sum + r.rating,
                    0
                  ) / recipe.reviews.length
                ).toFixed(1)
              : null;

          return (
            <div
              key={recipe.id}
              className="border rounded-xl p-4 shadow bg-white"
            >
              {recipe.imageUrl && (
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full max-h-60 object-cover rounded mb-4"
                />
              )}

              <h2 className="text-xl font-bold text-orange-700">
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {recipe.description || "No description"}
              </p>

              <p className="text-sm mb-2">
                <strong>Average Rating:</strong>{" "}
                {avgRating ? `${avgRating} / 5 ⭐` : "No ratings yet"}
              </p>

              <div className="text-sm text-gray-700 space-y-2 mb-4">
                <h3 className="font-semibold">Reviews:</h3>
                {recipe.reviews.length ? (
                  recipe.reviews.map((r) => (
                    <div key={r.id} className="border p-2 rounded bg-gray-50">
                      <div className="text-yellow-500 text-sm">
                        {"⭐".repeat(r.rating)}
                      </div>
                      <p className="text-gray-800">{r.comment}</p>
                      <p className="text-xs text-gray-400">– {r.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No reviews yet.</p>
                )}
              </div>

              <div className="mt-4">
                <h4 className="font-medium">Leave a review:</h4>
                <input
                  placeholder="Your name"
                  className="w-full border p-2 mb-2 text-sm"
                  value={form.name}
                  onChange={(e) =>
                    handleInputChange(recipe.id, "name", e.target.value)
                  }
                />
                <textarea
                  placeholder="Comment"
                  className="w-full border p-2 mb-2 text-sm"
                  value={form.comment}
                  onChange={(e) =>
                    handleInputChange(recipe.id, "comment", e.target.value)
                  }
                />
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => handleInputChange(recipe.id, "rating", n)}
                      className={`px-2 text-sm rounded ${
                        form.rating >= n ? "bg-yellow-400" : "bg-gray-200"
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => submitReview(recipe.id)}
                  className="bg-blue-500 text-white px-4 py-1 text-sm rounded"
                >
                  Submit Review
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
