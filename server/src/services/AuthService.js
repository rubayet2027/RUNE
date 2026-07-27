import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/userRepository.js';
import { env } from '../config/env.js';
import { USER_ROLES } from '../../../shared/constants/index.js';
import { ApiError } from '../utils/ApiError.js';

export class AuthService {
  constructor() {
    this.userRepo = new UserRepository();
  }

  async register({ name, email, password }) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw ApiError.badRequest('User with this email address already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: `user_${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role: USER_ROLES.CUSTOMER,
      deletedAt: null,
      createdAt: new Date().toISOString(),
    };

    await this.userRepo.create(user);
    const token = this.generateToken(user);

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }

  async login({ email, password }) {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !user.password) {
      throw ApiError.unauthorized('Invalid email address or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email address or password');
    }

    const token = this.generateToken(user);
    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }

  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );
  }
}
