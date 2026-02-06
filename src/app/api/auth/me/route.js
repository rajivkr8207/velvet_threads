import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const token = req.cookies.get(process.env.COOKIE_SECRET)?.value || '';
        if (!token) return null;
        const userdata = jwt.verify(token, process.env.JWT_SECRET)
        if (!userdata){
            return NextResponse.json({
                status: 401, message: "userdata is empty"
            })
        }
        return NextResponse.json(
            { message: "user fetch successfully", userdata },
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
