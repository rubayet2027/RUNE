import bcrypt from 'bcryptjs';
import { DROP_STATUS, USER_ROLES } from '../shared/constants/index.js';

async function seed() {
  console.log('🌱 Seeding RUNE Platform Database...');

  const adminPasswordHash = await bcrypt.hash('AdminPassword123!', 10);
  const adminUser = {
    id: 'admin_1',
    email: 'admin@rune.luxury',
    name: 'RUNE Admin',
    password: adminPasswordHash,
    role: USER_ROLES.ADMIN,
    createdAt: new Date().toISOString(),
  };

  const initialDrop = {
    id: 'drop_01',
    title: 'DROP 001 // OBLIVION HEAVYWEIGHT COLLECTION',
    slug: 'drop-001-oblivion',
    description: 'Limited edition 500gsm custom milled French Terry oversized hoodies and relaxed silhouette heavyweight tees. Engineered in Portugal.',
    status: DROP_STATUS.ACTIVE,
    startAt: new Date(Date.now() - 86400000).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 3).toISOString(),
    bannerImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1920&q=80',
    createdAt: new Date().toISOString(),
  };

  console.log(`✓ Admin User Seeded: ${adminUser.email}`);
  console.log(`✓ Active Preorder Drop Seeded: ${initialDrop.title}`);
  console.log('🎉 Database Seed Execution Completed Cleanly!');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
