import { Router } from 'express';
import { userController } from './controllers/UserController';


export const router = Router();

router.get('/api/v1/users', userController.findAll);
