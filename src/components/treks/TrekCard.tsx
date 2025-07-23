"use client";

import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";
import { userTrekBooking } from "@/api/operations/bookingAPIs";
import { useRouter } from "next/navigation";

type TrekCardProps = {
    _id: string;
    title: string;
    thumbnail: string;
    price: string;
    startDate: string;
    endDate: string;
    difficulty: string;
};

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case "easy":
            return "from-green-400 to-emerald-500";
        case "moderate":
            return "from-yellow-400 to-orange-500";
        case "hard":
        case "difficult":
            return "from-red-400 to-red-600";
        default:
            return "from-emerald-400 to-teal-500";
    }
};

const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case "easy":
            return (
                <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                    />
                </svg>
            );
        case "moderate":
            return (
                <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            );
        default:
            return (
                <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            );
    }
};

export default function TrekCard({
    _id,
    title,
    thumbnail,
    price,
    startDate,
    endDate,
    difficulty,
}: TrekCardProps) {
    const formattedDate = `${format(new Date(startDate), "dd MMM")} - ${format(
        new Date(endDate),
        "dd MMM yyyy"
    )}`;
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const token = useAuthStore((state) => state.user?.token);

    const handleConfirmBooking = async () => {
        if (!token) {
            toast.error("Please sign in to book.");
            return;
        }

        setIsBooking(true);
        try {
            const response = await userTrekBooking(token, _id, parseInt(price));
            console.log("Booking response:", response);
            toast.success("Booking successful!");
            setShowModal(false);
            router.push("/my-bookings"); // if this route exists
        } catch (err) {
            console.error("Booking error:", err);
            toast.error("Booking failed. Try again later.");
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <>
            <div className="group relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
                {/* Image Container */}
                <div className="relative h-full overflow-hidden">
                    <Image
                        src={thumbnail}
                        alt={title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300" />

                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getDifficultyColor(
                            difficulty
                        )} shadow-lg backdrop-blur-sm border border-white/20`}
                    >
                        {getDifficultyIcon(difficulty)}
                        <span className="capitalize">{difficulty}</span>
                    </div>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                        ₹{parseInt(price).toLocaleString()}
                    </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-20">
                    <div className="space-y-3">
                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold line-clamp-2 leading-tight group-hover:text-emerald-300 transition-colors duration-300">
                            {title}
                        </h3>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm text-white/90">
                            <svg
                                className="w-4 h-4 text-emerald-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="font-medium">{formattedDate}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <Link
                                href={`/treks/${_id}`}
                                className="group/btn flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/90 hover:bg-white text-emerald-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
                            >
                                <span className="text-sm">View Details</span>
                                <svg
                                    className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </Link>

                            <button
                                onClick={() => setShowModal(true)}
                                className="group/btn flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <span className="text-sm">Book</span>
                                <svg
                                    className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300"
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
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400/50 transition-all duration-300" />
            </div>

            {/* Enhanced Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center shadow-2xl transform animate-scale-in border border-gray-100">
                        {/* Modal Header */}
                        <div className="mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
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
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Confirm Booking
                            </h3>
                            <p className="text-gray-600">
                                You&apos;re about to book an amazing adventure!
                            </p>
                        </div>

                        {/* Trek Details */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 mb-6 border border-emerald-100">
                            <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                {title}
                            </h4>
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                                <span>{formattedDate}</span>
                                <span className="capitalize px-2 py-1 bg-white rounded-full text-xs font-medium">
                                    {difficulty}
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-emerald-700">
                                ₹{parseInt(price).toLocaleString()}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                disabled={isBooking}
                                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmBooking}
                                disabled={isBooking}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                            >
                                {isBooking ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Booking...</span>
                                    </>
                                ) : (
                                    <>
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
                                        <span>Confirm</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
        </>
    );
}
