import { User } from '../entities/User';

// Principio de Segregación de Interfaces y Dependency Inversion (SOLID)
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  findAllTutors(): Promise<User[]>;
}
