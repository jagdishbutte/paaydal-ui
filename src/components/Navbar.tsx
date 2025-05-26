import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm px-6 py-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-xl font-bold text-green-700">
                    Paaydal Trekkers
                </div>
                <nav className="space-x-6 text-sm font-medium">
                    <Link href="/" className="text-gray-800 hover:text-green-700">
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
        </header>
    );
}
