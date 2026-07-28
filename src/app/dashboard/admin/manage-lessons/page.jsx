import ManageLessonsTable from "@/components/dashboard/admin/ManageLessonsTable";
import PaginationForLesson from "@/components/lessons/PaginationForLesson";
import { getReportedLessons } from "@/lib/api/forAdmin";
import { getLessons } from "@/lib/api/lesson";

// Matches the /api/reported-lessons response shape:
// { success, totalReportedLessons, data: [{ lessonId, totalReports, reports, lesson }] }
const buildFlagCounts = (reportedLessonsResponse) => {
    const list = Array.isArray(reportedLessonsResponse)
        ? reportedLessonsResponse
        : reportedLessonsResponse?.data || [];

    const counts = {};
    list.forEach((r) => {
        const lessonId = String(r?.lessonId ?? r?.lesson?.id ?? r?.lesson?._id ?? "");
        if (!lessonId) return;
        counts[lessonId] = r?.totalReports ?? r?.reports?.length ?? 1;
    });
    return counts;
};

const ManageLessonsPage = async ({ searchParams }) => {
    const param = await searchParams;
    const currentPage = Number(param?.page) || 1;

    const [{ lessons, totalItems }, reportedLessons] = await Promise.all([
        getLessons({ page: currentPage }),
        getReportedLessons(),
    ]);

    const flagCounts = buildFlagCounts(reportedLessons);

    const lessonsWithFlags = (lessons || [])
        .filter(Boolean)
        .map((l) => ({
            ...l,
            flagsCount: flagCounts[String(l?.id ?? l?._id ?? "")] ?? l?.flagsCount ?? 0,
        }));

    return (
        <div className="p-1">
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                Admin
            </span>
            <h1 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">Manage Lessons</h1>
            <p className="mt-1 text-sm text-[#8A93A0]">Review, feature, or remove lessons across the platform.</p>

            <div>
                <div className="mt-8">
                    <ManageLessonsTable initialLessons={lessonsWithFlags} />
                </div>
                <div className="mb-5 mt-4 rounded-xl bg-[#FBF6EC] p-5">
                    <PaginationForLesson totalItems={totalItems} />
                </div>
            </div>
        </div>
    );
};

export default ManageLessonsPage;