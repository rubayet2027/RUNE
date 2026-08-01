import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  initial: { opacity: 1 },
  exit: { 
    opacity: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
  }
};

const letters = ['R', 'U', 'N', 'E'];

const letterVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.1,
      ease: 'linear'
    }
  })
};

// Full-screen initial loader
export const AppLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 1500; // 1.5 seconds
    const intervalTime = 15;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 200);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-rune-bg text-rune-primary"
    >
      <div className="flex flex-col items-center gap-6 w-48">
        {/* RUNE Sequential Wordmark */}
        <div className="flex justify-center items-center h-12">
          {letters.map((char, index) => {
            // Determine if character should be displayed
            // R (progress > 15%), RU (> 35%), RUN (> 55%), RUNE (> 75%)
            const triggerProgress = 15 + index * 20;
            const isVisible = progress >= triggerProgress;

            return (
              <span
                key={index}
                className="font-serif text-4xl sm:text-5xl font-bold tracking-[0.25em] transition-opacity duration-150"
                style={{ opacity: isVisible ? 1 : 0 }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Thin Progress Bar Container */}
        <div className="w-full h-[1px] bg-rune-border overflow-hidden">
          <motion.div
            className="h-full bg-rune-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Intermediate loading state for pages
export const PageLoader = () => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-rune-bg text-rune-primary">
      <div className="flex flex-col items-center gap-6 w-40">
        <div className="flex justify-center items-center h-10">
          <motion.span
            initial="hidden"
            animate="visible"
            custom={0}
            variants={letterVariants}
            className="font-serif text-3xl font-bold tracking-[0.2em]"
          >
            R
          </motion.span>
          <motion.span
            initial="hidden"
            animate="visible"
            custom={1}
            variants={letterVariants}
            className="font-serif text-3xl font-bold tracking-[0.2em]"
          >
            U
          </motion.span>
          <motion.span
            initial="hidden"
            animate="visible"
            custom={2}
            variants={letterVariants}
            className="font-serif text-3xl font-bold tracking-[0.2em]"
          >
            N
          </motion.span>
          <motion.span
            initial="hidden"
            animate="visible"
            custom={3}
            variants={letterVariants}
            className="font-serif text-3xl font-bold tracking-[0.2em]"
          >
            E
          </motion.span>
        </div>

        <div className="w-full h-[1px] bg-rune-border overflow-hidden">
          <motion.div
            className="h-full bg-rune-primary"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
};

// Route fallback loader
export const RouteLoader = () => {
  return <PageLoader />;
};
