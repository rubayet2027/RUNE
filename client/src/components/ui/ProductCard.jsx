import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from './Badge.jsx';

export const ProductCard = ({ product, dropStatus }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col"
    >
      <Link
        to={`/product/${product.slug}`}
        aria-label={`View garment specifications for ${product.name} priced at $${product.price} USD`}
        className="relative aspect-[3/4] overflow-hidden bg-[#1A1A1A] mb-4 rounded-none border border-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-white"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate angle view`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
          />
        )}
        <div className="absolute top-4 left-4">
          <Badge variant={dropStatus === 'ACTIVE' ? 'active' : 'archived'}>
            {dropStatus === 'ACTIVE' ? 'PREORDER DROP' : 'ARCHIVED'}
          </Badge>
        </div>
      </Link>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between items-baseline">
          <Link
            to={`/product/${product.slug}`}
            className="font-serif text-sm uppercase font-semibold tracking-wider text-white hover:text-[#C9C6C5] transition-colors"
          >
            {product.name}
          </Link>
          <span className="font-mono text-xs text-[#8E9192] font-semibold ml-3">
            ${product.price} USD
          </span>
        </div>
        <p className="text-[11px] font-sans text-[#8E9192] line-clamp-1 leading-relaxed mt-1">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
};
