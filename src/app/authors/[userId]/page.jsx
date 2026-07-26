import Image from 'next/image';
import Link from 'next/link';
import { PiArrowLeftBold, PiBookOpenTextBold } from 'react-icons/pi';
import { getLessons} from '@/lib/api/lesson';
import LessonCard from '@/components/lessons/LessonCard';
import PaginationForLesson from '@/components/lessons/PaginationForLesson';

const AuthorLessonsPage = async ({ params, searchParams }) => {
    const { userId } = await params;
    const Param = await searchParams;

    const currentPage = Number(Param?.page) || 1;

    const { lessons, totalItems } = await getLessons({
        page: currentPage,
        userId,
    })
    // console.log(lessons, totalItems);

    // The author's name/photo aren't fetched separately — they're embedded on every
    // lesson document, so we just borrow them from the first result.
    const author = lessons?.[0];

    return (
        <div className="min-h-screen bg-[#FBF6EC]">
            <div className="container mx-auto px-4 pt-8 sm:px-6">
                <Link href="/lessons" className="inline-flex items-center gap-2 text-sm font-semibold text-[#26313B] hover:text-[#E2636B]">
                    <PiArrowLeftBold className="h-4 w-4" />
                    Back to Public Lessons
                </Link>
            </div>

            {/* Author header */}
            <div className="container mx-auto mt-6 px-4 sm:px-6">
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#26313B]/8 bg-white p-8 text-center sm:flex-row sm:text-left">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#E2636B]/15">
                        {author?.userImage ? (
                            <Image src={author.userImage} alt={author?.userName} fill className="object-cover" />
                        ) : (
                            <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#E2636B]">
                                {(author?.userName || author?.userEmail || "?")[0]?.toUpperCase()}
                            </span>
                        )}
                    </div>
                    <div>
                        <span className="mb-1 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                            Author
                        </span>
                        <h1 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">
                            {author?.userName || author?.userEmail?.split("@")[0] || "Unknown author"}
                        </h1>
                        <p className="mt-1 text-sm text-[#8A93A0]">{totalItems} lesson{totalItems === 1 ? "" : "s"} shared on LifeSizzle</p>
                    </div>
                </div>
            </div>

            {/* Lessons grid */}
            <div className="container mx-auto px-4 pb-16 pt-10 sm:px-6">
                {lessons?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {lessons.map(lesson => <LessonCard
                            key={lesson._id}
                            lesson={lesson}
                        ></LessonCard>)}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-[#26313B]/15 bg-white py-16 text-center">
                        <PiBookOpenTextBold className="mx-auto mb-3 h-8 w-8 text-[#26313B]/20" />
                        <p className="text-sm font-medium text-[#8A93A0]">This author hasn&apos;t shared any lessons yet.</p>
                    </div>
                )}

                <div className="mt-10">
                    <PaginationForLesson totalItems={totalItems}></PaginationForLesson>
                </div>
            </div>
        </div>
    );
};

export default AuthorLessonsPage;