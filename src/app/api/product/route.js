export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";


export async function GET(req) {
    const products = await prisma.product.findMany({
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return NextResponse.json(products);
}

export async function POST(req) {
    const decoded = getDataFromToken(req)

    if (!decoded) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 🔐 Admin check
    const admin = await prisma.user.findUnique({
        where: { id: decoded.id },
    });

    if (!admin || !admin.isAdmin) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const {
        name,
        slug,
        description,
        price,
        stock,
        images,
        categoryId,
    } = await req.json();

    const product = await prisma.product.create({
        data: {
            name,
            slug,
            description,
            price,
            stock,
            images,
            categoryId,
        },
    });

    return NextResponse.json(product, { status: 201 });
}
