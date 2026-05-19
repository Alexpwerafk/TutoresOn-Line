import { Request, Response } from 'express';
import { SmartMatchUseCase } from '../../application/use-cases/SmartMatchUseCase';

export class MatchController {
  constructor(private smartMatchUseCase: SmartMatchUseCase) {}

  smartMatch = async (req: Request, res: Response): Promise<void> => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        res.status(400).json({ success: false, message: 'El prompt es requerido.' });
        return;
      }

      const matchData = await this.smartMatchUseCase.execute(prompt);
      res.status(200).json({ success: true, data: matchData });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
