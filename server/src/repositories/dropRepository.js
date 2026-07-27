import { DROP_STATUS } from '../../../shared/constants/index.js';

const mockDropsStore = [
  {
    id: 'drop_01',
    title: 'DROP 001 // OBLIVION HEAVYWEIGHT COLLECTION',
    slug: 'drop-001-oblivion',
    description: 'Limited edition 500gsm custom milled French Terry oversized hoodies and relaxed silhouette heavyweight tees. Engineered in Portugal.',
    status: DROP_STATUS.ACTIVE,
    startAt: new Date(Date.now() - 86400000).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 3).toISOString(),
    bannerImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1920&q=80',
    deletedAt: null,
    createdAt: new Date().toISOString(),
    products: [
      {
        id: 'prod_01',
        name: 'OBLIVION OVERSIZED HOODIE - ONYX BLACK',
        slug: 'oblivion-oversized-hoodie-onyx',
        price: 180,
        currency: 'USD',
        description: '500 GSM Milled Cotton French Terry. Double-layered hood, dropped shoulders, boxy architectural cut.',
        images: [
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
        ],
        variants: [
          { id: 'var_01_s', size: 'S', color: 'Onyx', stockLimit: 50 },
          { id: 'var_01_m', size: 'M', color: 'Onyx', stockLimit: 100 },
          { id: 'var_01_l', size: 'L', color: 'Onyx', stockLimit: 100 },
          { id: 'var_01_xl', size: 'XL', color: 'Onyx', stockLimit: 50 },
        ],
      },
      {
        id: 'prod_02',
        name: 'ARCHIVAL MONOLITH HEAVYWEIGHT TEE - WASHED GREY',
        slug: 'monolith-heavyweight-tee-washed-grey',
        price: 95,
        currency: 'USD',
        description: '300 GSM Combed Jersey Cotton. Vintage garment wash, high rib collar, relaxed dropped sleeve.',
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
        ],
        variants: [
          { id: 'var_02_s', size: 'S', color: 'Washed Grey', stockLimit: 40 },
          { id: 'var_02_m', size: 'M', color: 'Washed Grey', stockLimit: 80 },
          { id: 'var_02_l', size: 'L', color: 'Washed Grey', stockLimit: 80 },
          { id: 'var_02_xl', size: 'XL', color: 'Washed Grey', stockLimit: 40 },
        ],
      },
    ],
  },
  {
    id: 'drop_00',
    title: 'DROP 000 // ARCHIVAL PROTOTYPES',
    slug: 'drop-000-archival-prototypes',
    description: 'Initial capsule drop. Permanently archived.',
    status: DROP_STATUS.ARCHIVED,
    startAt: '2026-05-01T00:00:00Z',
    endAt: '2026-05-05T00:00:00Z',
    bannerImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=80',
    deletedAt: null,
    createdAt: '2026-05-01T00:00:00Z',
    products: [],
  },
];

export class DropRepository {
  async findActiveDrop() {
    return mockDropsStore.find((d) => d.status === DROP_STATUS.ACTIVE && !d.deletedAt) || null;
  }

  async findBySlug(slug) {
    return mockDropsStore.find((d) => d.slug === slug && !d.deletedAt) || null;
  }

  async findById(id) {
    return mockDropsStore.find((d) => d.id === id && !d.deletedAt) || null;
  }

  async findPaginated({ page = 1, limit = 10, status, search }) {
    let filtered = mockDropsStore.filter((d) => !d.deletedAt);
    if (status) {
      filtered = filtered.filter((d) => d.status === status.toUpperCase());
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((d) => d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / limit) || 1;
    const offset = (page - 1) * limit;
    const items = filtered.slice(offset, offset + limit);

    return {
      items,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}
