'use server'
import { collections, dbConnect } from "@/db/db";

export const postLessonData = async (payload) => {
    try {

        const lessonData = {
            ...payload,
            createdAt : new Date().toString()
        }

        console.log(lessonData);

        const data = await (dbConnect(collections.lessons)).insertOne(lessonData)
        console.log(data)
        if (data.acknowledged) {
            return true
        }

    } catch (err) {
        console.log(err);
    }
} 