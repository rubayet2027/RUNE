import { StorageService } from '../services/StorageService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const storageService = new StorageService();

export const uploadImage = asyncHandler(async (req, res) => {
  const { originalName, imageBase64, mimeType } = req.body;

  if (!originalName || !imageBase64) {
    throw ApiError.badRequest('originalName and imageBase64 parameters are required.');
  }

  const buffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const result = await storageService.saveImage({
    originalName,
    buffer,
    mimeType: mimeType || 'image/webp',
  });

  new ApiResponse(201, result, 'Image uploaded successfully').send(res);
});
