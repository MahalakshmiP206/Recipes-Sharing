// src/lib/auth.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyToken(token: string): { id: string } {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string };
  } catch (err) {
    throw new Error("Invalid token");
  }
}
