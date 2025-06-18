"use client";

import Image from "next/image";
import { Leader } from "../../lib/dummyLeaders";
import { Mail, Phone, Mountain } from "lucide-react"; 

interface LeaderCardProps {
    leader: Leader;
}

export default function LeaderCard({ leader }: LeaderCardProps) {
    return (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden transition hover:scale-[1.02] duration-300 w-full max-w-md mx-auto">
            <div className="relative w-full h-64">
                <Image
                    src={leader.imageUrl}
                    alt={leader.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-emerald-700">
                        {leader.name}
                    </h3>
                    <span className="text-sm px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                        {leader.role}
                    </span>
                </div>

                <p className="text-gray-600 text-sm">{leader.bio}</p>

                <div className="text-sm text-gray-700">
                    <p className="flex items-center gap-2">
                        <Mountain className="w-4 h-4" /> Treks Led:{" "}
                        <span className="font-medium">{leader.treksLed}</span>
                    </p>
                    <p className="mt-1">
                        <span className="font-medium">Expertise:</span>{" "}
                        {leader.expertise.join(", ")}
                    </p>
                </div>

                {(leader.contact.email || leader.contact.phone) && (
                    <div className="pt-3 border-t text-sm text-gray-600 space-y-1">
                        {leader.contact.email && (
                            <p className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {leader.contact.email}
                            </p>
                        )}
                        {leader.contact.phone && (
                            <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {leader.contact.phone}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
