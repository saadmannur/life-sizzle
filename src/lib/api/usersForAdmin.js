'use server'

import { authHeader, protectedFetch } from "../core/server"
import { auth } from "../auth"
import { headers } from "next/headers"

export const getAllUsers = async () => {
    return protectedFetch(`/api/users`)
}

export const updateUserRole = async (userId, role) => {
    const data = await auth.api.setRole({
        body: {
            userId: userId,
            role: role,
        },
        headers: await headers(),
    })
    return data;
}

export const deleteUser = async (userId) => {
    const data = await auth.api.removeUser({
        body: {
            userId,
        },
        headers: await headers(),
    });
    return data;
};


const baseurl = process.env.NEXT_PUBLIC_SERVER_URL;
export const getAllUsersWithPagination = async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.page) params.set('page', filters.page);

    const res = await fetch(`${baseurl}/api/users?${params.toString()}`, {
        cache: 'no-store',
        headers: await authHeader(),
    });
    return res.json();
}