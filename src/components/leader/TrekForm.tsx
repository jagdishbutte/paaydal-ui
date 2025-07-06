"use client";

import { useState } from "react";

export default function TrekForm() {
    const [form, setForm] = useState({
        title: "",
        thumbnail: "",
        imageUrls: [""],
        price: "",
        startDate: "",
        endDate: "",
        difficulty: "",
        seatsAvailable: 0,
        commute: "",
        locationsToView: [""],
        aboutDestination: "",
        whoCanCome: "",
        stops: [""],
        schedule: [""],
        foodStops: [""],
        highlights: [""],
        description: "",
        suitableFor: "",
        preparationTips: [""],
        facilities: [""],
        leaders: [
            {
                name: "",
                photo: "",
                experience: "",
            },
        ],
    });

    const handleChange = (
        field: string,
        value: unknown,
        isArray: boolean = false,
        index?: number,
        subfield?: string
    ) => {
        if (isArray && typeof index === "number") {
            const updatedArray = [
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...(form[field as keyof typeof form] as any[]),
            ];
            if (subfield) {
                updatedArray[index][subfield] = value;
            } else {
                updatedArray[index] = value;
            }
            setForm({ ...form, [field]: updatedArray });
        } else {
            setForm({ ...form, [field]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Trek submitted:", form);
        // TODO: send to backend
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-emerald-700">
                Basic Info
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-900">
                <input
                    type="text"
                    placeholder="Trek Title"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Thumbnail URL"
                    value={form.thumbnail}
                    onChange={(e) => handleChange("thumbnail", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Commute"
                    value={form.commute}
                    onChange={(e) => handleChange("commute", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Difficulty (Easy/Moderate/Hard)"
                    value={form.difficulty}
                    onChange={(e) => handleChange("difficulty", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="number"
                    placeholder="Seats Available"
                    value={form.seatsAvailable}
                    onChange={(e) =>
                        handleChange("seatsAvailable", parseInt(e.target.value))
                    }
                    className="border p-2 rounded-md w-full"
                    required
                />
            </div>

            <hr />

            <h2 className="text-lg font-semibold text-emerald-700">
                Descriptions
            </h2>

            <textarea
                placeholder="About Destination"
                value={form.aboutDestination}
                onChange={(e) =>
                    handleChange("aboutDestination", e.target.value)
                }
                className="border p-2 rounded-md w-full text-emerald-900"
                required
            />
            <textarea
                placeholder="Who Can Come?"
                value={form.whoCanCome}
                onChange={(e) => handleChange("whoCanCome", e.target.value)}
                className="border p-2 rounded-md w-full text-emerald-900"
                required
            />
            <textarea
                placeholder="Main Description"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="border p-2 rounded-md w-full text-emerald-900"
                required
            />
            <input
                type="text"
                placeholder="Suitable For"
                value={form.suitableFor}
                onChange={(e) => handleChange("suitableFor", e.target.value)}
                className="border p-2 rounded-md w-full text-emerald-900"
            />

            <hr />

            <h2 className="text-lg font-semibold text-emerald-700">Images</h2>

            {form.imageUrls.map((url, i) => (
                <input
                    key={i}
                    type="text"
                    placeholder={`Image URL ${i + 1}`}
                    value={url}
                    onChange={(e) =>
                        handleChange("imageUrls", e.target.value, true, i)
                    }
                    className="border p-2 rounded-md w-full text-emerald-900"
                />
            ))}

            <hr />

            <h2 className="text-lg font-semibold text-emerald-700">Leaders</h2>
            {form.leaders.map((leader, i) => (
                <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 text-emerald-900"
                >
                    <input
                        type="text"
                        placeholder="Leader Name"
                        value={leader.name}
                        onChange={(e) =>
                            handleChange(
                                "leaders",
                                e.target.value,
                                true,
                                i,
                                "name"
                            )
                        }
                        className="border p-2 rounded-md w-full"
                    />
                    <input
                        type="text"
                        placeholder="Photo URL"
                        value={leader.photo}
                        onChange={(e) =>
                            handleChange(
                                "leaders",
                                e.target.value,
                                true,
                                i,
                                "photo"
                            )
                        }
                        className="border p-2 rounded-md w-full"
                    />
                    <input
                        type="text"
                        placeholder="Experience"
                        value={leader.experience}
                        onChange={(e) =>
                            handleChange(
                                "leaders",
                                e.target.value,
                                true,
                                i,
                                "experience"
                            )
                        }
                        className="border p-2 rounded-md w-full"
                    />
                </div>
            ))}

            <hr />

            <h2 className="text-lg font-semibold text-emerald-700">Lists</h2>

            {[
                "locationsToView",
                "stops",
                "schedule",
                "foodStops",
                "highlights",
                "facilities",
                "preparationTips",
            ].map((field) => (
                <div key={field}>
                    <label className="block font-medium text-gray-700 capitalize mt-4">
                        {field}
                    </label>
                    {(form[field as keyof typeof form] as string[]).map(
                        (val, i) => (
                            <input
                                key={i}
                                type="text"
                                placeholder={`${field} ${i + 1}`}
                                value={val}
                                onChange={(e) =>
                                    handleChange(field, e.target.value, true, i)
                                }
                                className="border p-2 rounded-md w-full text-emerald-900"
                            />
                        )
                    )}
                </div>
            ))}

            <hr />

            <button
                type="submit"
                className="w-full bg-emerald-700 text-white py-2 rounded-md hover:bg-emerald-600 transition"
            >
                Submit Trek
            </button>
        </form>
    );
}
