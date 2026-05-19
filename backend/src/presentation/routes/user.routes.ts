import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { GetTutorsUseCase } from '../../application/use-cases/GetTutorsUseCase';
import { UserRepositoryMemory } from '../../infrastructure/repositories/UserRepositoryMemory';

const router = Router();

// Inyección de dependencias manual (Se puede usar un contenedor como TSyringe)
const userRepository = new UserRepositoryMemory();
const getTutorsUseCase = new GetTutorsUseCase(userRepository);
const userController = new UserController(getTutorsUseCase);

router.get('/tutors', userController.getTutors);

export default router;
