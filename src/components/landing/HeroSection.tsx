"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const heroImages = [
    "/landing/hero-carausel-1.jpeg",
    "/landing/hero-carausel-2.jpeg",
    "/landing/hero-carausel-3.jpeg",
];

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000); // Change image every 5s
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden">
            {/* Background Image */}
            <Image
                src={heroImages[currentIndex]}
                alt="Trekking in the mountains"
                fill
                className="object-cover"
                priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-0" />

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                    Discover Breathtaking Treks in India
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto drop-shadow-md">
                    Join Paaydal Trekkers and explore the wild like never
                    before. From serene trails to adventurous climbs, we’ve got
                    it all.
                </p>
                <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                    <Link href="/upcoming-treks">
                        <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-full font-semibold shadow-md transition">
                            View Upcoming Treks
                        </button>
                    </Link>
                    <Link href="/forum">
                        <button className="bg-white hover:bg-stone-100 text-emerald-700 px-6 py-3 rounded-full font-semibold shadow-md transition">
                            Join the Community
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
