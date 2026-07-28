"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import {
    PiFlagBold,
    PiBookOpenTextBold,
    PiTrashBold,
    PiEyeBold,
    PiXBold,
    PiCheckCircleBold,
} from "react-icons/pi";

const formatDate = (value) => {
    const raw = value?.$date || value;
    if (!raw) return null;
    return new Date(raw).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

// A row's shape (per /api/reported-lessons): { lessonId, totalReports, reports, lesson }
const getRowId = (row) => row?.lessonId ?? row?.lesson?.id ?? row?.lesson?._id;

const ReportedLessonsTable = ({ initialReports }) => {
    const router = useRouter();
    const [reports, setReports] = useState(() => (Array.isArray(initialReports) ? initialReports.filter(Boolean) : []));
    const [reasonsTarget, setReasonsTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [ignoreTarget, setIgnoreTarget] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const removeRow = (id) => {
        setReports((prev) => prev.filter((row) => getRowId(row) !== id));
    };

    const confirmDeleteLesson = async () => {
        const id = getRowId(deleteTarget);
        setIsSubmitting(true);
        try {
            // TODO: DELETE the lesson on the server (and its report records)
            removeRow(id);
            router.refresh();
            toast.success("Lesson deleted");
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
            setDeleteTarget(null);
        }
    };

    const confirmIgnore = async () => {
        const id = getRowId(ignoreTarget);
        setIsSubmitting(true);
        try {
            // TODO: PATCH all reports for this lesson to status "resolved"/"ignored" on the server
            removeRow(id);
            router.refresh();
            toast.success("Reports cleared, lesson stays live");
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
            setIgnoreTarget(null);
        }
    };

    if (reports.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-[#26313B]/15 bg-white py-16 text-center">
                <PiFlagBold className="mx-auto mb-3 h-8 w-8 text-[#26313B]/20" />
                <p className="text-sm font-medium text-[#8A93A0]">No reported lessons right now — all clear.</p>
            </div>
        );
    }

    return (
        <>
            <div className="overflow-x-auto rounded-2xl border border-[#26313B]/8 bg-white shadow-sm">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <thead>
                        <tr className="border-b border-[#26313B]/8 text-[11px] font-bold uppercase tracking-wide text-[#8A93A0]">
                            <th className="px-5 py-4">Lesson</th>
                            <th className="px-5 py-4">Reports</th>
                            <th className="px-5 py-4">Reasons</th>
                            <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#26313B]/8">
                        {reports.map((row, i) => {
                            const id = getRowId(row);
                            const lesson = row?.lesson;
                            return (
                                <tr key={id ?? i} className="align-middle">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#FBF6EC]">
                                                {lesson?.imageUrl ? (
                                                    <Image src={lesson.imageUrl} alt={lesson?.headline || "Lesson"} fill className="object-cover" />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <PiBookOpenTextBold className="h-4 w-4 text-[#26313B]/20" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="max-w-[220px] truncate font-semibold text-[#26313B]">{lesson?.headline || "Untitled lesson"}</p>
                                                <p className="text-xs text-[#8A93A0]">{lesson?.category}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="flex w-fit items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500">
                                            <PiFlagBold className="h-3.5 w-3.5" /> {row?.totalReports ?? row?.reports?.length ?? 0}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <button
                                            onClick={() => setReasonsTarget(row)}
                                            className="flex items-center gap-1.5 rounded-full border border-[#26313B]/10 px-3 py-1.5 text-xs font-semibold text-[#26313B] hover:bg-[#FBF6EC]"
                                        >
                                            <PiEyeBold className="h-3.5 w-3.5" /> View Reasons
                                        </button>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {id && (
                                                <Link
                                                    href={`/lessons/${id}`}
                                                    className="rounded-full border border-[#26313B]/10 px-3 py-1.5 text-xs font-semibold text-[#26313B] hover:bg-[#FBF6EC]"
                                                >
                                                    View
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => setIgnoreTarget(row)}
                                                className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                                title="Ignore — keep lesson live and clear reports"
                                            >
                                                <PiCheckCircleBold className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget(row)}
                                                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100"
                                                title="Delete lesson"
                                            >
                                                <PiTrashBold className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Reasons modal */}
            {reasonsTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#26313B]/40 p-4">
                    <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-[#26313B]">
                                    {reasonsTarget?.lesson?.headline || "Reported lesson"}
                                </h3>
                                <p className="text-sm text-[#8A93A0]">
                                    {reasonsTarget?.totalReports ?? reasonsTarget?.reports?.length ?? 0} report(s)
                                </p>
                            </div>
                            <button
                                onClick={() => setReasonsTarget(null)}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#26313B]/8 text-[#26313B] hover:bg-[#26313B]/15"
                            >
                                <PiXBold className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex flex-col divide-y divide-[#26313B]/8">
                            {(reasonsTarget?.reports || []).map((r) => (
                                <div key={r?.reportId} className="py-3 first:pt-0 last:pb-0">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="truncate text-sm font-semibold text-[#26313B]">{r?.reporterEmail || "Unknown reporter"}</p>
                                        <p className="shrink-0 text-xs text-[#8A93A0]">{formatDate(r?.createdAt)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-[#6B7684]">{r?.reason}</p>
                                </div>
                            ))}
                            {(!reasonsTarget?.reports || reasonsTarget.reports.length === 0) && (
                                <p className="py-3 text-sm text-[#8A93A0]">No report details available.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#26313B]/40 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <h3 className="mb-1 text-lg font-bold text-[#26313B]">Delete this lesson?</h3>
                        <p className="mb-5 text-sm text-[#8A93A0]">
                            &quot;{deleteTarget?.lesson?.headline || "This lesson"}&quot; will be permanently removed from the platform. This can&apos;t be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                disabled={isSubmitting}
                                className="flex-1 rounded-full border border-[#26313B]/15 py-2.5 text-sm font-semibold text-[#26313B] hover:bg-[#FBF6EC] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteLesson}
                                disabled={isSubmitting}
                                className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Ignore confirmation modal */}
            {ignoreTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#26313B]/40 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <h3 className="mb-1 text-lg font-bold text-[#26313B]">Ignore these reports?</h3>
                        <p className="mb-5 text-sm text-[#8A93A0]">
                            &quot;{ignoreTarget?.lesson?.headline || "This lesson"}&quot; will stay live and all its current reports will be cleared.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIgnoreTarget(null)}
                                disabled={isSubmitting}
                                className="flex-1 rounded-full border border-[#26313B]/15 py-2.5 text-sm font-semibold text-[#26313B] hover:bg-[#FBF6EC] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmIgnore}
                                disabled={isSubmitting}
                                className="flex-1 rounded-full bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting ? "Clearing..." : "Ignore & Clear"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReportedLessonsTable;