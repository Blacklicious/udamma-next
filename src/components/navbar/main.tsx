'use client';
// File: src/app/accounts/page.tsx
import React from "react";
// Make sure you have these imports at the top of your file:
import { useState } from "react";
import NavbarMainDrawer from "./main_drawer";
import { FaShoppingBag } from "react-icons/fa";
import Link from "next/link";


// Define simple inline SVG icons instead of importing from external library



// File: src/app/accounts/page.tsx


export default function NavbarMain() {
		
    return (
        <div className="container mx-auto py-4 px-6 lg:p-6 w-full text-black">
            {/* Quick navigation bar that if users authentified expands into a profile page */}
            <div className="flex  p-1 rounded-2xl justify-between items-center">
              {/* Column 1: Logo */}
              <div className="flex items-center justify-start">
                <Link href="/">
                  <img
                    src="/logo.svg"
                    alt="Logo"
                    className="h-10 w-auto bg-white rounded-full border cursor-pointer"
                  />
                </Link>
              </div>
              {/* Column 2: Site name */}
              <div className="flex items-center justify-center">
                <h1 className="text-3xl font-bold">Udamma</h1>
              </div>
              {/* Column 3: Shopping bag */}
              <div className="flex items-center justify-end">
                <button
                  className="p-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  aria-label="Open shopping bag"
                >
                  <FaShoppingBag size={24} />
                  
                </button>
              </div>
            </div>
        </div>
    );
}