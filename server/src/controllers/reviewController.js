import { ReviewService } from '../services/ReviewService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { createReviewSchema } from '../../../shared/validators/index.js';

const reviewService = new ReviewService();

export const createReview = asyncHandler(async (req, res) => {
  const validated = createReviewSchema.parse(req.body);
  const review = await reviewService.submitReview({
    ...validated,
    userId: req.user.id,
    userName: req.user.name,
  });

  new ApiResponse(201, { review }, 'Review submitted successfully and queued for moderation').send(res);
});

export const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const reviews = await reviewService.getProductReviews(productId);
  new ApiResponse(200, { reviews }, 'Product reviews retrieved').send(res);
});

export const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getAllReviews();
  new ApiResponse(200, { reviews }, 'All product reviews retrieved for admin').send(res);
});

export const moderateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { status } = req.body;
  const updated = await reviewService.moderateReview(reviewId, status);
  new ApiResponse(200, { review: updated }, `Review status updated to ${status}`).send(res);
});
