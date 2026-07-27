import { DropRepository } from '../repositories/dropRepository.js';
import { ApiError } from '../utils/ApiError.js';

export class DropService {
  constructor() {
    this.dropRepo = new DropRepository();
  }

  async getActiveDrop() {
    const activeDrop = await this.dropRepo.findActiveDrop();
    if (!activeDrop) {
      throw ApiError.notFound('No drop is currently active. Next drop announcement coming soon.');
    }
    return activeDrop;
  }

  async getDropBySlug(slug) {
    const drop = await this.dropRepo.findBySlug(slug);
    if (!drop) {
      throw ApiError.notFound(`Drop collection for '${slug}' not found.`);
    }
    return drop;
  }

  async getPaginatedDrops(queryParams) {
    return this.dropRepo.findPaginated(queryParams);
  }
}
