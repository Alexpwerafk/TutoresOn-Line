import OpenAI from 'openai';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class SmartMatchUseCase {
  private openai: OpenAI;

  constructor(private userRepository: IUserRepository) {
    // Configurar OpenAI para usar OpenRouter
    this.openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY || '',
    });
  }

  async execute(prompt: string) {
    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'TU_CLAVE_AQUI') {
      throw new Error('La clave de OpenRouter no está configurada.');
    }

    try {
      // 1. Obtener la lista de tutores simulando la BD para que la IA los recomiende
      const tutors = await this.userRepository.findAllTutors();
      
      const systemMessage = `
        Eres un asistente inteligente para una plataforma de tutorías.
        El estudiante tiene el siguiente problema: "${prompt}"

        Tu tarea es:
        1. Identificar la materia principal.
        2. Crear un temario de 3 puntos clave para que estudien en una sesión de 1 hora.
        3. Seleccionar hasta 3 tutores ideales de la siguiente lista de tutores disponibles:
        ${JSON.stringify(tutors)}

        Responde ÚNICAMENTE con un JSON válido usando esta estructura exacta:
        {
          "subject": "Nombre de la materia identificada",
          "syllabus": ["Punto 1", "Punto 2", "Punto 3"],
          "recommendedTutors": ["ID_TUTOR_1", "ID_TUTOR_2"]
        }
      `;

      const response = await this.openai.chat.completions.create({
        model: 'google/gemini-2.5-flash-preview', // OpenRouter model o puedes usar anthropic/claude-3-haiku, openai/gpt-4o-mini
        messages: [{ role: 'user', content: systemMessage }],
        response_format: { type: 'json_object' }
      });

      const result = JSON.parse(response.choices[0]?.message?.content || '{}');
      
      // 4. Mapear los IDs recomendados a los objetos completos de los tutores
      const finalTutors = tutors.filter(t => result.recommendedTutors?.includes(t.id));
      
      return {
        subject: result.subject,
        syllabus: result.syllabus,
        tutors: finalTutors
      };

    } catch (error: any) {
      console.error('Error en SmartMatch:', error.message);
      throw new Error('No se pudo generar el Match Inteligente. Verifica tu API Key de OpenRouter.');
    }
  }
}
