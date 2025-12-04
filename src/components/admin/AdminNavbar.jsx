'use client'
import { Bell } from "lucide-react"
import Link from "next/link"
import NotificationBell from "./NotificationBell"

const AdminNavbar = () => {
    return (
        <div className="flex items-center justify-between lg:px-12 px-3 py-3 border-b border-slate-200 transition-all">
           
            <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                <span className="text-green-600">{process.env.NEXT_STORE_NAME}</span>cart<span className="text-green-600 text-5xl leading-0">.</span>
                <p className="absolute text-xs font-semibold -top-1 -right-13 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                    Admin
                </p>
            </Link>
            <div className="flex items-center gap-3">
                <button className="py-1  px-3  text-purple-600  rounded-lg">
                    <NotificationBell />
                </button>
                <p>Hi, Admin</p>
                <Link href='/admin/profile/23' className="py-1  px-3  bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                    Profile
                </Link>
            </div>
        </div>
    )
}

export default AdminNavbar