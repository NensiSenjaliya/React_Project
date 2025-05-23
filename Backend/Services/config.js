'use strict';

import mongoose from 'mongoose';
import config from 'config';
 import dotenv from "dotenv";
dotenv.config();


const dbURL = process.env.DB_URL;
// console.log(dbURL)

if (!dbURL) {
    console.error('DB URL empty');
    process.exit(1);
}

async function connectToDB() {
    try {
        await mongoose.connect(dbURL);
        console.log('Succefully Connected To DB');
    } catch (error) {
        console.error('Database Connection Failed');
        process.exit(1);
    }
}

connectToDB();

const db = mongoose.connection;

export default config;