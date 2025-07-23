"use client";

import { getAllTreks } from "@/api/operations/trekAPIs";
import TrekCard from "./TrekCard";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";

type Trek = {
    _id: string;
    title: string;
    thumbnail: string;
    price: string;
    startDate: string;
    endDate: string;
    difficulty: string;
    thisTrekIs: string;
};

export default function TreksPage() {
    const token = useAuthStore((state) => state.user?.token);
    const [upcomingTreks, setUpcomingTreks] = useState<Trek[]>([]);
    const [recentTreks, setRecentTreks] = useState<Trek[]>([]);
    const [popularTreks, setPopularTreks] = useState<Trek[]>([]);

    useEffect(() => {
        if (!token) return;
        const fetchTreks = async () => {
            if (!token) {
                console.error("No authentication token found.");
                return;
            }
            try {
                const response = await getAllTreks(token);

                const allTreks = response.data || [];

                setUpcomingTreks(
                    allTreks.filter(
                        (t: { thisTrekIs: string }) =>
                            t.thisTrekIs === "upcoming"
                    )
                );
                setRecentTreks(
                    allTreks.filter(
                        (t: { thisTrekIs: string }) => t.thisTrekIs === "recent"
                    )
                );
                setPopularTreks(
                    allTreks.filter(
                        (t: { thisTrekIs: string }) =>
                            t.thisTrekIs === "popular"
                    )
                );
            } catch (error) {
                console.error("Error fetching treks:", error);
            }
        };

        fetchTreks();
    }, [token]);

    return (
        <div className="bg-white">
            {/* Upcoming Treks */}
            <section className="bg-white py-8 sm:py-12 lg:py-16">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 sm:mb-10 lg:mb-12">
                        <h2 className="text-2xl sm:text-xl lg:text-2xl xl:text-4xl font-bold text-emerald-700 text-center sm:text-left leading-tight">
                            Upcoming Treks
                        </h2>
                    </div>

                    {/* Content */}
                    {upcomingTreks.length === 0 ? (
                        <div className="text-center py-12 sm:py-16 lg:py-20">
                            <div className="text-stone-500 text-base sm:text-lg lg:text-xl">
                                No upcoming treks at the moment.
                            </div>
                            <p className="text-stone-400 text-sm sm:text-base mt-2">
                                Check back soon for new adventures!
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {upcomingTreks.map((trek) => (
                                <TrekCard key={trek._id} {...trek} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Recent Treks */}
            <section className="bg-white py-8 sm:py-12 lg:py-16">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 sm:mb-10 lg:mb-12">
                        <h2 className="text-2xl sm:text-xl lg:text-2xl xl:text-4xl font-bold text-emerald-700 text-center sm:text-left leading-tight">
                            Recent Treks
                        </h2>
                    </div>

                    {/* Content */}
                    {recentTreks.length === 0 ? (
                        <div className="text-center py-12 sm:py-16 lg:py-20">
                            <div className="text-stone-500 text-base sm:text-lg lg:text-xl">
                                No recent treks at the moment.
                            </div>
                            <p className="text-stone-400 text-sm sm:text-base mt-2">
                                Check back soon for new adventures!
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {recentTreks.map((trek) => (
                                <TrekCard key={trek._id} {...trek} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Popular Treks */}
            <section className="bg-white py-8 sm:py-12 lg:py-16">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 sm:mb-10 lg:mb-12">
                        <h2 className="text-2xl sm:text-xl lg:text-2xl xl:text-4xl font-bold text-emerald-700 text-center sm:text-left leading-tight">
                            Popular Treks
                        </h2>
                    </div>

                    {/* Content */}
                    {popularTreks.length === 0 ? (
                        <div className="text-center py-12 sm:py-16 lg:py-20">
                            <div className="text-stone-500 text-base sm:text-lg lg:text-xl">
                                No popular treks at the moment.
                            </div>
                            <p className="text-stone-400 text-sm sm:text-base mt-2">
                                Check back soon for new adventures!
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {popularTreks.map((trek) => (
                                <TrekCard key={trek._id} {...trek} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
