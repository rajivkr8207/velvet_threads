export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(req, { params }) {
   
  const decoded = getDataFromToken(req)

  if (!decoded) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const address = await prisma.address.findFirst({
    where: {
      id: params.id,
      userId: decoded.id, // 🔐 ownership check
    },
  });

  if (!address) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(address);
}

export async function PUT(req, { params }) {
  const decoded = getDataFromToken(req)

  if (!decoded) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  const address = await prisma.address.updateMany({
    where: {
      id: params.id,
      userId: decoded.id,
    },
    data,
  });

  if (address.count === 0) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Address updated" });
}

export async function DELETE(req, { params }) {
  const decoded = getDataFromToken(req)

  if (!decoded) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await prisma.address.deleteMany({
    where: {
      id: params.id,
      userId: decoded.id,
    },
  });

  return NextResponse.json({ message: "Address deleted" });
}
