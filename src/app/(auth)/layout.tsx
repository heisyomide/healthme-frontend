"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-linear-to-br from-white via-teal-50 to-white overflow-hidden">
      {/* === Glowing Background Orbs === */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[radial-gradient(closest-side,rgba(13,148,136,0.15),transparent)] blur-[150px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.15),transparent)] blur-[180px]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.1),transparent)] blur-[100px]"
        />
      </div>

      {/* === Animated Portal Border === */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] rounded-full border border-teal-500/10 blur-[3px]"
      />

      {/* === Animated Page Transition === */}
      <AnimatePresence mode="wait">
        <motion.div
          key={Math.random()} // ensures animation plays between pages
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}