

import ManageUsersTable from "@/components/dashboard/admin/ManageUsersTable";
import { getAllUsers } from "@/lib/api/usersForAdmin";

const ManageUsersPage = async () => {
    const { users, totalUsers } = await getAllUsers();

    return (
        <div className="p-4 sm:p-6 lg:p-10">
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                Admin
            </span>
            <h1 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">Manage Users</h1>
            <p className="mt-1 text-sm text-[#8A93A0]">Promote trusted users to admin, or remove accounts.</p>

            <div className="mt-8">
                <ManageUsersTable initialUsers={users || []} />
            </div>
        </div>
    );
};

export default ManageUsersPage;