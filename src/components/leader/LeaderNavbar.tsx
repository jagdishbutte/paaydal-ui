"use client";

import Link from "next/link";

export default function LeaderNavbar() {
    return (
        <nav className="bg-emerald-700 text-white py-4 px-6 shadow-md flex justify-between items-center">
            <Link href="/leader">
                <span className="text-xl font-bold">Paaydal Leader</span>
            </Link>
            <div className="flex gap-4">
                <Link href="/create-trek" className="hover:underline">
                    Create Trek
                </Link>
                <Link href="/logout" className="hover:underline">
                    Logout
                </Link>
            </div>
        </nav>
    );
}
