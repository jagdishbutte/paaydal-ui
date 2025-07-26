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

export default function CheckoutPage({ trekId }: { trekId: string }) {
    const [trekDetails, setTrekDetails] = useState<Trek | null>(null);
    const [groupType, setGroupType] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const token = useAuthStore((state) => state.user?.token);

    useEffect(() => {
        if (!trekId || !token) return;

        const fetchData = async () => {
            try {
                const res = await getTrekById(token, trekId);
                setTrekDetails(res.data);
            } catch (err) {
                console.error("Error fetching trek:", err);
            }
        };

        fetchData();
    }, [trekId, token]);

    if (!trekDetails) return <p>Loading...</p>;

    const calculateTotal = () => {
        const total =
            adults * Number(trekDetails.price) +
            children * Number(trekDetails.price) * 0.6;
        return total - discount;
    };

    const handleCouponApply = () => {
        if (coupon === "PAAYDAL100") setDiscount(100);
        else setDiscount(0);
    };

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => setIsProcessing(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in-up">
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
                                        {"to"}{" "}
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
                                        ₹{trekDetails.price}
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
                                            Group Type
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
                                                Adults
                                            </label>
                                            <input
                                                type="number"
                                                min={1}
                                                value={adults}
                                                onChange={(e) =>
                                                    setAdults(+e.target.value)
                                                }
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
                                                value={children}
                                                onChange={(e) =>
                                                    setChildren(+e.target.value)
                                                }
                                                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
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
                                            ₹{trekDetails.price}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-gray-600 text-sm">
                                            Adults × {adults}
                                        </span>
                                        <span className="text-gray-900">
                                            ₹
                                            {adults * Number(trekDetails.price)}
                                        </span>
                                    </div>

                                    {children > 0 && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-600 text-sm">
                                                Children × {children} (40% off)
                                            </span>
                                            <span className="text-gray-900">
                                                ₹
                                                {children *
                                                    Number(trekDetails.price) *
                                                    0.6}
                                            </span>
                                        </div>
                                    )}

                                    {discount > 0 && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-emerald-600 text-sm">
                                                Discount Applied
                                            </span>
                                            <span className="text-emerald-600 font-medium">
                                                -₹{discount}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-4">
                                        <span className="text-lg font-semibold text-gray-900">
                                            Total Amount
                                        </span>
                                        <span className="text-2xl font-bold text-emerald-600">
                                            ₹{calculateTotal()}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="group relative w-full px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                                Proceed to Pay
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
