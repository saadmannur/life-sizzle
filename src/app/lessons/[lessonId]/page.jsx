import Image from "next/image";
import Link from "next/link";
import {
    PiArrowLeftBold,
    PiEyeBold,
    PiClockBold,
    PiCalendarBold,
    PiGlobeBold,
    PiLockKeyBold,
    PiBookOpenTextBold,
} from "react-icons/pi";
import { IoDiamond } from "react-icons/io5";
import LessonCard from "@/components/lessons/LessonCard";
import LessonActions from "@/components/detailsPage/LessonActions";
import CommentSection from "@/components/detailsPage/CommentSection";

import { getLessonById, getLessonsByCategory, getLessonsByUserId } from "@/lib/api/lesson";
import { getUserSession } from "@/lib/core/session";
import { protectedFetch } from "@/lib/core/server";

const formatDate = (value) => {
    const raw = value?.$date || value;
    if (!raw) return null;
    return new Date(raw).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const readingTime = (text = "") => Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));

const LessonDetailsPage = async ({ params }) => {
    const { lessonId } = await params;

    const user = await getUserSession()

    const lesson = await getLessonById(lessonId);
    // console.log(lesson)

    let initiallySaved = false;
    let countFavorite = 0;

    if (user) {
        const favorite = await protectedFetch(`/api/favorites/check/${lessonId}`);
        initiallySaved = favorite.saved;
        countFavorite = favorite.totalItems;
    }

    if (!lesson) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#FBF6EC]">
                <p className="text-sm font-medium text-[#8A93A0]">This lesson could not be found.</p>
            </div>
        );
    }

    const isPremiumUser = user?.isPremium || user?.role === 'admin';
    const isOwner = user?.id === lesson?.userId || user?.role === 'admin'

    const isPrivateLocked = lesson?.visibility === "private" && !isOwner;
    const isPremiumLocked = lesson?.accessLevel === "premium" && !isPremiumUser && !isOwner;

    if (isPrivateLocked) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#FBF6EC] px-4 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#26313B] text-white">
                    <PiLockKeyBold className="h-6 w-6" />
                </span>
                <h1 className="text-xl font-bold text-[#26313B]">This lesson is private</h1>
                <p className="max-w-sm text-sm text-[#8A93A0]">Only its creator can view this lesson right now.</p>
                <Link href="/public-lessons" className="mt-2 rounded-full bg-[#26313B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#E2636B]">
                    Back to Public Lessons
                </Link>
            </div>
        );
    }

    // Static random view count, as allowed by the spec
    const views = Math.floor(Math.random() * 10000);
    const minutes = readingTime(lesson?.lesson);
    const createdDate = formatDate(lesson?.createAt);
    const updatedDate = formatDate(lesson?.updatedAt) || createdDate;

    // TODO: replace with a real query — total lessons by this author, and similar lessons by category/tone
    const userId = lesson?.userId;
    const category = lesson?.category;
    const authorLessons = await getLessonsByUserId(userId)
    const similarLessons = await getLessonsByCategory(category)

    const totalLessonsByAuthor = authorLessons?.totalItems ?? authorLessons?.lessons?.length ?? 1;
    const related = (similarLessons?.lessons || []).filter((l) => l._id !== lesson._id).slice(0, 6);

    return (
        <div className="min-h-screen bg-[#FBF6EC] pb-20">
            <div className="container mx-auto px-4 pt-6 sm:px-6">
                <Link href="/public-lessons" className="inline-flex items-center gap-2 text-sm font-semibold text-[#26313B] hover:text-[#E2636B]">
                    <PiArrowLeftBold className="h-4 w-4" />
                    Back to Public Lessons
                </Link>
            </div>

            <div className="container mx-auto mt-6 grid grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_320px]">
                {/* Main column */}
                <div className={isPremiumLocked ? "relative" : ""}>
                    <div className={isPremiumLocked ? "pointer-events-none select-none blur-md" : ""}>
                        {/* Meta row */}
                        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-wide text-[#E2636B]">
                            <span>{lesson?.category}</span>
                            <span className="text-[#26313B]/20">•</span>
                            <span className="flex items-center gap-1 text-[#26313B]/60">
                                <PiGlobeBold className="h-3.5 w-3.5" />
                                {lesson?.visibility}
                            </span>
                            <span className="text-[#26313B]/20">•</span>
                            <span className="flex items-center gap-1 text-[#26313B]/60">
                                <PiCalendarBold className="h-3.5 w-3.5" />
                                Last updated: {updatedDate}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-extrabold leading-tight text-[#26313B] sm:text-4xl">{lesson?.headline}</h1>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-[#E2636B]/10 px-3 py-1 text-xs font-semibold text-[#E2636B]">{lesson?.tone}</span>
                            {lesson?.accessLevel === "premium" && (
                                <span className="flex items-center gap-1 rounded-full bg-[#6366F1]/10 px-3 py-1 text-xs font-semibold uppercase text-[#6366F1]">
                                    <IoDiamond className="h-3 w-3" /> Premium
                                </span>
                            )}
                            <span className="text-sm text-[#8A93A0]">{createdDate}</span>
                        </div>

                        {/* Featured image */}
                        <div className="relative mt-6 h-72 w-full overflow-hidden rounded-2xl bg-white sm:h-96">
                            {lesson?.imageUrl ? (
                                <Image src={lesson.imageUrl} alt={lesson?.headline} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <PiBookOpenTextBold className="h-14 w-14 text-[#26313B]/15" />
                                </div>
                            )}
                        </div>

                        {/* Lesson body */}
                        <p className="mt-8 whitespace-pre-line text-base leading-relaxed text-[#3F4A57]">{lesson?.lesson}</p>

                        {/* Metadata block */}
                        <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-[#26313B]/8 bg-white p-5 sm:grid-cols-4">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-wide text-[#8A93A0]">Created</p>
                                <p className="mt-1 text-sm font-semibold text-[#26313B]">{createdDate}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-wide text-[#8A93A0]">Last Updated</p>
                                <p className="mt-1 text-sm font-semibold text-[#26313B]">{updatedDate}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-wide text-[#8A93A0]">Visibility</p>
                                <p className="mt-1 text-sm font-semibold capitalize text-[#26313B]">{lesson?.visibility}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-wide text-[#8A93A0]">Reading Time</p>
                                <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-[#26313B]">
                                    <PiClockBold className="h-3.5 w-3.5" /> {minutes} min
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 flex items-center gap-6 text-sm text-[#8A93A0]">
                            <span>❤️ {(lesson?.likes?.length ?? 0).toLocaleString()} Likes</span>
                            <span>🔖 {(countFavorite ?? 0).toLocaleString()} Favorites</span>
                            <span className="flex items-center gap-1">
                                <PiEyeBold className="h-4 w-4" /> {views.toLocaleString()} Views
                            </span>
                        </div>

                        {/* Interaction buttons */}
                        <div className="mt-6">
                            <LessonActions
                                lessonId={lesson?._id}
                                user={user}
                                initialLikesCount={lesson?.likes?.length ?? 0}
                                initiallyLiked={Boolean(user && lesson?.likes?.includes(user?.id.toString()))}
                                initiallySaved={initiallySaved}
                            />
                        </div>
                    </div>

                    {/* Premium upgrade banner over blurred content */}
                    {isPremiumLocked && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/50 text-center">
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6366F1] text-white shadow-lg">
                                <PiLockKeyBold className="h-6 w-6" />
                            </span>
                            <div>
                                <h2 className="text-xl font-bold text-[#26313B]">This is a Premium lesson</h2>
                                <p className="mt-1 max-w-xs text-sm text-[#6B7684]">Upgrade to LifeSizzle Premium to read this and every other premium lesson.</p>
                            </div>
                            <Link href="/pricing" className="flex items-center gap-2 rounded-full bg-[#E2636B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E2636B]/30 hover:opacity-90">
                                <IoDiamond className="h-4 w-4" /> Upgrade to Premium
                            </Link>
                        </div>
                    )}

                    {/* Comments — outside the blur so it still gives context, feel free to move inside the lock if you'd rather hide it too */}
                    {!isPremiumLocked && (
                        <div className="mt-10">
                            <CommentSection user={user} initialComments={lesson?.comments || []} />
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
                    <div className="rounded-2xl border border-[#26313B]/8 bg-white p-6 text-center shadow-sm">
                        <p className="mb-4 text-[11px] font-bold uppercase tracking-wide text-[#8A93A0]">Lesson Author</p>
                        <div className="relative mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full bg-[#E2636B]/15">
                            {lesson?.userImage ? (
                                <Image src={lesson.userImage} alt={lesson?.userName} fill className="object-cover" />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center text-xl font-bold text-[#E2636B]">
                                    {lesson?.userName?.[0]?.toUpperCase()}
                                </span>
                            )}
                        </div>
                        <p className="text-base font-bold text-[#26313B]">{lesson?.userName || lesson?.userEmail?.split("@")[0]}</p>
                        <p className="mt-3 rounded-full bg-[#FBF6EC] py-2 text-sm font-semibold text-[#26313B]">
                            Total Lessons: {totalLessonsByAuthor}
                        </p>
                        <Link
                            href={`/authors/${userId}`}
                            className="mt-4 block rounded-full bg-[#26313B] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E2636B]"
                        >
                            View all lessons by this author
                        </Link>
                    </div>
                </aside>
            </div>

            {/* Similar & recommended lessons */}
            {related.length > 0 && (
                <div className="container mx-auto mt-14 px-4 sm:px-6">
                    <h2 className="mb-5 text-2xl font-extrabold text-[#26313B]">More lessons like this</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((l) => (
                            <LessonCard key={l._id} lesson={l} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LessonDetailsPage;