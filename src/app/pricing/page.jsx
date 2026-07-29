import { PiCheckBold, PiXBold } from "react-icons/pi";
import { IoDiamond } from "react-icons/io5";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";
import UpgradeButton from "@/components/pricing/UpgradeButton";


const COMPARISON_ROWS = [
    { label: "Lessons you can create", free: "Unlimited free lessons", premium: "Unlimited free + premium lessons" },
    { label: "Premium lesson creation access", free: false, premium: true },
    { label: "Ad-free experience", free: false, premium: true },
    { label: "Priority listing in public lessons", free: false, premium: true },
    { label: "Access to other members' premium content", free: false, premium: true },
    { label: "Community badge / verified status", free: false, premium: true },
    { label: "Save unlimited favorites", free: true, premium: true },
    { label: "Lifetime access, one-time payment", free: "—", premium: "৳1500 once" },
];

const PricingPage = async () => {
    const user = await getUserSession();

    if (user?.isPremium) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#FBF6EC] px-4 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#6366F1] text-white shadow-lg">
                    <IoDiamond className="h-7 w-7" />
                </span>
                <h1 className="text-2xl font-extrabold text-[#26313B]">You&apos;re already Premium ⭐</h1>
                <p className="max-w-sm text-sm text-[#8A93A0]">
                    Thanks for supporting LifeSizzle — you have full access to every premium lesson and feature.
                </p>
                <Link href="/dashboard" className="mt-2 rounded-full bg-[#26313B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#E2636B]">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBF6EC] pb-20">
            <div className="container mx-auto px-4 pt-14 text-center sm:px-6">
                <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                    Simple, One-Time Pricing
                </span>
                <h1 className="text-3xl font-extrabold text-[#26313B] sm:text-4xl">
                    Unlock the Full <span className="italic text-[#E2636B]">LifeSizzle</span> Experience
                </h1>
                <p className="mx-auto mt-3 max-w-lg text-sm text-[#6B7684]">
                    One payment, lifetime access. No subscriptions, no renewals — just full access to every lesson, forever.
                </p>
            </div>

            {/* Plan cards */}
            <div className="container mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2">
                {/* Free */}
                <div className="rounded-3xl border border-[#26313B]/8 bg-white p-8">
                    <h2 className="text-lg font-bold text-[#26313B]">Free</h2>
                    <p className="mt-1 text-3xl font-extrabold text-[#26313B]">৳0</p>
                    <p className="mt-1 text-sm text-[#8A93A0]">Forever free</p>
                    <ul className="mt-6 space-y-3 text-sm text-[#4B5563]">
                        <li className="flex items-center gap-2">
                            <PiCheckBold className="h-4 w-4 text-[#26313B]" /> Write unlimited free lessons
                        </li>
                        <li className="flex items-center gap-2">
                            <PiCheckBold className="h-4 w-4 text-[#26313B]" /> Read all free public lessons
                        </li>
                        <li className="flex items-center gap-2">
                            <PiCheckBold className="h-4 w-4 text-[#26313B]" /> Save favorites
                        </li>
                        <li className="flex items-center gap-2 text-[#8A93A0]">
                            <PiXBold className="h-4 w-4" /> No premium content access
                        </li>
                    </ul>
                    <div className="mt-8 rounded-full bg-[#FBF6EC] py-3 text-center text-sm font-semibold text-[#26313B]">
                        Your current plan
                    </div>
                </div>

                {/* Premium */}
                <div className="relative rounded-3xl border-2 border-[#E2636B] bg-white p-8 shadow-xl">
                    <span className="absolute -top-3 left-8 rounded-full bg-[#E2636B] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                        Most Popular
                    </span>
                    <h2 className="flex items-center gap-2 text-lg font-bold text-[#26313B]">
                        Premium <IoDiamond className="h-4 w-4 text-[#6366F1]" />
                    </h2>
                    <p className="mt-1 text-3xl font-extrabold text-[#26313B]">৳1500</p>
                    <p className="mt-1 text-sm text-[#8A93A0]">One-time payment, lifetime access</p>
                    <ul className="mt-6 space-y-3 text-sm text-[#4B5563]">
                        <li className="flex items-center gap-2">
                            <PiCheckBold className="h-4 w-4 text-[#E2636B]" /> Everything in Free
                        </li>
                        <li className="flex items-center gap-2">
                            <PiCheckBold className="h-4 w-4 text-[#E2636B]" /> Create premium lessons
                        </li>
                        <li className="flex items-center gap-2">
                            <PiCheckBold className="h-4 w-4 text-[#E2636B]" /> Read every premium lesson
                        </li>
                        <li className="flex items-center gap-2">
                            <PiCheckBold className="h-4 w-4 text-[#E2636B]" /> Ad-free, priority listing, verified badge
                        </li>
                    </ul>
                    <div className="mt-8">
                        <UpgradeButton className="w-full" />
                    </div>
                </div>
            </div>

            {/* Comparison table */}
            <div className="container mx-auto mt-14 max-w-4xl px-4 sm:px-6">
                <h2 className="mb-5 text-center text-xl font-extrabold text-[#26313B]">Compare Plans</h2>
                <div className="overflow-x-auto rounded-2xl border border-[#26313B]/8 bg-white shadow-sm">
                    <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#26313B]/8 text-[11px] font-bold uppercase tracking-wide text-[#8A93A0]">
                                <th className="px-5 py-4">Feature</th>
                                <th className="px-5 py-4 text-center">Free</th>
                                <th className="px-5 py-4 text-center">Premium</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#26313B]/8">
                            {COMPARISON_ROWS.map((row) => (
                                <tr key={row.label}>
                                    <td className="px-5 py-4 font-medium text-[#26313B]">{row.label}</td>
                                    <td className="px-5 py-4 text-center">
                                        {typeof row.free === "boolean" ? (
                                            row.free ? (
                                                <PiCheckBold className="mx-auto h-4 w-4 text-[#26313B]" />
                                            ) : (
                                                <PiXBold className="mx-auto h-4 w-4 text-[#8A93A0]/50" />
                                            )
                                        ) : (
                                            <span className="text-[#6B7684]">{row.free}</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        {typeof row.premium === "boolean" ? (
                                            row.premium ? (
                                                <PiCheckBold className="mx-auto h-4 w-4 text-[#E2636B]" />
                                            ) : (
                                                <PiXBold className="mx-auto h-4 w-4 text-[#8A93A0]/50" />
                                            )
                                        ) : (
                                            <span className="font-semibold text-[#26313B]">{row.premium}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;