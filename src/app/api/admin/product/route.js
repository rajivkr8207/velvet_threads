import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/helpers/getAdmin";
import { slugify } from "@/helpers/slugify";
import { NextResponse } from "next/server";

export async function GET() {
  const admin = await getDataFromToken(req);

  if (!admin || !admin.isAdmin) {
    return NextResponse.json({ error: "Admin only" }, { status: 403 });
  }

  const products = await prisma.product.findMany({
    include: { category: true }
  });

  return NextResponse.json(products);
}

export async function POST(req) {
  try {
    await getAdmin(req);

    const {
      name,
      description,
      price,
      stock,
      images,
      categoryId
    } = await req.json();

    const slug = slugify(name);

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        images,
        categoryId
      }
    });

    return NextResponse.json(product);

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 401 }
    );
  }
}
