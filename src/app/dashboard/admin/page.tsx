"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserMd,
  FaChartBar,
  FaCogs,
  FaSignOutAlt,
  FaDatabase,
  FaComments,
  FaClipboardCheck,
  FaShieldAlt,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<any>(null);
  const [activePanel, setActivePanel] = useState("overview");
  const [overviewData, setOverviewData] = useState<any>(null);
  const [practitioners, setPractitioners] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [kycList, setKycList] = useState<any[]>([]);
  const [securityLogs, setSecurityLogs] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const router = useRouter();

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://healthme-backend.onrender.com";

  // Load admin from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    setAdmin(user);
  }, [router]);

  // Fetch overview
  useEffect(() => {
    if (!admin) return;

    fetch(`${API_BASE}/api/admin/overview`, { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setOverviewData(data))
      .catch((err) => console.error("Overview fetch failed:", err));
  }, [admin]);

  // Dynamic panel fetcher
  useEffect(() => {
    if (!admin) return;

    const fetchPanelData = async () => {
      try {
        let url = "";
        switch (activePanel) {
          case "practitioners":
            url = `${API_BASE}/api/admin/practitioners`;
            break;
          case "users":
            url = `${API_BASE}/api/admin/users`;
            break;
          case "kyc":
            url = `${API_BASE}/api/admin/kyc`;
            break;
          case "security":
            url = `${API_BASE}/api/admin/logs`; // ✅ corrected
            break;
          case "chat":
            url = `${API_BASE}/api/admin/support`;
            break;
          default:
            return;
        }

        const res = await fetch(url, { credentials: "include" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        if (activePanel === "practitioners") setPractitioners(Array.isArray(data.items) ? data.items : []);
        if (activePanel === "users") setUsers(Array.isArray(data.items) ? data.items : []);
        if (activePanel === "kyc") setKycList(Array.isArray(data) ? data : []);
        if (activePanel === "security") setSecurityLogs(Array.isArray(data) ? data : []);
        if (activePanel === "chat") setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(`Error fetching ${activePanel}:`, err);
      }
    };

    fetchPanelData();
  }, [activePanel, admin]);

  const handleLogout = async () => {
    try {
      await fetch(`https://healthme-backend.onrender.com/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!admin) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading admin control panel...
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-linear-to-br from-gray-50 via-white to-teal-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(13,148,136,0.15),transparent)] blur-[180px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(16,185,129,0.2),transparent)] blur-[200px]" />
      </div>

      {/* Wrapper */}
      <div className="max-w-7xl mx-auto mt-16 px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-3">
            <FaCogs className="text-teal-600" />
            Admin Control Center
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition-all mt-4 md:mt-0"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center md:justify-start">
          {[
            { id: "overview", label: "Overview", icon: <FaChartBar /> },
            { id: "practitioners", label: "Practitioners", icon: <FaUserMd /> },
            { id: "users", label: "Users", icon: <FaUsers /> },
            { id: "kyc", label: "KYC Approvals", icon: <FaClipboardCheck /> },
            { id: "security", label: "Security Logs", icon: <FaShieldAlt /> },
            { id: "chat", label: "Support Chat", icon: <FaComments /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePanel(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                activePanel === tab.id
                  ? "bg-teal-500 text-white shadow-lg"
                  : "bg-white/60 text-slate-700 hover:bg-teal-50"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Panels */}
        <motion.div
          key={activePanel}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_10px_40px_rgba(13,148,136,0.15)] p-8"
        >
          {activePanel === "overview" && <OverviewPanel data={overviewData} />}
          {activePanel === "practitioners" && <ListPanel data={practitioners} type="Practitioners" />}
          {activePanel === "users" && <ListPanel data={users} type="Patients" />}
          {activePanel === "kyc" && <KYCPanel kycList={kycList} />}
          {activePanel === "security" && <SecurityPanel logs={securityLogs} />}
          {activePanel === "chat" && <ChatPanel messages={messages} />}
        </motion.div>
      </div>
    </section>
  );
}

/* === Panels === */

function OverviewPanel({ data }: any) {
  return (
    <>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">System Overview 📊</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardStat title="Total Patient" value={data?.totalUsers ?? "—"} icon={<FaUsers className="text-sky-500 text-3xl" />} />
        <DashboardStat title="Practitioners" value={data?.totalPractitioners ?? "—"} icon={<FaUserMd className="text-teal-500 text-3xl" />} />
        <DashboardStat title="Active Sessions" value={data?.activeSessions ?? "—"} icon={<FaChartBar className="text-emerald-500 text-3xl" />} />
        <DashboardStat title="Database Health" value={data?.dbHealthy ? "Healthy" : "Down"} icon={<FaDatabase className="text-indigo-500 text-3xl" />} />
      </div>
    </>
  );
}

function ListPanel({ data, type }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-4">{type} List</h2>
      {!data?.length ? (
        <p className="text-slate-500">No {type.toLowerCase()} found.</p>
      ) : (
        <ul className="space-y-3">
          {data.map((u: any) => (
            <li key={u._id} className="p-4 border rounded-lg bg-gray-50 flex justify-between">
              <span>{u.fullName || u.email}</span>
              <span className="text-sm text-gray-500">{u.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function KYCPanel({ kycList }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">KYC Approvals</h2>
      {!Array.isArray(kycList) || !kycList.length ? (
        <p className="text-slate-500">No pending KYCs.</p>
      ) : (
        <ul className="space-y-3">
          {kycList.map((k: any) => (
            <li key={k._id} className="p-4 border rounded bg-indigo-50 flex justify-between">
              <span>{k.userId?.fullName} ({k.userId?.email})</span>
              <span className="capitalize">{k.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SecurityPanel({ logs }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Security Logs</h2>
      {!Array.isArray(logs) || !logs.length ? (
        <p className="text-slate-500">No security logs yet.</p>
      ) : (
        <ul className="space-y-2">
          {logs.map((l: any) => (
            <li key={l.id} className="text-sm border-b py-2">
              <b>{l.type}</b> — {l.user} ({l.outcome}) @ {new Date(l.at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ChatPanel({ messages }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Support Messages</h2>
      {!Array.isArray(messages) || !messages.length ? (
        <p className="text-slate-500">No support messages.</p>
      ) : (
        <ul className="space-y-3">
          {messages.map((m: any) => (
            <li key={m._id} className="p-3 border rounded bg-sky-50">
              <b>{m.senderName}</b>: {m.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DashboardStat({ icon, title, value }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/60 rounded-2xl p-6 border border-white/50 shadow-inner hover:shadow-lg transition-all flex flex-col items-start"
    >
      <div>{icon}</div>
      <h3 className="mt-3 text-sm text-slate-500">{title}</h3>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </motion.div>
  );
}