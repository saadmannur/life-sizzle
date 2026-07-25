import { serverFetch } from "../core/server";


const baseurl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getLessons = async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.tone) params.set('tone', filters.tone);
    if (filters.category) params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);
    if (filters.page) params.set('page', filters.page);

    const res = await fetch(`${baseurl}/api/lessons?${params.toString()}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch jobs');
    }

    return res.json();
}

export const getLessonById = async (lessonId) => {
    return serverFetch(`/api/lessons/${lessonId}`)
}

export const getLessonsByUserId = async (userId) => {
    const res = await fetch(`${baseurl}/api/lessons?userId=${userId}`);
    return res.json();
}

export const getLessonsByCategory = async (category) => {
    const res = await fetch(`${baseurl}/api/lessons?category=${category}`);
    return res.json();
}