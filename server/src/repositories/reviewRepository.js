import { prisma } from '../db/prisma.js';

const mockReviewsStore = [
  {
    id: 'rev_01',
    productId: 'prod_01',
    userId: 'user_01',
    userName: 'Alexander Wright',
    rating: 5,
    title: 'INCREDIBLE 500 GSM WEIGHT',
    comment: 'The architectural boxy fit and Portuguese French Terry weight are unmatched. Truly luxury streetwear quality.',
    status: 'APPROVED',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'rev_02',
    productId: 'prod_02',
    userId: 'user_02',
    userName: 'Elena Rostova',
    rating: 5,
    title: 'PERFECT VINTAGE GARMENT WASH',
    comment: 'Heavyweight jersey feel with a high rib collar that stays sharp.',
    status: 'APPROVED',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export class ReviewRepository {
  async create(reviewData) {
    try {
      if (prisma.review) {
        return await prisma.review.create({
          data: {
            productId: reviewData.productId,
            userId: reviewData.userId,
            rating: reviewData.rating,
            title: reviewData.title || null,
            comment: reviewData.comment,
            status: reviewData.status || 'PENDING',
          },
        });
      }
    } catch {
      // Fallback in-memory
    }
    const newRev = { id: `rev_${Date.now()}`, ...reviewData, status: reviewData.status || 'PENDING', createdAt: new Date().toISOString() };
    mockReviewsStore.push(newRev);
    return newRev;
  }

  async findApprovedByProductId(productId) {
    try {
      if (prisma.review) {
        return await prisma.review.findMany({
          where: { productId, status: 'APPROVED', deletedAt: null },
          orderBy: { createdAt: 'desc' },
        });
      }
    } catch {
      // Fallback
    }
    return mockReviewsStore.filter((r) => r.productId === productId && r.status === 'APPROVED');
  }

  async findAll() {
    try {
      if (prisma.review) {
        return await prisma.review.findMany({
          orderBy: { createdAt: 'desc' },
        });
      }
    } catch {
      // Fallback
    }
    return mockReviewsStore;
  }

  async updateStatus(reviewId, status) {
    try {
      if (prisma.review) {
        return await prisma.review.update({
          where: { id: reviewId },
          data: { status },
        });
      }
    } catch {
      // Fallback
    }
    const rev = mockReviewsStore.find((r) => r.id === reviewId);
    if (rev) rev.status = status;
    return rev;
  }
}
