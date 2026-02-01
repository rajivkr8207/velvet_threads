import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = NextResponse.json({
            message: "logout successfull",
            success: true
        })
        res.cookies.set("xyztoken", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return res
    } catch (error) {
        console.error(error);
    }

}