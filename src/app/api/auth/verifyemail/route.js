import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");
        if (!token) {
            return NextResponse.json(
                { message: "Verification token is required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findFirst({
            where: {
                verifyToken: token,
                verifyTokenExp: {
                    gt: new Date(), // token not expired
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid or expired verification token" },
                { status: 400 }
            );
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verifyToken: null,
                verifyTokenExp: null,
            },
        });

        return NextResponse.json(
            { message: "Email verified successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("VERIFY_EMAIL_ERROR:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
