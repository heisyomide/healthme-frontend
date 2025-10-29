"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserMd,
  FaCheckCircle,
  FaRedo,
} from "react-icons/fa";

export default function RescheduleAppointmentPage() {
  const router = useRouter();
  const params = useParams(); // gets /appointment/[id]/reschedule
  const appointmentId = params?.id as string;

  const [formData, setFormData] = useState({
    doctor: "",
    specialty: "",
    date: "",
    time: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);
  const [rescheduled, setRescheduled] = useState(false);

  // 🩺 Fetch appointment details by ID
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`/api/appointments/${appointmentId}`);
        const data = await res.json();
        if (data.success && data.data) {
          setFormData({
            doctor: data.data.doctor || "",
            specialty: data.data.specialty || "",
            date: data.data.date?.split("T")[0] || "",
            time: data.data.time || "",
            location: data.data.location || "",
          });
        }
      } catch (err) {
        console.error("Failed to load appointment", err);
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) fetchAppointment();
  }, [appointmentId]);

  // ✍ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 💾 Submit reschedule update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setRescheduled(true);
        setTimeout(() => router.push("/appointment"), 2000);
      } else {
        alert(data.message || "Failed to reschedule.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-slate-700">
        Loading appointment details...
      </div>
    );

  return (
    <section className="relative min-h-screen bg-linear-to-br from-white via-teal-50 to-white py-20 px-6 md:px-16 overflow-hidden">
      {/* Glowing Orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.15),transparent)] blur-[160px]" />
        <div className="absolute bottom-[-100px] -right-20 w-[550px] h-[550px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.12),transparent)] blur-[180px]" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <Link href="/appointment">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-slate-700 hover:text-teal-600 transition text-sm font-medium"
          >
            <FaArrowLeft /> Back to Appointments
          </motion.button>
        </Link>
      </div>

      {/* Main */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-white/70 backdrop-blur-2xl border border-white/40 rounded-4xl p-10 shadow-[0_10px_40px_rgba(13,148,136,0.15)] relative overflow-hidden"
      >
        <div className="relative z-10">
          {!rescheduled ? (
            <>
              <div className="flex flex-col items-center text-center mb-8">
                <FaRedo className="text-3xl text-teal-600 mb-2" />
                <h1 className="text-3xl font-extrabold text-slate-800">
                  Reschedule Appointment
                </h1>
                <p className="text-slate-600 text-sm mt-2">
                  Adjust your appointment details below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Doctor */}
                <div className="relative">
                  <FaUserMd className="absolute left-4 top-3 text-teal-500" />
                  <input
                    type="text"
                    name="doctor"
                    value={formData.doctor}
                    disabled
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/60 border border-white/40 text-slate-700 font-medium outline-none"
                  />
                </div>

                {/* Specialty */}
                <div className="relative">
                  <FaCheckCircle className="absolute left-4 top-3 text-teal-500" />
                  <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    disabled
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/60 border border-white/40 text-slate-700 font-medium outline-none"
                  />
                </div>

                {/* Date */}
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-3 text-teal-500" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/50 border border-white/40 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-slate-800 transition"
                  />
                </div>

                {/* Time */}
                <div className="relative">
                  <FaClock className="absolute left-4 top-3 text-teal-500" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/50 border border-white/40 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-slate-800 transition"
                  />
                </div>

                {/* Location */}
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-3 text-teal-500" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/50 border border-white/40 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-slate-800 transition"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4 pt-4">
                  <Link href="/appointment">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-medium hover:bg-slate-200 transition"
                    >
                      Cancel
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="submit"
                    className="px-8 py-3 bg-linear-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition"
                  >
                    Confirm Reschedule
                  </motion.button>
                </div>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-10"
            >
              <FaCheckCircle className="text-teal-500 text-6xl mb-4" />
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                Appointment Rescheduled!
              </h2>
              <p className="text-slate-600 mb-6">
                Your appointment has been updated successfully.
              </p>
              <Link href="/appointment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 bg-linear-to-r from-teal-500 to-emerald-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition"
                >
                  Back to Appointments
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}