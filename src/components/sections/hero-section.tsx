// src/components/sections/hero-section.tsx
"use client";

import { Button } from '@/components/ui/button';
import { ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden text-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div variants={itemVariants} className="mb-12 md:mb-16">
          {/* Placeholder for a visual element if AnimatedCoin is removed */}
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-24 h-24 sm:w-32 sm:h-32 md:h-40 md:w-40 text-primary opacity-80" />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
        >
          <span className="block text-gradient-futuristic">USDA.money</span>
          <span className="block text-foreground mt-2 md:mt-4 text-2xl sm:text-3xl md:text-4xl">Backed. Stable. Trusted.</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-muted-foreground"
        >
          The futuristic, high-performance stablecoin. Decentralized, collateralized, and built for the future of finance.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Button asChild size="lg" variant="neon" className="w-full sm:w-auto text-lg px-10 py-6">
            <Link href="#about">
              Discover USDA
              <Zap className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 py-6 border-2 border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary hover:shadow-secondary/30">
            <Link href="#dashboard">
              Live Dashboard
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
