"use client";

import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(target) &&
                profileDropdownOpen
            ) {
                setProfileDropdownOpen(false);
            }

            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(target) &&
                mobileDropdownOpen
            ) {
                setMobileDropdownOpen(false);
            }
        };

        if (profileDropdownOpen || mobileDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileDropdownOpen, mobileDropdownOpen]); 

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm px-6 py-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div
                    className="flex items-center space-x-2 text-xl font-bold text-green-700 cursor-pointer"
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
                        onClick={() =>
                            setMobileDropdownOpen(!mobileDropdownOpen)
                        }
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
                        <div className="relative" ref={profileDropdownRef}>
                            <button
                                onClick={() =>
                                    setProfileDropdownOpen((prev) => !prev)
                                }
                                className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold focus:outline-none"
                            >
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                            </button>

                            {profileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-green-50 shadow-md rounded-md py-2 z-1000">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        onClick={() =>
                                            setProfileDropdownOpen(false)
                                        }
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        href="/my-bookings"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        onClick={() =>
                                            setProfileDropdownOpen(false)
                                        }
                                    >
                                        My Bookings
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setProfileDropdownOpen(false);
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
                {mobileDropdownOpen && (
                    <div
                        className="absolute top-full left-0 w-full max-h-[50vh] overflow-y-auto bg-white shadow-md lg:hidden z-40"
                        ref={mobileMenuRef}
                    >
                        <nav className="flex flex-col space-y-4 px-6 py-4 text-sm font-medium">
                            <Link
                                href="/"
                                className="text-gray-800 hover:text-green-700"
                                onClick={() => setMobileDropdownOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/treks"
                                className="text-gray-800 hover:text-green-700"
                                onClick={() => setMobileDropdownOpen(false)}
                            >
                                Treks
                            </Link>
                            <Link
                                href="/gallery"
                                className="text-gray-800 hover:text-green-700"
                                onClick={() => setMobileDropdownOpen(false)}
                            >
                                Gallery
                            </Link>
                            <Link
                                href="/forum"
                                className="text-gray-800 hover:text-green-700"
                                onClick={() => setMobileDropdownOpen(false)}
                            >
                                Forum
                            </Link>
                            <Link
                                href="/team"
                                className="text-gray-800 hover:text-green-700"
                                onClick={() => setMobileDropdownOpen(false)}
                            >
                                Team
                            </Link>
                            {user ? (
                                <Link
                                    href="/"
                                    className="flex items-center text-gray-800 hover:text-green-700"
                                    onClick={() => setMobileDropdownOpen(false)}
                                >
                                    Account
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="text-green-700 font-semibold"
                                    onClick={() => setMobileDropdownOpen(false)}
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
