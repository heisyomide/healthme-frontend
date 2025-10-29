"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaHeartbeat,
  FaTooth,
  FaStethoscope,
  FaBrain,
  FaPaw,
  FaFlask,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "General Consultation",
    description:
      "Connect instantly with certified doctors for primary health consultations anytime, anywhere.",
    icon: <FaStethoscope />,
    glow: "from-teal-400 to-emerald-400",
    slug: "general-consultation",
  },
  {
    id: 2,
    title: "Dental Care",
    description:
      "Advanced digital dental care with expert dentists and AI-driven oral analysis.",
    icon: <FaTooth />,
    glow: "from-cyan-400 to-sky-400",
    slug: "dental-care",
  },
  {
    id: 3,
    title: "Mental Health",
    description:
      "Confidential sessions with mental health experts and smart emotional tracking.",
    icon: <FaBrain />,
    glow: "from-indigo-400 to-teal-400",
    slug: "mental-health",
  },
  {
    id: 4,
    title: "Veterinary Services",
    description:
      "Professional veterinary care for your pets, with doorstep consultations and health tracking.",
    icon: <FaPaw />,
    glow: "from-lime-400 to-teal-400",
    slug: "veterinary-services",
  },
  {
    id: 5,
    title: "Lab & Diagnostics",
    description:
      "Book lab tests, get real-time results, and access diagnostics powered by great laboratories.",
    icon: <FaFlask />,
    glow: "from-sky-400 to-emerald-400",
    slug: "lab-diagnostics",
  },
  {
    id: 6,
    title: "Emergency Response",
    description:
      "24/7 rapid emergency response system that locates the nearest practitioners instantly.",
    icon: <FaHeartbeat />,
    glow: "from-rose-400 to-orange-400",
    slug: "emergency-response",
  },
];

export default function ServicesPage() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-linear-to-br from-white via-teal-50 to-white py-20 px-6 lg:px-20">
      {/* Floating light waves */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -left-40 top-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_70%)] blur-[160px]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
          className="absolute right-0 bottom-0 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.08),transparent_70%)] blur-[180px]"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          Explore Our{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-emerald-600">
            Smart Health Services
          </span>
        </h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
          Intelligent, accessible, and futuristic healthcare — powered by
          precision technology.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow:
                "0 10px 60px rgba(13,148,136,0.25), 0 0 40px rgba(16,185,129,0.15)",
            }}
            className="relative group p-0.5 rounded-[28px] bg-linear-to-r from-teal-400 via-emerald-400 to-cyan-400 transition-all duration-500"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-[28px] p-8 flex flex-col items-center text-center relative overflow-hidden">
              {/* Animated glow circle behind icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`absolute top-10 w-28 h-28 rounded-full blur-2xl bg-linear-to-r ${service.glow} opacity-30`}
              />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 1.2, type: "spring" }}
                className="relative mb-6 text-5xl text-teal-500"
              >
                {service.icon}
              </motion.div>

              <h2 className="text-lg font-bold text-slate-800">
                {service.title}
              </h2>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* View Practitioners Button */}
              <Link href={`/practitioners?service=${service.slug}`}>
                <motion.button
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 0 25px rgba(13,148,136,0.45)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-2 text-sm font-semibold bg-linear-to-r from-teal-500 to-emerald-600 text-white rounded-full shadow-lg transition-all"
                >
                  View Practitioners
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating holographic orb */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[8%] w-40 h-40 rounded-full bg-linear-to-br from-emerald-300/20 to-teal-300/20 blur-3xl"
      />
    </section>
  );
}