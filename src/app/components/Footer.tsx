"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-[#F9FAFB] font-inter px-6 sm:px-10 pt-16 pb-8">
      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* BRANDING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center sm:text-left"
        >
          <h2 className="text-2xl font-bold text-[#14B8A6] mb-4">HealthMe</h2>
          <p className="text-sm text-[#9CA3AF] mb-6 leading-relaxed">
            HealthMe brings trusted healthcare to your doorstep — safe, smart,
            and always reliable.
          </p>
          <div className="flex justify-center sm:justify-start gap-4 text-lg">
            <a
              href="https://www.instagram.com/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#14B8A6] hover:text-[#0EA5E9] transition cursor-pointer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#14B8A6] hover:text-[#0EA5E9] transition cursor-pointer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#14B8A6] hover:text-[#0EA5E9] transition cursor-pointer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.twitter.com/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#14B8A6] hover:text-[#0EA5E9] transition cursor-pointer"
            >
              <FaTwitter />
            </a>
          </div>
        </motion.div>

        {/* QUICK LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center sm:text-left"
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", href: "/" },
              { name: "Services", href: "ser/vices" },
              { name: "About", href: "/about" },
              { name: "Why Choose Us", href: "/whychoose" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-[#9CA3AF] hover:text-[#14B8A6] hover:underline transition"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CONTACT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center sm:text-left"
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            +234 (0) 800 000 9999 <br />
            HealthMe HQ <br />
            22 Care Street, Wellness City, Nigeria
          </p>
        </motion.div>

        {/* SUBSCRIBE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center sm:text-left"
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Subscribe</h3>
          <p className="text-sm mb-4 text-[#9CA3AF]">
            Get the latest medical updates and health insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 w-full px-4 py-2 rounded-md text-[#111827] border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] text-white px-6 py-2 rounded-md hover:opacity-90 transition font-medium"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      {/* COPYRIGHT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="border-t border-[#1E293B] mt-12 pt-6 text-center"
      >
        <p className="text-sm text-[#9CA3AF]">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-[#14B8A6] font-medium">HealthMe</span>. All
          rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}