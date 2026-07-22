import Link from "next/link";
import { FaArrowRight, FaHeart } from "react-icons/fa6";
import { HiMiniBolt } from "react-icons/hi2";
import BannerCarousel from "./BannerCarousel";

const Banner = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FDEEE3] via-[#FDE3D9] to-[#FBD3D6]">
            {/* Decorative background wave */}
            <svg
                className="pointer-events-none absolute -top-24 left-0 w-full text-white/40"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    fill="currentColor"
                    d="M0,160 C240,260 480,60 720,80 C960,100 1200,240 1440,160 L1440,0 L0,0 Z"
                />
            </svg>

            <div className="container relative mx-auto grid grid-cols-1 items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
                {/* Left: copy */}
                <div>
                    <span className="inline-block rounded-full bg-[#E2636B] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                        #1 Life Lesson Platform
                    </span>

                    <h1 className="mt-6 text-4xl font-extrabold leading-tight text-[#26313B] sm:text-5xl lg:text-[3.4rem]">
                        Turn Your Life&apos;s Lessons Into Lasting Wisdom
                    </h1>

                    <p className="mt-6 max-w-md text-base leading-relaxed text-[#5A6472]">
                        Write down what life just taught you, organize it your way, and discover the lessons thousands of others chose to pass on.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                            href="/dashboard/add-lesson"
                            className="inline-flex items-center gap-2 rounded-full bg-[#E2636B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E2636B]/30 transition-transform hover:scale-[1.03]"
                        >
                            Start Writing
                            <FaArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                            href="/public-lessons"
                            className="inline-flex items-center gap-2 rounded-full border border-[#E2636B]/40 px-6 py-3 text-sm font-semibold text-[#E2636B] transition-colors hover:bg-[#E2636B]/10"
                        >
                            Browse Lessons
                            <FaArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>

                {/* Right: carousel + floating badges */}
                <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
                    {/* Blob glow behind the frame */}
                    <div className="absolute inset-6 -z-10 rounded-[46%_54%_58%_42%/48%_45%_55%_52%] bg-[#E2636B]/25 blur-2xl" />

                    {/* aspect-[4/5] keeps the frame's proportions consistent from mobile to desktop;
              BannerCarousel is told to fill this box (className="h-full") instead of
              using its own standalone fixed heights. */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-xl">
                        <BannerCarousel className="h-full" slideHeightClassName="h-full" />
                    </div>

                    {/* Floating badge: top-left */}
                    <div className="absolute left-2 top-8 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FCE9A8] text-lg">🏆</span>
                        <div>
                            <p className="text-sm font-bold text-[#26313B]">Reader Favorite</p>
                            <p className="text-xs text-[#8A93A0]">4.9 avg rating</p>
                        </div>
                    </div>

                    {/* Floating badge: bottom-right */}
                    <div className="absolute -bottom-2 right-0 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:right-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FCE0C6] text-[#E2636B]">
                            <HiMiniBolt className="h-5 w-5" />
                        </span>
                        <div>
                            <p className="text-sm font-bold text-[#26313B]">Free to Start</p>
                            <p className="text-xs text-[#8A93A0]">No card required</p>
                        </div>
                    </div>

                    {/* Floating reaction bubble: top-right */}
                    <div className="absolute -right-3 top-1/4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-2xl shadow-lg">
                        😍
                        <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#E2636B] text-white">
                            <FaHeart className="h-3 w-3" />
                        </span>
                    </div>

                    {/* Floating reaction bubble: bottom-left */}
                    <div className="absolute -left-4 bottom-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-xl shadow-lg">
                        🥹
                        <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#E2636B] text-white">
                            <FaHeart className="h-2.5 w-2.5" />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;