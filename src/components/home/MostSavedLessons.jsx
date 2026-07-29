import { getLessons } from "@/lib/api/lesson";
import LessonCard from "@/components/lessons/LessonCard";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import FeaturedMotionGrid from "./FeaturedMotionGrid";

const MostSavedLessons = async () => {
    const { lessons } = await getLessons({});
    const mostSaved = (lessons || [])
        .filter((l) => l.visibility === "public" && (l.favoritesCount ?? 0) > 0)
        .sort((a, b) => (b.favoritesCount ?? 0) - (a.favoritesCount ?? 0))
        .slice(0, 8);

    if (mostSaved.length === 0) return null;

    return (
        <section className="bg-[#FBF6EC] py-16">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="mb-8">
                    <span className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                        <PiBookmarkSimpleFill className="h-3.5 w-3.5" /> Reader Favorites
                    </span>
                    <h2 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">Most Saved Lessons</h2>
                </div>

                <FeaturedMotionGrid>
                    {mostSaved.map((lesson) => (
                        <LessonCard key={lesson._id} lesson={lesson} />
                    ))}
                </FeaturedMotionGrid>

            </div>
        </section>
    );
};

export default MostSavedLessons;