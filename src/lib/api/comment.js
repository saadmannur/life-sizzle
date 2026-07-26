import { serverFetch } from "../core/server";

export const getCommentsByLessonId = async (lessonId) => {
    return await serverFetch(`/api/comments/${lessonId}`);
};