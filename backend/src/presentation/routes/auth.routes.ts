import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthUseCase } from '../../application/use-cases/AuthUseCase';

const router = Router();
const authUseCase = new AuthUseCase();
const authController = new AuthController(authUseCase);

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
