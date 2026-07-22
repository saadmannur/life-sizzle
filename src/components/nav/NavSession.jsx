"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Dropdown, Label, Button } from "@heroui/react";
import { Person, LayoutHeaderCells, ArrowRightFromSquare } from "@gravity-ui/icons";
import NavLinks from "./NavLinks";

// TODO: Better Auth not implemented yet — replace this whole block later with:
// import { authClient } from "@/lib/auth-client";
// const { data, isPending } = authClient.useSession();
// const user = data?.user;
const useMockSession = () => {
    const user = null; // set to e.g. { name: "Rafi Ahmed", image: "", isPremium: false } to preview the logged-in UI
    const isPending = false;
    return { user, isPending };
};

const NavSession = ({ variant = "desktop" }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isPending } = useMockSession();
    const isPremium = Boolean(user?.isPremium);

    const handleSignOut = async () => {
        // TODO: replace with real Better Auth sign out once implemented, e.g.
        // await authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/login") } });
        router.push("/login");
    };

    if (isPending) {
        return <span className="loading loading-spinner loading-sm text-[#26313B]"></span>;
    }

    // Add Lesson / My Lessons only for logged-in users, Pricing only while on the Free plan
    const protectedLinks = user
        ? [
            { href: "/dashboard/add-lesson", label: "Add Lesson" },
            { href: "/dashboard/my-lessons", label: "My Lessons" },
            ...(!isPremium ? [{ href: "/pricing", label: "Pricing" }] : []),
        ]
        : [];

    if (variant === "mobile") {
        return (
            <div className="flex flex-col gap-2">
                {protectedLinks.map((link) => (
                    <NavLinks key={link.href} href={link.href}>
                        {link.label}
                    </NavLinks>
                ))}
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
                    <button onClick={handleSignOut} className="text-left text-sm font-semibold uppercase text-[#26313B]">
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
                        <span className="rounded-full bg-[#E2636B]/10 px-3 py-1 text-xs font-semibold uppercase text-[#E2636B]">
                            Premium
                        </span>
                    )}
                    <Dropdown>
                        <Dropdown.Trigger className="rounded-full">
                            <Avatar size="sm">
                                <Avatar.Image referrerPolicy="no-referrer" alt={user?.name} src={user?.image} />
                                <Avatar.Fallback>{user?.name?.[0]?.toUpperCase()}</Avatar.Fallback>
                            </Avatar>
                        </Dropdown.Trigger>
                        <Dropdown.Popover className="min-w-[190px]">
                            <Dropdown.Menu
                                onAction={(key) => {
                                    if (key === "logout") handleSignOut();
                                }}
                            >
                                <Dropdown.Item id="name" textValue={user?.name} isDisabled>
                                    <Label className="font-semibold">{user?.name}</Label>
                                </Dropdown.Item>
                                <Dropdown.Item id="profile" href="/dashboard/profile" textValue="Profile">
                                    <Person />
                                    <Label>Profile</Label>
                                </Dropdown.Item>
                                <Dropdown.Item id="dashboard" href="/dashboard" textValue="Dashboard">
                                    <LayoutHeaderCells />
                                    <Label>Dashboard</Label>
                                </Dropdown.Item>
                                <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                                    <ArrowRightFromSquare />
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