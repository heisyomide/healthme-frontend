"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaHome,
  FaClipboardList,
  FaStethoscope,
  FaTachometerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("user");
      setUser(null);
      setShowMenu(false);
      router.push("/login");
    }
  };

  const navLinks = [
    { name: "Home", icon: <FaHome />, href: "/" },
    { name: "Services", icon: <FaClipboardList />, href: "/services" },
    { name: "Support", icon: <FaStethoscope />, href: "/support" },
    { name: "Practitioners", icon: <FaUser />, href: "/practitioners" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
      <div className="max-w-[1300px] mx-auto flex items-center justify-between px-6 lg:px-10 py-3">
        {/* ===== LOGO ===== */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer select-none">
          <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              HM
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-800 tracking-tight">
                HealthMe
              </div>
              <div className="text-xs text-slate-500 -mt-1">
                Your Health, Made Simple
              </div>
            </div>
          </motion.div>
        </Link>

        {/* ===== DESKTOP NAV ===== */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          {navLinks.map((item, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05 }}>
              <Link
                href={item.href}
                className="relative text-slate-700 hover:text-teal-600 transition font-medium flex items-center gap-1 group"
              >
                {item.icon && <span className="text-sm">{item.icon}</span>}
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* ===== AUTH / AVATAR AREA ===== */}
        <div className="flex items-center gap-4">
          {/* ==== MOBILE MENU BUTTON ==== */}
          <button
            className="md:hidden text-2xl text-slate-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* ==== LOGIN & SIGNUP (if not logged in) ==== */}
          {!user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 text-sm bg-white/30 backdrop-blur-xl font-medium rounded-full shadow-md hover:shadow-lg transition text-slate-700 hover:text-teal-600"
                >
                  Login
                </motion.button>
              </Link>

              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          ) : (
            // ==== PROFILE MENU (if logged in) ====
            <div className="relative hidden md:block">
              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-xl shadow-md">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle />
                  )}
                </div>
              </motion.div>

              {/* ===== DROPDOWN MENU ===== */}
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-white/40 rounded-xl shadow-2xl py-2 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-xl">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt="profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaUserCircle />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-800 font-semibold text-sm leading-tight">
                          {user.fullName || "User"}
                        </span>
                        <span className="text-xs text-slate-500 truncate">
                          {user.email}
                        </span>
                        <span className="text-[11px] text-teal-600 font-medium capitalize">
                          {user.role}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={
                        user.role === "practitioner"
                          ? "/dashboard/practitioner"
                          : user.role === "admin"
                          ? "/dashboard/admin"
                          : "/dashboard"
                      }
                      onClick={() => setShowMenu(false)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700 transition"
                    >
                      <FaTachometerAlt className="text-teal-500" /> Dashboard
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setShowMenu(false)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700 transition"
                    >
                      <FaUser className="text-teal-500" /> Profile
                    </Link>

                    <hr className="my-1 border-slate-200" />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg px-6 py-5 flex flex-col space-y-4"
          >
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 text-base font-medium flex items-center gap-2 hover:text-teal-600 transition"
              >
                {item.icon && <span>{item.icon}</span>}
                {item.name}
              </Link>
            ))}

            {!user ? (
              <div className="flex flex-col w-full gap-3 mt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2 border border-teal-600 text-teal-600 font-semibold rounded-full hover:bg-teal-50 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col w-full mt-4 border-t border-gray-200 pt-4">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2 text-gray-700 hover:text-teal-600 transition"
                >
                  <FaTachometerAlt className="text-teal-500" /> Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2 text-gray-700 hover:text-teal-600 transition"
                >
                  <FaUser className="text-teal-500" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 text-red-500 hover:text-red-600 transition"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}