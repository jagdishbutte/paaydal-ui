"use client";

import { getAllTreks } from "@/api/operations/trekAPIs";
import TrekCard from "./TrekCard";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { Trek } from "@/lib/dummyTreks";

export default function TreksPage() {
    const token = useAuthStore((state) => state.user?.token);
    const [upcomingTreks, setUpcomingTreks] = useState([]);
    const [recentTreks, setRecentTreks] = useState([]);
    const [popularTreks, setPopularTreks] = useState([]);
    
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

                setUpcomingTreks(allTreks.filter(
                    (t: { thisTrekIs: string; }) => t.thisTrekIs === "upcoming"
                ));
                setRecentTreks(allTreks.filter(
                    (t: { thisTrekIs: string; }) => t.thisTrekIs === "recent"
                ));
                setPopularTreks(allTreks.filter(
                    (t: { thisTrekIs: string; }) => t.thisTrekIs === "popular"
                ));

            } catch (error) {
                console.error("Error fetching treks:", error);
            }
        };

        fetchTreks();
    }, [token]);

    return (
        <div className="px-4 md:px-16 py-10 space-y-12">
            {/* Upcoming Treks */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-green-700">
                    Upcoming Treks
                </h2>
                <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
                    {upcomingTreks.map((trek: Trek) => (
                        <TrekCard key={trek._id} {...trek} />
                    ))}
                </div>
            </section>

            {/* Recent Treks */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-green-700">
                    Recent Treks
                </h2>
                <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
                    {recentTreks.map((trek: Trek) => (
                        <TrekCard key={trek._id} {...trek} />
                    ))}
                </div>
            </section>

            {/* Popular Treks */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-green-700">
                    Popular Treks
                </h2>
                <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
                    {popularTreks.map((trek: Trek) => (
                        <TrekCard key={trek._id} {...trek} />
                    ))}
                </div>
            </section>
        </div>
    );
}
