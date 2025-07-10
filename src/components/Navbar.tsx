"use client"

import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm px-6 py-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div
                    className="flex items-center space-x-2 text-xl font-bold text-green-700"
                    onClick={() => router.push("/")}
                >
                    <Image
                        src="/logos/foxtrail_logo.jpg"
                        alt="Foxtrail India Logo"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
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
                <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
                    {[
                        { href: "/", label: "Home" },
                        { href: "/treks", label: "Treks" },
                        { href: "/gallery", label: "Gallery" },
                        { href: "/forum", label: "Forum" },
                        { href: "/team", label: "Team" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-gray-800 hover:text-green-700 flex items-center"
                        >
                            {item.label}
                        </Link>
                    ))}

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold focus:outline-none"
                            >
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 z-50">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        href="/my-bookings"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    >
                                        My Bookings
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setDropdownOpen(false);
                                            router.push("/login");
                                        }}
                                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="text-green-700 font-semibold flex items-center"
                        >
                            Login
                        </Link>
                    )}
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
                            {user ? (
                                <Link
                                    href="/"
                                    className="flex items-center text-gray-800 hover:text-green-700"
                                >
                                    Account
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="text-green-700 font-semibold"
                                >
                                    Login
                                </Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
