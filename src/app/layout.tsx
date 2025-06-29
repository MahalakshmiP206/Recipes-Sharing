// app/layout.tsx
import "./globals.css"; 

import { inter } from "@/app/ui/fonts";

export const metadata = {
  title: "RecipeShare",
  description: "Share your favorite recipes!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
