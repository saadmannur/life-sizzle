'use client'
import Path from "@/lib/core/pathname";
import Link from "next/link";

const SidebarNavLink = ({ href, icon: Icon, label }) => {
    const pathname = Path();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive
                    ? "bg-[#E2636B] text-white shadow-lg shadow-[#E2636B]/20"
                    : "text-[#AEB6C2] hover:bg-white/5 hover:text-white"
                }`}
        >
            <Icon className="h-5 w-5" />
            {label}
        </Link>
    );
};

export default SidebarNavLink;