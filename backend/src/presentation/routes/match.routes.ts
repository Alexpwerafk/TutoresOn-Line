import { Router } from 'express';
import { MatchController } from '../controllers/MatchController';
import { SmartMatchUseCase } from '../../application/use-cases/SmartMatchUseCase';
import { UserRepositoryMemory } from '../../infrastructure/repositories/UserRepositoryMemory';

const router = Router();

// Inyección de dependencias
const userRepository = new UserRepositoryMemory(); // Mientras conectamos Prisma 100%
const smartMatchUseCase = new SmartMatchUseCase(userRepository);
const matchController = new MatchController(smartMatchUseCase);

router.post('/smart', matchController.smartMatch);

export default router;
