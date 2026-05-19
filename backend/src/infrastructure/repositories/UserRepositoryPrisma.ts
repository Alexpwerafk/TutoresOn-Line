import { prisma } from '../database/prisma';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class UserRepositoryPrisma implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(user.id, user.fullName, user.email, user.role as 'STUDENT' | 'TUTOR');
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.id, user.fullName, user.email, user.role as 'STUDENT' | 'TUTOR');
  }

  async save(user: User): Promise<void> {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      create: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        passwordHash: '', // Set elsewhere in real auth
      }
    });
  }

  async findAllTutors(): Promise<User[]> {
    const users = await prisma.user.findMany({ where: { role: 'TUTOR' } });
    return users.map(u => new User(u.id, u.fullName, u.email, 'TUTOR'));
  }
}
