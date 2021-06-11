import express from 'express';

import {getParcels, createParcel} from '../controllers/parcels.js';


const router = express.Router();

//http://localhost:5000/parcels
router.get('/', getParcels);

//create a parcel order
router.post('/', createParcel);
export default router;
