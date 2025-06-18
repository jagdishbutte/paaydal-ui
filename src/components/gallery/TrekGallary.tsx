import { dummyGalleryTreks } from "../../lib/dummyGalleryTreks";
import GalleryCard from "./GalleryCard";

export const metadata = {
    title: "Photo Gallery - Paaydal Trekkers",
    description:
        "Explore trek memories and shared moments from past adventures.",
};

export default function TrekGallery() {
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
            <section className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
                    Trek Galleries
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Explore amazing trek moments captured by our community. View
                    photos or contribute your own!
                </p>
            </section>

            <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {dummyGalleryTreks.map((trek) => (
                    <GalleryCard
                        key={trek.id}
                        trek={trek}
                        isMember={false} 
                    />
                ))}
            </section>
        </main>
    );
}
