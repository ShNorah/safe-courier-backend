import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//connecting to mongodb database
const CONNECTION_URL = process.env.DB_URL;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('connection successful'))
.catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify', false)

const db = mongoose.connection;

export default db;

