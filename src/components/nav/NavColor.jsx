"use client";

import { usePathname } from "next/navigation";

const NavColor = ({ children }) => {
    const pathname = usePathname();
    // Reference design keeps the same warm cream bar on every page.
    // Kept as a separate client component in case you later want it
    // to vary by route (e.g. transparent on scroll, different on /dashboard).
    const isHome = pathname === "/";

    return <div className={isHome ? "bg-[#FBF6EC]" : "bg-[#FBF6EC]"}>{children}</div>;
};

export default NavColor;