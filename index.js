import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import './db.js';
//import routes
import parcelRoutes from './routes/parcels.js';
import userRoutes from './routes/users.js';


const app = express(); //initialize the app



app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

//middlewwares
app.use('/api/v1/parcels', parcelRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/api/v1/', (req, res)=>res.send('welcome to safecourier'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server runing on port ${PORT}`));


