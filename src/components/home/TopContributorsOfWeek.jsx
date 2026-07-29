import { getTopContributors } from "@/lib/api/forAdmin";
import Image from "next/image";
import Link from "next/link";
import { PiTrophyBold } from "react-icons/pi";


const TopContributorsOfWeek = async () => {
    // TODO: getTopContributors() should return something like
    // [{ userId, name, image, lessonCount }] sorted by lessons created this week
    const contributors = await getTopContributors();

    if (!contributors || contributors.length === 0) return null;
    // console.log(contributors);

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="mb-8 flex items-end justify-between gap-3">
                    <div>
                        <span className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                            <PiTrophyBold className="h-3.5 w-3.5" /> This Week
                        </span>
                        <h2 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">Top Contributors</h2>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {contributors.slice(0, 8).map((contributor, index) => (
                        <Link
                            key={index}
                            href={`/authors/${contributor._id}`}
                            className="flex w-44 shrink-0 flex-col items-center rounded-2xl border border-[#26313B]/8 bg-[#FBF6EC] p-5 text-center transition-shadow hover:shadow-md"
                        >
                            <span className="mb-2 self-start text-xs font-bold text-[#8A93A0]">#{index + 1}</span>
                            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#E2636B]/15">
                                {contributor.image ? (
                                    <Image src={contributor.image} alt={contributor.name} fill className="object-cover" />
                                ) : (
                                    <span className="flex h-full w-full items-center justify-center text-lg font-bold text-[#E2636B]">
                                        {contributor.name?.[0]?.toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <p className="mt-3 truncate text-sm font-bold text-[#26313B]">{contributor.name}</p>
                            <p className="mt-1 text-xs font-medium text-[#8A93A0]">{contributor.lessonCount} lessons</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopContributorsOfWeek;