import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Montserrat, Inter } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main
                className={`${montserrat.className} ${inter.className} min-h-screen bg-stone-100 text-stone-800`}
            >
                {children}
            </main>
            <Footer />
        </>
    );
}
