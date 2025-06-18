"use client"

import Link from "next/link";
import { useState } from "react";
// import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm px-6 py-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-2 text-xl font-bold text-green-700">
                    {/* <Image
                        src="/logos/foxtrail_logo.jpg"
                        alt="Foxtrail India Logo"
                        width={30}
                        height={30}
                        className="rounded-full object-cover"
                    /> */}
                    <span>Foxtrail India</span>
                </div>
                {/* Hamburger button (visible on mobile) */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-green-700 focus:outline-none"
                    >
                        {/* Hamburger Icon */}
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Full menu for desktop */}
                <nav className="hidden lg:flex space-x-6 text-sm font-medium">
                    <Link
                        href="/"
                        className="text-gray-800 hover:text-green-700"
                    >
                        Home
                    </Link>
                    <Link
                        href="/treks"
                        className="text-gray-800 hover:text-green-700"
                    >
                        Treks
                    </Link>
                    <Link
                        href="/gallery"
                        className="text-gray-800 hover:text-green-700"
                    >
                        Gallery
                    </Link>
                    <Link
                        href="/forum"
                        className="text-gray-800 hover:text-green-700"
                    >
                        Forum
                    </Link>
                    <Link
                        href="/team"
                        className="text-gray-800 hover:text-green-700"
                    >
                        Team
                    </Link>
                    <Link
                        href="/auth/login"
                        className="text-green-700 font-semibold"
                    >
                        Login
                    </Link>
                </nav>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full max-h-[50vh] overflow-y-auto bg-white shadow-md lg:hidden z-40">
                        <nav className="flex flex-col space-y-4 px-6 py-4 text-sm font-medium">
                            <Link
                                href="/"
                                className="text-gray-800 hover:text-green-700"
                            >
                                Home
                            </Link>
                            <Link
                                href="/treks"
                                className="text-gray-800 hover:text-green-700"
                            >
                                Treks
                            </Link>
                            <Link
                                href="/gallery"
                                className="text-gray-800 hover:text-green-700"
                            >
                                Gallery
                            </Link>
                            <Link
                                href="/forum"
                                className="text-gray-800 hover:text-green-700"
                            >
                                Forum
                            </Link>
                            <Link
                                href="/team"
                                className="text-gray-800 hover:text-green-700"
                            >
                                Team
                            </Link>
                            <Link
                                href="/auth/login"
                                className="text-green-700 font-semibold"
                            >
                                Login
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
