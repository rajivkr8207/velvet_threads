export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/helpers/getAdmin";
import { slugify } from "@/helpers/slugify";

export async function GET(req, { params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const category = await prisma.category.findUnique({
    where: { slug: slug },
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
  await getAdmin(req)
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const { name } = await req.json();
  const slug = slugify(name);
  const updated = await prisma.category.update({
    where: { id },
    data: { name, slug },
  });

  return NextResponse.json(updated);
}


export async function DELETE(req, { params }) {
  await getAdmin(req)
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) {
    return NextResponse.json(
      { error: "id is required" },
      { status: 400 }
    );
  }
  await prisma.category.delete({
    where: { id }
  })
  return NextResponse.json({
    success: true,
    message: "Category deleted successfully",
    id
  });
}
