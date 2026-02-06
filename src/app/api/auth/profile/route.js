import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const token = req.cookies.get(process.env.COOKIE_SECRET)?.value || '';
        if (!token) return null;
        const userdata = jwt.verify(token, process.env.JWT_SECRET)
        if (!userdata) {
            return NextResponse.json(
                { message: "userdata is not found" },
                { status: 400 }
            );
        }
        const user = await prisma.user.findFirst({
            where: { id: userdata.id },
        });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid or expired verification token" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "user fetch successfully", user },
            { status: 200 },
        );
    } catch (error) {
        console.error("VERIFY_EMAIL_ERROR:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
