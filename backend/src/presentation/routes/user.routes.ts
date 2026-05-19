import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { GetTutorsUseCase } from '../../application/use-cases/GetTutorsUseCase';
import { UserRepositoryPrisma } from '../../infrastructure/repositories/UserRepositoryPrisma';

const router = Router();

const userRepository = new UserRepositoryPrisma();
const getTutorsUseCase = new GetTutorsUseCase(userRepository);
const userController = new UserController(getTutorsUseCase);

router.get('/tutors', userController.getTutors);

export default router;
