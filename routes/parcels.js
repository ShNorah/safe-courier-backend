import express from 'express';

import {getParcels, createParcel, updateParcel, deleteParcel} from '../controllers/parcels.js';

import auth from '../middleware/auth.js';

const router = express.Router();

//http://localhost:5000/parcels
router.get('/', getParcels);

//create a parcel order
router.post('/', auth, createParcel);

//update parcel
router.patch('/:id', auth, updateParcel);

//deleteparcel
router.patch('/:id', auth, deleteParcel);

export default router;
