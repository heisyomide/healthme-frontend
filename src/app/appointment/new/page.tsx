"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserMd,
  FaCheckCircle,
} from "react-icons/fa";

export default function NewAppointmentPage() {
  const [formData, setFormData] = useState({
    specialty: "",
    date: "",
    time: "",
    location: "",
    practitionerId: "",
  });

  const [practitioners, setPractitioners] = useState<any[]>([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // === Detect user location ===
  useEffect(() => {
    const detectLocation = async () => {
  setLoadingLocation(true);
  setLocationError(null);

  if (!navigator.geolocation) {
    setLocationError("Geolocation not supported by your browser.");
    setLoadingLocation(false);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;

        // This will get the city/state/country — not just numbers.
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();

        const address = data.address;
        const readable = `${address.city || address.town || address.state || ""}, ${
          address.country || ""
        }`;

        setFormData((prev) => ({ ...prev, location: readable }));
      } catch (err) {
        console.error(err);
        setLocationError("Failed to get location name.");
      } finally {
        setLoadingLocation(false);
      }
    },
    (error) => {
      console.error(error);
      setLocationError("Could not detect location. Please type it manually.");
      setLoadingLocation(false);
    }
  );
};

    detectLocation();
  }, []);

  // === Fetch doctors based on location ===
  const fetchDoctors = async (lat: number, lng: number) => {
    setLoadingDoctors(true);
    try {
      const res = await fetch(`/api/practitioners/nearby?lat=${lat}&lng=${lng}`);
      const data = await res.json();
      setPractitioners(data.practitioners || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/appointments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      setSubmitted(true);
    } else {
      alert(data.message || "Error creating appointment");
    }
  };

  return (
    <section className="relative min-h-screen bg-linear-to-br from-white via-teal-50 to-white py-20 px-6 md:px-16 overflow-hidden">
      {/* === Glowing Background === */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.12),transparent)] blur-[140px]" />
      </div>

      {/* === Header + Title === */}
      <div className="flex items-center justify-between mb-10">
        <Link href="/appointment">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-slate-700 hover:text-teal-600 transition text-sm font-medium"
          >
            <FaArrowLeft /> Back to Appointments
          </motion.button>
        </Link>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-10 text-center"
      >
        Schedule New{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-emerald-600">
          Appointment
        </span>
      </motion.h1>

      {/* === Main Card === */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-white/70 backdrop-blur-2xl border border-white/40 rounded-4xl p-10 shadow-[0_10px_40px_rgba(13,148,136,0.15)] relative overflow-hidden"
      >
        <div className="relative z-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* === Location === */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-3 text-teal-500" />
                <input
                  type="text"
                  name="location"
                  placeholder={
                    loadingLocation
                      ? "Detecting your location..."
                      : locationError
                      ? "Enter location manually"
                      : "Your location"
                  }
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white/50 border ${
                    locationError
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-white/40 focus:border-teal-500 focus:ring-teal-200"
                  } focus:ring-2 outline-none text-slate-800 transition`}
                />
                {locationError && (
                  <p className="text-sm text-red-500 mt-2">{locationError}</p>
                )}
              </div>

              {/* === Practitioner Select === */}
              <div className="relative">
                <FaUserMd className="absolute left-4 top-3 text-teal-500" />
                <select
                  name="practitionerId"
                  value={formData.practitionerId}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/50 border border-white/40 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-slate-800 transition"
                >
                  <option value="">
                    {loadingDoctors
                      ? "Loading nearby doctors..."
                      : practitioners.length
                      ? "Select Practitioner"
                      : "No practitioners found nearby"}
                  </option>
                  {practitioners.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name} • {doc.specialty} ({doc.distance})
                    </option>
                  ))}
                </select>
              </div>

              {/* === Date === */}
              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-3 text-teal-500" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/50 border border-white/40 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-slate-800 transition"
                />
              </div>

              {/* === Time === */}
              <div className="relative">
                <FaClock className="absolute left-4 top-3 text-teal-500" />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/50 border border-white/40 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-slate-800 transition"
                />
              </div>

              {/* === Submit === */}
              <div className="flex justify-center gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="submit"
                  className="px-8 py-3 bg-linear-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition"
                >
                  Schedule Appointment
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-10"
            >
              <FaCheckCircle className="text-teal-500 text-6xl mb-4" />
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                Appointment Scheduled!
              </h2>
              <p className="text-slate-600 mb-6">
                The practitioner will be notified.
              </p>
              <Link href="/appointment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 bg-linear-to-r from-teal-500 to-emerald-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition"
                >
                  Go to Appointments
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}