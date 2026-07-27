
import ManageLessonsTable from "@/components/dashboard/admin/ManageLessonsTable";
import { getLessons } from "@/lib/api/lesson";

const ManageLessonsPage = async () => {
    const { lessons } = await getLessons();

    return (
        <div className="p-4 sm:p-6 lg:p-10">
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                Admin
            </span>
            <h1 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">Manage Lessons</h1>
            <p className="mt-1 text-sm text-[#8A93A0]">Review, feature, or remove lessons across the platform.</p>

            <div className="mt-8">
                <ManageLessonsTable initialLessons={lessons || []} />
            </div>
        </div>
    );
};

export default ManageLessonsPage;