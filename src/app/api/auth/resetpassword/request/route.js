import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendemail } from "@/helpers/mail";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

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
        { message: "If account exists, reset link will be sent" },
        { status: 200 }
      );
    }

    const resetToken =await bcrypt.hash(email.toString(), 10);
    const resetTokenExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await prisma.user.update({
      where: { id: user.id },
      data: {
        forgotPasswordToken: resetToken,
        forgotPasswordTokenExpire: resetTokenExpire,
      },
    });

    await sendemail({ email: user.email, emailtype: "RESET" })
    
    return NextResponse.json(
      {
        message: "reset link will be sent",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("RESET_PASSWORD_REQUEST_ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
