"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { PiUsersThreeBold, PiShieldCheckBold, PiTrashBold, PiMagnifyingGlassBold, PiArrowsLeftRightBold } from "react-icons/pi";
import { IoDiamond } from "react-icons/io5";
import { deleteUser, updateUserRole } from "@/lib/api/usersForAdmin";

const ROLE_STYLES = {
    admin: "bg-[#E2636B]/10 text-[#E2636B]",
    user: "bg-[#26313B]/8 text-[#26313B]",
};
const PLAN_STYLES = {
    premium: "bg-[#6366F1]/10 text-[#6366F1]",
    free: "bg-[#26313B]/8 text-[#26313B]",
};

const ManageUsersTable = ({ initialUsers }) => {
    const router = useRouter();
    const [users, setUsers] = useState(() => (Array.isArray(initialUsers) ? initialUsers.filter(Boolean) : []));

    useEffect(() => {
        setUsers(Array.isArray(initialUsers) ? initialUsers.filter(Boolean) : []);
    }, [initialUsers]);
    // console.log(users);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [roleTarget, setRoleTarget] = useState(null);
    const [isUpdatingRole, setIsUpdatingRole] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const filtered = useMemo(() => {
        return users.filter(Boolean).filter((u) => {
            const matchesSearch =
                u?.name?.toLowerCase().includes(search.toLowerCase()) ||
                u?.email?.toLowerCase().includes(search.toLowerCase());
            const matchesRole = roleFilter === "all" || u?.role === roleFilter;
            return matchesSearch && matchesRole;
        });
    }, [users, search, roleFilter]);

    const roleForAction = (action) => (action === "admin" ? "admin" : "user");

    const runAction = async (user, action) => {
        if (!user?._id) return;
        const role = roleForAction(action);

        setIsUpdatingRole(true);
        try {
            const data = await updateUserRole(user._id, role);
            if (data) {
                setUsers((prev) => prev.map((u) => (u?._id === user._id ? { ...u, role } : u)));
                router.refresh();
                toast.success("User updated");
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Something went wrong. Please try again.");
        } finally {
            setIsUpdatingRole(false);
            setRoleTarget(null);
        }
    };

    const confirmDelete = async () => {
        setIsDeleting(true)
        try {
            const data = await deleteUser(deleteTarget._id);

            if (data) {
                setUsers(prev =>
                    prev.filter(user => user._id !== deleteTarget._id)
                );
                router.refresh();
                toast.success("User deleted");
            }

        } catch (err) {
            console.error(err);
            toast.error(err.message);
        } finally {
            setDeleteTarget(null);
            setIsDeleting(false)
        }
    };

    if (users.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-[#26313B]/15 bg-white py-16 text-center">
                <PiUsersThreeBold className="mx-auto mb-3 h-8 w-8 text-[#26313B]/20" />
                <p className="text-sm font-medium text-[#8A93A0]">No users found.</p>
            </div>
        );
    }

    return (
        <>
            {/* Search + filter */}
            <div className="mb-6 flex flex-wrap gap-3">
                <div className="relative">
                    <PiMagnifyingGlassBold className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A93A0]" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email"
                        className="w-64 rounded-full border border-[#26313B]/10 bg-white py-2 pl-10 pr-4 text-sm text-[#26313B] focus:border-[#E2636B] focus:outline-none"
                    />
                </div>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="rounded-full border border-[#26313B]/10 bg-white px-4 py-2 text-sm font-medium text-[#26313B] focus:border-[#E2636B] focus:outline-none"
                >
                    <option value="all">All Roles</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#26313B]/15 bg-white py-16 text-center">
                    <p className="text-sm font-medium text-[#8A93A0]">No users match these filters.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-[#26313B]/8 bg-white shadow-sm">
                    <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#26313B]/8 text-[11px] font-bold uppercase tracking-wide text-[#8A93A0]">
                                <th className="px-5 py-4">User</th>
                                <th className="px-5 py-4">Email</th>
                                <th className="px-5 py-4">Role</th>
                                <th className="px-5 py-4">User Plan</th>
                                <th className="px-5 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#26313B]/8">
                            {filtered.map((u, i) => (
                                <tr key={u?.id ?? i} className="align-middle">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            {u?.image ? (
                                                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#FBF6EC]">
                                                    <Image src={u?.image} alt={u?.name} fill className="object-cover" />
                                                </div>
                                            ) : (
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FBF6EC] text-xs font-bold text-[#26313B]">
                                                    {u?.name?.slice(0, 2).toUpperCase()}
                                                </div>
                                            )}
                                            <p className="max-w-[180px] truncate font-semibold text-[#26313B]">{u?.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-[#6B7684]">{u?.email}</td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`flex w-fit items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${ROLE_STYLES[u?.role] || ROLE_STYLES.user}`}
                                        >
                                            {u?.role === "admin" && <PiShieldCheckBold className="h-3.5 w-3.5" />}
                                            {u?.role}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`flex w-fit items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${PLAN_STYLES[u?.plan] || PLAN_STYLES.free}`}
                                        >
                                            {u?.plan === "premium" && <IoDiamond className="h-3.5 w-3.5" />}
                                            {u?.plan}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setRoleTarget(u)}
                                                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6366F1]/10 text-[#6366F1] hover:bg-[#6366F1]/20 cursor-pointer"
                                                title={u?.role === "admin" ? "Demote to user" : "Promote to admin"}
                                            >
                                                <PiArrowsLeftRightBold className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget(u)}
                                                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 cursor-pointer"
                                                title="Delete account"
                                            >
                                                <PiTrashBold className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#26313B]/40 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <h3 className="mb-1 text-lg font-bold text-[#26313B]">Delete this account?</h3>
                        <p className="mb-5 text-sm text-[#8A93A0]">
                            &quot;{deleteTarget?.name}&quot; and their data will be permanently removed. This can&apos;t be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="flex-1 rounded-full border border-[#26313B]/15 py-2.5 text-sm font-semibold text-[#26313B] hover:bg-[#FBF6EC]"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isDeleting}
                                onClick={confirmDelete}
                                className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                            >
                                {
                                    isDeleting? 'Removing...' : 'Remove'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Role change confirmation modal */}
            {roleTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#26313B]/40 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <h3 className="mb-1 text-lg font-bold text-[#26313B]">
                            {roleTarget?.role === "admin" ? "Demote to user?" : "Promote to admin?"}
                        </h3>
                        <p className="mb-5 text-sm text-[#8A93A0]">
                            {roleTarget?.role === "admin" ? (
                                <>
                                    &quot;{roleTarget?.name}&quot; will lose admin access and become a regular user.
                                </>
                            ) : (
                                <>
                                    &quot;{roleTarget?.name}&quot; will get full admin access to manage users and lessons.
                                </>
                            )}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setRoleTarget(null)}
                                disabled={isUpdatingRole}
                                className="flex-1 rounded-full border border-[#26313B]/15 py-2.5 text-sm font-semibold text-[#26313B] hover:bg-[#FBF6EC] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => runAction(roleTarget, roleTarget?.role === "admin" ? "user" : "admin")}
                                disabled={isUpdatingRole}
                                className="flex-1 rounded-full bg-[#6366F1] py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isUpdatingRole ? "Updating..." : roleTarget?.role === "admin" ? "Demote" : "Promote"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManageUsersTable;