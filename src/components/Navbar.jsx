"use client";

import { AuthContext } from "@/Context/AuthContext";
import Link from "next/link";
import React, { useContext } from "react";
import { FaStore, FaChild } from "react-icons/fa";
import { FiHome, FiShoppingBag } from "react-icons/fi";
import { GiMale, GiFemale } from "react-icons/gi";
import { toast } from "react-toastify";

export default function Navbar() {
  const { user, signOutUser, loading } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <Link
          href="/"
          className="hover:text-primary transition-colors duration-300 flex items-center gap-2"
        >
          <FiHome className="text-lg" /> Home
        </Link>
      </li>

      <li>
        <Link
          href="/shop"
          className="hover:text-primary transition-colors duration-300 flex items-center gap-2"
        >
          <FiShoppingBag className="text-lg" /> Shop
        </Link>
      </li>

      <li>
        <Link
          href="/men"
          className="hover:text-primary transition-colors duration-300 flex items-center gap-2"
        >
          <GiMale className="text-xl" /> Men
        </Link>
      </li>

      <li>
        <Link
          href="/women"
          className="hover:text-primary transition-colors duration-300 flex items-center gap-2"
        >
          <GiFemale className="text-xl" /> Women
        </Link>
      </li>

      <li>
        <Link
          href="/kids"
          className="hover:text-primary transition-colors duration-300 flex items-center gap-2"
        >
          <FaChild className="text-lg" /> Kids
        </Link>
      </li>
    </>
  );

// Logout with Toast (Centered)
const handleLogout = async () => {
  try {
    await signOutUser();
    toast.success("Logged out successfully!", {
      position: "top-center", // center top of the screen
      autoClose: 3000,        // auto close after 3 sec
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err) {
    toast.error("Logout failed!", {
      position: "top-center",
      autoClose: 3000,
    });
  }
};


  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="navbar container mx-auto px-4 py-2">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center gap-4">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} className="btn btn-ghost p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-white rounded-lg w-52 space-y-1"
            >
              {links}
            </ul>
          </div>

          {/* Logo with Icon */}
          <Link href="/" className="flex items-center gap-2">
            <FaStore className="text-3xl text-primary" />
            <span className="text-3xl font-bold tracking-tight text-gray-800">
              Web<span className="text-primary">Zen</span>
            </span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 text-gray-700 font-medium">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-3">
          {loading ? (
            <span className="loading loading-ring loading-lg"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="cursor-pointer">
                <img
                  className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                  src={user?.photoURL || "https://i.ibb.co.com/tp3xgXbG/avater.jpg"}
                  alt="Avatar"
                />
              </div>
              <ul className="dropdown-content menu p-4 shadow-md rounded-lg w-60 bg-white mt-2 space-y-2 text-center">
                <Link href="/">
                  <img
                    className="w-20 h-20 mx-auto rounded-full border-2 border-primary object-cover"
                    src={user?.photoURL || "https://i.ibb.co.com/tp3xgXbG/avater.jpg"}
                    alt="Avatar"
                  />
                </Link>
                <li className="font-semibold text-gray-800">{user?.displayName}</li>
                <li className="text-gray-500 text-sm">{user?.email}</li>

                <Link href="/addProduct" className="hover:text-primary text-black transition">
                  Add Product
                </Link>
                <Link href="/productmanage" className="hover:text-primary text-black transition">
                  Manage Products
                </Link>

                <button onClick={handleLogout} className="btn bg-primary text-white w-full mt-2">
                  LogOut
                </button>
              </ul>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="btn bg-primary text-white border-none hover:bg-primary/90 transition"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="btn bg-gray-800 text-white border-none hover:bg-gray-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
