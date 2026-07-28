import ManageUsersTable from "@/components/dashboard/admin/ManageUsersTable";
import PaginationForUsers from "@/components/dashboard/admin/PaginationForUsers";
import { getAllUsers, getAllUsersWithPagination } from "@/lib/api/usersForAdmin";
import { PiUsersThreeBold } from "react-icons/pi";

const ManageUsersPage = async ({ searchParams }) => {
    const param = await searchParams;

    const currentPage = Number(param?.page) || 1;

    const result = await getAllUsersWithPagination({
        page: currentPage,
    })

    // const result = await getAllUsers();
    const users = (result?.users || []).filter(Boolean);
    console.log(users);
    const totalUsers = result?.totalUsers ?? users.length;

    return (
        <div className="p-4 sm:p-6 lg:p-10">
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                Admin
            </span>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">Manage Users</h1>
                    <p className="mt-1 text-sm text-[#8A93A0]">Promote trusted users to admin, or remove accounts.</p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-[#26313B]/8 bg-white px-5 py-3 shadow-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6366F1]/10 text-[#6366F1]">
                        <PiUsersThreeBold className="h-5 w-5" />
                    </span>
                    <div>
                        <p className="text-xl font-extrabold leading-tight text-[#26313B]">{totalUsers.toLocaleString()}</p>
                        <p className="text-xs text-[#8A93A0]">Total Users</p>
                    </div>
                </div>
            </div>

            <div>
                <div className="mt-8">
                    <ManageUsersTable initialUsers={users} />
                </div>
                <div className="mb-5 mt-4 p-5 bg-[#FBF6EC] rounded-xl">
                    <PaginationForUsers totalItems={totalUsers}></PaginationForUsers>
                </div>
            </div>
        </div>
    );
};

export default ManageUsersPage;