// src/app/page.tsx
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-black font-sans">
      {/* Header */}
      <header className="bg-primary text-black px-6 py-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">🍽️ RecipeShare</h1>
          <nav className="space-x-6 text-lg font-semibold">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/recipes" className="hover:underline">
              Recipes
            </Link>
            <Link href="/add-recipe" className="hover:underline">
              Add Recipes
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Image Section */}
      <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12 mx-auto">
        {/* Desktop Image */}
        <Image
          src="/images/logo.jpg"
          width={500}
          height={760}
          className="hidden md:block rounded-lg"
          alt="Delicious food for desktop users"
        />
        {/* Mobile Image */}
        <Image
          src="/images/img2.jpg"
          width={560}
          height={620}
          className="block md:hidden rounded-lg"
          alt="Delicious food for mobile users"
        />
      </div>

      {/* Intro Text */}
      <section className="text-center py-12 bg-secondary text-black">
        <p className={`${lusitana.className} text-2xl md:text-4xl font-bold`}>
          Welcome to <span className="text-primary">RecipeShare</span>. Explore
          and share your favorite recipes with the world.
        </p>
      </section>

      {/* Recipes Section */}
      <section className="max-w-6xl mx-auto py-14 px-4 grid md:grid-cols-3 gap-8">
        {[3, 4, 5].map((i) => (
          <div key={i} className="bg-card rounded-2xl shadow-lg p-6">
            <Image
              src={`/images/img${i}.jpg`}
              width={400}
              height={300}
              alt={`Tasty Dish ${i}`}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">Tasty Dish #{i}</h3>
            <p className="text-base text-gray-700">
              A short description of this amazing recipe goes here.
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-primary text-black text-center py-6 mt-12 text-lg">
        <p>© 2025 RecipeShare. Crafted with ❤️ using Next.js.</p>
      </footer>
    </main>
  );
}
