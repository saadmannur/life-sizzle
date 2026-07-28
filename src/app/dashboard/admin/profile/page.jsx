import AdminProfileCard from "@/components/dashboard/admin/AdminProfileCard";
import { getUserSession } from "@/lib/core/session";


// TODO: swap for a real aggregation of this admin's moderation activity
const mockActivity = {
    lessonsModerated: 0,
    actionsTaken: 0,
};

const AdminProfilePage = async () => {
    const user = await getUserSession();

    return (
        <div className="p-4 sm:p-6 lg:p-10">
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                Admin
            </span>
            <h1 className="mb-8 text-2xl font-extrabold text-[#26313B] sm:text-3xl">Profile</h1>

            <AdminProfileCard
                user={user}
                lessonsModerated={mockActivity.lessonsModerated}
                actionsTaken={mockActivity.actionsTaken}
            />
        </div>
    );
};

export default AdminProfilePage;