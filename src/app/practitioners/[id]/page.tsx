"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaStar, FaLocationDot, FaCalendar, FaClock } from "react-icons/fa6";

export default function PractitionerProfile() {
  const { id } = useParams();
  const [practitioner, setPractitioner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchPractitioner = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/practitioner/public/${id}`);
        const data = await res.json();
        if (data.success) setPractitioner(data.data);
      } catch (error) {
        console.error("Error fetching practitioner:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPractitioner();
  }, [id]);

  if (loading)
    return <p className="text-center py-40 text-slate-600">Loading profile...</p>;

  if (!practitioner)
    return <p className="text-center py-40 text-red-500">Practitioner not found.</p>;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-teal-50 to-white text-slate-800 px-6 md:px-16 py-20">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-32 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.15),transparent)] blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.10),transparent)] blur-[160px]" />
      </div>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left side - Profile */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-4 bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg"
        >
          <div className="flex flex-col items-center text-center">
            <img
              src={practitioner.profilePicture || "/default-avatar.png"}
              alt={practitioner.fullName}
              className="w-40 h-40 rounded-full object-cover ring-4 ring-teal-400 shadow-lg"
            />
            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              {practitioner.fullName}
            </h2>
            <p className="text-sm text-teal-600">{practitioner.specialization}</p>
            <p className="mt-1 text-xs text-slate-500 flex items-center justify-center gap-1">
              <FaLocationDot className="text-teal-500" /> {practitioner.location}
            </p>

            <div className="flex items-center justify-center mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.floor(practitioner.ratings?.average || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  } text-lg`}
                />
              ))}
              <span className="ml-2 text-sm font-semibold">
                {practitioner.ratings?.average?.toFixed(1) || "0.0"}
              </span>
            </div>

            {practitioner.experienceYears && (
              <div className="mt-4 text-sm text-slate-600">
                <span className="font-semibold">Experience:</span>{" "}
                {practitioner.experienceYears} years
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-full shadow-md hover:shadow-lg font-semibold transition"
            >
              Book Appointment
            </motion.button>
          </div>
        </motion.div>

        {/* Right side - Bio and Availability */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-8 space-y-10"
        >
          {/* About */}
          <div className="bg-white/70 rounded-3xl p-8 backdrop-blur-lg shadow-md">
            <h3 className="text-xl font-bold text-slate-900 mb-3">About</h3>
            <p className="text-slate-600 leading-relaxed">
              {practitioner.bio || "No biography provided."}
            </p>
          </div>

          {/* Availability */}
          {practitioner.availability?.length > 0 && (
            <div className="bg-white/70 rounded-3xl p-8 backdrop-blur-lg shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-5">Availability</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {practitioner.availability.map((slot: any, idx: number) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className="p-4 rounded-2xl bg-white/40 border border-teal-100 shadow-sm flex flex-col items-center text-center"
                  >
                    <div className="text-lg font-semibold text-teal-700 flex items-center gap-2">
                      <FaCalendar /> {slot.day}
                    </div>
                    <div className="mt-1 text-sm text-slate-600 flex items-center gap-2">
                      <FaClock className="text-teal-500" /> {slot.from} - {slot.to}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Focus & Specialties */}
          {(practitioner.focus || practitioner.specialization) && (
            <div className="bg-white/70 rounded-3xl p-8 backdrop-blur-lg shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Specialties & Focus
              </h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-slate-700 text-sm">
                {practitioner.focus
                  ?.split(",")
                  .map((f: string, i: number) => <li key={i}>🩺 {f.trim()}</li>)}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}