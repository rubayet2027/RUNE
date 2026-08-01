import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from './Badge.jsx';

export const ProductCard = ({ product, dropStatus }) => {
  const [primaryLoaded, setPrimaryLoaded] = useState(false);
  const [altLoaded, setAltLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="group flex flex-col"
    >
      {/* Product Image Link Container */}
      <Link
        to={`/product/${product.slug}`}
        aria-label={`View garment specifications for ${product.name} priced at $${product.price} USD`}
        className="relative aspect-[3/4] overflow-hidden bg-rune-surface mb-4 rounded-none border border-rune-border group-hover:border-rune-primary group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[0.25,1,0.5,1] focus:outline-none focus:ring-2 focus:ring-rune-primary"
      >
        {/* Skeleton Placeholder */}
        {!primaryLoaded && (
          <div className="absolute inset-0 rune-skeleton z-10" />
        )}

        <img
          src={product.images[0]}
          alt={product.name}
          onLoad={() => setPrimaryLoaded(true)}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover object-center transition-all duration-[1200ms] ease-[0.25,1,0.5,1] ${
            primaryLoaded ? 'opacity-100' : 'opacity-0 scale-105'
          } group-hover:scale-[1.08]`}
        />

        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate angle view`}
            onLoad={() => setAltLoaded(true)}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[1200ms] ease-[0.25,1,0.5,1] opacity-0 ${
              altLoaded ? 'group-hover:opacity-100 group-hover:scale-[1.08]' : ''
            }`}
          />
        )}

        <div className="absolute top-4 left-4 z-20">
          <Badge variant={dropStatus === 'ACTIVE' ? 'active' : 'archived'}>
            {dropStatus === 'ACTIVE' ? 'PREORDER DROP' : 'ARCHIVED'}
          </Badge>
        </div>
      </Link>

      {/* Details with Animated Slide/Fade Interaction */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between items-baseline h-6 overflow-hidden">
          <Link
            to={`/product/${product.slug}`}
            className="font-serif text-sm uppercase font-bold tracking-wide text-rune-primary hover:text-rune-secondary transition-colors"
          >
            {product.name}
          </Link>
          
          {/* Price Fades / CTA Slides Up */}
          <div className="relative h-6 w-24 overflow-hidden flex justify-end items-center">
            <span className="absolute right-0 font-mono text-xs text-rune-secondary font-semibold group-hover:-translate-y-6 group-hover:opacity-0 transition-all duration-500 ease-[0.25,1,0.5,1]">
              ${product.price} USD
            </span>
            <span className="absolute right-0 font-sans text-[10px] font-bold uppercase tracking-widest text-rune-primary translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[0.25,1,0.5,1]">
              {dropStatus === 'ACTIVE' ? 'ADD PREORDER' : 'VIEW DESIGN'}
            </span>
          </div>
        </div>
        <p className="text-[11px] font-sans text-rune-secondary line-clamp-1 leading-relaxed mt-1">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
};
