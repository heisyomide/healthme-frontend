"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar, FaMapMarkerAlt, FaLocationArrow, FaCheckCircle } from "react-icons/fa";

interface Practitioner {
  _id: string;
  fullName: string;
  specialization: string;
  location: string;
  profilePicture?: string;
  ratings?: { average?: number };
  availability?: { day: string; from: string; to: string }[];
  lat?: number;
  lng?: number;
}

export default function PractitionersPage() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service");

  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>("");

  // Fetch all practitioners
  useEffect(() => {
    const fetchPractitioners = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/practitioner/public`);
        const data = await res.json();
        if (data.success) setPractitioners(data.data);
      } catch (error) {
        console.error("Error fetching practitioners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPractitioners();
  }, []);

  // Filter practitioners by specialization
  const filteredPractitioners = useMemo(() => {
    if (!service) return practitioners;
    const lower = service.toLowerCase();
    return practitioners.filter((p) =>
      p.specialization?.toLowerCase().includes(lower)
    );
  }, [service, practitioners]);

  // Location detection
  const handleDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationStatus("❌ Your browser does not support location detection.");
      return;
    }
    setLoadingLocation(true);
    setLocationStatus("🔍 Detecting your location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setLoadingLocation(false);
        setLocationStatus("✅ Location detected!");
      },
      () => {
        setLoadingLocation(false);
        setLocationStatus("❌ Location access denied or failed.");
      }
    );
  };

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-white via-teal-50 to-white min-h-screen py-20 px-6 lg:px-20">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-20 top-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(0,182,182,0.12),transparent)] blur-[120px]" />
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.10),transparent)] blur-[140px]" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left text-3xl md:text-4xl font-extrabold text-slate-800"
        >
          {service ? (
            <>
              Showing{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-emerald-600">
                {service.replace(/-/g, " ")}
              </span>{" "}
              Specialists
            </>
          ) : (
            <>
              Find{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-emerald-600">
                Practitioners Near You
              </span>
            </>
          )}
        </motion.h1>

        {/* Detect Location */}
        <motion.button
          onClick={handleDetectLocation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white bg-linear-to-r from-teal-600 to-emerald-700 shadow-lg hover:shadow-xl transition-all"
        >
          {userLocation ? <FaCheckCircle /> : <FaLocationArrow />}
          {loadingLocation
            ? "Detecting..."
            : userLocation
            ? "Location Detected"
            : "Detect My Location"}
        </motion.button>
      </div>

      {locationStatus && (
        <p className="text-center text-sm mb-10 text-emerald-700 font-medium animate-pulse">
          {locationStatus}
        </p>
      )}

      {/* Practitioners Grid */}
      {loading ? (
        <p className="text-center text-slate-600">Loading practitioners...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredPractitioners.map((pr) => {
            const distance =
              userLocation && pr.lat && pr.lng
                ? getDistance(userLocation[0], userLocation[1], pr.lat, pr.lng).toFixed(1)
                : null;

            return (
              <motion.div
                key={pr._id}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group p-px rounded-[28px] bg-linear-to-r from-teal-400 via-emerald-400 to-teal-600 shadow-lg hover:shadow-2xl"
              >
                <div className="bg-white/70 backdrop-blur-xl rounded-[28px] p-6 flex flex-col items-center text-center">
                  <img
                    src={pr.profilePicture || "/default-avatar.png"}
                    alt={pr.fullName}
                    className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-teal-400 shadow-lg"
                  />
                  <h2 className="text-lg font-bold text-slate-900">{pr.fullName}</h2>
                  <p className="text-sm text-teal-600">{pr.specialization}</p>
                  <p className="text-xs text-slate-500 mt-1">{pr.location}</p>

                  {distance && (
                    <p className="mt-2 text-xs text-emerald-600 font-semibold flex items-center justify-center gap-1">
                      <FaMapMarkerAlt /> {distance} km away
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < Math.floor(pr.ratings?.average || 0)
                            ? "text-yellow-400"
                            : "text-slate-300"
                        } text-sm`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-semibold text-slate-700">
                      {pr.ratings?.average?.toFixed(1) || "0.0"}
                    </span>
                  </div>

                  <Link href={`/practitioners/${pr._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 px-6 py-2.5 bg-linear-to-r from-teal-500 to-emerald-600 text-white rounded-full font-medium shadow-md hover:shadow-xl"
                    >
                      View Profile
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}