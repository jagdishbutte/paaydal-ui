"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface Leader {
    name: string;
    photo: string;
    experience?: string;
    treksLed?: number;
    bio?: string;
}

export interface TrekProps {
    trek: {
        _id: string;
        title: string;
        imageUrls: string[];
        price: string;
        startDate: string;
        endDate: string;
        difficulty: string;
        seatsAvailable: number;
        description: string;
        commute: string;
        stops: string[];
        schedule: string[];
        foodStops?: string[];
        locationsToView?: string[];
        aboutDestination?: string;
        whoCanCome: string;
        preparationTips?: string[];
        leaders?: Leader[];
        facilities?: string[];
    };
}

export default function TrekDetails({ trek }: TrekProps) {
    const router = useRouter();
    const carouselRef = useRef<HTMLDivElement | null>(null);
    console.log("Trek Details:", trek);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!carouselRef.current) return;
            carouselRef.current.scrollBy({
                left: window.innerWidth, 
                behavior: "smooth",
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="px-4 md:px-16 py-8 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={() => router.back()}
                    className="text-green-700 hover:underline"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-green-700">
                    {trek.title}
                </h1>
            </div>

            {/* Image Carousel */}
            <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-4 scrollbar-hide"
            >
                {trek.imageUrls.map((src, idx) => (
                    <div
                        key={idx}
                        className="relative min-w-[80vw] md:min-w-full h-[35vh] rounded-lg overflow-hidden"
                    >
                        <Image
                            src={src}
                            alt={`Trek Image ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute bottom-0 bg-black/50 text-white text-sm text-center p-2 w-full">
                            {trek.title} - View {idx + 1}
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Sections */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Section */}
                <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                        <p>
                            <span className="font-semibold">Price:</span>{" "}
                            {trek.price}
                        </p>
                        <p>
                            <span className="font-semibold">Dates:</span>{" "}
                            {new Date(trek.startDate).toLocaleDateString()} -{" "}
                            {new Date(trek.endDate).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-semibold">Difficulty:</span>{" "}
                            {trek.difficulty}
                        </p>
                        <p>
                            <span className="font-semibold">
                                Available Seats:
                            </span>{" "}
                            {trek.seatsAvailable}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            Description
                        </h2>
                        <p className="text-stone-700">{trek.description}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            Commute Route
                        </h2>
                        <p>{trek.commute}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Stops</h2>
                        <ul className="list-disc list-inside">
                            {trek.stops.map((stop, idx) => (
                                <li key={idx}>{stop}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Schedule</h2>
                        <ul className="list-disc list-inside">
                            {trek.schedule.map((line, idx) => (
                                <li key={idx}>{line}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            Food Stops
                        </h2>
                        <ul className="list-disc list-inside">
                            {trek.foodStops?.map((stop, idx) => (
                                <li key={idx}>{stop}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            Locations to View
                        </h2>
                        <ul className="list-disc list-inside">
                            {trek.locationsToView?.map((loc, idx) => (
                                <li key={idx}>{loc}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            About Destination
                        </h2>
                        <p>{trek.aboutDestination}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            Who Can Come?
                        </h2>
                        <p>{trek.whoCanCome}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            Preparation Tips
                        </h2>
                        <p>{trek.preparationTips}</p>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="md:w-1/3 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            Trek Leaders
                        </h2>
                        <div className="space-y-4">
                            {trek.leaders?.map((leader, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 p-3 border rounded-lg"
                                >
                                    <Image
                                        src={leader.photo}
                                        alt={leader.name}
                                        width={50}
                                        height={50}
                                        className="rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-base">
                                            {leader.name}
                                        </h3>
                                        <p className="text-xs text-stone-600">
                                            {leader.treksLed} treks led
                                        </p>
                                        <p className="text-sm text-stone-700">
                                            {leader.bio}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            Facilities Provided
                        </h2>
                        <ul className="list-disc list-inside">
                            {trek.facilities?.map((facility, idx) => (
                                <li key={idx}>{facility}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
