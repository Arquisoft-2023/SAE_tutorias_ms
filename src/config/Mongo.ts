import 'dotenv/config';
import { connect } from 'mongoose';
import { DB_TYPE, DB_HOST, DB_PORT, DB_NAME } from './Server';
// import { DB_TYPE, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_OTHER } from './Server';

//const NODE_ENV = process.env.NODE_ENV;

async function dbConnect(): Promise<void> {
    const URI =`${DB_TYPE}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    // const URI =`${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}${DB_OTHER}`;
    await connect(URI);
}

export default dbConnect;