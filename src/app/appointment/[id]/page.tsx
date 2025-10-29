"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

type Appointment = {
  _id: string;
  date: string;
  time: string;
  status: string;
  reason?: string;
  practitioner?: {
    _id: string;
    fullName: string;
    profilePicture?: string;
    specialization?: string;
  };
};

export default function AppointmentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [updating, setUpdating] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://healthme-backend.onrender.com";

  // === Load appointment details ===
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const stored = localStorage.getItem("user");
        let token = "";
        if (stored) token = JSON.parse(stored).token || "";

        const res = await fetch(`${API_BASE}/api/patient/appointment/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        if (json.success) {
          setAppointment(json.data);
        } else {
          console.error("Error:", json.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAppointment();
  }, [id]);

  // === Reschedule appointment ===
  const handleReschedule = async () => {
    if (!newDate || !newTime) return alert("Please select new date and time.");
    try {
      setUpdating(true);
      const stored = localStorage.getItem("user");
      let token = "";
      if (stored) token = JSON.parse(stored).token || "";

      const res = await fetch(`${API_BASE}/api/patient/appointment/${id}/reschedule`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date: newDate, time: newTime }),
      });

      const json = await res.json();
      if (json.success) {
        alert("Appointment rescheduled successfully!");
        router.push("/appointments");
      } else {
        alert(json.message || "Failed to reschedule.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  // === Cancel appointment ===
  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      setUpdating(true);
      const stored = localStorage.getItem("user");
      let token = "";
      if (stored) token = JSON.parse(stored).token || "";

      const res = await fetch(`${API_BASE}/api/patient/appointment/${id}/cancel`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (json.success) {
        alert("Appointment cancelled.");
        router.push("/appointments");
      } else {
        alert(json.message || "Failed to cancel.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center text-slate-600 text-lg">
        Loading appointment details...
      </section>
    );
  }

  if (!appointment) {
    return (
      <section className="min-h-screen flex justify-center items-center text-slate-600 text-lg">
        Appointment not found.
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white py-16 px-6 lg:px-20">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl font-bold mb-10"
      >
        Manage Appointment
      </motion.h1>

      {/* === Practitioner Info === */}
      <div className="max-w-xl mx-auto bg-gray-50 rounded-xl p-6 shadow-md mb-10">
        <div className="flex items-center gap-4">
          <img
            src={appointment.practitioner?.profilePicture || "/avatars/default_doctor.jpg"}
            alt="Doctor"
            className="w-16 h-16 rounded-full object-cover ring-4 ring-teal-500/40"
          />
          <div>
            <h2 className="font-semibold text-lg">
              {appointment.practitioner?.fullName || "Doctor"}
            </h2>
            <p className="text-sm text-slate-600">
              {appointment.practitioner?.specialization || "General Practitioner"}
            </p>
          </div>
        </div>
        <div className="mt-4 text-slate-700">
          <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <p><strong>Status:</strong> {appointment.status}</p>
          {appointment.reason && <p><strong>Reason:</strong> {appointment.reason}</p>}
        </div>
      </div>

      {/* === Reschedule Form === */}
      <div className="max-w-lg mx-auto bg-white border border-teal-100 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-teal-600 mb-4">Reschedule Appointment</h3>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-slate-700">New Date</label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="border rounded-lg p-2"
          />

          <label className="text-sm font-medium text-slate-700">New Time</label>
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="border rounded-lg p-2"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={updating}
            onClick={handleReschedule}
            className="mt-4 bg-teal-600 text-white py-2 rounded-full font-medium hover:bg-teal-700"
          >
            {updating ? "Updating..." : "Reschedule"}
          </motion.button>
        </div>
      </div>

      {/* === Cancel & Join Buttons === */}
      <div className="max-w-lg mx-auto flex justify-between mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-5 py-2 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200"
          onClick={handleCancel}
        >
          Cancel Appointment
        </motion.button>

        {appointment.status === "confirmed" && (
          <Link href={`/video-session/${appointment._id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700"
            >
              Join Video Session
            </motion.button>
          </Link>
        )}
      </div>
    </section>
  );
}