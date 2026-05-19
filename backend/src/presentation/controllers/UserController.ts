import { Request, Response } from 'express';
import { GetTutorsUseCase } from '../../application/use-cases/GetTutorsUseCase';

export class UserController {
  constructor(private getTutorsUseCase: GetTutorsUseCase) {}

  // Usamos arrow function para no perder el contexto de 'this' en Express
  getTutors = async (req: Request, res: Response): Promise<void> => {
    try {
      const tutors = await this.getTutorsUseCase.execute();
      res.status(200).json({ success: true, data: tutors });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
}
