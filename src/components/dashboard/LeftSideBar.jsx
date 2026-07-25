'use client'
import Link from "next/link";
import { Button, Drawer } from "@heroui/react";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import {
    PiHouseSimpleBold,
    PiPlusCircleBold,
    PiBookOpenTextBold,
    PiHeartBold,
    PiUserBold,
    PiSquaresFourBold,
    PiUsersThreeBold,
    PiFlagBold,
    PiUserGearBold,
} from "react-icons/pi";
import { VscLayoutSidebarLeftDock } from "react-icons/vsc";
import SidebarNavLink from "./SidebarNavLink";
import { authClient } from "@/lib/auth-client";


const userNavItems = [
    { icon: PiHouseSimpleBold, href: "/dashboard/user", label: "Home" },
    { icon: PiPlusCircleBold, href: "/dashboard/user/new", label: "Add Lessons" },
    { icon: PiBookOpenTextBold, href: "/dashboard/user/my-lessons", label: "My Lessons" },
    { icon: PiHeartBold, href: "/dashboard/my-favorites", label: "My Favorites" },
    { icon: PiUserBold, href: "/dashboard/profile", label: "Profile" },
];

const adminNavItems = [
    { icon: PiSquaresFourBold , href: "/dashboard/admin", label: "Dashboard" },
    { icon: PiUsersThreeBold, href: "/dashboard/admin/manage-users", label: "Manage Users" },
    { icon: PiBookOpenTextBold, href: "/dashboard/admin/manage-lessons", label: "Manage Lessons" },
    { icon: PiFlagBold, href: "/dashboard/admin/reported-lessons", label: "Reported Lessons" },
    { icon: PiUserGearBold, href: "/dashboard/admin/profile", label: "Admin Profile" },
];

const navLinkMap = {
    user: userNavItems,
    admin: adminNavItems,
};

const RoleBadge = ({ isAdmin }) => (
    <span
        className={`mb-8 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${isAdmin ? "bg-[#6366F1]/15 text-[#8B8FF5]" : "bg-[#E2636B]/15 text-[#E2636B]"
            }`}
    >
        {isAdmin ? "Admin Panel" : "User Dashboard"}
    </span>
);

const LeftSideBar = () => {
    const { data, isPending } = authClient.useSession();
    const user = data?.user;

    const navItems = navLinkMap[user?.role || 'user'];
    const isAdmin = user?.role === "admin";

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <SidebarNavLink key={item.label} href={item.href} icon={item.icon} label={item.label} />
            ))}
        </nav>
    );

    return (
        <div className="relative">
            <div className="sticky top-0">
                {/* Desktop sidebar */}
                <aside className="hidden min-h-screen w-64 shrink-0 flex-col justify-between bg-[#1E2530] p-6 lg:flex">
                    <div>
                        <Link href="/" className="mb-3 block">
                            <span className="text-xl font-extrabold text-white">
                                Life<span className="text-[#E2636B]">Sizzle</span>
                            </span>
                        </Link>

                        <RoleBadge isAdmin={isAdmin} />

                        {navContent}
                    </div>

                    <Link
                        href="/login"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#AEB6C2] transition-colors hover:bg-white/5 hover:text-white"
                    >
                        <ArrowRightFromSquare className="h-5 w-5" />
                        Sign Out
                    </Link>
                </aside>

                {/* Mobile drawer */}
                <Drawer>
                    <Button variant="secondary" className="m-3 text-[#E2636B] lg:hidden">
                        <VscLayoutSidebarLeftDock />
                        Menu
                    </Button>
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left">
                            <Drawer.Dialog className="bg-[#1E2530] text-white">
                                <Drawer.CloseTrigger />
                                <Drawer.Header>
                                    <Drawer.Heading className="text-white">
                                        Life<span className="text-[#E2636B]">Sizzle</span>
                                    </Drawer.Heading>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <RoleBadge isAdmin={isAdmin} />
                                    {navContent}
                                    <Link
                                        href="/login"
                                        className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#AEB6C2] transition-colors hover:bg-white/5 hover:text-white"
                                    >
                                        <ArrowRightFromSquare className="h-5 w-5" />
                                        Sign Out
                                    </Link>
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </div>
    );
};

export default LeftSideBar;