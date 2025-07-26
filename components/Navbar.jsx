"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";
import { assets, CartIcon, BagIcon, HomeIcon, BoxIcon } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
      {/* Logo */}
      <Image
        src={assets.logo}
        alt="Logo"
        className="cursor-pointer w-28"
        onClick={() => router.push("/")}
      />

      {/* Right section */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Cart Icon */}
        {isSignedIn && (
          <button onClick={() => router.push("/cart")}>
            <CartIcon />
          </button>
        )}

        {/* UserButton + Custom Dropdown */}
        {isSignedIn ? (
          <div className="relative">
            <div onClick={() => setShowDropdown((prev) => !prev)} className="cursor-pointer">
              <UserButton afterSignOutUrl="/" />
            </div>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg border rounded z-50 py-2 text-sm">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    router.push("/my-orders");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <BagIcon className="w-4 h-4" />
                  My Orders
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    router.push("/cart");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <CartIcon className="w-4 h-4" />
                  Cart
                </button>
                 <button
                  onClick={() => {
                    setShowDropdown(false);
                    router.push("/");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <HomeIcon className="w-4 h-4" />
                  Home
                </button>
                 <button
                  onClick={() => {
                    setShowDropdown(false);
                    router.push("/all-products");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <BoxIcon className="w-4 h-4" />
                  Product
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    signOut();
                  }}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => router.push("/sign-in")}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
