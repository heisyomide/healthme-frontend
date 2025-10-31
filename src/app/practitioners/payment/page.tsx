"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  popular?: boolean;
}

export default function PaymentConfirmationPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem("selectedPlan");
    if (savedPlan) {
      setSelectedPlan(JSON.parse(savedPlan));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-md border border-gray-200 text-center"
      >
        <FaCheckCircle className="text-teal-600 text-6xl mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-teal-700 mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-600 mb-6">
          Your subscription has been activated successfully.
        </p>

        {selectedPlan && (
          <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-sm text-gray-700">
            <p>
              <strong>Plan:</strong> {selectedPlan.name}
            </p>
            <p>
              <strong>Price:</strong> ₦{selectedPlan.price.toLocaleString()}{" "}
              ({selectedPlan.duration})
            </p>
            <p>
              <strong>Description:</strong> {selectedPlan.description}
            </p>
          </div>
        )}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-block w-full"
        >
          <Link
            href="/kyc"
            className="block w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-full transition"
          >
            Proceed to KYC
          </Link>
        </motion.div>

        <p className="text-gray-500 text-sm mt-6">
          Need help?{" "}
          <Link href="/support" className="text-teal-600 hover:underline">
            Contact support
          </Link>
        </p>
      </motion.div>
    </div>
  );
}