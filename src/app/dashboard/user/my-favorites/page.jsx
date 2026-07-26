import { getUserSession } from "@/lib/core/session";

import MyFavoritesTable from "@/components/dashboard/user/MyFavoritesTable";
import { getFavoritesByUserId } from "@/lib/api/favorites";


const MyFavoritesPage = async () => {
    const user = await getUserSession();
    const favorites = await getFavoritesByUserId();

    return (
        <div className="p-4 sm:p-6 lg:p-10">
            <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                Saved For Later
            </span>
            <h1 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">My Favorites</h1>
            <p className="mt-1 text-sm text-[#8A93A0]">Lessons you&apos;ve saved to come back to.</p>

            <div className="mt-8">
                <MyFavoritesTable initialFavorites={favorites || []} />
            </div>
        </div>
    );
};

export default MyFavoritesPage;