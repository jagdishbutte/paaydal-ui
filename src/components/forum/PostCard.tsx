"use client";

import { ForumPost } from "@/lib/dummyForumPosts";
import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Heart } from "lucide-react";
import CommentSection from "./CommentSection";

interface PostCardProps {
    post: ForumPost;
    isAuthenticated: boolean;
}

export default function PostCard({ post, isAuthenticated }: PostCardProps) {
    const [showComments, setShowComments] = useState(false);
    const [likes, setLikes] = useState(post.likes);

    const handleLike = () => {
        if (!isAuthenticated) {
            alert("Please sign in to like this post.");
            return;
        }
        setLikes((prev) => prev + 1); // mock like
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-4">
                <Image
                    src={post.user.profilePic}
                    alt={`${post.user.name} profile`}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-emerald-800">
                        {post.user.name}
                    </p>
                    <p className="text-sm text-gray-500">{post.trek}</p>
                </div>
            </div>

            {/* Content */}
            <div className="text-gray-800">{post.content}</div>

            {/* Optional Image */}
            {post.imageUrl && (
                <div className="w-full rounded-lg overflow-hidden border">
                    <Image
                        src={post.imageUrl}
                        alt="Post photo"
                        width={800}
                        height={500}
                        className="w-full h-auto object-cover"
                    />
                </div>
            )}

            {/* Like & Comment Actions */}
            <div className="flex items-center justify-between text-sm text-gray-600">
                <button
                    onClick={handleLike}
                    className="flex items-center gap-1 hover:text-red-500 transition"
                >
                    <Heart className="w-4 h-4" />
                    {likes} Likes
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-1 hover:text-emerald-600 transition"
                >
                    <MessageCircle className="w-4 h-4" />
                    {post.comments.length} Comments
                </button>
            </div>

            {/* Comment Section */}
            {showComments && (
                <CommentSection
                    postId={post.id}
                    comments={post.comments}
                    isAuthenticated={isAuthenticated}
                />
            )}
        </div>
    );
}
