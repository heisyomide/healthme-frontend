"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserAlt, FaLock, FaSignInAlt } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://healthme-backend.onrender.com";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginUrl = `${API_BASE}/api/auth/login`;

      const res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server returned ${res.status}: ${text}`);
      }

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Login failed");

      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, token: data.token })
      );
      localStorage.setItem("token", data.token);

      router.push(
        data.user.role === "admin"
          ? "/dashboard/admin"
          : data.user.role === "practitioner"
          ? "/dashboard/practitioner"
          : "/"
      );
    } catch (err: any) {
      setError(err.message || "Something went wrong during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-teal-50 to-white overflow-hidden px-4 sm:px-6">
      {/* === Subtle Animated Background (optimized for mobile) === */}
      <div className="absolute inset-0 -z-10">
        {/* Gentle breathing motion instead of rotation (lighter on GPU) */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-[radial-gradient(closest-side,rgba(13,148,136,0.15),transparent)] blur-[140px]"
        />
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.15),transparent)] blur-[170px]"
        />
      </div>

      {/* === Login Card === */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/80 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_10px_40px_rgba(13,148,136,0.1)] w-full max-w-[90%] sm:max-w-md p-6 sm:p-10"
      >
        {/* === Halo Animation (GPU-friendly pulsing instead of rotation) === */}
        <motion.div
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-3xl bg-[conic-gradient(from_0deg,rgba(13,148,136,0.1)_0%,transparent_70%,rgba(13,148,136,0.1)_100%)]"
        />

        {/* === Inner Content === */}
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 mb-2">
            Welcome Back 👋
          </h1>
          <p className="text-center text-sm text-slate-500 mb-6 sm:mb-8">
            Sign in to continue your health journey.
          </p>

          {error && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm mb-4 text-center">
              {error}
            </div>
          )}

          {/* === Login Form === */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5 sm:gap-6">
            <div className="relative">
              <FaUserAlt className="absolute left-4 top-3.5 text-teal-500 text-sm sm:text-base" />
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-teal-500 outline-none shadow-inner transition-all"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-teal-500 text-sm sm:text-base" />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-teal-500 outline-none shadow-inner transition-all"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? "Signing In..." : <><FaSignInAlt /> Sign In</>}
            </motion.button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-teal-600 hover:underline font-semibold"
            >
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}