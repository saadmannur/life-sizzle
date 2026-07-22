"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({ href, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`text-sm font-semibold uppercase tracking-wide transition-colors ${isActive ? "text-[#E2636B]" : "text-[#26313B] hover:text-[#E2636B]"
                }`}
        >
            {children}
        </Link>
    );
};

export default NavLinks;