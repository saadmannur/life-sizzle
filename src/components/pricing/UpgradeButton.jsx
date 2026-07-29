"use client";

import { useState } from "react";
import { IoDiamond } from "react-icons/io5";

const UpgradeButton = ({ className = "" }) => {
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            // TODO: wire this up to your Stripe checkout-session route, e.g.
            // const res = await fetch("/api/create-checkout-session", { method: "POST" });
            // const { url } = await res.json();
            // window.location.href = url;
            console.log("TODO: call /api/create-checkout-session and redirect to Stripe Checkout");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form action="/api/checkout_sessions" method="POST">
            <section>
                <button type="submit" role="link"
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 rounded-full bg-[#E2636B] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E2636B]/30 transition-opacity hover:opacity-90 disabled:opacity-60 ${className}`}
                >
                    <IoDiamond className="h-4 w-4" />
                    {loading ? "Redirecting to checkout..." : "Upgrade to Premium — ৳1500"}
                </button>
            </section>
        </form>

    );
};

export default UpgradeButton;