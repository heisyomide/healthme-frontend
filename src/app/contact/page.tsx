"use client";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-teal-600 via-teal-400 to-emerald-500 text-white px-6 py-20">
      {/* Background Glow Orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-white/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-cyan-300/10 rounded-full blur-[180px]" />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        {/* LEFT SIDE — Info + Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
            Get in Touch <br /> with <span className="text-teal-100">HealthMe</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Whether you have a question about appointments, features, or need support,
            we’re here to help. Our team of experts will respond within 24 hours.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaEnvelope className="text-teal-100 text-lg" />
              </div>
              <span className="text-white/90 text-sm">support@healthme.com</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaPhoneAlt className="text-teal-100 text-lg" />
              </div>
              <span className="text-white/90 text-sm">+1 (800) 555-0921</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaMapMarkerAlt className="text-teal-100 text-lg" />
              </div>
              <span className="text-white/90 text-sm">
                500 Medical Drive, Suite 210, San Francisco, CA
              </span>
            </div>
          </div>

          <motion.img
            src="/images/contact-illustration.png"
            alt="Contact Illustration"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-md mt-10 drop-shadow-2xl hidden md:block"
          />
        </motion.div>

        {/* RIGHT SIDE — Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            Send Us a Message
          </h2>

          <form className="space-y-5">
            <div>
              <label className="text-sm text-white/80 block mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
              />
            </div>

            <div>
              <label className="text-sm text-white/80 block mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
              />
            </div>

            <div>
              <label className="text-sm text-white/80 block mb-2">Subject</label>
              <input
                type="text"
                placeholder="Enter subject"
                className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
              />
            </div>

            <div>
              <label className="text-sm text-white/80 block mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-300 transition resize-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-linear-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}