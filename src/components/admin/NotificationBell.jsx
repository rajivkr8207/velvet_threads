"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Mail } from "lucide-react";
import Link from "next/link";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [notifications] = useState([
    {
      id: 1,
      title: "New Contact Message",
      message: "Rahul Kumar contacted you.",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "New Inquiry",
      message: "Priya asked about refund.",
      time: "10 min ago",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <Bell size={24} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-[2px] rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 shadow-xl border rounded-xl z-50 bg-white overflow-hidden">
          <div className="p-4 border-b flex justify-between">
            <h3 className="font-semibold text-lg">Notifications</h3>
            <span className="text-sm text-gray-500">
              {unreadCount} unread
            </span>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                  !n.read ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex gap-3">
                  <Mail className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium">{n.title}</p>
                    <p className="text-sm text-gray-600">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/contacts"
            onClick={() => setOpen(false)}
            className="block w-full text-center py-3 text-sm font-medium hover:bg-gray-50"
          >
            View All
          </Link>
        </div>
      )}
    </div>
  );
}
