"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function HeroSection() {
  const [doctors, setDoctors] = useState(0);
  const [tests, setTests] = useState(0);
  const [experience, setExperience] = useState(0);

  // ✅ Animated Counters
  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 10;
      if (start < 240) setDoctors(start);
      if (start < 1456) setTests(start);
      if (start < 1056) setExperience(start);
      if (start >= 2000) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-teal-50 to-white min-h-screen flex items-center px-5 sm:px-8 md:px-16 pt-28 md:pt-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        
        {/* === LEFT SIDE === */}
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900"
          >
            Outstanding <br />
            <span className="text-teal-600">High Quality Care</span> <br />
            & Patient Safety!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-slate-600 text-base sm:text-lg max-w-md mx-auto md:mx-0"
          >
            From specialty conditions to everyday care — our doctors deliver
            trusted, patient-centered medical service.
          </motion.p>

          {/* === Email Input === */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start bg-white rounded-full shadow-md p-2 max-w-md mx-auto md:mx-0"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 text-sm sm:text-base bg-transparent outline-none text-slate-700 w-full"
            />
            <button className="mt-2 sm:mt-0 px-6 py-2 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition w-full sm:w-auto">
              Get Started – It’s Free
            </button>
          </motion.div>

          {/* === Stats === */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center md:justify-start gap-8 pt-6 text-slate-700"
          >
            <div className="text-center md:text-left">
              <div className="text-2xl sm:text-3xl font-bold">{doctors}+</div>
              <div className="text-sm text-slate-500">Qualified Doctors</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl sm:text-3xl font-bold">
                {tests.toLocaleString()}
              </div>
              <div className="text-sm text-slate-500">Medical Tests Done</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl sm:text-3xl font-bold">
                {Math.floor(experience / 100)}M+
              </div>
              <div className="text-sm text-slate-500">Years of Experience</div>
            </div>
          </motion.div>
        </div>

        {/* === RIGHT SIDE === */}
        <div className="relative flex justify-center items-center mt-10 md:mt-0">
          {/* Doctor Image */}
          <motion.img
            src="/images/doctor.png"
            alt="Doctor"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl object-cover max-h-[400px] sm:max-h-[480px] w-auto z-0"
          />

          {/* Floating Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-12 right-4 sm:right-10 bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-4 w-44 sm:w-52 z-10"
          >
            <div className="flex justify-between text-xs sm:text-sm text-slate-700 mb-2">
              <span>February</span>
              <span className="font-semibold text-teal-700">2025</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] sm:text-xs text-slate-600">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i}>{d}</div>
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className={`p-1 rounded-full ${
                    i + 1 === 15 ? "bg-teal-600 text-white" : "hover:bg-white/40"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating Typing Message */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 left-4 sm:left-8 bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-4 sm:p-6 w-64 sm:w-72 z-10"
          >
            <TypeAnimation
              sequence={[
                "👋 Welcome to HealthMe.",
                2000,
                "My name is Dr. Robert Long.",
                2500,
                "How can we help you today?",
                3000,
                "Your health, made simple.",
                2500,
              ]}
              speed={50}
              repeat={Infinity}
              className="text-xs sm:text-sm text-slate-800 leading-relaxed"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}