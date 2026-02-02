export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(req, { params }) {
  const decoded = getDataFromToken(req);
  if (!decoded) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const order = await prisma.order.findFirst({
    where: {
      id: params.id,
      userId: decoded.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      address: true,
    },
  });

  if (!order) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(order);
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

  const { status } = await req.json();

  const updated = await prisma.order.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(updated);
}
