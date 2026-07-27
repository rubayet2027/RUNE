import { DropService } from '../services/DropService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { paginationQuerySchema } from '../../../shared/validators/index.js';

const dropService = new DropService();

export const getActiveDrop = asyncHandler(async (req, res) => {
  const activeDrop = await dropService.getActiveDrop();
  new ApiResponse(200, { drop: activeDrop }, 'Active preorder drop retrieved').send(res);
});

export const getDropBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const drop = await dropService.getDropBySlug(slug);
  new ApiResponse(200, { drop }, 'Drop collection details retrieved').send(res);
});

export const listDrops = asyncHandler(async (req, res) => {
  const query = paginationQuerySchema.parse(req.query);
  const result = await dropService.getPaginatedDrops(query);
  new ApiResponse(200, result, 'Drops collection retrieved').send(res);
});
