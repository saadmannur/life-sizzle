import { getUserSession } from "@/lib/core/session";
import { getLessons } from "@/lib/api/lesson";

import LessonCard from "@/components/lessons/LessonCard";
import { PiBookOpenTextBold } from "react-icons/pi";
import ProfileCard from "@/components/profile/ProfileCard";
import { getFavoritesCount } from "@/lib/api/favorites";
import PaginationForLesson from "@/components/lessons/PaginationForLesson";

const UserProfilePage = async ({ searchParams }) => {
    const param = await searchParams;

    const currentPage = Number(param?.page) || 1;

    const user = await getUserSession();
    const { lessons, totalItems } = await getLessons({
        page: currentPage,
        userId: user.id,
    })
    // const user = await getUserSession();
    // const { lessons, totalItems } = await getLessonsByUserId(user?.id);

    const favorites = await getFavoritesCount();
    const totalSaved = favorites?.totalItems || 0;

    const publicLessons = (lessons || [])
        .filter((l) => l.visibility === "public")
        .sort((a, b) => new Date(b.createAt?.$date || b.createAt) - new Date(a.createAt?.$date || a.createAt));

    return (
        <div className="p-4 sm:p-6 lg:p-10">
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                Your Profile
            </span>
            <h1 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">Profile</h1>

            <div className="mt-6">
                <ProfileCard user={user} totalCreated={totalItems ?? 0} totalSaved={totalSaved} />
            </div>

            <div className="mt-10">
                <h2 className="mb-5 text-lg font-bold text-[#26313B]">Public Lessons by You</h2>

                {publicLessons.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {publicLessons.map((lesson) => (
                                <LessonCard key={lesson._id} lesson={lesson} />
                            ))}
                        </div>
                        <div className="mb-5 mt-4 p-5 bg-[#FBF6EC] rounded-xl">
                            <PaginationForLesson totalItems={totalItems}></PaginationForLesson>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-[#26313B]/15 bg-white py-16 text-center">
                        <PiBookOpenTextBold className="mx-auto mb-3 h-8 w-8 text-[#26313B]/20" />
                        <p className="text-sm font-medium text-[#8A93A0]">You haven&apos;t published any public lessons yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;