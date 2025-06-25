"use client";

import { Comment } from "@/lib/dummyForumPosts";
import { useState } from "react";
import Image from "next/image";

interface CommentSectionProps {
    postId: string;
    comments: Comment[];
    isAuthenticated: boolean;
}

export default function CommentSection({
    // postId,
    comments,
    isAuthenticated,
}: CommentSectionProps) {
    const [commentList, setCommentList] = useState(comments);
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const newCommentObj: Comment = {
            id: `comment-${Date.now()}`,
            user: {
                id: "current-user-id",
                name: "You",
                profilePic: "/forum/you.jpg",
            },
            message: newComment.trim(),
            createdAt: new Date().toISOString(),
        };

        setCommentList((prev) => [...prev, newCommentObj]);
        setNewComment("");
    };

    return (
        <div className="mt-4 border-t pt-4 space-y-4">
            {/* Add Comment */}
            {isAuthenticated ? (
                <div className="flex gap-2">
                    <Image
                        src="/forum/you.jpg"
                        alt="Your profile"
                        width={40}
                        height={40}
                        className="rounded-full w-10 h-10 object-cover"
                    />
                    <div className="flex-1">
                        <textarea
                            rows={2}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-emerald-600"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="text-right mt-1">
                            <button
                                onClick={handleAddComment}
                                className="bg-emerald-600 text-white px-3 py-1 rounded-md text-sm hover:bg-emerald-500 transition"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-sm text-gray-600 italic">
                    Please sign in to leave a comment.
                </p>
            )}

            {/* Comment List */}
            {commentList.length === 0 && (
                <p className="text-sm text-gray-500">No comments yet.</p>
            )}

            {commentList.map((comment) => (
                <div key={comment.id} className="flex gap-3 items-start">
                    <Image
                        src={comment.user.profilePic}
                        alt={comment.user.name}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-lg w-full">
                        <p className="text-sm font-semibold text-emerald-800">
                            {comment.user.name}
                        </p>
                        <p className="text-sm text-gray-800">
                            {comment.message}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
