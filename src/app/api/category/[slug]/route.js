export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(req, { params }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      products: true,
    },
  });

  if (!category) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function PUT(req, { params }) {
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

  const data = await req.json();

  const updated = await prisma.category.update({
    where: { slug: params.slug },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
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

  await prisma.category.delete({
    where: { slug: params.slug },
  });

  return NextResponse.json({ message: "Category deleted" });
}
