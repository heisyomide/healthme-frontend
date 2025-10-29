"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-lg border-b border-gray-200 z-50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* === Logo === */}
        <Link href="/" className="text-2xl font-extrabold text-teal-600 tracking-tight">
          Health<span className="text-emerald-600">Me</span>
        </Link>

        {/* === Desktop Navigation === */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: "Support", href: "/support" },
            { name: "Practitioners", href: "/practitioners" },
            { name: "Contact Us", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 font-medium hover:text-teal-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* === Auth Buttons === */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-semibold text-white bg-teal-600 rounded-full hover:bg-teal-700 transition"
          >
            Logins
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 text-sm font-semibold border border-teal-600 text-teal-600 rounded-full hover:bg-teal-50 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* === Mobile Hamburger === */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* === Mobile Dropdown === */}
      <div
        className={`md:hidden absolute top-[64px] left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
          menuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <nav className="flex flex-col items-start px-6 py-4 space-y-4">
          {[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: "Support", href: "/support" },
            { name: "Practitioners", href: "/practitioners" },
            { name: "Contact Us", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 text-base font-medium hover:text-teal-600 transition"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col w-full gap-3 mt-3">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-2 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-2 border border-teal-600 text-teal-600 font-semibold rounded-full hover:bg-teal-50 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}