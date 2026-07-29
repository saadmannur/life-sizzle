import Link from "next/link";
import { PiLockKeyBold } from "react-icons/pi";

const UnauthorizedPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBF6EC] px-4 text-center">
            <span className="text-8xl font-extrabold leading-none text-[#26313B]/10 sm:text-9xl">401</span>

            <span className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#26313B] text-white shadow-xl sm:h-20 sm:w-20">
                <PiLockKeyBold className="h-8 w-8 sm:h-9 sm:w-9" />
            </span>

            <h1 className="mt-6 text-2xl font-extrabold text-[#26313B] sm:text-3xl">
                You need to log in
            </h1>
            <p className="mt-3 max-w-sm text-sm text-[#6B7684]">
                This page is only available to signed-in members. Log in to your account to continue.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                    href="/login"
                    className="rounded-full bg-[#E2636B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E2636B]/30 hover:opacity-90"
                >
                    Log In
                </Link>
                <Link
                    href="/"
                    className="rounded-full border border-[#26313B]/15 px-6 py-3 text-sm font-semibold text-[#26313B] hover:bg-white"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default UnauthorizedPage;