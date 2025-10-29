"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaTimesCircle,
  FaArrowLeft,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";

const dummyAppointments = [
  {
    id: 1,
    doctor: "Dr. Ada Okafor",
    specialty: "General Practitioner",
    date: "Nov 28, 2025",
    time: "09:00 AM",
  },
  {
    id: 2,
    doctor: "Dr. Emeka Nwankwo",
    specialty: "Dentist",
    date: "Nov 30, 2025",
    time: "02:30 PM",
  },
];

export default function CancelAppointmentPage() {
  const router = useRouter();
  const { id } = useParams();
  const appointment = dummyAppointments.find((a) => a.id.toString() === id);

  if (!appointment) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-linear-to-br from-white via-teal-50 to-white">
        <p className="text-slate-600 text-lg">Appointment not found.</p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-white via-teal-50 to-white px-6 overflow-hidden">
      {/* glowing background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.15),transparent)] blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.12),transparent)] blur-[180px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/80 backdrop-blur-2xl border border-white/30 p-10 rounded-4xl shadow-[0_12px_40px_rgba(13,148,136,0.15)] max-w-lg w-full text-center overflow-hidden"
      >
        {/* rotating glow ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-4xl bg-[conic-gradient(from_0deg,rgba(13,148,136,0.08)_0%,transparent_60%,rgba(13,148,136,0.08)_100%)]"
        />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
            className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-3xl mb-6"
          >
            <FaExclamationTriangle />
          </motion.div>

          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Cancel Appointment?
          </h1>
          <p className="text-slate-600 text-sm mb-6">
            You’re about to cancel your appointment with{" "}
            <span className="font-semibold text-teal-600">
              {appointment.doctor}
            </span>{" "}
            ({appointment.specialty}) scheduled for{" "}
            <span className="font-medium">
              {appointment.date} at {appointment.time}
            </span>
            .
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link href="/appointment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 transition"
              >
                <FaArrowLeft /> Go Back
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                alert("Appointment cancelled successfully ✅");
                router.push("/appointment");
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-red-500 to-rose-600 text-white rounded-full shadow-md hover:shadow-lg transition"
            >
              <FaTimesCircle /> Confirm Cancel
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}