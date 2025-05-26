import { Compass, FilePlus, Mountain } from "lucide-react";

export default function StepsSection() {
    const steps = [
        {
            icon: <Compass className="w-12 h-12 text-emerald-600" />,
            title: "Plan Your Trek",
            desc: "Browse our list of carefully curated treks and choose one that fits your vibe and schedule.",
        },
        {
            icon: <FilePlus className="w-12 h-12 text-amber-500" />,
            title: "Register Online",
            desc: "Sign up, provide your details, and complete the booking through our secure payment portal.",
        },
        {
            icon: <Mountain className="w-12 h-12 text-sky-600" />,
            title: "Explore the Wild",
            desc: "Pack your bags and get ready to explore breathtaking trails with certified trek leaders.",
        },
    ];

    return (
        <section className="bg-stone-50 py-16 px-6 md:px-12">
            <div className="max-w-5xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-emerald-700">
                    How It Works
                </h2>
                <p className="mt-4 text-stone-600 text-lg">
                    Simple steps to get started on your trekking adventure.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition duration-300"
                    >
                        <div className="mb-4 flex justify-center">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                            {step.title}
                        </h3>
                        <p className="text-stone-600">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
