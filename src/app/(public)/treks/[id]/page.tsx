import TrekDetails from "@/components/treks/TrekDetails";
import { notFound } from "next/navigation";
import { dummyTreks } from "@/lib/dummyTreks";

export default function TrekDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    // Combine all treks into one array
    const allTreks = [
        ...dummyTreks.upcomingTreks,
        ...dummyTreks.recentTreks,
        ...dummyTreks.popularTreks,
    ];

    const trek = allTreks.find((t) => String(t.id) === params.id)!;

    if (!trek) return notFound();

    return (
        <main className="min-h-screen bg-white">
            <TrekDetails trek={trek} />
        </main>
    );
}
