"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { FaHeadset, FaHeartbeat, FaCogs, FaUserMd, FaComments } from "react-icons/fa";

export default function SupportPage() {
  const [showChat, setShowChat] = useState(false);

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 px-6 py-16 flex flex-col items-center">
      {/* ===== Hero Section ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14 max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
          24/7 Support for Clinicians & Users
        </h1>
        <p className="text-slate-500 text-lg">
          Get instant help from our medical team, technical experts, and emotional support staff —
          anytime, anywhere.
        </p>
      </motion.div>

      {/* ===== Support Options ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mb-16">
        {[
          {
            title: "Mental Health & Emotional Support",
            desc: "Talk to licensed professionals who care about your well-being.",
            icon: <FaHeartbeat className="text-3xl text-teal-500" />,
            color: "from-teal-400 to-emerald-500",
          },
          {
            title: "Technical Assistance",
            desc: "Having trouble accessing the platform? We’re here to help 24/7.",
            icon: <FaCogs className="text-3xl text-cyan-500" />,
            color: "from-cyan-400 to-blue-500",
          },
          {
            title: "Practitioner Guidance",
            desc: "Need direction from a healthcare professional? Get guided solutions.",
            icon: <FaUserMd className="text-3xl text-sky-500" />,
            color: "from-sky-400 to-indigo-500",
          },
          {
            title: "Chat with a Specialist",
            desc: "Instantly connect with a support specialist for your concern.",
            icon: <FaComments className="text-3xl text-fuchsia-500" />,
            color: "from-fuchsia-500 to-pink-500",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
          >
            <div
              className={`w-14 h-14 rounded-full bg-linear-to-br ${item.color} flex items-center justify-center mb-4 shadow-md`}
            >
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>

            {item.title === "Chat with a Specialist" && (
              <button
                onClick={() => setShowChat(true)}
                className="mt-4 px-4 py-2 text-sm bg-linear-to-r from-teal-500 to-emerald-600 text-white rounded-full shadow hover:shadow-md transition"
              >
                Start Chat
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* ===== Chat Modal ===== */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-md w-full"
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Live Support Chat
            </h2>
            <div className="bg-slate-50 rounded-lg p-4 h-56 overflow-y-auto mb-4">
              <p className="text-sm text-slate-500">
                👋 Hi there! How can we assist you today?
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button className="px-4 py-2 bg-linear-to-r from-teal-500 to-emerald-600 text-white rounded-full">
                Send
              </button>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="mt-4 text-sm text-red-500 hover:underline"
            >
              Close Chat
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* ===== Emergency Banner ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-16 w-full max-w-4xl rounded-2xl bg-linear-to-r from-rose-500 to-red-500 text-white py-4 px-6 text-center font-semibold text-sm shadow-lg animate-pulse"
      >
        ⚠ If you are in an emergency, please call your local emergency services immediately.
      </motion.div>
    </main>
  );
}