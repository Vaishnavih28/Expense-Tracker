import express from'express'
import { signup, login, logout } from '../controller/auth.controller.js';
import { validateEmail, validateRequest } from '../middleware/validateEmail.js';

const router = express.Router();

router.post('/signup', validateEmail,validateRequest, signup)
router.post('/login', login)
router.post('/logout', logout)

export default router