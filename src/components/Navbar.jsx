"use client";

import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilesearch, setMobilesearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setMobilesearch(false)
    router.push(`/shop?search=${search}`);
  };
  const cartCount = useSelector(state => state.cart.total)


  const navlinks = [
    {
      name: 'home',
      links: '/'
    },
    {
      name: 'shop',
      links: '/shop'
    }, {
      name: 'admin',
      links: '/admin'
    }, {
      name: 'contact',
      links: '/contact'
    }, {
      name: 'profile',
      links: '/profile/23'
    },
    {
      name: 'login',
      links: '/login'
    },
  ]

  return (
    <>
      {mobilesearch && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-md px-5 py-12 animate-fadeIn">

          <button
            className="absolute top-2 right-2 text-white z-40"
            onClick={() => setMobilesearch(false)}
          >
            <X size={32} />
          </button>

          <form
            onSubmit={handleSearch}
            className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-md"
          >
            <Search size={24} className="text-gray-600" />
            <input
              className="bg-transparent outline-none w-full text-gray-800"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            {search.length > 0 && (
              <button
                type="button"
                className="text-gray-500 hover:text-black"
                onClick={() => setSearch("")}
              >
                <X size={24} />
              </button>
            )}
          </form>

          {/* Suggestions Box */}
          <div className="mt-5 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg space-y-4">

            {/* Recent Searches */}
            <div>
              <h2 className="text-sm font-semibold text-gray-600 mb-2">Recent Searches</h2>
              <div className="flex flex-wrap gap-2">
                {["speaker", "Headphones", "Smart", "T-Shirt"].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearch(item);
                      handleSearch({ preventDefault: () => { } });
                    }}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm capitalize hover:bg-gray-300"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Suggestions */}
            <div>
              <h2 className="text-sm font-semibold text-gray-600 mb-2">Popular Searches</h2>
              <ul className="space-y-2 text-gray-700">
                {["Winter Jacket", "Bluetooth Speaker", "Nike Shoes", "Women Tops"].map(
                  (item, i) => (
                    <li
                      key={i}
                      className="hover:text-black cursor-pointer"
                      onClick={() => {
                        setSearch(item);
                        handleSearch({ preventDefault: () => { } });
                      }}
                    >
                      🔎 {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      <nav className="w-full bg-white/30 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link
            href="/"
            className="relative text-3xl font-bold text-slate-700 tracking-tight"
          >
            <span className="text-green-600">{process.env.NEXT_STORE_NAME}</span>
            {process.env.NEXT_STORE_LAST_NAME}
            <span className="text-green-600 text-5xl">.</span>

            <span className="absolute text-xs font-semibold -top-1 -right-8 px-3 rounded-full text-white bg-green-500">
              plus
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 capitalize text-gray-700">
            {navlinks.map((item, index) => {
              return <Link key={index} className="hover:text-green-600 transition" href={item.links}>{item.name}</Link>
            })}
            {/* <Link className="hover:text-green-600 transition" href="/profile/23">profile</Link> */}


            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
            >
              <Search size={18} className="text-gray-500" />
              <input
                className="bg-transparent outline-none text-sm"
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center gap-2">
              <ShoppingCart size={20} />
              <span>Cart</span>
              <span className="absolute -top-1 left-3 text-[12px] text-white bg-gray-700 size-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </Link>

            <button onClick={()=> router.push('/login')} className="px-6 py-2 bg-[var(--button-purple)] hover:bg-[var(--button-purple-hover)] transition text-white rounded-full">
              Login
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex justify-center items-center gap-5">
            <button
              className="lg:hidden text-gray-800 z-10"
              onClick={() => setMobilesearch(true)}

            >
              <Search />
            </button>

            <button
              className="lg:hidden text-gray-800 z-10"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          onClick={() => { setMobileOpen(false) }}
          className={`lg:hidden fixed top-0 right-0 w-full h-full     shadow-xl transform transition-all duration-300
        ${mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-[600%] opacity-0"}
        `}
        >
          <div className="p-6 mt-16 z-20 flex flex-col gap-6 bg-white backdrop-blur-lg text-black">

            <Link onClick={() => setMobileOpen(false)} href="/" className="text-xl font-semibold">
              Home
            </Link>

            <Link onClick={() => setMobileOpen(false)} href="/shop" className="text-xl font-semibold">
              Shop
            </Link>

            <Link onClick={() => setMobileOpen(false)} href="/admin" className="text-xl font-semibold">
              Admin
            </Link>

            <Link onClick={() => setMobileOpen(false)} href="/profile/12" className="text-xl font-semibold">
              profile
            </Link>

            <Link onClick={() => setMobileOpen(false)} href="/contact" className="text-xl font-semibold">
              contact
            </Link>


            {/* Cart */}
            <Link
              onClick={() => setMobileOpen(false)}
              href="/cart"
              className="relative flex items-center gap-3 text-lg"
            >
              <ShoppingCart />
              Cart
              <span className="absolute -top-1 left-3 text-[12px] text-white bg-gray-700  size-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </Link>

            {/* Login Button */}
            <button onClick={()=> router.push('/login')} className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full mt-4">
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
