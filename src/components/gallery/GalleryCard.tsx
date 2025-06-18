"use client";

import { useState } from "react";
import { TrekGalleryItem } from "../../lib/dummyGalleryTreks";
import { useRouter } from "next/navigation";
import { UploadCloud, Eye } from "lucide-react";
import Image from "next/image";

interface GalleryCardProps {
    trek: TrekGalleryItem;
    isMember: boolean;
}

export default function GalleryCard({ trek, isMember }: GalleryCardProps) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleViewPhotos = () => {
        router.push(`/gallery/${trek.id}`);
    };

    const handleUploadClick = () => {
        if (!isMember) {
            setShowModal(true);
        } else {
            alert("Open upload modal (you are a member)");
        }
    };

    const thumbnail = trek.images[0]?.url;

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 transition hover:shadow-lg">
            {/* Thumbnail */}
            {thumbnail && (
                <div className="relative w-full h-48">
                    <Image
                        src={thumbnail}
                        alt={`Thumbnail for ${trek.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 30vw"
                        priority
                    />
                </div>
            )}

            <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-emerald-700">
                    {trek.title}
                </h3>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Members:</span>{" "}
                    {trek.totalMembers}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(trek.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </p>
                <div className="flex gap-4 pt-4">
                    <button
                        onClick={handleViewPhotos}
                        className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-full text-sm font-medium transition"
                    >
                        <Eye className="w-4 h-4" />
                        View Photos
                    </button>
                    <button
                        onClick={handleUploadClick}
                        className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                    >
                        <UploadCloud className="w-4 h-4" />
                        Upload
                    </button>
                </div>
            </div>

            {/* Modal for non-member restriction (mock only) */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm text-center shadow-lg">
                        <p className="text-red-600 font-semibold mb-2">
                            Upload not allowed
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                            You are not a member of this trek. Only participants
                            can upload photos.
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
