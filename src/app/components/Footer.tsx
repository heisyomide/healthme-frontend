"use client";

import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-[#F9FAFB] px-8 py-16 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Branding & Social */}
        <div>
          <h2 className="text-2xl font-bold text-[#14B8A6] mb-4 tracking-tight">
            HealthMe
          </h2>
          <p className="text-sm mb-6 leading-relaxed text-[#9CA3AF]">
            HealthMe delivers trusted healthcare at your fingertips — from home
            visits to teleconsultations, we make care simple, safe, and
            affordable.
          </p>
          <div className="flex space-x-4 text-xl">
            <FaInstagram className="text-[#14B8A6] hover:text-[#06B6D4] transition cursor-pointer" />
            <FaLinkedin className="text-[#14B8A6] hover:text-[#06B6D4] transition cursor-pointer" />
            <FaFacebook className="text-[#14B8A6] hover:text-[#06B6D4] transition cursor-pointer" />
            <FaTwitter className="text-[#14B8A6] hover:text-[#06B6D4] transition cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", href: "/" },
              { name: "Services", href: "#services" },
              { name: "About", href: "#about" },
              { name: "Why Choose Us", href: "#whychoose" },
              { name: "Contact", href: "#contact" },
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
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
          <p className="text-sm leading-relaxed text-[#9CA3AF]">
            +234 (0) 800 000 9999 <br />
            HealthMe HQ <br />
            22 Care Street, Wellness City, Nigeria
          </p>
        </div>

        {/* Subscription Form */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Subscribe</h3>
          <p className="text-sm mb-4 text-[#9CA3AF]">
            Join our newsletter for medical updates and exclusive wellness
            insights.
          </p>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-md text-[#111827] border border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
            />
            <button
              type="submit"
              className="w-full bg-linear-to-r from-[#14B8A6] to-[#0EA5E9] text-white px-4 py-2 rounded-md hover:opacity-90 transition font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Partner Logos */}
      <div className="mt-16 border-t border-[#1E293B] pt-10">
        <h5 className="text-center text-[#9CA3AF] mb-6 text-sm uppercase tracking-wide">
          Our Trusted Partners
        </h5>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {/* Replace these with your actual logos */}
          <img
            src="/logos/partner1.png"
            alt="Partner 1"
            className="h-8 md:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition"
          />
          <img
            src="/logos/partner2.png"
            alt="Partner 2"
            className="h-8 md:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition"
          />
          <img
            src="/logos/partner3.png"
            alt="Partner 3"
            className="h-8 md:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#1E293B] mt-12 pt-6 text-center">
        <p className="text-sm text-[#9CA3AF]">
          &copy; {new Date().getFullYear()} HealthMe. Your Health, Made Simple.
        </p>
      </div>
    </footer>
  );
}