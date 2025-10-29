"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function HeroSection() {
  // Animated counters
  const [doctors, setDoctors] = useState(0);
  const [tests, setTests] = useState(0);
  const [experience, setExperience] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 10;
      if (start < 240) setDoctors(start);
      if (start < 1456) setTests(start);
      if (start < 1056) setExperience(start);
      if (start >= 1000000) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-white via-teal-50 to-white h-screen flex items-center px-6 lg:px-20">
      <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-10 items-center w-full">
        
        {/* LEFT SIDE — Text, Email, Stats */}
        <div className="col-span-12 md:col-span-6 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900"
          >
            Outstanding <br />
            <span className="text-teal-600">High Quality Care</span> <br />
            & Patient Safety!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-slate-600 text-base md:text-lg max-w-md"
          >
            From specialty conditions and treatment to everyday needs.
            Our doctors deliver care you can trust.
          </motion.p>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center bg-white rounded-full shadow-md p-2 max-w-md"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-transparent outline-none text-slate-700"
            />
            <button className="px-5 py-2 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition">
              Get Started – It’s Free
            </button>
          </motion.div>

          {/* Stats (Animated Counters) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex gap-10 pt-4 text-slate-700"
          >
            <div>
              <div className="text-2xl md:text-3xl font-bold">
                {doctors}+
              </div>
              <div className="text-sm text-slate-500">
                Qualified Doctors
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">
                {tests.toLocaleString()}
              </div>
              <div className="text-sm text-slate-500">
                Medical Tests Done
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">
                {Math.floor(experience / 100)}M+
              </div>
              <div className="text-sm text-slate-500">
                Years of Experience
              </div>
            </div>
          </motion.div>
        </div>

 {/* RIGHT SIDE — Image + Floating Elements */}
<div className="col-span-12 md:col-span-6 relative flex justify-center items-center">
  {/* Main Doctor Image */}
  <motion.img
    src="/images/doctor.png"
    alt="Doctor"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    className="rounded-3xl object-cover max-h-[480px]  z-0"
  />

  {/* Floating Calendar Card (Glass) */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="absolute top-40 left-94 bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl p-4 w-52 z-10"
  >
    <div className="flex justify-between text-sm text-slate-700 mb-2">
      <span>February</span>
      <span className="font-semibold text-teal-700">2025</span>
    </div>
    <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-600">
      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
        <div key={`${d}-${i}`}>{d}</div>
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

  {/* Floating Typing Message (Glass) */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="absolute bottom-8 left-8 bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl p-9 w-72 md:w-80 z-10"
  >
    <TypeAnimation
      sequence={[
        "👋 Welcome to HealthMe.",
        2000,
        "My name is Dr. Robert Long, a radiologist.",
        2500,
        "How can we help you today?",
        3000,
        "Your health, made simple.",
        2500,
      ]}
      speed={50}
      repeat={Infinity}
      className="text-sm text-slate-800 leading-relaxed"
    />
  </motion.div>

        </div>
      </div>
    </section>
  );
}