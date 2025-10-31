"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaMoneyBillWave } from "react-icons/fa";

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"unpaid" | "pending" | "approved">("unpaid");

  // Load the selected plan from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem("selectedPlan");
    if (savedPlan) setSelectedPlan(JSON.parse(savedPlan));

    // Simulate checking payment status from backend
    const storedStatus = localStorage.getItem("paymentStatus");
    if (storedStatus === "pending" || storedStatus === "approved") {
      setPaymentStatus(storedStatus as any);
    }
  }, []);

  // Called when practitioner clicks "I Have Paid"
  const handlePaymentConfirm = async () => {
    // Save payment record as pending (in real app: send to backend)
    localStorage.setItem("paymentStatus", "pending");
    setPaymentStatus("pending");

    // Here we simulate waiting for admin to approve
    // Later, you'll replace this with a real API that polls backend
  };

  // Simulate admin approval check every few seconds
  useEffect(() => {
    if (paymentStatus === "pending") {
      const interval = setInterval(() => {
        const status = localStorage.getItem("paymentStatus");
        if (status === "approved") {
          clearInterval(interval);
          window.location.href = "/practitioner/payment-confirmation";
        }
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [paymentStatus]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-md border border-gray-200 text-center"
      >
        <FaMoneyBillWave className="text-teal-600 text-6xl mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Complete Your Payment
        </h1>
        <p className="text-gray-600 mb-6">
          Please make your payment to the company account below. Once the admin confirms your payment, you can proceed to KYC.
        </p>

        {selectedPlan ? (
          <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-sm text-gray-700 text-left">
            <p><strong>Selected Plan:</strong> {selectedPlan.name}</p>
            <p><strong>Amount:</strong> ₦{selectedPlan.price.toLocaleString()}</p>
            <p><strong>Duration:</strong> {selectedPlan.duration}</p>
          </div>
        ) : (
          <p className="text-red-500 mb-6">No plan selected.</p>
        )}

        <div className="bg-gray-100 border rounded-lg p-4 mb-6 text-left">
          <p className="font-semibold text-gray-800">Company Account Details:</p>
          <p>🏦 <strong>Bank:</strong> Zenith Bank</p>
          <p>💳 <strong>Account Number:</strong> 1234567890</p>
          <p>👤 <strong>Account Name:</strong> HealthMe Technologies Ltd.</p>
        </div>

        {paymentStatus === "unpaid" && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePaymentConfirm}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-full transition"
          >
            I Have Paid
          </motion.button>
        )}

        {paymentStatus === "pending" && (
          <div className="text-teal-600 font-semibold flex flex-col items-center">
            <div className="animate-spin h-6 w-6 border-4 border-teal-600 border-t-transparent rounded-full mb-2"></div>
            Waiting for payment confirmation...
          </div>
        )}

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