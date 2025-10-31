"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaRegIdBadge,
  FaUserMd,
  FaFileUpload,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding,
  FaCreditCard,
  FaTransgender,
  FaCalendarAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function KYCPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    specialization: "",
    licenseNumber: "",
    yearsOfExperience: "",
    bio: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    address: "",
  });

  const [files, setFiles] = useState({
    idDocument: null as File | null,
    licenseDocument: null as File | null,
    certificate: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://healthme-backend.onrender.com";

  // Check if practitioner has paid before showing KYC
  useEffect(() => {
    (async () => {
      try {
const res = await fetch(`${API_BASE}/api/kyc/me`, {
  credentials: "include",
});

let data;
try {
  data = await res.json();
} catch {
  console.error("Response was not JSON. Possibly a 404 HTML page.");
  data = null;
}

if (data?.status === "payment_confirmed") setIsPaid(true);
else setIsPaid(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const { name } = e.target;
    setFiles({ ...files, [name]: e.target.files[0] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // STEP 1: send text data
      const textRes = await fetch(`${API_BASE}/api/kyc/save`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _complete: true }),
      });
      if (!textRes.ok) throw new Error("Failed to save details");

      // STEP 2: upload files
      for (const key of Object.keys(files)) {
        const file = (files as any)[key];
        if (file) {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("fieldname", key);
          await fetch(`${API_BASE}/api/kyc/upload`, {
            method: "POST",
            credentials: "include",
            body: fd,
          });
        }
      }

      setMessage("✅ KYC submitted successfully! Await admin approval.");
      setTimeout(() => router.push("/processing"), 2500);
    } catch (err: any) {
      setMessage(err.message || "❌ Submission failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!isPaid)
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
        <h1 className="text-2xl font-semibold text-gray-700 mb-3">
          🔒 Payment Required
        </h1>
        <p className="text-gray-500 text-sm mb-6 max-w-sm">
          You must complete your subscription payment before accessing the KYC
          form.
        </p>
        <button
          onClick={() => router.push("/practitioners/terms&sub")}
          className="px-5 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
        >
          Go to Subscription
        </button>
      </section>
    );

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-linear-to-br from-white via-teal-50 to-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[radial-gradient(closest-side,rgba(13,148,136,0.15),transparent)] blur-[150px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.15),transparent)] blur-[180px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/70 backdrop-blur-2xl border border-white/40 rounded-4xl shadow-[0_10px_40px_rgba(13,148,136,0.15)] w-full max-w-2xl p-10"
      >
        <h1 className="text-3xl font-extrabold text-center text-slate-900 mb-2">
          Practitioner KYC Verification 🩺
        </h1>
        <p className="text-center text-sm text-slate-500 mb-6">
          Please provide your full details and credentials carefully.
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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* === PERSONAL DETAILS === */}
          <h3 className="col-span-2 text-lg font-semibold text-teal-700 border-b pb-1">
            Personal Information
          </h3>

          <div className="relative">
            <FaUser className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={form.firstName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          <div className="relative">
            <FaUser className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={form.lastName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          <div className="relative">
            <FaTransgender className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          <div className="relative">
            <FaCalendarAlt className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          {/* === CONTACT DETAILS === */}
          <h3 className="col-span-2 text-lg font-semibold text-teal-700 border-b pb-1 mt-4">
            Contact Information
          </h3>

          <div className="relative">
            <FaPhoneAlt className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          <div className="col-span-2 relative">
            <FaMapMarkerAlt className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="text"
              name="address"
              placeholder="Residential / Practice Address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          {/* === PROFESSIONAL DETAILS === */}
          <h3 className="col-span-2 text-lg font-semibold text-teal-700 border-b pb-1 mt-4">
            Professional Information
          </h3>

          <div className="relative">
            <FaBriefcase className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization (e.g. Physiotherapist)"
              required
              value={form.specialization}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          <div className="relative">
            <FaRegIdBadge className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              required
              value={form.licenseNumber}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          <div className="relative">
            <FaUserMd className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="number"
              name="yearsOfExperience"
              placeholder="Years of Experience"
              required
              value={form.yearsOfExperience}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          <div className="col-span-2">
            <textarea
              name="bio"
              placeholder="Brief Bio / About You"
              value={form.bio}
              onChange={handleChange}
              required
              className="w-full pl-4 pr-4 py-3 bg-white/50 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* === BANK DETAILS === */}
          <h3 className="col-span-2 text-lg font-semibold text-teal-700 border-b pb-1 mt-4">
            Bank Information
          </h3>

          <div className="relative">
            <FaBuilding className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              value={form.bankName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          <div className="relative">
            <FaCreditCard className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="text"
              name="accountName"
              placeholder="Account Name"
              value={form.accountName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          <div className="relative">
            <FaCreditCard className="absolute left-4 top-3.5 text-teal-500" />
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              value={form.accountNumber}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          {/* === DOCUMENT UPLOADS === */}
          <h3 className="col-span-2 text-lg font-semibold text-teal-700 border-b pb-1 mt-4">
            Document Uploads
          </h3>

          {[
            { label: "Upload ID Document (National ID or Passport)", name: "idDocument" },
            { label: "Upload License Document", name: "licenseDocument" },
            { label: "Upload Certificate (PDF or Image)", name: "certificateDocuments" },
          ].map(({ label, name }) => (
            <div
              key={name}
              className="relative col-span-2 border border-dashed border-teal-300 rounded-xl p-4 text-center bg-white/50 hover:bg-teal-50/50 transition cursor-pointer"
            >
              <FaFileUpload className="mx-auto mb-2 text-teal-500" size={24} />
              <label
                htmlFor={name}
                className="text-sm text-slate-600 cursor-pointer"
              >
                {label}
              </label>
              <input
                id={name}
                type="file"
                name={name}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              {(files as any)[name] && (
                <p className="text-xs mt-2 text-teal-700">
                  📄 {(files as any)[name]?.name}
                </p>
              )}
            </div>
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="col-span-2 w-full py-3 mt-3 bg-linear-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? "Submitting..." : "Submit KYC"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}