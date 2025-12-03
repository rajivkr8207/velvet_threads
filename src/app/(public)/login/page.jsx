"use client";

import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";

export default function LoginRegisterPage() {
  const [tab, setTab] = useState("login");

  return (
    <div className=" flex justify-center items-center my-20">

      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-8">

        {/* Tabs */}
        <div className="flex w-full mb-6 bg-gray-200 rounded-full p-1">
          <button
            onClick={() => setTab("login")}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all ${
              tab === "login"
                ? "bg-[var(--button-purple)] text-white shadow"
                : "text-gray-600"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setTab("register")}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all ${
              tab === "register"
                ? "bg-[var(--button-purple)] text-white shadow"
                : "text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        {/* Animated Forms */}
        <div className="relative overflow-hidden h-auto">

          {/* LOGIN FORM */}
          <div
            className={`transition-all duration-300 ${
              tab === "login" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20 absolute"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back</h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <div className="flex items-center gap-3 bg-white/80 border border-gray-300 rounded-xl px-4 py-3">
                  <Mail size={18} className="text-gray-600" />
                  <input
                    type="email"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Password</label>
                <div className="flex items-center gap-3 bg-white/80 border border-gray-300 rounded-xl px-4 py-3">
                  <Lock size={18} className="text-gray-600" />
                  <input
                    type="password"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button className="w-full py-3 bg-[var(--button-purple)] hover:bg-[var(--button-purple-hover)] text-white rounded-full transition shadow-md">
                Login
              </button>
            </form>
          </div>

          {/* REGISTER FORM */}
          <div
            className={`transition-all duration-300 ${
              tab === "register" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20 absolute"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Account</h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600">Full Name</label>
                <div className="flex items-center gap-3 bg-white/80 border border-gray-300 rounded-xl px-4 py-3">
                  <User size={18} className="text-gray-600" />
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <div className="flex items-center gap-3 bg-white/80 border border-gray-300 rounded-xl px-4 py-3">
                  <Mail size={18} className="text-gray-600" />
                  <input
                    type="email"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Password</label>
                <div className="flex items-center gap-3 bg-white/80 border border-gray-300 rounded-xl px-4 py-3">
                  <Lock size={18} className="text-gray-600" />
                  <input
                    type="password"
                    className="w-full bg-transparent outline-none"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <button className="w-full py-3 bg-[var(--button-purple)] hover:bg-[var(--button-purple-hover)] text-white rounded-full transition shadow-md">
                Register
              </button>
            </form>
          </div>
<button
      className="w-full mx-auto my-3 max-w-xs flex items-center justify-center gap-3 bg-white border border-[#747775] rounded-md h-10 px-4 
                 transition-all duration-200 hover:shadow-md active:bg-gray-100 focus:bg-gray-100"
    >
      {/* ICON */}
      <div className="w-5 h-5">
        <svg viewBox="0 0 48 48">
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
        </svg>
      </div>

      {/* TEXT */}
      <span className="font-medium text-sm text-[#1f1f1f]">
        Sign in with Google
      </span>
    </button>
        </div>
      </div>
    </div>
  );
}
