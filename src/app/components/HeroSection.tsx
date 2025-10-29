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
    <section className="relative overflow-hidden bg-linear-to-br from-white via-teal-50 to-white min-h-[90vh] flex items-center px-5 sm:px-8 lg:px-20 py-16 md:py-0">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center w-full">
        
        {/* LEFT SIDE — Text, Email, Stats */}
        <div className="col-span-12 md:col-span-6 space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900"
          >
            Outstanding <br />
            <span className="text-teal-600">High Quality Care</span> <br />
            & Patient Safety!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-slate-600 text-base sm:text-lg max-w-md mx-auto md:mx-0"
          >
            From specialty conditions and treatment to everyday needs.
            Our doctors deliver care you can trust.
          </motion.p>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center bg-white rounded-full shadow-md p-2 max-w-md mx-auto md:mx-0"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-transparent outline-none text-slate-700 w-full"
            />
            <button className="mt-2 sm:mt-0 sm:ml-2 px-5 py-2 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition w-full sm:w-auto">
              Get Started – It’s Free
            </button>
          </motion.div>

          {/* Stats (Animated Counters) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center md:justify-start gap-6 pt-4 text-slate-700"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{doctors}+</div>
              <div className="text-sm text-slate-500">Qualified Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">
                {tests.toLocaleString()}
              </div>
              <div className="text-sm text-slate-500">Medical Tests Done</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">
                {Math.floor(experience / 100)}M+
              </div>
              <div className="text-sm text-slate-500">Years of Experience</div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE — Image + Floating Elements */}
        <div className="col-span-12 md:col-span-6 relative flex justify-center items-center mt-10 md:mt-0">
          {/* Main Doctor Image */}
          <motion.img
            src="/images/doctor.png"
            alt="Doctor"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="rounded-3xl object-cover max-h-[380px] sm:max-h-[440px] md:max-h-[480px] w-auto z-0"
          />

          {/* Floating Typing Message (Glass) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl p-6 sm:p-9 w-64 sm:w-72 md:w-80 z-10"
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
              className="text-xs sm:text-sm text-slate-800 leading-relaxed"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}