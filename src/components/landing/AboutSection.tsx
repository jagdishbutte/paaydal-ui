import Image from "next/image";

export default function AboutSection() {
    return (
        <section className="bg-white py-16 px-6 md:px-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text Section */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-emerald-700 mb-6">
                        About Paaydal Trekkers
                    </h2>
                    <p className="text-stone-700 text-lg leading-relaxed mb-4">
                        Paaydal Trekkers is a passionate community of explorers,
                        nature lovers, and adventure seekers. We organize
                        curated trekking experiences across India&apos;s most
                        stunning landscapes — from the Western Ghats to the
                        Himalayas.
                    </p>
                    <p className="text-stone-700 text-lg leading-relaxed">
                        Our mission is to make trekking safe, fun, and
                        accessible to everyone — whether you&apos;re a beginner
                        or a seasoned trekker. Join us and rediscover your
                        connection with the wild.
                    </p>
                </div>

                {/* Image Section */}
                <div className="w-full h-[300px] md:h-[400px] relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src="/landing/about-trek.jpg"
                        alt="About Paaydal Trekkers"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
            </div>
        </section>
    );
}
