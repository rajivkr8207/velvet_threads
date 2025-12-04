"use client";

import { useState } from "react";
import { Phone, Mail, CheckCircle, XCircle, Eye } from "lucide-react";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      phone: "9876543210",
      message: "Delivery issue, order not received yet.",
      status: "Pending",
      date: "2025-12-03",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "9988776655",
      message: "I want to return my product.",
      status: "Pending",
      date: "2025-12-02",
    },
  ]);

  const handleResolve = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, status: "Resolved" } : m));
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div className="w-full p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-7">User Contact Messages</h1>

      <div className="bg-white rounded-xl shadow border p-5">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Message</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{msg.name}</td>
                <td className="p-3">{msg.email}</td>
                <td className="p-3">{msg.phone}</td>
                <td className="p-3 max-w-xs truncate">{msg.message}</td>
                <td className="p-3">{msg.date}</td>

                <td className="p-3">
                  <span className={`px-3 py-1 rounded text-white text-xs 
                    ${msg.status === "Pending" ? "bg-red-500" : "bg-green-600"}`}>
                    {msg.status}
                  </span>
                </td>

                <td className="p-3 flex justify-center gap-3">

                  {/* See Details */}
                  <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg">
                    <Eye className="text-blue-600" size={18} />
                  </button>

                  {/* Call */}
                  <a href={`tel:${msg.phone}`} className="p-2 bg-green-100 hover:bg-green-200 rounded-lg">
                    <Phone className="text-green-600" size={18} />
                  </a>

                  {/* Mark Resolved */}
                  {msg.status === "Pending" && (
                    <button
                      onClick={() => handleResolve(msg.id)}
                      className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg"
                    >
                      <CheckCircle className="text-yellow-700" size={18} />
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 bg-red-100 hover:bg-red-200 rounded-lg"
                  >
                    <XCircle className="text-red-500" size={18} />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
