import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

// Implementación concreta (Inversión de dependencias)
export class UserRepositoryMemory implements IUserRepository {
  private users: User[] = [
    new User('1', 'Juan Perez', 'juan@tutor.com', 'TUTOR'),
    new User('2', 'Ana Gomez', 'ana@student.com', 'STUDENT'),
    new User('3', 'Carlos Ruiz', 'carlos@tutor.com', 'TUTOR')
  ];

  async findById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findAllTutors(): Promise<User[]> {
    return this.users.filter(u => u.role === 'TUTOR');
  }
}
