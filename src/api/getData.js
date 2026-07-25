import { collections, dbConnect } from "@/db/db";

export const getLessonData = async () => {
    try{

        const data = await (dbConnect(collections.lessons)).find().toArray()
        console.log(data)
        return data

    }catch (err) {
        console.log(err);
    }
}