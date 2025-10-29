"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserMd,
  FaSignOutAlt,
  FaCalendarAlt,
  FaUsers,
  FaCog,
  FaHeartbeat,
  FaStar,
} from "react-icons/fa";

interface Practitioner {
  id?: string;
  fullName: string;
  email: string;
  specialization?: string;
  bio?: string;
  profilePicture?: string;
  ratings?: { average: number };
  role?: string;
}

interface Overview {
  profileCompletion: number;
  totalPatients?: number;
  upcomingAppointments?: number;
  completedAppointments?: number;
}

export default function PractitionerDashboard() {
  const [practitioner, setPractitioner] = useState<Practitioner | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [overview, setOverview] = useState<Overview | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /** === On Mount === */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.role !== "practitioner") {
      router.push("/dashboard");
      return;
    }

    setPractitioner(user);
    fetchDashboardData(storedToken);
  }, [router]);

  /** === Fetch Dashboard Data === */
  const fetchDashboardData = async (token: string) => {
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL;

      const [overviewRes, apptRes, patientRes, profileRes] = await Promise.all([
        fetch(`${base}/api/practitioner/overview`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${base}/api/practitioner/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${base}/api/practitioner/patients`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${base}/api/practitioner/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const [overviewData, appts, pats, profile] = await Promise.all([
        overviewRes.json(),
        apptRes.json(),
        patientRes.json(),
        profileRes.json(),
      ]);

      setOverview(overviewData.data || {});
      setAppointments(appts.data || []);
      setPatients(pats.data || []);
      setPractitioner(profile.data || {});
    } catch (err) {
      console.error("Error fetching practitioner dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  /** === Handle Logout === */
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!practitioner) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-linear-to-br from-white via-teal-50 to-white overflow-hidden">
      {/* === Ambient Glow === */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[radial-gradient(closest-side,rgba(13,148,136,0.1),transparent)] blur-[150px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.12),transparent)] blur-[180px]" />
      </div>

      {/* === Header === */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between max-w-6xl mx-auto px-8 py-6"
      >
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <FaUserMd className="text-teal-600" />
          Dr. {practitioner.fullName?.split(" ")[0] || "Practitioner"}’s Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all"
        >
          <FaSignOutAlt /> Logout
        </button>
      </motion.header>

      {/* === Navigation Tabs === */}
      <div className="max-w-6xl mx-auto px-8 mt-4 flex gap-4">
        {[
          { key: "overview", label: "Overview", icon: <FaHeartbeat /> },
          { key: "appointments", label: "Appointments", icon: <FaCalendarAlt /> },
          { key: "patients", label: "Patients", icon: <FaUsers /> },
          { key: "profile", label: "Profile", icon: <FaCog /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.key
                ? "bg-teal-600 text-white shadow-md"
                : "bg-white/60 text-slate-700 hover:bg-teal-100"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* === Main Content === */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="text-center text-slate-500 mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Loading data...
            </motion.div>
          ) : activeTab === "overview" ? (
            <OverviewSection
              overview={overview}
              patients={patients}
              appointments={appointments}
            />
          ) : activeTab === "appointments" ? (
            <DashboardList
              key="appointments"
              title="Upcoming Appointments"
              items={appointments}
              emptyText="No appointments scheduled yet."
            />
          ) : activeTab === "patients" ? (
            <DashboardList
              key="patients"
              title="Your Patients"
              items={patients}
              emptyText="No patients assigned yet."
            />
          ) : (
            <ProfileSection key="profile" practitioner={practitioner} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* === Overview Section === */
function OverviewSection({
  overview,
  patients,
  appointments,
}: {
  overview: Overview | null;
  patients: any[];
  appointments: any[];
}) {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="grid md:grid-cols-3 gap-6"
    >
      <DashboardCard
        title="Total Patients"
        value={patients.length}
        icon={<FaUsers className="text-emerald-500 text-3xl" />}
      />
      <DashboardCard
        title="Upcoming Appointments"
        value={appointments.length}
        icon={<FaCalendarAlt className="text-teal-500 text-3xl" />}
      />
      <DashboardCard
        title="Profile Completion"
        value={`${overview?.profileCompletion ?? 0}%`}
        icon={<FaUserMd className="text-sky-500 text-3xl" />}
      />
    </motion.div>
  );
}

/* === Reusable Components === */
function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_10px_30px_rgba(13,148,136,0.1)] p-6 text-center"
    >
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="text-slate-800 font-semibold">{title}</h3>
      <p className="text-2xl font-bold text-teal-700 mt-2">{value}</p>
    </motion.div>
  );
}

function DashboardList({
  title,
  items,
  emptyText,
}: {
  title: string;
  items: any[];
  emptyText: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_10px_40px_rgba(13,148,136,0.1)]"
    >
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-slate-500 italic">{emptyText}</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="p-4 bg-white/60 rounded-xl border border-slate-100 hover:shadow-md transition"
            >
              <div className="font-semibold text-slate-800">
                {item.name || item.fullName}
              </div>
              <div className="text-sm text-slate-500">
                {item.date || item.email}
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

/* === Profile Section === */
function ProfileSection({ practitioner }: { practitioner: Practitioner }) {
  const [form, setForm] = useState({
    fullName: practitioner.fullName,
    email: practitioner.email,
    specialization: practitioner.specialization || "",
    bio: practitioner.bio || "",
    profilePicture: practitioner.profilePicture || "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/practitioner/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_10px_40px_rgba(13,148,136,0.1)]"
    >
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Profile Settings</h2>

      {/* Profile Picture */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={form.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border border-teal-300"
        />
        <div>
          <div className="font-semibold text-slate-700">{form.fullName}</div>
          <div className="text-sm text-slate-500 flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            {practitioner.ratings?.average?.toFixed(1) || "0.0"} / 5.0
          </div>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="space-y-4">
        {(["fullName", "email", "specialization", "bio"] as const).map((field) => (
          <div key={field}>
            <label className="block text-slate-700 font-medium mb-1 capitalize">
              {field}
            </label>
            {field === "bio" ? (
              <textarea
                name={field}
                value={form[field]}
                onChange={handleChange}
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-4 py-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            ) : (
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            )}
          </div>
        ))}
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition-all disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </motion.div>
  );
}