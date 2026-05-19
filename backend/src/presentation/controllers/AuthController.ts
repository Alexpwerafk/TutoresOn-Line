import { Request, Response } from 'express';
import { AuthUseCase } from '../../application/use-cases/AuthUseCase';

export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.authUseCase.register(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.authUseCase.login(req.body);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  }
}
