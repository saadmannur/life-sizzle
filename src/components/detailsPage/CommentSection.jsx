"use client";

import { serverMutation } from "@/lib/core/server";
import { useState } from "react";
import { PiChatCircleTextBold } from "react-icons/pi";

const CommentSection = ({ lessonId, user, initialComments = [] }) => {
    const [comments, setComments] = useState(initialComments);
    const [text, setText] = useState("");

    const handlePost = async () => {

        if (!user) return;

        if (!text.trim()) return;

        try {

            await serverMutation(
                "/api/comments",
                {
                    lessonId,
                    text
                }
            );

            setComments(prev => [
                {
                    _id: Date.now().toString(),
                    lessonId,
                    userId: user.id,
                    userName: user.name,
                    userImage: user.image,
                    text: text.trim(),
                    createdAt: new Date(),
                    updatedAt: null
                },
                ...prev
            ]);

            setText("");

        } catch (err) {

            console.log(err);

        }

    };

    return (
        <div className="rounded-2xl border border-[#26313B]/8 bg-white p-6 shadow-sm">
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-[#26313B]">
                <PiChatCircleTextBold className="h-5 w-5 text-[#E2636B]" />
                Comments ({comments.length})
            </h3>

            <div className="mb-6 flex gap-3">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={user ? "Write a comment..." : "Log in to leave a comment"}
                    disabled={!user}
                    className="flex-1 rounded-full border border-[#26313B]/10 bg-[#FBF6EC]/60 px-4 py-2.5 text-sm text-[#26313B] placeholder:text-[#8A93A0] focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20 disabled:opacity-60"
                />
                <button
                    onClick={handlePost}
                    disabled={!user}
                    className="shrink-0 rounded-full bg-[#E2636B] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                    Post
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {comments.length === 0 && (
                    <p className="py-4 text-center text-sm text-[#8A93A0]">Be the first to share your thoughts.</p>
                )}
                {comments.map((c) => (
                    <div key={c._id} className="flex gap-3">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#E2636B]/15">
                            {c.userImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={c.userImage} alt={c.userName} className="h-full w-full object-cover" />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center text-xs font-bold text-[#E2636B]">
                                    {c.userName?.[0]?.toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div className="rounded-2xl bg-[#FBF6EC] px-4 py-2.5">
                            <div className="mb-0.5 flex items-baseline gap-2">
                                <span className="text-sm font-semibold text-[#26313B]">{c.userName}</span>
                                <span className="text-[11px] text-[#8A93A0]">
                                    {new Date(c.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                                </span>
                            </div>
                            <p className="text-sm text-[#4B5563]">{c.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;