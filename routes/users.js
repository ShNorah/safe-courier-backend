import express from 'express';
import {signin, signup, getUsers} from '../controllers/users.js';

const router = express.Router();

//http://localhost:5000/users
router.get('/', getUsers);

//sigin a user
router.post('/auth/signin', signin);

//signup a user
router.post('/auth/signup', signup);

export default router