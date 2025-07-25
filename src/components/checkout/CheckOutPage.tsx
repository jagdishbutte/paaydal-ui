"use client";
import { useState } from "react";

export default function CheckoutPage() {
    const basePrice = 1200;

    const [groupType, setGroupType] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [user, setUser] = useState({ name: "", email: "", phone: "" });
    const [isProcessing, setIsProcessing] = useState(false);

    const calculateTotal = () => {
        const total = adults * basePrice + children * basePrice * 0.6;
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
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
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

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Group Selection Card */}
                        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm animate-fade-in-up delay-300">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                Group Details
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Group Type
                                    </label>
                                    <select
                                        value={groupType}
                                        onChange={(e) =>
                                            setGroupType(e.target.value)
                                        }
                                        className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                    >
                                        <option value="">
                                            Select group type
                                        </option>
                                        <option value="Solo">
                                            Solo Explorer
                                        </option>
                                        <option value="Couple">
                                            Couple Adventure
                                        </option>
                                        <option value="Family">
                                            Family Trek
                                        </option>
                                        <option value="Friends">
                                            Friends Group
                                        </option>
                                    </select>
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
                                            className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
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
                                            className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Details Card */}
                        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm animate-fade-in-up delay-500">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                Personal Details
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={user.name}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your full name"
                                        className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="your.email@example.com"
                                        className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={user.phone}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                phone: e.target.value,
                                            })
                                        }
                                        placeholder="+91 9876543210"
                                        className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Coupon Card */}
                        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm animate-fade-in-up delay-700">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                Promo Code
                            </h3>

                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    placeholder="Enter coupon code"
                                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                />
                                <button
                                    onClick={handleCouponApply}
                                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-300"
                                >
                                    Apply
                                </button>
                            </div>

                            {discount > 0 && (
                                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                                    <p className="text-emerald-700 font-medium flex items-center gap-2">
                                        <svg
                                            className="w-4 h-4"
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
                                        Discount of ₹{discount} applied
                                        successfully!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Price Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm sticky top-6 animate-fade-in-up delay-500">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                Booking Summary
                            </h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">
                                        Base Price (per adult)
                                    </span>
                                    <span className="text-gray-900 font-semibold">
                                        ₹{basePrice}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">
                                        Adults × {adults}
                                    </span>
                                    <span className="text-gray-900">
                                        ₹{adults * basePrice}
                                    </span>
                                </div>

                                {children > 0 && (
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-gray-600">
                                            Children × {children}
                                        </span>
                                        <span className="text-gray-900">
                                            ₹{children * basePrice * 0.6}
                                        </span>
                                    </div>
                                )}

                                {discount > 0 && (
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-emerald-600">
                                            Discount
                                        </span>
                                        <span className="text-emerald-600">
                                            -₹{discount}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center py-3 border-t-2 border-gray-200">
                                    <span className="text-lg font-semibold text-gray-900">
                                        Total Amount
                                    </span>
                                    <span className="text-2xl font-bold text-emerald-600">
                                        ₹{calculateTotal()}
                                    </span>
                                </div>
                            </div>

                            {/* Trust indicators */}
                            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-4 h-4 text-emerald-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>Secure Payment</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mt-2">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-4 h-4 text-emerald-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                        <span>SSL Protected</span>
                                    </div>
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
