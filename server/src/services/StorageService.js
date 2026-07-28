import fs from 'fs';
import path from 'path';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

const UPLOAD_DIR = path.resolve(process.cwd(), 'server', 'public', 'uploads');

export class StorageService {
  constructor() {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
  }

  async saveImage({ originalName, buffer, mimeType }) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedMimeTypes.includes(mimeType)) {
      throw ApiError.badRequest('Invalid file type. Only JPG, PNG, WEBP, and SVG images are permitted.');
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB Limit
    if (buffer && buffer.length > MAX_SIZE) {
      throw ApiError.badRequest('File size exceeds maximum 5 MB limit.');
    }

    const ext = path.extname(originalName) || '.webp';
    const filename = `img_${Date.now()}_${Math.floor(Math.random() * 1000)}${ext}`;
    const targetPath = path.join(UPLOAD_DIR, filename);

    if (buffer) {
      await fs.promises.writeFile(targetPath, buffer);
    }

    const publicUrl = `/uploads/${filename}`;
    logger.info(`[StorageService] Uploaded image ${filename} to ${publicUrl}`);

    return {
      filename,
      publicUrl,
      sizeBytes: buffer ? buffer.length : 0,
      mimeType,
    };
  }
}
