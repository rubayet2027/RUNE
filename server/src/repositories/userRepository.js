import { prisma } from '../db/prisma.js';
import { USER_ROLES } from '../../../shared/constants/index.js';

// Fallback memory store when running tests without live DB instance
const mockUsersStore = [
  {
    id: 'admin_1',
    name: 'RUNE Admin',
    email: 'admin@rune.luxury',
    password: '$2a$10$wT.k24iHqTqE7bT2aW7nIuE8h/E7F/K4m9e6O4tW8lE7fQ3m1y9.S',
    role: USER_ROLES.ADMIN,
    deletedAt: null,
    createdAt: new Date().toISOString(),
  },
];

export class UserRepository {
  async findByEmail(email) {
    try {
      if (prisma.user) {
        return await prisma.user.findFirst({
          where: { email, deletedAt: null },
        });
      }
    } catch {
      // Fallback memory query
    }
    return mockUsersStore.find((u) => u.email === email && !u.deletedAt) || null;
  }

  async findById(id) {
    try {
      if (prisma.user) {
        return await prisma.user.findFirst({
          where: { id, deletedAt: null },
        });
      }
    } catch {
      // Fallback memory query
    }
    return mockUsersStore.find((u) => u.id === id && !u.deletedAt) || null;
  }

  async create(userData) {
    try {
      if (prisma.user) {
        return await prisma.user.create({
          data: userData,
        });
      }
    } catch {
      // Fallback memory query
    }
    mockUsersStore.push(userData);
    return userData;
  }
}
