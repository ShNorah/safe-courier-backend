import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

//import routes
import parcelRoutes from './routes/parcels.js';

const app = express(); //initialize the app

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

app.use(cors());

//middlewwares
app.use('/parcels', parcelRoutes);



//connecting to mongodb database
const CONNECTION_URL = "mongodb+srv://sharon:sharonmdb@cluster0.95m4f.mongodb.net/safe-courier-db?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, ()=> console.log(`server runing on port ${PORT}`)))
.catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify', false)