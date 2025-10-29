"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaUserMd, FaCheckCircle } from "react-icons/fa";

type Appointment = {
  _id: string;
  practitioner?: {
    fullName?: string;
    profilePicture?: string;
  };
  title?: string;
  desc?: string;
  date?: string;
  time?: string;
  status?: string;
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://healthme-backend.onrender.com";

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const stored = localStorage.getItem("user");
        let userId = "";
        let token = "";

        if (stored) {
          const parsed = JSON.parse(stored);
          userId = parsed._id || parsed.id || parsed.userId || "";
          token = parsed.token || parsed.accessToken || "";
        }

        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${API_BASE}/api/patient/appointments?userId=${userId}`, {
          headers,
        });

        const json = await res.json();

        if (json.success && Array.isArray(json.data.appointments)) {
          setAppointments(json.data.appointments);
        } else {
          setAppointments([]);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center text-slate-600 text-lg">
        Loading appointments...
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden min-h-screen bg-linear-to-br from-white via-teal-50 to-white py-20 px-6 lg:px-20">
      {/* === Background glow layers === */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-[-100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.12),transparent)] blur-[130px]" />
        <div className="absolute bottom-0 right-[-150px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.10),transparent)] blur-[160px]" />
      </div>

      {/* === Page Title === */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-800 mb-12 tracking-tight"
      >
        Your{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-emerald-600">
          Appointments
        </span>
      </motion.h1>

      {/* === Schedule Appointment Button === */}
      <div className="flex justify-center mb-12">
        <Link href="/appointment/new">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-linear-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            + Schedule New Appointment
          </motion.button>
        </Link>
      </div>

      {/* === Appointment Cards === */}
      {appointments.length === 0 ? (
        <div className="text-center text-slate-600 text-lg mt-20">
          No appointments found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {appointments.map((appt, idx) => (
            <motion.div
              key={appt._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="relative group bg-white/70 backdrop-blur-xl border border-white/30 p-6 rounded-[26px] shadow-[0_10px_40px_rgba(13,148,136,0.15)] hover:shadow-[0_16px_60px_rgba(13,148,136,0.25)] transition-all overflow-hidden"
            >
              {/* glowing edge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-[26px] bg-[conic-gradient(from_0deg,rgba(13,148,136,0.1)_0%,transparent_60%,rgba(13,148,136,0.1)_100%)]"
              />

              {/* content */}
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      appt.practitioner?.profilePicture ||
                      "/avatars/default_doctor.jpg"
                    }
                    alt={appt.practitioner?.fullName || "Doctor"}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-teal-500/40 shadow-md"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {appt.practitioner?.fullName || appt.title || "Doctor Appointment"}
                    </h2>
                    <p className="text-sm text-teal-600">{appt.desc || "Consultation"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600 mt-2">
                  <FaCalendarAlt className="text-teal-500" />
                  <span>
                    {appt.date
                      ? new Date(appt.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "No date"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <FaClock className="text-teal-500" />
                  <span>
                    {appt.time ||
                      (appt.date
                        ? new Date(appt.date).toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—")}
                  </span>
                </div>

                {/* Status Badge */}
                <div
                  className={`mt-4 w-fit px-3 py-1 text-xs font-semibold rounded-full ${
                    appt.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {appt.status ? appt.status.toUpperCase() : "UNKNOWN"}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-between items-center">
                  <Link href={`/appointment/${appt._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      className="px-5 py-2 bg-linear-to-r from-teal-500 to-emerald-600 text-white text-sm rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      View Details
                    </motion.button>
                  </Link>

                  {appt.status === "confirmed" && (
                    <FaCheckCircle className="text-teal-500 text-xl" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}