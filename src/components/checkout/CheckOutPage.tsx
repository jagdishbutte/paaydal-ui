/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Trek } from "@/lib/dummyTreks";
import { getTrekById } from "@/api/operations/trekAPIs";
import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import toast from "react-hot-toast";
import { createOrder, verifyPayment } from "@/api/operations/paymentsAPIs";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Extend Window interface to include Razorpay
declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage({ trekId }: { trekId: string }) {
    const [trekDetails, setTrekDetails] = useState<Trek | null>(null);
    const [groupType, setGroupType] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    // Get user and token from auth store
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.user?.token);
    const router = useRouter();

    const handleBackClick = () => {
        setShowCancelModal(true);
    };

    const handleConfirmLeave = () => {
        setShowCancelModal(false);
        router.back();
    };

    const handleStayOnPage = () => {
        setShowCancelModal(false);
    };

    const handleSuccessRedirect = () => {
        setShowSuccessModal(true);
    };

    const handleRetryPayment = () => {
        setShowErrorModal(true);
        handlePayment();
    };

    useEffect(() => {
        if (!trekId || !token) {
            setIsLoading(false);
            setError("Missing trek ID or authentication token");
            return;
        }

        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await getTrekById(token, trekId);
                setTrekDetails(res.data);
            } catch (err) {
                console.error("Error fetching trek:", err);
                setError("Failed to load trek details. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [trekId, token]);

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
            console.log("Razorpay script loaded successfully");
        };
        script.onerror = () => {
            console.error("Failed to load Razorpay script");
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup script on unmount
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading trek details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !trekDetails) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">
                        {error || "Trek not found"}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const calculateTotal = () => {
        const adultCost = adults * Number(trekDetails.price);
        const childCost = children * Number(trekDetails.price) * 0.6;
        const subtotal = adultCost + childCost;
        return Number(Math.max(0, subtotal - discount));
    };

    const handleCouponApply = () => {
        const upperCaseCoupon = coupon.trim().toUpperCase();
        if (upperCaseCoupon === "PAAYDAL100") {
            setDiscount(100);
        } else if (upperCaseCoupon === "") {
            setDiscount(0);
        } else {
            // Invalid coupon
            setDiscount(0);
            alert("Invalid coupon code");
        }
    };

    const handlePayment = async () => {
        // Validation checks
        if (!token) {
            toast.error("You must be logged in to proceed");
            return;
        }

        if (!user) {
            toast.error("Please log in to continue");
            return;
        }

        if (!groupType) {
            toast.error("Please select a group type");
            return;
        }

        if (adults < 1) {
            toast.error("At least one adult is required");
            return;
        }

        const totalAmount = calculateTotal();
        if (totalAmount <= 0) {
            toast.error("Invalid total amount");
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Create order on backend using API operator
            const response = await createOrder(token, totalAmount);

            // Check if response exists and has the expected structure
            if (!response || !response.data) {
                throw new Error(
                    "Order creation failed: Invalid response from server"
                );
            }

            const data = response.data;
            if (!data.id) {
                throw new Error(
                    "Order creation failed: " +
                        (data.message || "Missing order ID")
                );
            }

            // 2. Check if Razorpay is loaded
            if (typeof window.Razorpay === "undefined") {
                throw new Error(
                    "Razorpay SDK not loaded. Please refresh and try again."
                );
            }

            // 3. Validate Razorpay Key ID
            const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
            console.log("Razorpay Key ID:", razorpayKeyId); // Remove this after debugging

            if (!razorpayKeyId || razorpayKeyId === "your_razorpay_key_id") {
                throw new Error("Razorpay Key ID is not configured properly");
            }

            // 4. Open Razorpay checkout
            const options = {
                key: razorpayKeyId,
                amount: data.amount,
                currency: data.currency || "INR",
                name: "Foxtrail India Adventures",
                description: `Trek Booking - ${trekDetails.title}`,
                order_id: data.id,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await verifyPayment(
                            token,
                            response.razorpay_payment_id,
                            response.razorpay_order_id,
                            response.razorpay_signature
                        );

                        console.log("Verification response:", verifyRes);

                        // Check if verification response exists and has expected structure
                        if (!verifyRes || !verifyRes.data) {
                            throw new Error(
                                "Verification request failed: Invalid response"
                            );
                        }

                        const verifyData = verifyRes.data;
                        if (verifyData.status === "success") {
                            handleSuccessRedirect();
                        } else {
                            handleRetryPayment();
                        }
                    } catch (verifyError) {
                        console.error("Verification error:", verifyError);
                        alert(
                            "Payment completed but verification failed. Please contact support."
                        );
                    }
                },
                prefill: {
                    name: user?.name || "",
                    email: user?.email || "",
                },
                theme: {
                    color: "#10b981", // emerald-500
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on("payment.failed", function (response: any) {
                console.error("Payment failed:", response.error);
                alert(
                    `Payment failed: ${
                        response.error.description || "Unknown error"
                    }`
                );
                setIsProcessing(false);
            });

            razorpay.open();
        } catch (error) {
            console.error("Payment Error:", error);
            alert(
                `Payment failed: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            setIsProcessing(false);
        }
    };

    const totalAmount = calculateTotal();

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="relative text-center mb-8 animate-fade-in-up">
                    {/* Back Button - Positioned absolutely to the left */}
                    <button
                        className="group absolute left-0 top-0 flex items-center justify-center w-12 h-12 bg-white/90 hover:bg-white text-emerald-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm border border-emerald-200"
                        onClick={handleBackClick}
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    </button>

                    {/* Header Content - Centered */}
                    <div>
                        <span className="text-sm font-medium tracking-widest text-emerald-600 uppercase mb-2 block">
                            Complete Your Adventure
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Trek Checkout
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Secure your spot on this incredible journey
                        </p>
                    </div>
                </div>

                {/* Main Container with proper box layout */}
                <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up delay-300">
                    <div className="grid lg:grid-cols-3 gap-8 h-full">
                        {/* Left Column - Trek Details and Group Selection */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Trek Details Card */}
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-fit">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    Trek Details
                                </h3>

                                <div className="flex items-start gap-4 mb-4">
                                    <Image
                                        src={trekDetails.imageUrls[0]}
                                        alt={trekDetails.title}
                                        width={96}
                                        height={96}
                                        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                            {trekDetails.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                            {trekDetails.description}
                                        </p>
                                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                            {trekDetails.difficulty}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="bg-green-100 text-green-800 px-3 py-1 text-sm font-medium rounded-full">
                                        {new Date(
                                            trekDetails.startDate
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}{" "}
                                        to{" "}
                                        {new Date(
                                            trekDetails.endDate
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                    <span className="text-gray-600 font-medium">
                                        Price per adult:
                                    </span>
                                    <span className="text-xl font-bold text-emerald-600">
                                        ₹
                                        {Number(
                                            trekDetails.price
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Group Selection Card */}
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-fit">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    Group Details
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Group Type *
                                        </label>
                                        <Select
                                            value={groupType}
                                            onValueChange={setGroupType}
                                        >
                                            <SelectTrigger className="w-full border-2 border-gray-300 bg-white rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300">
                                                <SelectValue placeholder="Select group type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border text-gray-800 border-gray-200 rounded-lg shadow-lg">
                                                <SelectItem
                                                    value="Solo"
                                                    className="bg-white hover:bg-gray-50"
                                                >
                                                    Solo Explorer
                                                </SelectItem>
                                                <SelectItem
                                                    value="Couple"
                                                    className="bg-white hover:bg-gray-50"
                                                >
                                                    Couple Adventure
                                                </SelectItem>
                                                <SelectItem
                                                    value="Family"
                                                    className="bg-white hover:bg-gray-50"
                                                >
                                                    Family Trek
                                                </SelectItem>
                                                <SelectItem
                                                    value="Friends"
                                                    className="bg-white hover:bg-gray-50"
                                                >
                                                    Friends Group
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Adults *
                                            </label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={20}
                                                value={adults}
                                                onChange={(e) => {
                                                    const value = Math.max(
                                                        1,
                                                        parseInt(
                                                            e.target.value
                                                        ) || 1
                                                    );
                                                    setAdults(value);
                                                }}
                                                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Children
                                            </label>
                                            <input
                                                type="number"
                                                min={0}
                                                max={20}
                                                value={children}
                                                onChange={(e) => {
                                                    const value = Math.max(
                                                        0,
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    );
                                                    setChildren(value);
                                                }}
                                                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    {children > 0 && (
                                        <p className="text-sm text-gray-500">
                                            * Children receive 40% discount
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Promo Code and Price Summary */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Coupon Card */}
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-fit">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    Promo Code
                                </h3>

                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={coupon}
                                        onChange={(e) =>
                                            setCoupon(e.target.value)
                                        }
                                        placeholder="Enter coupon code"
                                        className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                    />
                                    <button
                                        onClick={handleCouponApply}
                                        className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-300"
                                        type="button"
                                    >
                                        Apply Code
                                    </button>
                                </div>

                                {discount > 0 && (
                                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                                        <p className="text-emerald-700 font-medium flex items-center gap-2 text-sm">
                                            <svg
                                                className="w-4 h-4 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            Discount of ₹{discount} applied!
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Price Summary Card */}
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sticky top-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    Booking Summary
                                </h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-gray-600 text-sm">
                                            Base Price (per adult)
                                        </span>
                                        <span className="text-gray-900 font-semibold">
                                            ₹
                                            {Number(
                                                trekDetails.price
                                            ).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-gray-600 text-sm">
                                            Adults × {adults}
                                        </span>
                                        <span className="text-gray-900">
                                            ₹
                                            {(
                                                adults *
                                                Number(trekDetails.price)
                                            ).toLocaleString()}
                                        </span>
                                    </div>

                                    {children > 0 && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-600 text-sm">
                                                Children × {children} (40% off)
                                            </span>
                                            <span className="text-gray-900">
                                                ₹
                                                {(
                                                    children *
                                                    Number(trekDetails.price) *
                                                    0.6
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    )}

                                    {discount > 0 && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-emerald-600 text-sm">
                                                Discount Applied
                                            </span>
                                            <span className="text-emerald-600 font-medium">
                                                -₹{discount.toLocaleString()}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-4">
                                        <span className="text-lg font-semibold text-gray-900">
                                            Total Amount
                                        </span>
                                        <span className="text-2xl font-bold text-emerald-600">
                                            ₹{totalAmount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={
                                        isProcessing ||
                                        !groupType ||
                                        totalAmount <= 0
                                    }
                                    className="group relative w-full px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {isProcessing ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Proceed to Pay ₹
                                                {totalAmount.toLocaleString()}
                                                <svg
                                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                    />
                                                </svg>
                                            </>
                                        )}
                                    </span>
                                </button>

                                {!groupType && (
                                    <p className="text-red-500 text-sm mt-2 text-center">
                                        Please select a group type
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-emerald-500 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform animate-fade-in-up shadow-2xl">
                        <div className="text-center">
                            {/* Success Icon */}
                            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                                <svg
                                    className="w-8 h-8 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            {/* Success Message */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Payment Successful!
                            </h3>
                            <p className="text-gray-600 mb-2">
                                Your booking has been confirmed successfully.
                            </p>
                            <p className="text-sm text-gray-500 mb-6">
                                Booking ID:{" "}
                                <span className="font-semibold text-emerald-600">
                                    {/* {bookingId} */}
                                </span>
                            </p>

                            {/* Trek Summary */}
                            <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
                                <div className="flex items-center gap-3 mb-3">
                                    <Image
                                        src={trekDetails.imageUrls[0]}
                                        alt={trekDetails.title}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">
                                            {trekDetails.title}
                                        </h4>
                                        <p className="text-xs text-gray-600">
                                            {adults} Adult
                                            {adults > 1 ? "s" : ""}
                                            {children > 0
                                                ? `, ${children} Child${
                                                      children > 1 ? "ren" : ""
                                                  }`
                                                : ""}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Total Paid:
                                    </span>
                                    <span className="font-bold text-emerald-600">
                                        ₹{calculateTotal()}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={() => {
                                        router.push(`/my-bookings`);
                                    }}
                                    className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    View Booking Details
                                </button>
                                <button
                                    onClick={() => {
                                        router.push(`/treks`);
                                    }}
                                    className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                                >
                                    Continue Browsing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Modal */}
            {showErrorModal && (
                <div className="fixed inset-0 bg-emerald-500 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform animate-fade-in-up shadow-2xl">
                        <div className="text-center">
                            {/* Error Icon */}
                            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                                <svg
                                    className="w-8 h-8 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>

                            {/* Error Message */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Payment Failed
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Payment verification failed. Please try again or
                                contact our support team for assistance.
                            </p>

                            {/* Support Info */}
                            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                                <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                    Need Help?
                                </h4>
                                <div className="space-y-2 text-xs text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        <span>Call: +91-1234567890</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span>Email: support@trekking.com</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleRetryPayment}
                                    className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    Retry Payment
                                </button>
                                <button
                                    onClick={() => setShowErrorModal(false)}
                                    className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform animate-fade-in-up shadow-2xl">
                        <div className="text-center">
                            {/* Warning Icon */}
                            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                                <svg
                                    className="w-8 h-8 text-amber-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>

                            {/* Warning Message */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Leave Checkout?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to leave? Your booking
                                progress will be lost and you&apos;ll need to
                                start over.
                            </p>

                            {/* Reminder Box */}
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <svg
                                        className="w-4 h-4 text-emerald-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <h4 className="font-semibold text-emerald-800 text-sm">
                                        Don&apos;t miss out!
                                    </h4>
                                </div>
                                <p className="text-xs text-emerald-700">
                                    Complete your booking now to secure your
                                    spot on this amazing trek adventure.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleStayOnPage}
                                    className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    Continue Booking
                                </button>
                                <button
                                    onClick={handleConfirmLeave}
                                    className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                                >
                                    Leave Anyway
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                .delay-300 {
                    animation-delay: 0.3s;
                }

                .delay-500 {
                    animation-delay: 0.5s;
                }

                .delay-700 {
                    animation-delay: 0.7s;
                }
            `}</style>
        </div>
    );
}
