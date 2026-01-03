"use client";

import { useState } from "react";
import { Camera, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EditProfilePage() {
  const [avatar, setAvatar] = useState("/avatar.png");
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    phonenumber: ''
  })

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };
const handleChange = (e) => {
  const { name, value } = e.target;

  setUser((prev) => ({
    ...prev,
    [name]: value,   // dynamic key update
  }));
};

  const handleform = (e) => {
    e.preventDefault()
    console.log(user);
  }

  return (
      <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl p-8 mt-10 border ">

        {/* Back Button */}
        <Link href="/profile/23" className="flex items-center gap-2 text-gray-600 mb-5 hover:text-black transition">
          <ArrowLeft size={20} />
          Back to Profile
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Profile</h1>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <Image
              src={avatar}
              width={110}
              height={110}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            />

            <label className="absolute bottom-0 right-0 bg-[var(--button-purple)] text-white p-2 rounded-full shadow cursor-pointer">
              <Camera size={18} />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
          <p className="mt-3 text-gray-500 text-sm">Click to change your photo</p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => handleform(e)} className="grid sm:grid-cols-2 gap-6">

          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={user.fullname}
              onChange={handleChange}
              placeholder="Rajiv Kumar"
              className="mt-1 w-full px-4 py-3 bg-white/60 rounded-xl border border-gray-300 outline-none focus:border-[var(--button-purple)] transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="rajiv@example.com"
              className="mt-1 w-full px-4 py-3 bg-white/60 rounded-xl border border-gray-300 outline-none focus:border-[var(--button-purple)] transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              type="text"
              name="phonenumber"
              value={user.phonenumber}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="mt-1 w-full px-4 py-3 bg-white/60 rounded-xl border border-gray-300 outline-none focus:border-[var(--button-purple)] transition"
            />
          </div>



          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">

            <Link
              href="/profile/23"
              className="w-full sm:w-auto px-6 py-3 bg-gray-200 rounded-full text-gray-700  transition"
            >
              Cancel
            </Link>

            <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-[var(--button-purple)] hover:bg-[var(--button-purple-hover)] text-white rounded-full transition">
              Save Changes
            </button>

          </div>
        </form>

      </div>
  );
}
