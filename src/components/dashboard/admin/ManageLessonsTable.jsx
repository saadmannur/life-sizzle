"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    PiBookOpenTextBold,
    PiTrashBold,
    PiStarBold,
    PiStarFill,
    PiCheckCircleBold,
    PiCheckCircleFill,
    PiFlagFill,
    PiLockSimpleBold,
    PiGlobeBold,
} from "react-icons/pi";

const formatDate = (value) => {
    const raw = value?.$date || value;
    if (!raw) return null;
    return new Date(raw).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const ManageLessonsTable = ({ initialLessons }) => {
    const [lessons, setLessons] = useState(initialLessons);
    const [category, setCategory] = useState("all");
    const [visibility, setVisibility] = useState("all");
    const [flaggedOnly, setFlaggedOnly] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const categories = useMemo(
        () => ["all", ...new Set(lessons.map((l) => l.category).filter(Boolean))],
        [lessons]
    );

    const stats = useMemo(
        () => ({
            public: lessons.filter((l) => l.visibility === "public").length,
            private: lessons.filter((l) => l.visibility === "private").length,
            flagged: lessons.filter((l) => l.flagsCount > 0).length,
        }),
        [lessons]
    );

    const filtered = lessons.filter(
        (l) =>
            (category === "all" || l.category === category) &&
            (visibility === "all" || l.visibility === visibility) &&
            (!flaggedOnly || l.flagsCount > 0)
    );

    const toggleFeatured = (id) => {
        // TODO: PATCH lesson.isFeatured on the server
        setLessons((prev) => prev.map((l) => (l._id === id ? { ...l, isFeatured: !l.isFeatured } : l)));
    };

    const toggleReviewed = (id) => {
        // TODO: PATCH lesson.isReviewed on the server
        setLessons((prev) => prev.map((l) => (l._id === id ? { ...l, isReviewed: !l.isReviewed } : l)));
    };

    const confirmDelete = () => {
        // TODO: DELETE lesson on the server
        setLessons((prev) => prev.filter((l) => l._id !== deleteTarget._id));
        setDeleteTarget(null);
    };

    const statCards = [
        { label: "Public Lessons", value: stats.public, icon: PiGlobeBold, accent: "text-[#6366F1] bg-[#6366F1]/10" },
        { label: "Private Lessons", value: stats.private, icon: PiLockSimpleBold, accent: "text-[#26313B] bg-[#26313B]/8" },
        { label: "Flagged / Reported", value: stats.flagged, icon: PiFlagFill, accent: "text-red-500 bg-red-50" },
    ];

    if (lessons.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-[#26313B]/15 bg-white py-16 text-center">
                <PiBookOpenTextBold className="mx-auto mb-3 h-8 w-8 text-[#26313B]/20" />
                <p className="text-sm font-medium text-[#8A93A0]">No lessons on the platform yet.</p>
            </div>
        );
    }

    return (
        <>
            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {statCards.map(({ label, value, icon: Icon, accent }) => (
                    <div key={label} className="rounded-2xl border border-[#26313B]/8 bg-white p-5 shadow-sm">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
                            <Icon className="h-5 w-5" />
                        </span>
                        <p className="mt-4 text-2xl font-extrabold text-[#26313B]">{value}</p>
                        <p className="text-sm text-[#8A93A0]">{label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
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
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="rounded-full border border-[#26313B]/10 bg-white px-4 py-2 text-sm font-medium text-[#26313B] focus:border-[#E2636B] focus:outline-none"
                >
                    <option value="all">All Visibility</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                <button
                    onClick={() => setFlaggedOnly((v) => !v)}
                    className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${flaggedOnly
                            ? "border-red-200 bg-red-50 text-red-500"
                            : "border-[#26313B]/10 bg-white text-[#26313B] hover:bg-[#FBF6EC]"
                        }`}
                >
                    <PiFlagFill className="h-3.5 w-3.5" /> Flagged Only
                </button>
            </div>

            {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#26313B]/15 bg-white py-16 text-center">
                    <p className="text-sm font-medium text-[#8A93A0]">No lessons match these filters.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-[#26313B]/8 bg-white shadow-sm">
                    <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#26313B]/8 text-[11px] font-bold uppercase tracking-wide text-[#8A93A0]">
                                <th className="px-5 py-4">Lesson</th>
                                <th className="px-5 py-4">Author</th>
                                <th className="px-5 py-4">Visibility</th>
                                <th className="px-5 py-4">Flags</th>
                                <th className="px-5 py-4">Featured</th>
                                <th className="px-5 py-4">Reviewed</th>
                                <th className="px-5 py-4">Created</th>
                                <th className="px-5 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#26313B]/8">
                            {filtered.map((lesson) => (
                                <tr key={lesson._id} className="align-middle">
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
                                            <div className="min-w-0">
                                                <p className="max-w-[200px] truncate font-semibold text-[#26313B]">{lesson.headline}</p>
                                                <p className="text-xs text-[#8A93A0]">{lesson.category}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-[#6B7684]">{lesson.authorName || "Unknown"}</td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${lesson.visibility === "public"
                                                    ? "bg-[#6366F1]/10 text-[#6366F1]"
                                                    : "bg-[#26313B]/8 text-[#26313B]"
                                                }`}
                                        >
                                            {lesson.visibility}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        {lesson.flagsCount > 0 ? (
                                            <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500">
                                                <PiFlagFill className="h-3 w-3" /> {lesson.flagsCount}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-[#8A93A0]">—</span>
                                        )}
                                    </td>

                                    <td className="px-5 py-4">
                                        <button
                                            onClick={() => toggleFeatured(lesson._id)}
                                            title={lesson.isFeatured ? "Remove from Featured" : "Mark as Featured"}
                                            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${lesson.isFeatured ? "bg-amber-100 text-amber-500" : "bg-[#26313B]/8 text-[#26313B]/40 hover:text-[#26313B]"
                                                }`}
                                        >
                                            {lesson.isFeatured ? <PiStarFill className="h-4 w-4" /> : <PiStarBold className="h-4 w-4" />}
                                        </button>
                                    </td>

                                    <td className="px-5 py-4">
                                        <button
                                            onClick={() => toggleReviewed(lesson._id)}
                                            title={lesson.isReviewed ? "Mark as unreviewed" : "Mark as reviewed"}
                                            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${lesson.isReviewed ? "bg-emerald-100 text-emerald-600" : "bg-[#26313B]/8 text-[#26313B]/40 hover:text-[#26313B]"
                                                }`}
                                        >
                                            {lesson.isReviewed ? <PiCheckCircleFill className="h-4 w-4" /> : <PiCheckCircleBold className="h-4 w-4" />}
                                        </button>
                                    </td>

                                    <td className="px-5 py-4 text-[#6B7684]">{formatDate(lesson.createAt)}</td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/public-lessons/${lesson._id}`}
                                                className="rounded-full border border-[#26313B]/10 px-3 py-1.5 text-xs font-semibold text-[#26313B] hover:bg-[#FBF6EC]"
                                            >
                                                View
                                            </Link>
                                            <button
                                                onClick={() => setDeleteTarget(lesson)}
                                                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100"
                                                title="Delete lesson"
                                            >
                                                <PiTrashBold className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#26313B]/40 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <h3 className="mb-1 text-lg font-bold text-[#26313B]">Delete this lesson?</h3>
                        <p className="mb-5 text-sm text-[#8A93A0]">
                            &quot;{deleteTarget.headline}&quot; will be permanently removed. This can&apos;t be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="flex-1 rounded-full border border-[#26313B]/15 py-2.5 text-sm font-semibold text-[#26313B] hover:bg-[#FBF6EC]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManageLessonsTable;