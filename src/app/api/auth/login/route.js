import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json();
        const { emailOrUsername, password } = body;

        if (!emailOrUsername || !password) {
            return NextResponse.json(
                { message: "Email/Username and password are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrUsername },
                    { username: emailOrUsername },
                ],
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        if (!user.isVerified) {
            return NextResponse.json(
                { message: "Please verify your email first" },
                { status: 403 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                username: user.username,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        const response = NextResponse.json({
            message: "login successful",
            success: true
        })
        response.cookies.set(process.env.COOKIE_SECRET, token, {
            httpOnly: true,
        })
        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
