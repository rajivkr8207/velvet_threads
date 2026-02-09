import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/helpers/getAdmin";
import { slugify } from "@/helpers/slugify";
import { NextResponse } from "next/server";




export async function GET(req) {
  await getAdmin(req);

  const category = await prisma.category.findMany();

  return NextResponse.json(category);
}



export async function POST(req) {
  try {
    await getAdmin(req);

    const { name } = await req.json();

    const slug = slugify(name);

    const category = await prisma.category.create({
      data: { name, slug }
    });

    return NextResponse.json(category);

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 401 }
    );
  }
}
