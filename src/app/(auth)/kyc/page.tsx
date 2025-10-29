"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaFileUpload, FaBriefcase, FaRegIdBadge, FaUserMd } from "react-icons/fa";

export default function KYCPage() {
  const [form, setForm] = useState({
    specialization: "",
    licenseNumber: "",
    yearsOfExperience: "",
    bio: "",
  });
  const [certificate, setCertificate] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://healthme-backend.onrender.com";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificate(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("specialization", form.specialization);
    formData.append("licenseNumber", form.licenseNumber);
    formData.append("yearsOfExperience", form.yearsOfExperience);
    formData.append("bio", form.bio);
    if (certificate) formData.append("certificate", certificate);

    try {
      const res = await fetch(`${API_BASE}/api/kyc/submit`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "KYC submission failed");

      setMessage("✅ KYC submitted successfully! Await admin approval.");
      setTimeout(() => router.push("/processing"), 2000);
    } catch (err: any) {
      setMessage(err.message || "❌ Submission failed. Try again later.");
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

      {/* === KYC Card === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/70 backdrop-blur-2xl border border-white/40 rounded-4xl shadow-[0_10px_40px_rgba(13,148,136,0.15)] w-full max-w-lg p-10"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-4xl bg-[conic-gradient(from_0deg,rgba(13,148,136,0.15)_0%,transparent_60%,rgba(13,148,136,0.15)_100%)]"
        />

        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-center text-slate-900 mb-2">
            Practitioner KYC Verification 🩺
          </h1>
          <p className="text-center text-sm text-slate-500 mb-8">
            Please provide your credentials and certification details.
          </p>

          {message && (
            <div
              className={`text-center text-sm mb-4 px-3 py-2 rounded-lg ${
                message.startsWith("✅")
                  ? "text-green-700 bg-green-50 border border-green-200"
                  : "text-red-600 bg-red-50 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <FaBriefcase className="absolute left-4 top-3.5 text-teal-500" />
              <input
                type="text"
                name="specialization"
                required
                placeholder="Specialization (e.g., Dermatologist)"
                value={form.specialization}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
              />
            </div>

            <div className="relative">
              <FaRegIdBadge className="absolute left-4 top-3.5 text-teal-500" />
              <input
                type="text"
                name="licenseNumber"
                required
                placeholder="License Number"
                value={form.licenseNumber}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
              />
            </div>

            <div className="relative">
              <FaUserMd className="absolute left-4 top-3.5 text-teal-500" />
              <input
                type="number"
                name="yearsOfExperience"
                required
                placeholder="Years of Experience"
                value={form.yearsOfExperience}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
              />
            </div>

            <textarea
              name="bio"
              placeholder="Brief Bio / About You"
              value={form.bio}
              onChange={handleChange}
              required
              className="w-full pl-4 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-inner"
            />

            <div className="relative border border-dashed border-teal-300 rounded-xl p-4 text-center bg-white/50 hover:bg-teal-50/50 transition cursor-pointer">
              <FaFileUpload className="mx-auto mb-2 text-teal-500" size={24} />
              <label htmlFor="certificate" className="text-sm text-slate-600 cursor-pointer">
                Upload Certificate / License (PDF or Image)
              </label>
              <input
                id="certificate"
                type="file"
                name="certificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              {certificate && (
                <p className="text-xs mt-2 text-teal-700">
                  📄 {certificate.name}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full py-3 mt-3 bg-linear-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? "Submitting..." : "Submit KYC"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}