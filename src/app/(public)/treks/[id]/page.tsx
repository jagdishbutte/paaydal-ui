import TrekDetails from "@/components/treks/TrekDetails";
import { notFound } from "next/navigation";
import { dummyTreks } from "@/lib/dummyTreks";

export default async function TrekDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    // Combine all treks into one array
    const allTreks = [
        ...dummyTreks.upcomingTreks,
        ...dummyTreks.recentTreks,
        ...dummyTreks.popularTreks,
    ];

    const trek = allTreks.find((t) => String(t.id) === id)!;

    if (!trek) return notFound();

    return (
        <main className="min-h-screen bg-white">
            <TrekDetails trek={trek} />
        </main>
    );
}
