"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { ForumPost } from "@/lib/dummyForumPosts";

interface PostFormProps {
    onCreate: (newPost: ForumPost) => void;
}

export default function PostForm({ onCreate }: PostFormProps) {
    const [newPostContent, setNewPostContent] = useState("");
    const [newTrekTag, setNewTrekTag] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");

    const handlePost = () => {
        if (!newPostContent.trim()) return;

        const newPost: ForumPost = {
            id: `post-${Date.now()}`,
            user: {
                id: "user-you",
                name: "You",
                profilePic: "/users/you.jpg",
            },
            trek: newTrekTag || "Other",
            content: newPostContent,
            imageUrl: newImageUrl || undefined,
            likes: 0,
            comments: [],
            createdAt: new Date().toISOString(),
        };

        onCreate(newPost);
        setNewPostContent("");
        setNewTrekTag("");
        setNewImageUrl("");
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 shadow-sm space-y-3">
            <div className="flex gap-3 items-start">
                <Image
                    src="/users/you.jpg"
                    alt="Your profile"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover"
                />
                <div className="w-full space-y-2">
                    <textarea
                        rows={3}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-emerald-600"
                        placeholder="Share your trekking experience..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                    />

                    <div className="flex gap-2 text-sm">
                        <input
                            type="text"
                            placeholder="Trek name (optional)"
                            value={newTrekTag}
                            onChange={(e) => setNewTrekTag(e.target.value)}
                            className="border px-2 py-1 rounded-md w-full focus:outline-emerald-600"
                        />
                        <input
                            type="text"
                            placeholder="Image URL (optional)"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="border px-2 py-1 rounded-md w-full focus:outline-emerald-600"
                        />
                    </div>

                    <div className="text-right">
                        <button
                            onClick={handlePost}
                            className="flex items-center gap-1 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-emerald-500 transition"
                        >
                            <Plus className="w-4 h-4" />
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
