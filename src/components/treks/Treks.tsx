"use client";

import TrekCard from "./TrekCard";
import { dummyTreks, Trek } from "../../lib/dummyTreks";



export default function TreksPage() {
    const upcomingTreks = dummyTreks.upcomingTreks;
    const recentTreks = dummyTreks.recentTreks;
    const popularTreks = dummyTreks.popularTreks;
    return (
        <div className="px-4 md:px-16 py-10 space-y-12">
            {/* Upcoming Treks */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-green-700">
                    Upcoming Treks
                </h2>
                <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
                    {upcomingTreks.map((trek: Trek) => (
                        <TrekCard key={trek.id} {...trek} />
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
                        <TrekCard key={trek.id} {...trek} />
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
                        <TrekCard key={trek.id} {...trek} />
                    ))}
                </div>
            </section>
        </div>
    );
}
