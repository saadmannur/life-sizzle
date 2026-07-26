"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PiHeartBold, PiBookOpenTextBold, PiXCircleBold } from "react-icons/pi";
import { serverDelete } from "@/lib/core/server";

const formatDate = (value) => {
    const raw = value?.$date || value;
    if (!raw) return null;
    return new Date(raw).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const MyFavoritesTable = ({ initialFavorites }) => {
    const [favorites, setFavorites] = useState(initialFavorites);
    const [category, setCategory] = useState("all");
    const [tone, setTone] = useState("all");
    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 2500);
    };

    const categories = useMemo(() => ["all", ...new Set(favorites.map((l) => l.category).filter(Boolean))], [favorites]);
    const tones = useMemo(() => ["all", ...new Set(favorites.map((l) => l.tone).filter(Boolean))], [favorites]);

    const filtered = favorites.filter(
        (l) => (category === "all" || l.category === category) && (tone === "all" || l.tone === tone)
    );

    const handleRemove = async (lessonId) => {

        try {

            await serverDelete(`/api/favorites/${lessonId}`);

            setFavorites(prev =>
                prev.filter(lesson => lesson._id !== lessonId)
            );
            showToast('Remove To Favorite')

        } catch (err) {

            console.log(err);
            showToast('Something Wrong')

        }

    };

    return (
        <div>
            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-3">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-full border border-[#26313B]/10 bg-white px-4 py-2 text-sm font-medium text-[#26313B] focus:border-[#E2636B] focus:outline-none"
                >
                    {categories.map((c) => (
                        <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
                    ))}
                </select>
                <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="rounded-full border border-[#26313B]/10 bg-white px-4 py-2 text-sm font-medium text-[#26313B] focus:border-[#E2636B] focus:outline-none"
                >
                    {tones.map((t) => (
                        <option key={t} value={t}>{t === "all" ? "All Emotional Tones" : t}</option>
                    ))}
                </select>
            </div>

            {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#26313B]/15 bg-white py-16 text-center">
                    <PiHeartBold className="mx-auto mb-3 h-8 w-8 text-[#26313B]/20" />
                    <p className="text-sm font-medium text-[#8A93A0]">
                        {favorites.length === 0 ? "You haven't saved any lessons yet." : "No favorites match these filters."}
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-[#26313B]/8 bg-white shadow-sm">
                    <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#26313B]/8 text-[11px] font-bold uppercase tracking-wide text-[#8A93A0]">
                                <th className="px-5 py-4">Lesson</th>
                                <th className="px-5 py-4">Category</th>
                                <th className="px-5 py-4">Tone</th>
                                <th className="px-5 py-4">Saved</th>
                                <th className="px-5 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#26313B]/8">
                            {filtered.map((lesson) => (
                                <tr key={lesson._id}>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#FBF6EC]">
                                                {lesson.imageUrl ? (
                                                    <Image src={lesson.imageUrl} alt={lesson.headline} fill className="object-cover" />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <PiBookOpenTextBold className="h-4 w-4 text-[#26313B]/20" />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="max-w-[220px] truncate font-semibold text-[#26313B]">{lesson.headline}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-[#6B7684]">{lesson.category}</td>
                                    <td className="px-5 py-4">
                                        <span className="rounded-full bg-[#E2636B]/10 px-2.5 py-1 text-xs font-semibold text-[#E2636B]">
                                            {lesson.tone}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-[#6B7684]">{formatDate(lesson.savedAt || lesson.createAt)}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/lessons/${lesson._id}`}
                                                className="rounded-full border border-[#26313B]/10 px-3 py-1.5 text-xs font-semibold text-[#26313B] hover:bg-[#FBF6EC]"
                                            >
                                                Details
                                            </Link>
                                            <button
                                                onClick={() => handleRemove(lesson._id)}
                                                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 cursor-pointer"
                                                title="Remove from favorites"
                                            >
                                                <PiXCircleBold className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#26313B] px-5 py-2.5 text-sm font-medium text-white shadow-xl">
                    {toast}
                </div>
            )}
        </div>
    );
};

export default MyFavoritesTable;