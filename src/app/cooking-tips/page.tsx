"use client";

import { useRouter } from "next/navigation";
import { Sparkles, ChefHat, BookOpen, Home } from "lucide-react";

export default function CookingTipsPage() {
  const router = useRouter();

  const beginnerTips = [
    {
      title: "📏 How to Measure Flour Correctly",
      content:
        "Spoon the flour into the measuring cup and level it with a knife. Don’t scoop directly from the bag—it packs too much flour!",
    },
    {
      title: "🔪 Knife Safety 101",
      content:
        "Keep your knives sharp. Use the claw grip to protect your fingers and never leave knives in the sink.",
    },
    {
      title: "🧂 Season as You Go",
      content:
        "Taste often and season your dishes gradually—this ensures balanced flavor throughout.",
    },
  ];

  const advancedTips = [
    {
      title: "🔥 Don’t Crowd the Pan",
      content:
        "Overcrowding your pan lowers the temperature, leading to soggy instead of crispy food. Cook in batches.",
    },
    {
      title: "🥩 Let Meat Rest After Cooking",
      content:
        "Resting helps juices redistribute. Let meat sit for 5–10 minutes after cooking before slicing.",
    },
    {
      title: "🌡️ Use a Meat Thermometer",
      content:
        "For perfect doneness every time, use a digital thermometer to avoid overcooked meat.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      {/* Back to Home */}
      <button
        onClick={() => router.push("/")}
        className="mb-6 bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-black font-semibold px-4 py-2 rounded shadow flex items-center gap-2"
      >
        <Home size={18} /> Back to Home
      </button>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-orange-700 mb-3">
          📚 Cooking Tips & Tricks
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Whether you're new to the kitchen or a seasoned home chef, these
          practical tips will level up your cooking game!
        </p>
      </div>

      {/* Inspiration Box */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded mb-10 shadow-md text-sm sm:text-base">
        <p className="italic text-yellow-800">
          “Cooking is an art, but all art requires knowing something about the
          techniques and materials.” — Nathan Myhrvold
        </p>
      </div>

      {/* Beginner Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
          <ChefHat size={20} /> For Beginners
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {beginnerTips.map((tip, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow hover:shadow-xl border-l-4 border-orange-300 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-orange-600 mb-1">
                {tip.title}
              </h3>
              <p className="text-gray-700">{tip.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
          <Sparkles size={20} /> Pro Techniques
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {advancedTips.map((tip, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow hover:shadow-xl border-l-4 border-red-400 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-red-600 mb-1">
                {tip.title}
              </h3>
              <p className="text-gray-700">{tip.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-16 text-sm text-gray-500">
        Want more?{" "}
        <button
          onClick={() => router.push("/add-recipe")}
          className="text-orange-600 hover:underline"
        >
          Add your own recipe
        </button>{" "}
        or{" "}
        <button
          onClick={() => router.push("/")}
          className="text-orange-600 hover:underline"
        >
          explore featured dishes
        </button>
        .
      </footer>
    </div>
  );
}
