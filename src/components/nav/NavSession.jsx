"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Dropdown, Label, Button } from "@heroui/react";
import { Person, LayoutHeaderCells, ArrowRightFromSquare, Persons } from "@gravity-ui/icons";
import { HiChevronDown } from "react-icons/hi2";
import NavLinks from "./NavLinks";
import { authClient } from "@/lib/auth-client";
import { IoDiamond } from "react-icons/io5";


const NavSession = ({ variant = "desktop" }) => {
    const pathname = usePathname();

    const { data, isPending } = authClient.useSession();
    const user = data?.user;
    console.log(user);

    const isPremium = Boolean(user?.isPremium);

    const router = useRouter()
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // redirect to login page
                },
            },
        });
    }

    // Central handler for the dropdown — routes on profile/dashboard, signs out on logout.
    const handleMenuAction = (key) => {
        if (key === "logout") handleSignOut();
    };

    if (isPending) {
        return <span className="loading loading-spinner loading-sm text-[#26313B]"></span>;
    }

    // Add Lesson / My Lessons only for logged-in users, Pricing only while on the Free plan
    const protectedLinks = user
        ? [
            { href: "/dashboard/user/new", label: "Add Lesson" },
            { href: "/dashboard/my-lessons", label: "My Lessons" },
            ...(!isPremium ? [{ href: "/pricing", label: "Pricing" }] : []),
        ]
        : [];

    const dashboardLinks = {
        user: '/dashboard/user',
        admin: '/dashboard/admin'
    }


    if (variant === "mobile") {
        return (
            <div className="flex flex-col gap-3">
                {/* User avatar + name at the top of the mobile menu */}
                {user && (
                    <div className="flex items-center gap-3 border-b border-[#26313B]/10 pb-3">
                        <Avatar size="sm">
                            <Avatar.Image referrerPolicy="no-referrer" alt={user?.name} src={user?.image} />
                            <Avatar.Fallback className="bg-[#E2636B] font-semibold text-white">
                                {user?.name?.[0]?.toUpperCase()}
                            </Avatar.Fallback>
                        </Avatar>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#26313B]">{user?.name}</p>
                            <p className="truncate text-xs text-[#8A93A0]">{user?.email}</p>
                        </div>
                        {isPremium && (
                            <span className="ml-auto shrink-0 rounded-full bg-[#E2636B]/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-[#E2636B]">
                                Premium
                            </span>
                        )}
                    </div>
                )}

                {protectedLinks.map((link) => (
                    <NavLinks key={link.href} href={link.href}>
                        {link.label}
                    </NavLinks>
                ))}

                {user && (
                    <>
                        <NavLinks href="/dashboard/profile">Profile</NavLinks>
                        <NavLinks href="/dashboard">Dashboard</NavLinks>
                    </>
                )}

                {!user ? (
                    <div className="flex items-center gap-3 pt-1">
                        <Link href="/login" className="text-sm font-semibold uppercase text-[#26313B]">
                            Log In
                        </Link>
                        <Link
                            href="/register"
                            className="rounded-full border border-[#26313B]/15 bg-white px-4 py-2 text-sm font-semibold uppercase text-[#26313B] shadow-sm"
                        >
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    <button onClick={handleSignOut} className="pt-1 text-left text-sm font-semibold uppercase text-red-500">
                        Logout
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-7">
            {protectedLinks.map((link) => (
                <NavLinks key={link.href} href={link.href}>
                    {link.label}
                </NavLinks>
            ))}

            {user && pathname !== "/login" ? (
                <div className="flex items-center gap-3">
                    {isPremium && (
                        <span className="rounded-full bg-[#E2636B]/10 px-3 py-1 text-xs font-semibold uppercase text-[#E2636B] flex items-center gap-1">
                            <IoDiamond />
                            Premium
                        </span>
                    )}

                    <Dropdown>
                        {/* Trigger is a direct child of Dropdown — no Dropdown.Trigger wrapper */}
                        <Button
                            type="button"
                            aria-label="Account menu"
                            className="flex items-center gap-2 rounded-full border border-[#26313B]/10 bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <Avatar size="sm">
                                <Avatar.Image referrerPolicy="no-referrer" alt={user?.name} src={user?.image} />
                                <Avatar.Fallback className="bg-[#E2636B] font-semibold text-white">
                                    {user?.name?.[0]?.toUpperCase()}
                                </Avatar.Fallback>
                            </Avatar>
                            <span className="hidden max-w-[100px] truncate text-sm font-semibold text-[#26313B] sm:block">
                                {user?.name}
                            </span>
                            <HiChevronDown className="h-4 w-4 text-[#8A93A0]" />
                        </Button>

                        <Dropdown.Popover className="my-2 mx-5 min-w-[230px] rounded-2xl border border-[#26313B]/10 bg-white p-2 shadow-2xl" >
                            <Dropdown.Menu onAction={handleMenuAction}>
                                <Dropdown.Item
                                    id="name"
                                    textValue={user?.name}
                                    isDisabled
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 opacity-100"
                                >
                                    <Avatar size="sm">
                                        <Avatar.Image referrerPolicy="no-referrer" alt={user?.name} src={user?.image} />
                                        <Avatar.Fallback className="bg-[#E2636B] font-semibold text-white">
                                            {user?.name?.[0]?.toUpperCase()}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <Label className="block truncate text-sm font-semibold text-[#26313B]">
                                            {user?.name}
                                        </Label>
                                        <span className="block truncate text-xs text-[#8A93A0]">{user?.email}</span>
                                    </div>
                                </Dropdown.Item>

                                <Dropdown.Item
                                    id="profile"
                                    textValue="Profile"
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#26313B] transition-colors hover:bg-[#FBF6EC]"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E2636B]/10 text-[#E2636B]">
                                        <Person className="h-4 w-4" />
                                    </span>
                                    <Label>Profile</Label>
                                </Dropdown.Item>

                                <Dropdown.Item
                                    id="dashboard"
                                    href={dashboardLinks[user?.role || "user"]}
                                    textValue="Dashboard"
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#26313B] transition-colors hover:bg-[#FBF6EC]"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366F1]/10 text-[#6366F1]">
                                        <LayoutHeaderCells className="h-4 w-4" />
                                    </span>
                                    <Label>Dashboard</Label>
                                </Dropdown.Item>


                                <Dropdown.Item
                                    id="logout"
                                    textValue="Logout"
                                    variant="danger"
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500">
                                        <ArrowRightFromSquare className="h-4 w-4" />
                                    </span>
                                    <Label>Logout</Label>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-semibold uppercase text-[#26313B] hover:text-[#E2636B]">
                        Log In
                    </Link>
                    <Link href="/register">
                        <Button className="rounded-full border border-[#26313B]/15 bg-white px-5 py-2 text-sm font-semibold uppercase text-[#26313B] shadow-sm hover:bg-[#26313B] hover:text-white">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavSession;