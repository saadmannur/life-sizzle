import FilterLessons from '@/components/lessons/FilterLessons';
import LessonCard from '@/components/lessons/LessonCard';
import PaginationForLesson from '@/components/lessons/PaginationForLesson';
import { getLessons } from '@/lib/api/lesson';
import React from 'react';

const BrowseLessonsPage = async ({ searchParams }) => {

    const params = await searchParams;

    const currentPage = Number(params?.page) || 1;

    const { lessons, totalItems } = await getLessons({
        tone: params?.tone,
        category: params?.category,
        search: params?.search,
        page: currentPage,
    })
    // console.log(lessons);

    return (
        <div className="min-h-screen bg-[#FBF6EC]">
            <div className="container mx-auto px-4 pt-10 sm:px-6">
                <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                    Community Wisdom
                </span>
                <h1 className="text-3xl font-extrabold text-[#26313B] sm:text-4xl">Browse Public Lessons</h1>
                <p className="mt-2 max-w-xl text-sm text-[#6B7684]">
                    Lessons shared by the LifeSizzle community — filter by category or emotional tone to find what speaks to you.
                </p>
            </div>

            <div className="container mx-auto my-8 px-4 sm:px-6">
                <FilterLessons></FilterLessons>
            </div>

            <div className="container mx-auto px-4 pb-16 sm:px-6">
                {lessons?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {lessons.map(lesson => <LessonCard
                            key={lesson._id}
                            lesson={lesson}
                        ></LessonCard>)}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-[#26313B]/15 bg-white py-16 text-center">
                        <p className="text-sm font-medium text-[#8A93A0]">No lessons match your filters yet.</p>
                    </div>
                )}

                <div className="mt-10">
                    <PaginationForLesson totalItems={totalItems}></PaginationForLesson>
                </div>
            </div>
        </div>
    );
};

export default BrowseLessonsPage;