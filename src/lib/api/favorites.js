import { protectedFetch } from "../core/server";

export const getFavoritesByUserId = async () => {
    return await protectedFetch("/api/favorites");
};


export const getFavoritesCount = async () => {
    return await protectedFetch("/api/favorites/count");
};