export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req) {
  try {
    const decoded = getDataFromToken(req)
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {
      fullName,
      phone,
      street,
      city,
      state,
      pincode,
      country,
    } = await req.json();

    const address = await prisma.address.create({
      data: {
        userId: decoded.id,
        fullName,
        phone,
        street,
        city,
        state,
        pincode,
        country,
      },
    });

    return NextResponse.json(address, { status: 201 });
  } catch (err) {
    console.error("ADDRESS_CREATE_ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const decoded = getDataFromToken(req)

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const addresses = await prisma.address.findMany({
      where: { userId: decoded.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(addresses);
  } catch (err) {
    console.error("ADDRESS_LIST_ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
