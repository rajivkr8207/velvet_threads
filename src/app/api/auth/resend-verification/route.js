import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendemail } from "@/helpers/mail";

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email or username is required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "If account exists, verification email will be sent" },
                { status: 200 }
            );
        }

        if (user.isVerified) {
            return NextResponse.json(
                { message: "Account already verified" },
                { status: 200 }
            );
        }

        // 3️⃣ Generate NEW token (overwrite old)
        const verifyToken = await bcrypt.hash(email.toString(), 10);
        const verifyTokenExp = new Date(Date.now() + 15 * 60 * 1000); // 15 min

        await prisma.user.update({
            where: { id: user.id },
            data: {
                verifyToken,
                verifyTokenExp,
            },
        });

        // 4️⃣ Send email (for now just log)

        await sendemail({ email: user.email, emailtype: "VERIFY" })
        return NextResponse.json(
            { message: "Verification email sent again" },
            { status: 200 }
        );
    } catch (error) {
        console.error("RESEND_VERIFY_ERROR:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
