import { getAdmin } from "@/helpers/getAdmin";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    const resolve = await params;
    const { id } = resolve
    await prisma.user.update({
        where: { id },
        data: { isBlock: true }
    })
    return NextResponse.json({
        message: "user is Blocked"
    })
}



export async function GET(req, { params }) {
    try {
        await getAdmin(req)
        const allUser = await prisma.user.findMany()
        return NextResponse.json({
            data: allUser
        })
    } catch (error) {
        console.error(error);
    }

}