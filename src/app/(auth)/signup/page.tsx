"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUserPlus,
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaGlobe,
} from "react-icons/fa";

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    country: "",
    reasonForJoining: "",
    role: "patient", // 👈 default role
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // ✅ Use your environment variable
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://healthme-backend.onrender.com";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("user", JSON.stringify(data.user));
      alert("✅ Account created successfully!");

      // 👇 redirect based on role
      if (form.role === "practitioner") {
        router.push("/kyc"); // go to KYC page for practitioners
      } else {
        router.push("/login"); // normal patients go to login
      }
    } catch (err: any) {
      setError(
        err.message.includes("fetch")
          ? "Cannot connect to server. Please try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-linear-to-br from-white via-teal-50 to-white overflow-hidden">
      {/* === Glowing Orbs === */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[radial-gradient(closest-side,rgba(13,148,136,0.15),transparent)] blur-[150px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.15),transparent)] blur-[180px]" />
      </div>

      {/* === Signup Card === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/70 backdrop-blur-2xl border border-white/40 rounded-4xl shadow-[0_10px_40px_rgba(13,148,136,0.15)] w-full max-w-md p-10"
      >
        {/* Animated Gradient Border */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-4xl bg-[conic-gradient(from_0deg,rgba(13,148,136,0.15)_0%,transparent_60%,rgba(13,148,136,0.15)_100%)]"
        />

        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-center text-slate-900 mb-2">
            Create Account 🌟
          </h1>
          <p className="text-center text-sm text-slate-500 mb-8">
            Join HealthMe and start your wellness journey.
          </p>

          {error && (
            <div className="text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="relative">
              <FaUser className="absolute left-4 top-3.5 text-teal-500" />
              <input
                type="text"
                name="fullName"
                required
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-teal-500" />
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-teal-500" />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute left-4 top-3.5 text-teal-500" />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
              />
            </div>

            <div className="flex gap-4">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                className="w-1/2 pl-4 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
              />
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-1/2 pl-4 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="relative">
              <FaGlobe className="absolute left-4 top-3.5 text-teal-500" />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
              />
            </div>

            <textarea
              name="reasonForJoining"
              placeholder="Reason for Joining"
              value={form.reasonForJoining}
              onChange={handleChange}
              className="w-full pl-4 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
            />

            {/* 👇 Role Selection */}
            <div className="flex justify-center gap-6 mt-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer text-slate-700">
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={form.role === "patient"}
                  onChange={handleChange}
                  className="accent-teal-500"
                />
                Create as Patient
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer text-slate-700">
                <input
                  type="radio"
                  name="role"
                  value="practitioner"
                  checked={form.role === "practitioner"}
                  onChange={handleChange}
                  className="accent-teal-500"
                />
                Create as Practitioner
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? "Creating Account..." : (
                <>
                  <FaUserPlus /> Sign Up
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-600 hover:underline font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}