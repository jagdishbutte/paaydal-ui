"use client";

import { dummyGalleryTreks } from "../../lib/dummyGalleryTreks";
import { Download, Upload, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TrekGalleryPageProps {
    trekId: string;
}

export default function TrekGalleryPage({ trekId }: TrekGalleryPageProps) {
    const trek = dummyGalleryTreks.find((t) => t.id === trekId);
    const isMember = false;

    if (!trek) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center">
                <p className="text-gray-600 text-lg">Trek not found.</p>
            </div>
        );
    }

    const handleUploadClick = () => {
        if (!isMember) {
            alert("You are not a member of this trek. Upload not allowed.");
        } else {
            alert("Open upload modal (you are a member)");
        }
    };

    return (
        <main className="min-h-screen bg-white py-6 px-4 md:px-10">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Link href="/gallery">
                        <button className="flex items-center text-green-700 hover:underline">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </Link>
                    <h1 className="text-2xl font-bold text-green-700">
                        {trek.title}
                    </h1>
                </div>
                <button
                    onClick={handleUploadClick}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-500 text-sm"
                >
                    <Upload className="w-4 h-4" />
                    Upload Photo
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {trek.images.map((img, idx) => (
                    <div
                        key={idx}
                        className="relative rounded-lg overflow-hidden shadow-md group"
                    >
                        <Image
                            src={img.url}
                            alt={`Trek photo ${idx + 1}`}
                            width={600}
                            height={400}
                            className="object-cover w-full h-64"
                        />

                        <a
                            href={img.url}
                            download
                            className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                            title="Download"
                        >
                            <Download className="w-4 h-4" />
                        </a>

                        <div className="absolute bottom-0 right-0 bg-black/60 text-white text-xs px-2 py-1 rounded-tl-lg">
                            {img.uploadedBy}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
