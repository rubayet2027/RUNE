import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { SizeMatrix } from '../features/product/SizeMatrix.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Lock, ChevronDown, Star, MessageSquare } from 'lucide-react';

export const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openSection, setOpenSection] = useState('fabric');
  
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewStatusMsg, setReviewStatusMsg] = useState('');

  const { data: dropData, isLoading: dropLoading } = useQuery({
    queryKey: ['activeDrop'],
    queryFn: () => api.get('/drops/active'),
  });

  const drop = dropData?.data?.drop;
  const product = drop?.products.find((p) => p.slug === slug) || drop?.products[0];

  const { data: reviewsData } = useQuery({
    queryKey: ['productReviews', product?.id],
    queryFn: () => api.get(`/reviews/product/${product.id}`),
    enabled: !!product?.id,
  });

  const submitReviewMutation = useMutation({
    mutationFn: (newReview) => api.post('/reviews', newReview),
    onSuccess: () => {
      setReviewStatusMsg('Review submitted successfully and queued for moderation!');
      setReviewTitle('');
      setReviewComment('');
      queryClient.invalidateQueries(['productReviews', product?.id]);
    },
  });

  if (dropLoading || !product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-[#8E9192] font-mono text-xs uppercase tracking-[0.2em]">
        <div className="w-8 h-8 border border-white border-t-transparent animate-spin" />
        LOADING GARMENT SPECIFICATIONS...
      </div>
    );
  }

  const reviews = reviewsData?.data?.reviews || [];

  const handleReserve = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedSize,
      quantity: 1,
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    submitReviewMutation.mutate({
      productId: product.id,
      rating,
      title: reviewTitle,
      comment: reviewComment,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[3/4] bg-[#1A1A1A] overflow-hidden rounded-none border border-[#1A1A1A]">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 aspect-[3/4] overflow-hidden rounded-none border transition-all ${
                    activeImageIndex === idx
                      ? 'border-white opacity-100'
                      : 'border-[#1A1A1A] opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Specs & Actions */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4 border-b border-[#1A1A1A] pb-6">
            <div className="flex items-center gap-3">
              <Badge variant="active">PREORDER DROP 001</Badge>
              <span className="text-[10px] font-sans text-[#8E9192] uppercase tracking-[0.2em] font-semibold">
                LIMITED EDITION
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {product.name}
            </h1>
            <div className="font-mono text-2xl text-white font-bold tracking-wider">
              ${product.price} USD
            </div>
          </div>

          <p className="text-xs font-sans text-[#8E9192] leading-relaxed">
            {product.description}
          </p>

          <SizeMatrix selectedSize={selectedSize} onSelectSize={setSelectedSize} />

          <div className="space-y-4 pt-4">
            <Button fullWidth size="lg" onClick={handleReserve}>
              RESERVE SIZE {selectedSize} — ${product.price} USD
            </Button>

            <div className="bg-[#1A1A1A]/40 border border-[#1A1A1A] p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-mono text-[11px]">
                <Lock className="w-3.5 h-3.5" /> PREORDER GUARANTEE
              </div>
              <p className="text-[11px] font-sans text-[#8E9192] leading-relaxed">
                Preorder reservations remain locked until drop closes. Administrator reviews orders and submits in bulk to Printful for production.
              </p>
            </div>
          </div>

          <div className="border-t border-[#1A1A1A] pt-4 space-y-3">
            <button
              onClick={() => setOpenSection(openSection === 'fabric' ? null : 'fabric')}
              className="w-full flex justify-between items-center text-xs font-sans uppercase tracking-[0.2em] font-semibold text-white py-2 focus:outline-none"
            >
              <span>FABRIC & CRAFTSMANSHIP</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'fabric' ? 'rotate-180' : ''}`} />
            </button>
            {openSection === 'fabric' && (
              <p className="text-xs font-sans text-[#8E9192] leading-relaxed pb-2">
                Custom 500 GSM French Terry cotton milled in Portugal. Heavyweight ribbing at cuffs and hem. Double-layer hood construction with zero drawstring clutter.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="border-t border-[#1A1A1A] pt-16 space-y-10">
        <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-6">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">
              VERIFIED ATELIER REVIEWS
            </span>
            <h2 className="font-serif text-2xl font-bold text-white tracking-wider mt-1">
              CUSTOMER REVIEWS & FEEDBACK
            </h2>
          </div>
          <span className="font-mono text-xs text-[#8E9192]">
            {reviews.length} APPROVED REVIEWS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-6">
            {reviews.length === 0 ? (
              <p className="text-xs font-sans text-[#8E9192]">
                No customer reviews approved for this garment yet. Be the first to leave a review below!
              </p>
            ) : (
              reviews.map((rev) => (
                <Card key={rev.id} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-amber-300">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-[#8E9192]">{new Date(rev.createdAt).toLocaleDateString()}</span>
                  </div>
                  {rev.title && <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">{rev.title}</h4>}
                  <p className="text-xs font-sans text-[#8E9192] leading-relaxed">{rev.comment}</p>
                </Card>
              ))
            )}
          </div>

          {/* Submit Review Form */}
          <div className="lg:col-span-5">
            <Card className="space-y-6">
              <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-white" /> SUBMIT A GARMENT REVIEW
              </h3>

              {reviewStatusMsg && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  ✓ {reviewStatusMsg}
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8E9192] font-semibold">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-[#121314] border border-[#1A1A1A] text-white px-3 py-2 text-xs focus:outline-none focus:border-white"
                  >
                    <option value={5}>★★★★★ (5 Stars — Exceptional)</option>
                    <option value={4}>★★★★☆ (4 Stars — Excellent)</option>
                    <option value={3}>★★★☆☆ (3 Stars — Average)</option>
                    <option value={2}>★★☆☆☆ (2 Stars — Below Average)</option>
                    <option value={1}>★☆☆☆☆ (1 Star — Poor)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8E9192] font-semibold">
                    Review Headline (Optional)
                  </label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. INCREDIBLE 500 GSM HEAVYWEIGHT HOODIE"
                    className="w-full bg-[#121314] border border-[#1A1A1A] text-white px-3 py-2 text-xs focus:outline-none focus:border-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8E9192] font-semibold">
                    Review Comments
                  </label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                    placeholder="Describe garment weight, fit, and craftsmanship..."
                    className="w-full bg-[#121314] border border-[#1A1A1A] text-white px-3 py-2 text-xs focus:outline-none focus:border-white"
                  />
                </div>

                <Button fullWidth size="md" isLoading={submitReviewMutation.isPending} type="submit">
                  SUBMIT REVIEW FOR MODERATION
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
