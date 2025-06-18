"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
    {
        name: "Anita Sharma",
        location: "Manali, HP",
        photo: "/landing/testimonials/anita.jpg", 
        quote: "Foxtrail made my first Himalayan trek safe and unforgettable. The guides were amazing!",
    },
    {
        name: "Rohit Deshmukh",
        location: "Pune, MH",
        photo: "/landing/testimonials/rohit.jpg",
        quote: "A seamless booking experience and top-notch support. Can’t wait for my next trek!",
    },
    {
        name: "Priya Singh",
        location: "Rishikesh, UK",
        photo: "/landing/testimonials/priya.jpg",
        quote: "The community forum helped me prepare well. Friendly people and breathtaking trails!",
    },
];

export default function Testimonials() {
    const [index, setIndex] = useState(0);

    function prev() {
        setIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    }

    function next() {
        setIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    }

    const { name, location, photo, quote } = testimonials[index];

    return (
        <section className="bg-white py-16 px-6 md:px-12">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-emerald-700 mb-10">
                    What Our Trekkers Say
                </h2>
                <div className="relative bg-stone-50 rounded-xl p-8 shadow-lg">
                    <div className="flex flex-col items-center space-y-6">
                        <Image
                            width={96}
                            height={96}
                            src={photo} 
                            alt={`${name} photo`}
                            className="w-24 h-24 rounded-full object-cover shadow-md"
                            loading="lazy"
                        />
                        <p className="text-stone-700 italic text-lg max-w-xl">
                            “{quote}”
                        </p>
                        <p className="font-semibold text-emerald-800">{name}</p>
                        <p className="text-stone-500 text-sm">{location}</p>
                    </div>

                    {/* Carousel Controls */}
                    <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                        <button
                            aria-label="Previous testimonial"
                            onClick={prev}
                            className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition"
                        >
                            ‹
                        </button>
                    </div>
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                        <button
                            aria-label="Next testimonial"
                            onClick={next}
                            className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
