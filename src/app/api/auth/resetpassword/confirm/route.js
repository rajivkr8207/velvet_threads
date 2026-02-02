import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");
        const body = await req.json();
        const { newPassword } = body;

        if (!token || !newPassword) {
            return NextResponse.json(
                { message: "Token and new password are required" },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { message: "Password must be at least 8 characters" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findFirst({
            where: {
                forgotPasswordToken: token,
                forgotPasswordTokenExpire: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid or expired reset token" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                forgotPasswordToken: null,
                forgotPasswordTokenExpire: null,
            },
        });

        return NextResponse.json(
            { message: "Password reset successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("RESET_PASSWORD_CONFIRM_ERROR:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
