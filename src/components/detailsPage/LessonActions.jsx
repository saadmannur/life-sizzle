"use client";

import { useState } from "react";
import { PiHeart, PiHeartFill, PiBookmarkSimple, PiBookmarkSimpleFill, PiFlagBold, PiShareNetworkBold } from "react-icons/pi";

const REPORT_REASONS = ["Spam or misleading", "Inappropriate content", "Harassment", "False information", "Other"];

// user: pass down the session user from the server component (or null if logged out)
const LessonActions = ({ lessonId, user, initialLikesCount = 0, initiallyLiked = false, initiallySaved = false }) => {
    const [liked, setLiked] = useState(initiallyLiked);
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const [saved, setSaved] = useState(initiallySaved);
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState(REPORT_REASONS[0]);
    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 2500);
    };

    const requireLogin = () => {
        showToast("Please log in to continue");
        // TODO: router.push("/login") once this is wired to real navigation, or trigger your toast lib
        return !user;
    };

    const handleLike = () => {
        if (requireLogin()) return;
        // TODO: call the API to add/remove userId from lesson.likes[]
        setLiked((prev) => !prev);
        setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    };

    const handleSave = () => {
        if (requireLogin()) return;
        // TODO: call the API to add/remove this lesson from the user's favorites
        setSaved((prev) => !prev);
        showToast(saved ? "Removed from favorites" : "Saved to favorites");
    };

    const handleReportSubmit = () => {
        // TODO: POST to lessonsReports { lessonId, reporterUserId/reportedUserEmail, reason, timestamp }
        setShowReportModal(false);
        showToast("Thanks — we'll review this lesson");
    };

    const handleShare = async () => {
        // TODO: swap for react-share buttons (FacebookShareButton, TwitterShareButton, etc.) if you want per-platform icons
        const url = typeof window !== "undefined" ? window.location.href : "";
        if (navigator.share) {
            navigator.share({ title: "A lesson on LifeSizzle", url }).catch(() => { });
        } else {
            navigator.clipboard?.writeText(url);
            showToast("Link copied to clipboard");
        }
    };

    return (
        <div className="relative flex flex-wrap items-center gap-3 border-t border-[#26313B]/8 pt-6">
            <button
                onClick={handleLike}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${liked ? "bg-[#E2636B] text-white" : "bg-[#FBF6EC] text-[#26313B] hover:bg-[#E2636B]/10"
                    }`}
            >
                {liked ? <PiHeartFill className="h-4 w-4" /> : <PiHeart className="h-4 w-4" />}
                {likesCount}
            </button>

            <button
                onClick={handleSave}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${saved ? "bg-[#26313B] text-white" : "bg-[#FBF6EC] text-[#26313B] hover:bg-[#26313B]/10"
                    }`}
            >
                {saved ? <PiBookmarkSimpleFill className="h-4 w-4" /> : <PiBookmarkSimple className="h-4 w-4" />}
                {saved ? "Saved" : "Save"}
            </button>

            <button
                onClick={handleShare}
                className="flex items-center gap-2 rounded-full bg-[#FBF6EC] px-5 py-2.5 text-sm font-semibold text-[#26313B] transition-colors hover:bg-[#26313B]/10"
            >
                <PiShareNetworkBold className="h-4 w-4" />
                Share
            </button>

            <button
                onClick={() => (requireLogin() ? null : setShowReportModal(true))}
                className="ml-auto flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-[#8A93A0] transition-colors hover:text-red-500"
            >
                <PiFlagBold className="h-4 w-4" />
                Report
            </button>

            {/* Report confirmation modal */}
            {showReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#26313B]/40 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <h3 className="mb-1 text-lg font-bold text-[#26313B]">Report this lesson</h3>
                        <p className="mb-4 text-sm text-[#8A93A0]">Let us know what&apos;s wrong—we&apos;ll take a look.</p>
                        <select
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            className="mb-5 w-full rounded-xl border border-[#26313B]/10 bg-[#FBF6EC]/60 px-4 py-2.5 text-sm text-[#26313B] focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20"
                        >
                            {REPORT_REASONS.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="flex-1 rounded-full border border-[#26313B]/15 py-2.5 text-sm font-semibold text-[#26313B] hover:bg-[#FBF6EC]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReportSubmit}
                                className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
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

export default LessonActions;