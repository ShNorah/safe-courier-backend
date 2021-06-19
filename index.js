import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

//import routes
import parcelRoutes from './routes/parcels.js';
import userRoutes from './routes/users.js';

const app = express(); //initialize the app

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

//middlewwares
app.use('api/v1/parcels', parcelRoutes);
app.use('api/v1/users', userRoutes);

app.get('api/v1/', (req, res)=>res.send('welcome to safecourier'));



//connecting to mongodb database
const CONNECTION_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, ()=> console.log(`server runing on port ${PORT}`)))
.catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify', false)