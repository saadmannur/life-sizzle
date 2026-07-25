

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_DB_URI;
const dbName = process.env.DB_NAME;


export const collections = {
    lessons : 'lessons',
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export const dbConnect = (collectionName) => {
    return  client.db(dbName).collection(collectionName)
}
