"use client";

import Image from "next/image";
import { Edit, Mail, Phone, MapPin, ShoppingBag, Heart, LogOut } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const {id} = useParams()
  return (
    <div className="">
      
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-lg border rounded-3xl p-8 mt-10">
        
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          
          {/* Avatar */}
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150"
              width={110}
              height={110}
              alt="User Avatar"
              className="rounded-full shadow-md border-4 border-white"
            />
            <button className="absolute bottom-0 right-0 bg-[var(--button-purple)] text-white p-2 rounded-full shadow">
              <Edit size={18} />
            </button>
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-800">Rajiv Kumar</h1>
            <p className="text-gray-500 mt-1">Full Stack Developer</p>

            <div className="flex justify-center sm:justify-start flex-wrap gap-4 mt-4 text-gray-600">
              <div className="flex items-center gap-2"><Mail size={18} /> rajiv@example.com</div>
              <div className="flex items-center gap-2"><Phone size={18} /> +91 9876543210</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-300 my-6"></div>

        {/* Info Section */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            <div className="text-gray-500 text-sm">Location</div>
            <div className="flex items-center gap-2 text-gray-700 font-semibold mt-1">
              <MapPin size={18} /> Muzaffarpur, Bihar
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            <div className="text-gray-500 text-sm">Member Since</div>
            <div className="text-gray-700 font-semibold mt-1">2022</div>
          </div>

          
        </div>

        {/* Stats */}
        <div className="mt-8 grid sm:grid-cols-2 gap-6 ">
          <div className="bg-gradient-to-br from-purple-600/90 to-purple-500/30 text-white p-6 rounded-2xl shadow-lg">
            <ShoppingBag size={28} />
            <h2 className="text-3xl font-bold mt-3">18</h2>
            <p className="text-sm opacity-90">Total Orders</p>
          </div>

          <div className="bg-gradient-to-br from-green-600/90 to-green-500/30 text-white p-6 rounded-2xl shadow-lg">
            <Heart size={28} />
            <h2 className="text-3xl font-bold mt-3">42</h2>
            <p className="text-sm opacity-90">Wishlist Items</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
          <Link href='/profile/edit/23' className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 rounded-full  transition">
            Edit Profile
          </Link>

          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[var(--button-purple)]   text-white rounded-full shadow hover:bg-[var(--button-purple-hover)] transition">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
