import Link from "next/link";
import Image from "next/image";
import { PiBookOpenTextBold, PiHeartBold, PiPlusCircleBold, PiSparkleBold, PiArrowRightBold } from "react-icons/pi";
import { getUserSession } from "@/lib/core/session";
import { getLessonsByUserId } from "@/lib/api/lesson";
import { getFavoritesCount } from "@/lib/api/favorites";

// TODO: swap for a real query — count of lessons created per day/week this month
const mockWeeklyActivity = [
    { label: "Mon", count: 1 },
    { label: "Tue", count: 0 },
    { label: "Wed", count: 2 },
    { label: "Thu", count: 1 },
    { label: "Fri", count: 3 },
    { label: "Sat", count: 0 },
    { label: "Sun", count: 2 },
];

const formatDate = (value) => {
    const raw = value?.$date || value;
    if (!raw) return null;
    return new Date(raw).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const UserDashboard = async () => {
    const user = await getUserSession();

    // TODO: getLessonsByUserId currently only returns this user's lessons + total count.
    // Favorites count needs its own query, e.g. getFavoritesByUserId(user._id).
    const { lessons, totalItems } = await getLessonsByUserId(user?.id);
    const recentLessons = (lessons || []).slice(0, 6);

    const favorites = await getFavoritesCount();
    const totalFavorites = favorites?.totalItems || 0;

    const maxActivity = Math.max(1, ...mockWeeklyActivity.map((d) => d.count));

    const stats = [
        { label: "Total Lessons Created", value: totalItems ?? 0, icon: PiBookOpenTextBold, accent: "text-[#E2636B] bg-[#E2636B]/10" },
        { label: "Total Saved", value: totalFavorites, icon: PiHeartBold, accent: "text-[#6366F1] bg-[#6366F1]/10" },
        { label: "This Week", value: mockWeeklyActivity.reduce((a, d) => a + d.count, 0), icon: PiSparkleBold, accent: "text-[#26313B] bg-[#26313B]/8" },
    ];

    const shortcuts = [
        { label: "Add a Lesson", href: "/dashboard/user/new", icon: PiPlusCircleBold },
        { label: "My Lessons", href: "/dashboard/user/my-lessons", icon: PiBookOpenTextBold },
        { label: "My Favorites", href: "/dashboard/user/my-favorites", icon: PiHeartBold },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-10">
            <h1 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">
                Welcome back, {user?.name || "friend"}
            </h1>
            <p className="mt-1 text-sm text-[#8A93A0]">Here&apos;s what&apos;s happening with your lessons.</p>

            {/* Stat cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map(({ label, value, icon: Icon, accent }) => (
                    <div key={label} className="rounded-2xl border border-[#26313B]/8 bg-white p-5 shadow-sm">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
                            <Icon className="h-5 w-5" />
                        </span>
                        <p className="mt-4 text-2xl font-extrabold text-[#26313B]">{value}</p>
                        <p className="text-sm text-[#8A93A0]">{label}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
                {/* Recently added lessons */}
                <div className="rounded-2xl border border-[#26313B]/8 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-[#26313B]">Recently Added</h2>
                        <Link href="/dashboard/user/my-lessons" className="flex items-center gap-1 text-sm font-semibold text-[#E2636B] hover:underline">
                            View all <PiArrowRightBold className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    {recentLessons.length > 0 ? (
                        <div className="flex flex-col divide-y divide-[#26313B]/8">
                            {recentLessons.map((lesson) => (
                                <Link
                                    key={lesson._id}
                                    href={`/public-lessons/${lesson._id}`}
                                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 hover:opacity-80"
                                >
                                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#FBF6EC]">
                                        {lesson.imageUrl ? (
                                            <Image src={lesson.imageUrl} alt={lesson.headline} fill className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <PiBookOpenTextBold className="h-5 w-5 text-[#26313B]/20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-[#26313B]">{lesson.headline}</p>
                                        <p className="text-xs text-[#8A93A0]">{lesson.category} · {formatDate(lesson.createAt)}</p>
                                    </div>
                                    <span className="rounded-full bg-[#FBF6EC] px-2.5 py-1 text-[11px] font-semibold capitalize text-[#26313B]/70">
                                        {lesson.visibility}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="py-6 text-center text-sm text-[#8A93A0]">You haven&apos;t written a lesson yet.</p>
                    )}
                </div>

                {/* Right column: shortcuts + weekly chart */}
                <div className="flex flex-col gap-6">
                    <div className="rounded-2xl border border-[#26313B]/8 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-bold text-[#26313B]">Quick Actions</h2>
                        <div className="flex flex-col gap-2">
                            {shortcuts.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#26313B] transition-colors hover:bg-[#FBF6EC]"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E2636B]/10 text-[#E2636B]">
                                        <Icon className="h-4 w-4" />
                                    </span>
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Simple weekly activity chart — plain CSS bars, no chart library needed */}
                    <div className="rounded-2xl border border-[#26313B]/8 bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-lg font-bold text-[#26313B]">Weekly Activity</h2>
                        <div className="flex h-32 items-end justify-between gap-2">
                            {mockWeeklyActivity.map(({ label, count }) => (
                                <div key={label} className="flex flex-1 flex-col items-center gap-2">
                                    <div className="flex h-24 w-full items-end">
                                        <div
                                            className="w-full rounded-t-md bg-[#E2636B]/80 transition-all"
                                            style={{ height: `${(count / maxActivity) * 100}%`, minHeight: count > 0 ? "8px" : "2px" }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-semibold text-[#8A93A0]">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;