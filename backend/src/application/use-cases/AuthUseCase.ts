import { prisma } from '../../infrastructure/database/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-jwt-key';

export class AuthUseCase {
  async register(data: any) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new Error('El correo ya está registrado.');

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        fullName: data.fullName,
        role: data.role, // 'STUDENT' or 'TUTOR'
      }
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    return { token, user: { id: user.id, fullName: user.fullName, role: user.role, email: user.email } };
  }

  async login(data: any) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error('Credenciales inválidas.');

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) throw new Error('Credenciales inválidas.');

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    return { token, user: { id: user.id, fullName: user.fullName, role: user.role, email: user.email } };
  }
}
