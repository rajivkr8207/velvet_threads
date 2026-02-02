export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(categories);
}

export async function POST(req) {
  try {
    const decoded = getDataFromToken(req);

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const admin = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!admin || !admin.isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { name, slug } = await req.json();

    const category = await prisma.category.create({
      data: { name, slug },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.error("CATEGORY_CREATE_ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
