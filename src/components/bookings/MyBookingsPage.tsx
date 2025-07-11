"use client";

import { useEffect, useState } from "react";
import BookingCard from "@/components/bookings/BookingCard";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "react-hot-toast";
import { getUserBookings } from "@/api/operations/bookingAPIs";

interface Booking {
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
}

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const token = useAuthStore((state) => state.user?.token);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!token) {
                toast.error("You need to be logged in to view bookings");
            }
            try {
                const res = await getUserBookings(token || "");
                setBookings(res.data.bookings || []);
            } catch (err) {
                toast.error("Failed to fetch bookings");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [token]);

    const handleCancelBooking = async (bookingId: string) => {
        try {
            // const response = await cancelUserBooking(
            // );
            toast.success("Booking cancelled successfully");
            setBookings((prev) =>
                prev.filter((booking) => booking._id !== bookingId)
            );
        } catch (err) {
            toast.error("Cancellation failed");
            console.error(err);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 py-8 px-4 md:px-44">
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-6">
                My Bookings
            </h1>

            {loading ? (
                <p className="text-gray-600 text-sm">Loading bookings...</p>
            ) : bookings.length === 0 ? (
                <p className="text-gray-600 text-sm">No bookings found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {bookings.map((booking) => (
                        <BookingCard
                            key={booking._id}
                            booking={booking}
                            onCancel={handleCancelBooking}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
