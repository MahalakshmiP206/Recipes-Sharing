// src/app/components/RecipeCard/page.tsx
import Image from "next/image";

interface RecipeCardProps {
  title: string;
  ingredients: string;
  steps: string;
  imageUrl: string;
}

export default function RecipeCard({
  title,
  ingredients,
  steps,
  imageUrl,
}: RecipeCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <Image
        src={imageUrl}
        width={400}
        height={300}
        alt={title}
        className="rounded-lg mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2">
        <strong>Ingredients:</strong> {ingredients}
      </p>
      <p className="text-gray-700">
        <strong>Steps:</strong> {steps}
      </p>
    </div>
  );
}
