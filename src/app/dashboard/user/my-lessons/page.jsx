import { getUserSession } from "@/lib/core/session";
import { getLessonsByUserId } from "@/lib/api/lesson";
import MyLessonsTable from "@/components/dashboard/user/MyLessonsTable";


const MyLessonPage = async () => {
    const user = await getUserSession();
    const { lessons } = await getLessonsByUserId(user?.id);

    return (
        <div className="p-4 sm:p-6 lg:p-10">
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                Your Wisdom
            </span>
            <h1 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">My Lessons</h1>
            <p className="mt-1 text-sm text-[#8A93A0]">Manage visibility, access level, and edits for everything you&apos;ve written.</p>

            <div className="mt-8">
                <MyLessonsTable initialLessons={lessons || []} isPremiumUser={Boolean(user?.isPremium)} />
            </div>
        </div>
    );
};

export default MyLessonPage;