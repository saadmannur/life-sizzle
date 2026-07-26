"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);

export const updateProfile = async ({ name, image }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    await client.connect();

    const db = client.db("life-sizzle");

    const result = await db.collection("user").updateOne(
        {
            _id: new ObjectId(session.user.id),
        },
        {
            $set: {
                name,
                image,
                updatedAt: new Date(),
            },
        }
    );

    return result;
};