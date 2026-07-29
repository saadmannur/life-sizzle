import { getLessons } from "@/lib/api/lesson";
import LessonCard from "@/components/lessons/LessonCard";
import { PiStarBold } from "react-icons/pi";

const getSortDate = (lesson) => {
    const value = lesson?.updatedAt?.$date || lesson?.updatedAt || lesson?.createAt?.$date || lesson?.createAt;
    return new Date(value);
};

const sortByNewest = (a, b) => getSortDate(b) - getSortDate(a);

const FeaturedLessons = async () => {
    const { lessons } = await getLessons({});
    const featured = (lessons || [])
        .filter((l) => l.isFeatured)
        .sort(sortByNewest)
        .slice(0, 8);

    if (featured.length === 0) return null;

    return (
        <section className="bg-[#FBF6EC] py-16">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <span className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                            <PiStarBold className="h-3.5 w-3.5" /> Curated by our team
                        </span>
                        <h2 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">Featured Life Lessons</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {featured.map((lesson) => (
                        <LessonCard key={lesson._id} lesson={lesson} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedLessons;