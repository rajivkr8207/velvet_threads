export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req) {
  try {
    const decoded = getDataFromToken(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { addressId } = await req.json();

    const cart = await prisma.cart.findUnique({
      where: { userId: decoded.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { message: "Cart is empty" },
        { status: 400 }
      );
    }

    let total = 0;
    cart.items.forEach(item => {
      total += item.product.price * item.quantity;
    });

    const order = await prisma.order.create({
      data: {
        userId: decoded.id,
        addressId,
        total,
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            price: item.product.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    console.error("ORDER_CREATE_ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req) {
  const decoded = getDataFromToken(req);
  if (!decoded) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { userId: decoded.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
