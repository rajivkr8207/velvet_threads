export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

/* =========================
   UPDATE CART ITEM QTY
========================= */
export async function PUT(req) {
  try {
    const decoded = getDataFromToken(req)

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { cartItemId, quantity } = await req.json();

    if (!cartItemId || quantity < 1) {
      return NextResponse.json(
        { message: "Invalid data" },
        { status: 400 }
      );
    }

    // 🔐 Ownership check
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: {
          userId: decoded.id,
        },
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return NextResponse.json({ message: "Quantity updated" });
  } catch (err) {
    console.error("CART_ITEM_UPDATE_ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const decoded = getDataFromToken(req)

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { cartItemId } = await req.json();

    if (!cartItemId) {
      return NextResponse.json(
        { message: "cartItemId required" },
        { status: 400 }
      );
    }

    await prisma.cartItem.deleteMany({
      where: {
        id: cartItemId,
        cart: {
          userId: decoded.id,
        },
      },
    });

    return NextResponse.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("CART_ITEM_DELETE_ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
