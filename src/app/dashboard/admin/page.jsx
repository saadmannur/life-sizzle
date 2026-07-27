import Link from "next/link";
import {
    PiUsersThreeBold,
    PiBookOpenTextBold,
    PiFlagBold,
    PiSparkleBold,
    PiArrowRightBold,
    PiTrophyBold,
    PiUserCircleFill,
} from "react-icons/pi";
import { getUserSession } from "@/lib/core/session";
import { getAllUsers } from "@/lib/api/usersForAdmin";
import { getLessons } from "@/lib/api/lesson";
import { 
    getReportedLessons, 
    getTodaysLessonsCount, 
    getLessonGrowth, 
    getUserGrowth, 
    getTopContributors 
} from "@/lib/api/forAdmin";

const getInitials = (name) => {
    if (!name || typeof name !== "string") return "U";

    const cleanName = name.trim();
    if (!cleanName) return "U";

    const parts = cleanName.split(/\s+/);

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return parts.map((p) => p[0]).slice(0, 2).join("").toUpperCase();
};

const GrowthChart = ({ title, data = [], accent }) => {
    const max = Math.max(1, ...data.map((d) => d.count || 0));
    return (
        <div className="rounded-2xl border border-[#26313B]/8 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-[#26313B]">{title}</h2>
            {data.length === 0 ? (
                <div className="flex h-36 items-center justify-center text-xs text-gray-400">
                    No activity data available
                </div>
            ) : (
                <div className="flex h-36 items-end justify-between gap-2">
                    {data.map(({ label, count }) => (
                        <div key={label} className="flex flex-1 flex-col items-center gap-2">
                            <div className="flex h-28 w-full items-end">
                                <div
                                    className={`w-full rounded-t-md ${accent} transition-all`}
                                    style={{ height: `${(count / max) * 100}%`, minHeight: count > 0 ? "8px" : "2px" }}
                                    title={`${count}`}
                                />
                            </div>
                            <span className="text-[10px] font-semibold text-[#8A93A0]">{label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const AdminHomePage = async () => {
    const user = await getUserSession();

    const [
        { totalUsers },
        { totalItems },
        reportedLessons,
        { todayLessonsCount },
        lessonGrowthData,
        userGrowthData,
        topContributorsData
    ] = await Promise.all([
        getAllUsers(),
        getLessons(),
        getReportedLessons(),
        getTodaysLessonsCount(),
        getLessonGrowth(),
        getUserGrowth(),
        getTopContributors()
    ]);


    const stats = {
        allUsers: totalUsers || 0,
        totalPublicLessons: totalItems || 0,
        totalFlaggedLessons: reportedLessons?.data?.length || 0,
        todaysNewLessons: todayLessonsCount || 0,
    };

    const statCards = [
        { label: "Total Users", value: stats.allUsers, icon: PiUsersThreeBold, accent: "text-[#6366F1] bg-[#6366F1]/10" },
        { label: "Total Public Lessons", value: stats.totalPublicLessons, icon: PiBookOpenTextBold, accent: "text-[#E2636B] bg-[#E2636B]/10" },
        { label: "Flagged / Reported", value: stats.totalFlaggedLessons, icon: PiFlagBold, accent: "text-red-500 bg-red-50" },
        { label: "Today's New Lessons", value: stats.todaysNewLessons, icon: PiSparkleBold, accent: "text-[#26313B] bg-[#26313B]/8" },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-10">
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                Admin
            </span>
            <h1 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">
                Welcome back, {user?.name || "admin"}
            </h1>
            <p className="mt-1 text-sm text-[#8A93A0]">Here&apos;s how the platform is doing today.</p>

            {/* Stat cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map(({ label, value, icon: Icon, accent }) => (
                    <div key={label} className="rounded-2xl border border-[#26313B]/8 bg-white p-5 shadow-sm">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
                            <Icon className="h-5 w-5" />
                        </span>
                        <p className="mt-4 text-2xl font-extrabold text-[#26313B]">{value.toLocaleString()}</p>
                        <p className="text-sm text-[#8A93A0]">{label}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_300px]">
                <GrowthChart title="Lesson Growth" data={lessonGrowthData} accent="bg-[#E2636B]/80" />
                <GrowthChart title="User Growth" data={userGrowthData} accent="bg-[#6366F1]/80" />

                {/* Most active contributors */}
                <div className="rounded-2xl border border-[#26313B]/8 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-[#26313B]">Top Contributors</h2>
                        <PiTrophyBold className="h-5 w-5 text-[#E2636B]" />
                    </div>
                    <div className="flex flex-col divide-y divide-[#26313B]/8">
                        {topContributorsData?.length === 0 ? (
                            <p className="py-4 text-center text-xs text-gray-400">No contributors yet</p>
                        ) : (
                            topContributorsData?.map((contributor, i) => (
                                <div key={contributor.name || i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                                    <span className="flex h-8 w-6 items-center justify-center text-xs font-bold text-[#8A93A0]">
                                        #{i + 1}
                                    </span>
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FBF6EC] text-xs font-bold text-[#26313B]">
                                        {contributor.image ? (
                                            <img src={contributor.image} alt={contributor.name} className="h-full w-full object-cover" />
                                        ) : (
                                            getInitials(contributor.name)
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-[#26313B]">{contributor.name || "Unknown User"}</p>
                                        <p className="text-xs text-[#8A93A0]">{contributor.lessons} lessons</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
                <Link
                    href="/dashboard/admin/manage-users"
                    className="flex items-center gap-2 rounded-full bg-[#26313B] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                >
                    <PiUserCircleFill className="h-4 w-4" /> Manage Users <PiArrowRightBold className="h-3.5 w-3.5" />
                </Link>
                <Link
                    href="/dashboard/admin/manage-lessons"
                    className="flex items-center gap-2 rounded-full bg-[#E2636B] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                >
                    <PiBookOpenTextBold className="h-4 w-4" /> Manage Lessons <PiArrowRightBold className="h-3.5 w-3.5" />
                </Link>
            </div>
        </div>
    );
};

export default AdminHomePage;