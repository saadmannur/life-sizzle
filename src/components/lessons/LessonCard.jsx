import Link from "next/link";
import Image from "next/image";
import { PiLockKeyBold, PiBookOpenTextBold } from "react-icons/pi";

// TODO: replace with real premium status from session once Better Auth is wired up
const isPremiumUser = false;

const formatDate = (value) => {
    const raw = value?.$date || value;
    if (!raw) return null;
    return new Date(raw).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const LessonCard = ({ lesson }) => {
    const isLocked = lesson?.accessLevel === "premium" && !isPremiumUser;
    const createdDate = formatDate(lesson?.createAt);

    // TODO: populate creator name/photo from the users collection when joining lesson data —
    // falling back to email until then.
    const creatorName = lesson?.userName || lesson?.userEmail?.split("@")[0] || "Anonymous";
    const creatorPhoto = lesson?.userImage;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#26313B]/8 bg-white shadow-sm transition-shadow hover:shadow-lg">
            {/* Cover image */}
            <div className="relative h-40 w-full bg-[#FBF6EC]">
                {lesson?.imageUrl ? (
                    <Image
                        src={lesson.imageUrl}
                        alt={lesson?.headline || "Lesson image"}
                        fill
                        sizes="(min-width: 1024px) 25vw, 90vw"
                        className={`object-cover ${isLocked ? "blur-md" : ""}`}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <PiBookOpenTextBold className="h-10 w-10 text-[#26313B]/15" />
                    </div>
                )}

                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#26313B] shadow-sm">
                    {lesson?.category}
                </span>
            </div>

            {/* Body — blurred + locked when it's a premium lesson and the viewer isn't premium */}
            <div className={`flex flex-1 flex-col p-5 ${isLocked ? "pointer-events-none select-none blur-sm" : ""}`}>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#E2636B]/10 px-2.5 py-1 text-[11px] font-semibold text-[#E2636B]">
                        {lesson?.tone}
                    </span>
                    <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase ${lesson?.accessLevel === "premium"
                                ? "bg-[#6366F1]/10 text-[#6366F1]"
                                : "bg-[#26313B]/8 text-[#26313B]/70"
                            }`}
                    >
                        {lesson?.accessLevel}
                    </span>
                </div>

                <h3 className="mb-1.5 line-clamp-2 text-lg font-bold text-[#26313B]">{lesson?.headline}</h3>
                <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-[#6B7684]">{lesson?.lesson}</p>

                <div className="mb-4 flex items-center gap-2.5 border-t border-[#26313B]/8 pt-4">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#E2636B]/15">
                        {creatorPhoto ? (
                            <Image src={creatorPhoto} alt={creatorName} width={32}
                                height={32} className="object-cover" />
                        ) : (
                            <span className="flex h-full w-full items-center justify-center text-xs font-bold text-[#E2636B]">
                                {creatorName?.[0]?.toUpperCase()}
                            </span>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#26313B]">{creatorName}</p>
                        {createdDate && <p className="text-xs text-[#8A93A0]">{createdDate}</p>}
                    </div>
                </div>

                <Link
                    href={`/public-lessons/${lesson?._id}`}
                    className="mt-auto inline-flex items-center justify-center rounded-full bg-[#26313B] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E2636B]"
                >
                    See Details
                </Link>
            </div>

            {/* Premium lock overlay */}
            {isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/40">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6366F1] text-white shadow-lg">
                        <PiLockKeyBold className="h-5 w-5" />
                    </span>
                    <p className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#26313B] shadow-md">
                        Premium Lesson – Upgrade to view
                    </p>
                    <Link
                        href="/pricing"
                        className="rounded-full bg-[#E2636B] px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-[#E2636B]/30 hover:opacity-90"
                    >
                        Upgrade to Premium
                    </Link>
                </div>
            )}
        </div>
    );
};

export default LessonCard;