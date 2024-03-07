import { Router } from 'express';
import { customerController } from './controllers/CustomerController';


export const router = Router();

router.post('/api/v1/users', customerController.create);
router.get('/api/v1/users', customerController.findAll);
