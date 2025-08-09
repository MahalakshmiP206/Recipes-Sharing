"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setMenuOpen(false);
    router.push("/login");
  };

  return (
    <main className="bg-[#fffaf4] min-h-screen text-black font-sans">
      {/* Top Navigation */}
      <header className="bg-[#fff1dc] px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-orange-700">
            🍽️ RecipeShare
          </h1>

          <nav className="flex items-center space-x-6 text-sm font-semibold relative">
            <Link href="/" className="hover:underline">
              Home
            </Link>

            {isAuthenticated && (
              <>
                <Link href="/add-recipe" className="hover:underline">
                  Add Recipes
                </Link>
                <Link href="/profile" className="hover:underline">
                  Profile
                </Link>
                <Link href="/reviews" className="hover:underline">
                  Reviews
                </Link>
                <Link href="/cooking-tips" className="hover:underline">
                  Tips & Tricks
                </Link>
              </>
            )}

            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-orange-200 px-3 py-1 rounded-md hover:bg-orange-300 transition"
              >
                👤 Account
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-10">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    🔐 Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    📝 Sign Up
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#ffe8d6] to-[#ffe9cc] py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-orange-800">
          Discover. Cook. Share.
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
          Welcome to{" "}
          <span className="text-orange-600 font-semibold">RecipeShare</span> —
          your go-to platform to explore mouthwatering dishes and share your
          culinary masterpieces with food lovers across the world.
        </p>
        <Link
          href="/signup"
          className="inline-block bg-orange-700 hover:bg-orange-800 text-white text-lg font-medium py-3 px-6 rounded-lg shadow-md transition"
        >
          Get Started
        </Link>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-3 gap-6 text-center">
        {[
          {
            icon: "🍳",
            title: "Add Your Own Recipes",
            desc: "Easily upload and share your favorite recipes.",
          },
          {
            icon: "📖",
            title: "Browse Thousands",
            desc: "Discover recipes from chefs and home cooks worldwide.",
          },
          {
            icon: "⭐",
            title: "Save Favorites",
            desc: "Bookmark recipes to revisit your favorites anytime.",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h2 className="text-xl font-bold text-orange-800 mb-2">
              {feature.title}
            </h2>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Popular Categories */}
      <section className="bg-[#fff3e6] py-12 text-center">
        <h3 className="text-3xl font-bold text-orange-700 mb-6">
          Popular Categories
        </h3>
        <div className="flex flex-wrap justify-center gap-4 px-4">
          {["Breakfast", "Lunch", "Dinner", "Desserts", "Vegan", "Snacks"].map(
            (cat, i) => (
              <span
                key={i}
                className="bg-white px-6 py-2 rounded-full shadow-sm border hover:bg-orange-100 cursor-pointer transition"
              >
                {cat}
              </span>
            )
          )}
        </div>
      </section>

      {/* Recipes Section */}
      <section className="max-w-6xl mx-auto py-14 px-4 grid md:grid-cols-3 gap-8">
        {[3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6"
          >
            <Image
              src={`/images/img${i}.jpg`}
              width={400}
              height={300}
              alt={`Tasty Dish ${i}`}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2 text-orange-700">
              Tasty Dish #{i}
            </h3>
            <p className="text-base text-gray-700">
              A delightful recipe that's perfect for your next meal. Explore the
              full details inside.
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-[#fff1dc] text-black text-center py-6 mt-12 text-lg">
        <p>
          © 2025 RecipeShare. Crafted with ❤️ using Next.js and Tailwind CSS.
        </p>
      </footer>
    </main>
  );
}
