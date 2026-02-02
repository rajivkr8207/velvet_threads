import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendemail } from "@/helpers/mail";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      username,
      email,
      fullName,
      password,
      mobileNo,
    } = body;

    if (!username || !email || !fullName || !password) {
      return NextResponse.json(
        { message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email or username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const hashtoken = await bcrypt.hash(email.toString(), 10);
    const verifyToken = hashtoken;
    const verifyTokenExp = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    const user = await prisma.user.create({
      data: {
        username,
        email,
        fullName,
        mobileNo,
        password: hashedPassword,
        verifyToken,
        verifyTokenExp,
        isVerified: false,
        isAdmin: false,
      },
    });
    await sendemail({ email, emailtype: "VERIFY", hashtoken: verifyToken })

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER_ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
