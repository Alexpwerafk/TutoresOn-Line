import { Router } from 'express';
import { MatchController } from '../controllers/MatchController';
import { SmartMatchUseCase } from '../../application/use-cases/SmartMatchUseCase';
import { UserRepositoryPrisma } from '../../infrastructure/repositories/UserRepositoryPrisma';

const router = Router();

const userRepository = new UserRepositoryPrisma(); 
const smartMatchUseCase = new SmartMatchUseCase(userRepository);
const matchController = new MatchController(smartMatchUseCase);

router.post('/smart', matchController.smartMatch);

export default router;
