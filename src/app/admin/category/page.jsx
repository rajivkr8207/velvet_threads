"use client";
import api from "@/lib/axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Category() {
  const [allCategory, setAllCategory] = useState([]);
  const [categoryname, setCategoryname] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const onChangeHandler = (e) => {
    setCategoryname(e.target.value);
  };
  async function fetchCategory() {
    try {
      const res = await api.get("/admin/category");
      setAllCategory(res);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (categoryId) {
      await api.put(`/admin/category/${categoryId}`, { name: categoryname });
      toast.success("category add successfully");
      setCategoryname("");
      setCategoryId(null)
      fetchCategory();
      setLoading(false)
      return;
    }
    try {
      await api.post("/admin/category", { name: categoryname });
      toast.success("category add successfully");
      setCategoryname("");
      fetchCategory();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/admin/category/${id}`);
      toast.success(res.message);
      fetchCategory();
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (id, name) => {
    setCategoryId(id);
    setCategoryname(name);
  };
  return (
    <>
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className="text-slate-500 mb-28"
      >
        <h1 className="text-2xl">
          Add New <span className="text-slate-800 font-medium">Category</span>
        </h1>

        <label htmlFor="" className="flex flex-col gap-2 my-6 ">
          Name
          <input
            type="text"
            name="name"
            onChange={onChangeHandler}
            value={categoryname}
            placeholder="Enter category"
            className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded"
            required
          />
        </label>
        <br />

        <button
          disabled={loading}
          className="bg-slate-800 text-white px-6 mt-1 py-2 hover:bg-slate-900 rounded transition"
        >
          {loading ? "loading" : "Add Category"}
        </button>
      </form>

      <table className="w-full max-w-2xl text-left  ring ring-slate-200  rounded overflow-hidden text-sm">
        <thead className="bg-slate-50 text-gray-700 uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3 hidden md:table-cell">slug</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {allCategory.map((item) => {
            return (
              <>
                <tr className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 max-w-md text-slate-600 hidden md:table-cell truncate">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 max-w-md text-slate-600 hidden md:table-cell truncate">
                    {item.slug}
                  </td>
                  <td className="px-4 py-3 max-w-md text-slate-600 hidden md:table-cell truncate">
                    <button
                      onClick={() => handleEdit(item.id, item.name)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 transition"
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
