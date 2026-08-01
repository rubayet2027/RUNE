import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { CountdownTimer } from '../components/ui/CountdownTimer.jsx';
import { ProductCard } from '../components/ui/ProductCard.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { PageLoader } from '../components/ui/Loader.jsx';
import { Marquee } from '../components/ui/Marquee.jsx';
import { Lock, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export const DropPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['activeDrop'],
    queryFn: () => api.get('/drops/active'),
  });

  const heroRef = useRef(null);
  const bannerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const timerRef = useRef(null);
  const manifestoRef = useRef(null);
  const piecesRef = useRef(null);

  const { theme } = useTheme();
  const drop = data?.data?.drop;
  const isInitialThemeRef = useRef(true);

  useEffect(() => {
    if (isLoading || !drop) return;

    // Split text for hero title reveal
    let splitTitle;
    if (titleRef.current) {
      splitTitle = new SplitType(titleRef.current, { types: 'words,chars' });
    }

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Initial styling states for synchronous reveal
    gsap.set(bannerRef.current, { scale: 1.15, opacity: 0 });
    gsap.set(descRef.current, { y: 20, opacity: 0 });
    gsap.set(timerRef.current, { y: 30, opacity: 0 });

    if (splitTitle && splitTitle.chars) {
      gsap.set(splitTitle.chars, { y: '100%', opacity: 0 });
    }

    const targetOpacity = theme === 'light' ? 0.55 : 0.25;

    // GSAP Timeline Execution
    tl.to(bannerRef.current, { opacity: targetOpacity, scale: 1.05, duration: 2.2, ease: 'sine.out' })
      .to(splitTitle.chars, { y: '0%', opacity: 1, duration: 1.2, stagger: 0.02 }, '-=1.6')
      .to(descRef.current, { y: 0, opacity: 1, duration: 0.8 }, '-=0.8')
      .to(timerRef.current, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6');

    // Subtle parallax scrolling on background image
    gsap.to(bannerRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Reveal Manifesto Section
    gsap.fromTo(
      manifestoRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Reveal Showcase pieces header
    gsap.fromTo(
      piecesRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: piecesRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );

    return () => {
      if (splitTitle) splitTitle.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isLoading, drop]);

  // Smoothly transition background banner opacity on theme switch
  useEffect(() => {
    if (isInitialThemeRef.current) {
      isInitialThemeRef.current = false;
      return;
    }
    if (!bannerRef.current) return;
    const targetOpacity = theme === 'light' ? 0.55 : 0.25;
    gsap.to(bannerRef.current, {
      opacity: targetOpacity,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, [theme]);

  if (isLoading) return <PageLoader />;

  if (isError) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-rune-secondary p-6 text-center">
        <span className="text-xs uppercase font-mono tracking-[0.2em] text-red-400">
          DROP UNAVAILABLE // {error?.message}
        </span>
        <p className="text-sm font-sans text-rune-secondary max-w-md">
          Next limited preorder drop announcement coming soon. Join below for private VIP drop notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 bg-rune-bg">
      {/* Hero Banner with Parallax and synchronized entrance animations */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-rune-bg border-b border-rune-border"
      >
        <img
          ref={bannerRef}
          src={drop.bannerImage}
          alt={drop.title}
          className="absolute inset-0 w-full h-full object-cover object-center mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rune-bg via-rune-bg/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 py-24">
          <div className="inline-flex items-center gap-2">
            <Badge variant="active">LIVE PREORDER DROP</Badge>
          </div>

          <div className="overflow-hidden">
            <h1
              ref={titleRef}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-rune-primary max-w-4xl mx-auto leading-[1.1]"
            >
              {drop.title}
            </h1>
          </div>

          <p
            ref={descRef}
            className="text-xs sm:text-sm font-sans text-rune-secondary max-w-xl mx-auto leading-relaxed tracking-wide"
          >
            {drop.description}
          </p>

          <div ref={timerRef} className="pt-6">
            <CountdownTimer targetDate={drop.endAt} />
          </div>
        </div>
      </section>

      {/* Primary Marquee */}
      <Marquee
        words={[
          'LIMITED PREORDER DROP',
          'NO RESTOCKS EVER',
          'RUNE LUXURY ATELIER',
          '500 GSM PORTUGUESE TERRY',
          '0PX SHARP EDGES CONSTITUTION',
        ]}
      />

      {/* Preorder Crafting Manifesto Cards - Reveal linked via GSAP */}
      <section ref={manifestoRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-rune-surface border border-rune-border p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <Lock className="w-5 h-5 text-rune-primary flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <h3 className="font-serif text-sm font-bold text-rune-primary uppercase tracking-wider">
                PREORDER RESERVATION
              </h3>
              <p className="text-xs text-rune-secondary leading-relaxed">
                Garments are crafted strictly for reserved quantities during this active drop. No restocks ever.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Sparkles className="w-5 h-5 text-rune-primary flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <h3 className="font-serif text-sm font-bold text-rune-primary uppercase tracking-wider">
                CUSTOM MILLED FABRICS
              </h3>
              <p className="text-xs text-rune-secondary leading-relaxed">
                500 GSM French Terry & 300 GSM Combed Jersey milled in Portugal with custom architectural cuts.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-5 h-5 text-rune-primary flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <h3 className="font-serif text-sm font-bold text-rune-primary uppercase tracking-wider">
                BULK PRINTFUL DISPATCH
              </h3>
              <p className="text-xs text-rune-secondary leading-relaxed">
                Post-drop order review triggers direct Printful bulk production and express shipping to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Garment Showcase Grid */}
      <section ref={piecesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex justify-between items-end border-b border-rune-border pb-6">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-rune-secondary font-semibold">
              COLLECTION PIECES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-rune-primary tracking-wider mt-1">
              RESERVE YOUR SILHOUETTE
            </h2>
          </div>
          <span className="font-mono text-xs text-rune-secondary">
            {drop.products.length} GARMENTS AVAILABLE
          </span>
        </div>

        {/* Dynamic product card grid with entrance motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-14">
          {drop.products.map((product) => (
            <ProductCard key={product.id} product={product} dropStatus={drop.status} />
          ))}
        </div>
      </section>

      {/* Secondary Reverse Marquee */}
      <Marquee
        words={[
          'PREORDER NOW ACTIVE',
          'WORLDWIDE BULK DISPATCH',
          'RUNE ARCHITECTURAL CUTS',
          'FABRIC MILLED IN PORTUGAL',
          'SPECIFICATIONS VERIFIED',
        ]}
        reverse
      />
    </div>
  );
};

export default DropPage;
