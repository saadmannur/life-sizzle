import Link from "next/link";
import { PiCompassBold, PiBookOpenTextBold } from "react-icons/pi";

const NotFoundPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBF6EC] px-4 text-center">
            <span className="text-8xl font-extrabold leading-none text-[#26313B]/10 sm:text-9xl">404</span>

            <span className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#E2636B] text-white shadow-xl shadow-[#E2636B]/30 sm:h-20 sm:w-20">
                <PiCompassBold className="h-8 w-8 sm:h-9 sm:w-9" />
            </span>

            <h1 className="mt-6 text-2xl font-extrabold text-[#26313B] sm:text-3xl">
                This lesson hasn&apos;t been written yet
            </h1>
            <p className="mt-3 max-w-sm text-sm text-[#6B7684]">
                The page you&apos;re looking for doesn&apos;t exist, may have moved, or was never here to begin with.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                    href="/"
                    className="rounded-full bg-[#E2636B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E2636B]/30 hover:opacity-90"
                >
                    Back to Home
                </Link>
                <Link
                    href="/lessons"
                    className="flex items-center gap-2 rounded-full border border-[#26313B]/15 px-6 py-3 text-sm font-semibold text-[#26313B] hover:bg-white"
                >
                    <PiBookOpenTextBold className="h-4 w-4" /> Browse Lessons
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;