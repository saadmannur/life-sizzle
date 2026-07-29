import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PiCheckBold, PiPlusCircleBold, PiBookOpenTextBold } from 'react-icons/pi'
import { IoDiamond } from 'react-icons/io5'
import { createSubscription } from '@/lib/actions/subscription'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {

        const subInfo = {
            email : customerEmail,
            plan : 'premium',
        }
        const result = await createSubscription(subInfo)
        // console.log(result);

        return (
            <section id="success" className="flex min-h-screen flex-col items-center justify-center bg-[#FBF6EC] px-4 py-16 text-center">
                <div className="relative">
                    <span className="absolute -inset-3 animate-ping rounded-full bg-[#E2636B]/20" />
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#E2636B] text-white shadow-xl shadow-[#E2636B]/30">
                        <PiCheckBold className="h-9 w-9" />
                    </span>
                </div>

                <span className="mt-6 flex items-center gap-1.5 rounded-full bg-[#6366F1]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#6366F1]">
                    <IoDiamond className="h-3.5 w-3.5" /> Premium Unlocked
                </span>

                <h1 className="mt-4 text-3xl font-extrabold text-[#26313B] sm:text-4xl">Payment Successful</h1>
                <p className="mt-3 max-w-md text-sm text-[#6B7684]">
                    We appreciate your business! A confirmation email will be sent to{' '}
                    <span className="font-semibold text-[#26313B]">{customerEmail}</span>. If you have any questions,
                    please email{' '}
                    <a href="mailto:orders@example.com" className="font-semibold text-[#E2636B] underline">
                        orders@example.com
                    </a>
                    .
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/dashboard/user"
                        className="rounded-full bg-[#E2636B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E2636B]/30 hover:opacity-90"
                    >
                        Go to Dashboard
                    </Link>
                    <Link
                        href="/dashboard/user/new"
                        className="flex items-center gap-2 rounded-full border border-[#26313B]/15 px-6 py-3 text-sm font-semibold text-[#26313B] hover:bg-white"
                    >
                        <PiPlusCircleBold className="h-4 w-4" /> Write a Premium Lesson
                    </Link>
                    <Link
                        href="/lessons"
                        className="flex items-center gap-2 rounded-full border border-[#26313B]/15 px-6 py-3 text-sm font-semibold text-[#26313B] hover:bg-white"
                    >
                        <PiBookOpenTextBold className="h-4 w-4" /> Browse Lessons
                    </Link>
                </div>
            </section>
        )
    }
}