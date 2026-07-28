"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PiBookOpenTextBold, PiPencilSimpleBold, PiTrashBold, PiHeartFill, PiBookmarkSimpleFill } from "react-icons/pi";
import { serverDelete } from "@/lib/core/server";
import { toast } from "sonner";

const formatDate = (value) => {
    const raw = value?.$date || value;
    if (!raw) return null;
    return new Date(raw).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const MyLessonsTable = ({ initialLessons, isPremiumUser }) => {
    const [lessons, setLessons] = useState(initialLessons);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false)

    const toggleVisibility = (id) => {
        // TODO: PATCH lesson.visibility on the server
        setLessons((prev) =>
            prev.map((l) => (l._id === id ? { ...l, visibility: l.visibility === "public" ? "private" : "public" } : l))
        );
    };

    const changeAccessLevel = (id, value) => {
        if (!isPremiumUser) return;
        // TODO: PATCH lesson.accessLevel on the server
        setLessons((prev) => prev.map((l) => (l._id === id ? { ...l, accessLevel: value } : l)));
    };

    const confirmDelete = async () => {
        setIsDeleting(true)

        try {

            const deleteLesson = await serverDelete(`/api/lessons/${deleteTarget._id}`);
            // console.log(deleteLesson);

            if (deleteLesson.success) {
                toast.success(deleteLesson.message)
            }

            setLessons(prev =>
                prev.filter(lesson => lesson._id !== deleteTarget._id)
            );

            setDeleteTarget(null);

        } catch (err) {

            console.log(err);

        }finally{
            setIsDeleting(false)
        }

    };

    if (lessons.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-[#26313B]/15 bg-white py-16 text-center">
                <PiBookOpenTextBold className="mx-auto mb-3 h-8 w-8 text-[#26313B]/20" />
                <p className="mb-4 text-sm font-medium text-[#8A93A0]">You haven&apos;t written any lessons yet.</p>
                <Link href="/dashboard/user/new" className="rounded-full bg-[#E2636B] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                    Write your first lesson
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="overflow-x-auto rounded-2xl border border-[#26313B]/8 bg-white shadow-sm">
                <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                    <thead>
                        <tr className="border-b border-[#26313B]/8 text-[11px] font-bold uppercase tracking-wide text-[#8A93A0]">
                            <th className="px-5 py-4">Lesson</th>
                            <th className="px-5 py-4">Visibility</th>
                            <th className="px-5 py-4">Access Level</th>
                            <th className="px-5 py-4">Created</th>
                            <th className="px-5 py-4">Reactions</th>
                            <th className="px-5 py-4">Favorites</th>
                            <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#26313B]/8">
                        {lessons.map((lesson) => (
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
                                            <p className="max-w-[220px] truncate font-semibold text-[#26313B]">{lesson.headline}</p>
                                            <p className="text-xs text-[#8A93A0]">{lesson.category} · {lesson.tone}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4">
                                    <button
                                        onClick={() => toggleVisibility(lesson._id)}
                                        className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${lesson.visibility === "public"
                                            ? "bg-[#26313B]/8 text-[#26313B]"
                                            : "bg-[#6366F1]/10 text-[#6366F1]"
                                            }`}
                                    >
                                        {lesson.visibility}
                                    </button>
                                </td>

                                <td className="px-5 py-4">
                                    <select
                                        value={lesson.accessLevel}
                                        onChange={(e) => changeAccessLevel(lesson._id, e.target.value)}
                                        disabled={!isPremiumUser}
                                        title={!isPremiumUser ? "Upgrade to Premium to create paid lessons" : undefined}
                                        className="rounded-full border border-[#26313B]/10 bg-[#FBF6EC]/60 px-3 py-1.5 text-xs font-semibold capitalize text-[#26313B] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="free">Free</option>
                                        <option value="premium">Premium</option>
                                    </select>
                                </td>

                                <td className="px-5 py-4 text-[#6B7684]">{formatDate(lesson.createAt)}</td>

                                <td className="px-5 py-4">
                                    <span className="flex items-center gap-1 text-[#26313B]/70">
                                        <PiHeartFill className="h-3.5 w-3.5 text-[#E2636B]" /> {lesson.likes?.length ?? 0}
                                    </span>
                                </td>

                                <td className="px-5 py-4">
                                    <span className="flex items-center gap-1 text-[#26313B]/70">
                                        <PiBookmarkSimpleFill className="h-3.5 w-3.5 text-[#6366F1]" /> {lesson.favoritesCount ?? 0}
                                    </span>
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/lessons/${lesson._id}`}
                                            className="rounded-full border border-[#26313B]/10 px-3 py-1.5 text-xs font-semibold text-[#26313B] hover:bg-[#FBF6EC]"
                                        >
                                            Details
                                        </Link>
                                        <Link
                                            href={`/dashboard/user/my-lessons/${lesson._id}/update`}
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#26313B]/8 text-[#26313B] hover:bg-[#26313B]/15"
                                            title="Update lesson"
                                        >
                                            <PiPencilSimpleBold className="h-3.5 w-3.5" />
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
                                disabled={isDeleting}
                                onClick={confirmDelete}
                                className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                            >
                                {
                                    isDeleting ? 'Removing...' : 'Delete'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyLessonsTable;