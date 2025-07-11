"use client";

import { dummyForumPosts } from "@/lib/dummyForumPosts";
import PostCard from "./PostCard";
import { useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function ForumPage() {
    // Mock auth flag (replace with real session later)
    const isAuthenticated = true;

    // Posts state
    const [posts, setPosts] = useState(dummyForumPosts);
    const [newPostContent, setNewPostContent] = useState("");
    const [newTrekTag, setNewTrekTag] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");

    // Handle new post
    const handleNewPost = () => {
        if (!newPostContent.trim()) return;

        const newPost = {
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

        setPosts([newPost, ...posts]);
        setNewPostContent("");
        setNewImageUrl("");
        setNewTrekTag("");
    };

    return (
        <main className="min-h-screen bg-white py-6 px-4 md:px-44">
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-6">
                Community Forum
            </h1>

            {/* New Post Form */}
            {isAuthenticated ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 shadow-sm space-y-3">
                    <div className="flex gap-3 items-start">
                        <Image
                            src="/forum/you.jpg"
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
                                onChange={(e) =>
                                    setNewPostContent(e.target.value)
                                }
                            />

                            <div className="flex gap-2 text-sm">
                                <input
                                    type="text"
                                    placeholder="Trek name (optional)"
                                    value={newTrekTag}
                                    onChange={(e) =>
                                        setNewTrekTag(e.target.value)
                                    }
                                    className="border px-2 py-1 rounded-md w-full focus:outline-emerald-600"
                                />
                                <input
                                    type="text"
                                    placeholder="Image URL (optional)"
                                    value={newImageUrl}
                                    onChange={(e) =>
                                        setNewImageUrl(e.target.value)
                                    }
                                    className="border px-2 py-1 rounded-md w-full focus:outline-emerald-600"
                                />
                            </div>

                            <div className="text-right">
                                <button
                                    onClick={handleNewPost}
                                    className="flex items-center gap-1 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-emerald-500 transition"
                                >
                                    <Plus className="w-4 h-4" />
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-sm text-gray-600 italic mb-6">
                    Sign in to share your experience with the community.
                </p>
            )}

            {/* Posts List */}
            <div className="space-y-6">
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        isAuthenticated={isAuthenticated}
                    />
                ))}
            </div>
        </main>
    );
}
