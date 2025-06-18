import { dummyLeaders } from "../../lib/dummyLeaders";
import LeaderCard from "./LeaderCard";

export const metadata = {
    title: "Our Team - Paaydal Trekkers",
    description: "Meet the passionate team behind Paaydal Trekkers",
};

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
            <section className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
                    Meet Our Team
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Passionate trekkers, experienced guides, and nature lovers
                    leading you through unforgettable journeys across India.
                </p>
            </section>

            <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {dummyLeaders.map((leader) => (
                    <LeaderCard key={leader.id} leader={leader} />
                ))}
            </section>
        </main>
    );
}
