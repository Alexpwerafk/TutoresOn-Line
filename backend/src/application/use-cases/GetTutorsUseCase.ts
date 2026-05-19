import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

// Principio de Responsabilidad Única (SOLID)
// Solo se encarga de orquestar la obtención de tutores.
export class GetTutorsUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAllTutors();
  }
}
