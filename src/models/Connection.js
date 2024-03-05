import pg, { Client } from 'pg'

require("dotenv").config()

export default async () => {
    const client = new Client({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        port: process.env.DATABASE_PORT,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    });
    await client.connect();
    return client;
}
