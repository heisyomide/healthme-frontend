"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  ChartConfiguration,
} from "chart.js";

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip);

type Appointment = {
  time: string;
  title: string;
  desc?: string;
  doctorAvatar?: string;
  date?: string;
};

type Metric = { value: string; label: string; color: string };

export default function DashboardPage() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  // === STATES ===
  const [userName, setUserName] = useState("Fedrik");
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patientSummary, setPatientSummary] = useState({ heart: "", systolic: "", sessions: "" });
  const [healthProgressScore, setHealthProgressScore] = useState<number>(0);
  const [reportData, setReportData] = useState<{ labels: string[]; values: number[] }>({ labels: [], values: [] });
  const [treatmentPlan, setTreatmentPlan] = useState({
    sessions: 0,
    name: "",
    cadence: "",
    histogram: [] as number[],
    weeks: "",
  });
  const [medicine, setMedicine] = useState({ name: "", dose: "", refillInDays: 0 });

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://healthme-backend.onrender.com";
  const currentWeekday = new Date().toLocaleDateString(undefined, { weekday: "short" });

  // === Load user info from localStorage ===
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.fullName) setUserName(parsed.fullName.split(" ")[0]);
        else if (parsed.name) setUserName(parsed.name.split(" ")[0]);
      }
    } catch (err) {
      console.warn("Could not parse stored user:", err);
    }
  }, []);

  // === Fetch dashboard data from backend ===
  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem("user");
        let userId = "";
        let token = "";

        if (stored) {
          const parsed = JSON.parse(stored);
          userId = parsed._id || parsed.id || parsed.userId || "";
          token = parsed.token || parsed.accessToken || "";
        }

        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const controller = new AbortController();
        const signal = controller.signal;

        const url = (path: string) => `${API_BASE}${path}?userId=${userId}`;

        const [
          metricsRes,
          apptsRes,
          summaryRes,
          progressRes,
          reportRes,
          treatmentRes,
          medicineRes,
        ] = await Promise.allSettled([
          fetch(url("/api/patient/metrics"), { headers, signal }),
          fetch(url("/api/patient/appointments"), { headers, signal }),
          fetch(url("/api/patient/summary"), { headers, signal }),
          fetch(url("/api/patient/health-progress"), { headers, signal }),
          fetch(url("/api/patient/report"), { headers, signal }),
          fetch(url("/api/patient/treatment"), { headers, signal }),
          fetch(url("/api/patient/medicine"), { headers, signal }),
        ]);

        // === METRICS ===
        if (metricsRes.status === "fulfilled" && metricsRes.value.ok) {
          const json = await metricsRes.value.json();
          if (json.success && Array.isArray(json.metrics)) setMetrics(json.metrics);
        }

        // === APPOINTMENTS ===
        if (apptsRes.status === "fulfilled" && apptsRes.value.ok) {
          const json = await apptsRes.value.json();
          if (json.success && Array.isArray(json.appointments)) setAppointments(json.appointments);
        }

        // === SUMMARY ===
        if (summaryRes.status === "fulfilled" && summaryRes.value.ok) {
          const json = await summaryRes.value.json();
          if (json.success && json.summary) setPatientSummary(json.summary);
        }

        // === HEALTH PROGRESS ===
        if (progressRes.status === "fulfilled" && progressRes.value.ok) {
          const json = await progressRes.value.json();
          if (json.success && typeof json.score === "number") setHealthProgressScore(json.score);
        }

        // === REPORT ===
        if (reportRes.status === "fulfilled" && reportRes.value.ok) {
          const json = await reportRes.value.json();
          if (json.success && Array.isArray(json.labels) && Array.isArray(json.values))
            setReportData({ labels: json.labels, values: json.values });
        }

        // === TREATMENT PLAN ===
        if (treatmentRes.status === "fulfilled" && treatmentRes.value.ok) {
          const json = await treatmentRes.value.json();
          if (json.success && json.treatment) setTreatmentPlan(json.treatment);
        }

        // === MEDICINE ===
        if (medicineRes.status === "fulfilled" && medicineRes.value.ok) {
          const json = await medicineRes.value.json();
          if (json.success && json.medicine) setMedicine(json.medicine);
        }

        return () => controller.abort();
      } catch (err) {
        console.error("[Dashboard Fetch Error]:", err);
      }
    })();
  }, []);

  // === Render Chart ===
  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const existingChart = (chartRef.current as any)._chart;
    if (existingChart) existingChart.destroy();

    const config: ChartConfiguration<"line"> = {
      type: "line",
      data: {
        labels: reportData.labels,
        datasets: [
          {
            data: reportData.values,
            borderColor: "#14B8A6",
            backgroundColor: "rgba(20,184,166,0.12)",
            tension: 0.35,
            pointRadius: 3,
            fill: true,
            borderWidth: 2.5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#94A3B8" } },
          y: { grid: { color: "#EEF2F6" }, ticks: { color: "#94A3B8" }, beginAtZero: true },
        },
      },
    };

    const chart = new Chart(ctx, config);
    (chartRef.current as any)._chart = chart;

    return () => chart.destroy();
  }, [reportData]);

  // === Format Appointment Time ===
  const formatAppointmentTime = (appt: Appointment) => {
    if (appt.date) {
      try {
        const dt = new Date(appt.date);
        return dt.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      } catch {}
    }
    return appt.time;
  }
  return (
    <main className="min-h-screen bg-[#f3f5f7] p-6 md:p-8">
      <div className="mx-auto max-w-[1400px]">
        {/* ===== HEADER ===== */}
        <div className="mb-8 flex flex-col lg:flex-row items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              Welcome back, {userName}
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Here are the latest updates for today
            </p>
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap items-center gap-4">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-br ${metric.color} text-white font-semibold text-lg`}
                >
                  {metric.value.length <= 3 ? metric.value.slice(0, 1) : "M"}
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-slate-800">{metric.value}</div>
                  <div className="text-xs text-slate-500">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== DASHBOARD GRID ===== */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Appointment Section */}
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-800">Appointment</h3>
                <Link
                  href="/appointment"
                  className="text-sm text-teal-500 hover:underline hover:text-teal-600 transition"
                >
                  See All
                </Link>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                  <div
                    key={i}
                    className={`px-2 py-1 rounded cursor-pointer hover:bg-slate-100 transition ${
                      d === currentWeekday ? "text-slate-700 font-medium" : ""
                    }`}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Appointment cards */}
              <div className="space-y-4">
                {appointments.length === 0 ? (
                  <div className="text-sm text-slate-500">No upcoming appointments.</div>
                ) : (
                  appointments.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 hover:bg-slate-50 p-2 rounded-lg transition"
                    >
                      <div className="w-12 text-xs font-semibold text-teal-600">
                        {formatAppointmentTime(item)}
                      </div>
                      <div className="flex-1 bg-slate-50 rounded-xl p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-slate-800">{item.title}</div>
                            <div className="text-xs text-slate-500">{item.desc}</div>
                          </div>
                          <div className="flex -space-x-2">
                            <img
                              src={item.doctorAvatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&q=60"}
                              className="w-7 h-7 rounded-full ring-2 ring-white"
                              alt="Doctor"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Support Section */}
              <div className="mt-6 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
                <div className="relative">
                  <img
                    src="/images/doctor.png"
                    alt="Doctor Support"
                    className="w-full h-90 object-cover"
                  />
                  <Link
                    href="/support"
                    className="absolute bottom-4 left-4 rounded-md bg-white/80 backdrop-blur px-3 py-2 text-sm font-medium text-slate-800 hover:bg-white transition"
                  >
                    24/7 Support for Clinicians
                  </Link>
                </div>
              </div>
            </div>

            {/* Patient Summary */}
            <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Overview</div>
                  <div className="text-sm font-semibold text-slate-800">Patient Summary</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">VR</div>
                  <div className="text-sm font-semibold text-slate-800">{patientSummary.sessions}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Heart", value: patientSummary.heart },
                  { label: "Systolic", value: patientSummary.systolic },
                  { label: "Sessions", value: patientSummary.sessions },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-xs text-slate-400">{item.label}</div>
                    <div className="font-semibold text-teal-600">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            {/* Health Progress */}
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Health Progress Score</h3>
                <div className="text-xs text-slate-400 cursor-pointer">i</div>
              </div>

              <div className="mt-4 flex flex-col lg:flex-row gap-6 items-start">
                <div className="min-w-[220px]">
                  <div className="text-5xl font-extrabold text-teal-600">{healthProgressScore}%</div>
                  <div className="text-xs text-slate-500 mt-2">since last month to today</div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full" style={{ width: `${healthProgressScore}%`, background: "linear-gradient(90deg,#34d399,#10b981)" }} />
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-white rounded-xl px-3 py-2 text-xs text-slate-500 shadow">
                        {/* Put real SpO2 from backend if available */}
                        {Math.round(Number(patientSummary.heart) > 0 ? (98) : 98)}% SpO₂
                      </div>
                      <div className="bg-white rounded-xl px-3 py-2 text-xs text-slate-500 shadow">
                        {/* Put real temp if available */}
                        {Number.isNaN(Number(patientSummary.systolic)) ? "98.6°F" : "98.6°F"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-end gap-3 h-32">
                    {/* histogram visualization (uses the same small bars you had) */}
                    {[6, 10, 14, 12, 8, 16].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-md bg-linear-to-t from-teal-200 to-teal-400"
                        style={{ height: `${h * 5}px `}}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Report Chart */}
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Report</h3>
                <div className="text-xs text-slate-400">Overview • Goals • 2025</div>
              </div>
              <div className="w-full h-44">
                <canvas ref={chartRef} className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 lg:col-span-2 space-y-6">
            {/* Treatment Plan */}
            <div
              className="rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition"
              style={{ background: "linear-gradient(180deg,#0ea5a8,#059669)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs opacity-90">Treatment Plan</div>
                  <div className="text-4xl font-extrabold mt-4">{treatmentPlan.sessions}</div>
                  <div className="text-sm mt-1">{treatmentPlan.name}</div>
                </div>
                <div className="text-xs opacity-80">{treatmentPlan.cadence}</div>
              </div>

              <div className="mt-6 flex flex-col gap-2 items-end">
                <div className="w-full h-24 flex items-end gap-2">
                  {treatmentPlan.histogram.map((v, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-white/30"
                      style={{ height: `${v}%` }}
                    />
                  ))}
                </div>
                <div className="text-xs opacity-90">{treatmentPlan.weeks}</div>
              </div>
            </div>

            {/* Medicine Card */}
            <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-slate-800">Medicine</h4>
                <div className="text-xs text-slate-400">Next refill</div>
              </div>
              <div className="mt-3">
                <div className="text-sm font-medium text-slate-800">{medicine.name}</div>
                <div className="text-xs text-slate-500">{medicine.dose}</div>
                <div className="mt-4 text-xs text-slate-400">Refill in {medicine.refillInDays} days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}