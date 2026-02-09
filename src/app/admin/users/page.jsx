"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Loading from "@/components/Loading";
import { productDummyData } from "@/assets/assets";
import api from "@/lib/axios";

export default function StoreManageProducts() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const [loading, setLoading] = useState(true);
  const [allusers, setAllUser] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/users");
      console.log(res.data);
      setAllUser(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const toggleUserBlock = async (userid) => {
    // Logic to toggle the stock of a allusers
    console.log(userid);
    try {
      const res = await api.put(`/admin/users/${userid}`);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="text-2xl text-slate-500 mb-5">
        Manage <span className="text-slate-800 font-medium">Users</span>
      </h1>
      <table className="w-full max-w-4xl text-left  ring ring-slate-200  rounded overflow-hidden text-sm">
        <thead className="bg-slate-50 text-gray-700 uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3">FullName</th>
            <th className="px-4 py-3 hidden md:table-cell">email</th>
            <th className="px-4 py-3 hidden md:table-cell">userName</th>
            <th className="px-4 py-3">MobileNo</th>
            <th className="px-4 py-3">Join By</th>

            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {allusers.map((allusers) => (
            <tr
              key={allusers.id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-3">
                <div className="flex gap-2 items-center">
                  {allusers.fullName}
                </div>
              </td>
              <td className="px-4 py-3 max-w-md text-slate-600 hidden md:table-cell truncate">
                {allusers.email}
              </td>
              <td className="px-4 py-3 hidden md:table-cell">
                {allusers.username}
              </td>
              <td className="px-4 py-3">{allusers.mobileNo}</td>
              <td className="px-4 py-3">{allusers.createdAt.split("T")[0]}</td>
              <td className="px-4 py-3 text-center">
                <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={() => toggleUserBlock(allusers.id)}
                    checked={allusers?.isBlock}
                  />
                  <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                  <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
