"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] to-[#e3e3e3] p-6">
      
      <div className="max-w-5xl mx-auto mt-10">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          We’re here to help and answer any questions you might have.
        </p>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Info Card */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Get In Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail size={28} className="text-[var(--button-purple)]" />
                <div>
                  <h3 className="font-semibold text-gray-700">Email</h3>
                  <p className="text-gray-600">support@yourstore.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={28} className="text-[var(--button-purple)]" />
                <div>
                  <h3 className="font-semibold text-gray-700">Phone</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={28} className="text-[var(--button-purple)]" />
                <div>
                  <h3 className="font-semibold text-gray-700">Address</h3>
                  <p className="text-gray-600">Muzaffarpur, Bihar, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Message</h2>

            <form className="space-y-5">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 outline-none focus:border-[var(--button-purple)] transition"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 outline-none focus:border-[var(--button-purple)] transition"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 outline-none resize-none focus:border-[var(--button-purple)] transition"
                ></textarea>
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--button-purple)] text-white rounded-full shadow hover:bg-[var(--button-purple-hover)] transition">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
