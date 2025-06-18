"use client";

import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

type TrekCardProps = {
    id: string;
    title: string;
    thumbnail: string;
    price: string;
    startDate: string;
    endDate: string;
    difficulty: string;
};

export default function TrekCard({
    id,
    title,
    thumbnail,
    price,
    startDate,
    endDate,
    difficulty,
}: TrekCardProps) {

    const formattedDate = `${format(new Date(startDate), "dd MMM")} - ${format(
        new Date(endDate),
        "dd MMM yyyy"
    )}`;

    return (
        <div className="w-96 h-60 min-w-[24rem] rounded-lg overflow-hidden shadow-md relative">
            <Image
                src={thumbnail}
                alt={title}
                width={300}
                height={200}
                className="w-full h-full object-cover"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-black/30 bg-opacity-10 text-white flex flex-col justify-end p-4 space-y-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-xs text-stone-600 bg-gray-300 rounded-full px-2 py-1 inline-block w-fit">
                    Difficulty: {difficulty}
                </p>

                <div className="text-sm">{formattedDate}</div>
                <div className="text-sm font-bold">{price}</div>
                <Link
                    href={`/treks/${id}`}
                    className="mt-2 self-start px-3 py-1 text-sm bg-white text-green-700 font-semibold rounded hover:bg-green-100 transition"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
