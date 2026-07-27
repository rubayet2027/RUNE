import { ReviewRepository } from '../repositories/reviewRepository.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

export class ReviewService {
  constructor() {
    this.reviewRepo = new ReviewRepository();
  }

  async submitReview({ productId, userId, userName, rating, title, comment }) {
    logger.info(`[ReviewService] User ${userId} submitted review for product ${productId}`);
    const reviewData = {
      productId,
      userId,
      userName: userName || 'Verified Customer',
      rating,
      title,
      comment,
      status: 'PENDING',
    };
    return this.reviewRepo.create(reviewData);
  }

  async getProductReviews(productId) {
    return this.reviewRepo.findApprovedByProductId(productId);
  }

  async getAllReviews() {
    return this.reviewRepo.findAll();
  }

  async moderateReview(reviewId, status) {
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      throw ApiError.badRequest('Invalid review moderation status');
    }
    logger.info(`[ReviewService] Moderated review ${reviewId} -> ${status}`);
    return this.reviewRepo.updateStatus(reviewId, status);
  }
}
