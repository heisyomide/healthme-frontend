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

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://healthme-backend.onrender.com";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("🟡 Sending login request:", `${API_BASE}/api/auth/login`);

      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      console.log("🟣 Response status:", res.status);

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("🚨 Non-JSON response:", text);
        throw new Error("Invalid response from server (HTML received). Check backend URL or port.");
      }

      const data = await res.json();
      console.log("🟢 Login response JSON:", data);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid email or password");
      }

      // ✅ Store both user + token together
      const fullUserData = { ...data.user, token: data.token };
      localStorage.setItem("user", JSON.stringify(fullUserData));

      // Optional: store token separately for convenience
      localStorage.setItem("token", data.token);

      // ✅ Redirect based on role or provided URL
      const redirectUrl =
        data.redirectUrl ||
        (data.user.role === "admin"
          ? "/dashboard/admin"
          : data.user.role === "practitioner"
          ? "/dashboard/practitioner"
          : "/");

      router.push(redirectUrl);
    } catch (err: any) {
      console.error("❌ Login error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-linear-to-br from-white via-teal-50 to-white overflow-hidden">
      {/* === Background Glow === */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[radial-gradient(closest-side,rgba(13,148,136,0.15),transparent)] blur-[150px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.15),transparent)] blur-[180px]" />
      </div>

      {/* === Login Card === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/70 backdrop-blur-2xl border border-white/40 rounded-4xl shadow-[0_10px_40px_rgba(13,148,136,0.15)] w-full max-w-md p-10"
      >
        {/* Animated Border */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-4xl bg-[conic-gradient(from_0deg,rgba(13,148,136,0.15)_0%,transparent_60%,rgba(13,148,136,0.15)_100%)]"
        />

        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-center text-slate-900 mb-2">
            Welcome Back 👋
          </h1>
          <p className="text-center text-sm text-slate-500 mb-8">
            Sign in to continue your health journey.
          </p>

          {error && (
            <div className="text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="relative">
              <FaUserAlt className="absolute left-4 top-3.5 text-teal-500" />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-teal-500" />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Signing In..." : (<><FaSignInAlt /> Sign In</>)}
            </motion.button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-teal-600 hover:underline font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}