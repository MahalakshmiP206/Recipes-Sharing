import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import prisma from "@/lib/prisma"; // adjust if your Prisma client is elsewhere
import { verifyToken } from "@/lib/auth"; // write a helper if needed
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();


export async function PUT(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "No token" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token); // Implement this helper to return userId
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return NextResponse.json(
        { error: "Incorrect current password" },
        { status: 400 }
      );

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashed },
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
