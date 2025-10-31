"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

// ✅ Define a proper type for the plan
interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  popular?: boolean;
}

export default function PractitionerTermsPage() {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null); // ✅ typed correctly

  const plans: Plan[] = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 10000,
      duration: "per month",
      description: "Ideal for beginners and limited bookings.",
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: 20000,
      duration: "per month",
      description: "Unlimited bookings and top visibility.",
      popular: true,
    },
    {
      id: "annual",
      name: "Annual Plan",
      price: 100000,
      duration: "per year",
      description: "Save ₦20,000 yearly with unlimited access.",
    },
  ];

  const handlePayment = async () => {
    if (!agreed) {
      alert("Please agree to the terms and conditions before proceeding.");
      return;
    }
    if (!selectedPlan) {
      alert("Please select a subscription plan before proceeding.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));

      localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));

      window.location.href = "/practitioners/checkout";
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8 border border-gray-200"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center text-teal-700 mb-4">
          Practitioner Terms & Subscription
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please review the following information carefully before continuing
          your registration as a HealthMe Practitioner.
        </p>

        <div className="h-60 overflow-y-auto p-4 border rounded-lg bg-gray-50 mb-6 text-sm text-gray-700 leading-relaxed">
          <p>
            Welcome to <strong>HealthMe</strong>. As a registered practitioner on
            our platform, you agree to maintain professional and ethical
            standards while delivering care services to patients.
          </p>
          <br />
          <ul className="list-disc pl-5 space-y-2">
            <li>You must complete full KYC verification before offering any service.</li>
            <li>HealthMe connects you with patients but does not dictate your pricing.</li>
            <li>Respect patient privacy and uphold professional ethics.</li>
            <li>Maintain an active subscription to stay visible to patients.</li>
            <li>
              HealthMe may suspend accounts violating our code of conduct or submitting false data.
            </li>
          </ul>
          <br />
          <p>
            By subscribing below, you acknowledge that you have read, understood
            and agree to the above terms.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
          />
          <label htmlFor="agree" className="text-gray-700">
            I have read and agree to the Terms & Conditions
          </label>
        </div>

        <h2 className="text-xl font-semibold text-teal-700 mb-4 text-center">
          Choose Your Subscription Plan
        </h2>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedPlan(plan)}
              className={`cursor-pointer border rounded-xl p-5 transition relative ${
                selectedPlan?.id === plan.id
                  ? "border-teal-600 bg-teal-50 shadow-md"
                  : "border-teal-200 bg-white hover:shadow-sm"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-2 right-2 text-xs bg-teal-600 text-white px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
              <h3 className="font-bold text-teal-700 text-lg mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{plan.description}</p>
              <p className="text-2xl font-bold text-teal-700 mb-1">
                ₦{plan.price.toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm">{plan.duration}</p>

              {selectedPlan?.id === plan.id && (
                <div className="flex items-center gap-1 mt-3 text-teal-600 text-sm font-semibold">
                  <FaCheckCircle />
                  Selected
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            disabled={!agreed || !selectedPlan || loading}
            onClick={handlePayment}
            className={`px-8 py-3 rounded-full text-white font-semibold transition ${
              agreed && selectedPlan
                ? "bg-teal-600 hover:bg-teal-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading
              ? "Processing..."
              : selectedPlan
              ? `Proceed to Pay ₦${selectedPlan.price.toLocaleString()}`
              : "Select a Plan to Continue"}
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-600 hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}