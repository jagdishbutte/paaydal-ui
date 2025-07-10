"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
import { X, Eye } from "lucide-react";

interface BookingCardProps {
    booking: {
        _id: string;
        trekId: {
            _id: string;
            title: string;
            thumbnail: string;
            price: string;
            startDate: string;
        };
        amountPaid: number;
        paymentStatus: string;
        status: string;
        createdAt: string;
    };
    onCancel: (bookingId: string) => void;
}

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
    const router = useRouter();

    const handleCancelClick = () => {
        if (confirm("Are you sure you want to cancel this booking?")) {
            onCancel(booking._id);
        }
    };

    const handleViewDetails = () => {
        router.push(`/treks/${booking._id}`);
    };

    return (
        <div className="border rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition">
            <Image
                src={booking.trekId.thumbnail}
                alt={booking.trekId.title}
                width={600}
                height={300}
                className="w-full h-48 object-cover"
            />

            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-emerald-700">
                    {booking.trekId.title}
                </h3>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Trek Date:</span>{" "}
                    {new Date(booking.trekId.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Amount Paid:</span> ₹
                    {booking.amountPaid}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Payment:</span>{" "}
                    {booking.paymentStatus}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Status:</span>{" "}
                    {booking.status}
                </p>

                <div className="flex gap-3 pt-3">
                    <button
                        onClick={handleViewDetails}
                        className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-full text-sm font-medium transition"
                    >
                        <Eye className="w-4 h-4" />
                        View Details
                    </button>
                    <button
                        onClick={handleCancelClick}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                    >
                        <X className="w-4 h-4" />
                        Cancel Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
