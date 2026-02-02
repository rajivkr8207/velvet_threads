export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(req, { params }) {
    const product = await prisma.product.findUnique({
        where: { slug: params.slug },
        include: {
            category: true,
            reviews: true,
        },
    });

    if (!product) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(product);
}

export async function PUT(req, { params }) {
    const decoded = getDataFromToken(req)

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

    const updated = await prisma.product.update({
        where: { slug: params.slug },
        data,
    });

    return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
    const decoded = getDataFromToken(req)

    if (!decoded) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const admin = await prisma.user.findUnique({
        where: { id: decoded.id },
    });

    if (!admin || !admin.isAdmin) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.product.delete({
        where: { slug: params.slug },
    });

    return NextResponse.json({ message: "Product deleted" });
}
