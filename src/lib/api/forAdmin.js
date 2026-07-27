
import { authHeader, protectedFetch } from "../core/server"

export const getReportedLessons = async () => {
    return protectedFetch(`/api/reported-lessons`)
}


export const getTodaysLessonsCount = async () => {
    return protectedFetch('/api/today-count/lessons')
}

const baseurl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getLessonGrowth = async () => {
    const res = await fetch(`${baseurl}/api/admin/stats/lesson-growth`, {
        cache: "no-store",
        headers: await authHeader(),
    });
    return res.json();
};

export const getUserGrowth = async () => {
    const res = await fetch(`${baseurl}/api/admin/stats/user-growth`, {
        cache: "no-store",
        headers: await authHeader(),
    });
    return res.json();
};

export const getTopContributors = async () => {
    const res = await fetch(`${baseurl}/api/admin/stats/top-contributors`, {
        cache: "no-store",
        headers: await authHeader(),
    });
    return res.json();
};