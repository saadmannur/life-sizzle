import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db('life-sizzle');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),

    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
            },
            plan: {
                type: "string",
                defaultValue: "free",
            },
            userStatus: {
                type: "string",
                defaultValue: "active",
            },
            isPremium: {
                type: "boolean",
                defaultValue: false,
            },
        },
    },
});