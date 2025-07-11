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
    const token = useAuthStore((state) => state.user?.token);

    const handleConfirmBooking = async () => {
        if (!token) {
            toast.error("Please sign in to book.");
            return;
        }

        try {
            const response = await userTrekBooking(
                token,
                _id,
                parseInt(price),
                
            );
            console.log("Booking response:", response);
            toast.success("Booking successful!");
            setShowModal(false);
            router.push("/my-bookings"); // if this route exists
        } catch (err) {
            console.error("Booking error:", err);
            toast.error("Booking failed. Try again later.");
        }
    };


    return (
        <div className="w-96 h-60 min-w-[24rem] rounded-lg overflow-hidden shadow-md relative">
            <Image
                src={thumbnail}
                alt={title}
                width={300}
                height={200}
                className="w-full h-full object-cover"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-black/30 bg-opacity-10 text-white flex flex-col justify-end p-4 space-y-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-xs text-stone-600 bg-gray-300 rounded-full px-2 py-1 inline-block w-fit">
                    Difficulty: {difficulty}
                </p>

                <div className="text-sm">{formattedDate}</div>
                <div className="text-sm font-bold">₹{price}</div>
                <div className="flex sm:flex-row sm:items-center justify-between mt-2">
                    <Link
                        href={`/treks/${_id}`}
                        onClick={() => {
                            console.log("Navigating to trek details:", _id);
                        }}
                        className="mt-2 self-start px-3 py-1 text-sm bg-white text-green-700 font-semibold rounded hover:bg-green-100 transition"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-full"
                    >
                        Book Now
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm text-center shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">
                            Confirm Booking
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to book this trek for ₹{price}
                            ?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleConfirmBooking}
                                className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-500"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded-full hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
