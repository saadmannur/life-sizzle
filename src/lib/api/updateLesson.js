import { serverMutation } from "../core/server";

export const updateLesson = async (lessonId, data) => {
    return await serverMutation(`/api/lessons/${lessonId}`, data, "PATCH");
};