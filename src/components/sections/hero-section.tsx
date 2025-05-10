// src/components/sections/hero-section.tsx
"use client";

import { Button } from '@/components/ui/button';
import { ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Simple animated coin representation
const AnimatedCoin = () => {
  // State to hold calculated animation values, only set on client
  const [orbitPaths, setOrbitPaths] = useState<Array<{ x: string[]; y: string[] }>>([]);

  useEffect(() => {
    // Calculate paths on client side
    const paths = [...Array(3)].map((_, i) => {
      const radius = (i % 2 === 0 ? 70 : 90); // Use pixel values
      const angleStart = (i * 2 * Math.PI) / 3;
      const angleEnd = angleStart + 2 * Math.PI;
      return {
        x: [`${Math.cos(angleStart) * radius}px`, `${Math.cos(angleEnd) * radius}px`],
        y: [`${Math.sin(angleStart) * radius}px`, `${Math.sin(angleEnd) * radius}px`],
      };
    });
    setOrbitPaths(paths);
  }, []);


  return (
  <motion.div
    className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64"
    animate={{ rotateY: [0, 360], scale: [1, 1.05, 1] }}
    transition={{
      rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }}
  >
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 opacity-50 blur-lg"></div>
    <div className="absolute inset-2 rounded-full border-2 border-primary/50 flex items-center justify-center glassmorphism shadow-xl">
      <ShieldCheck className="w-16 h-16 sm:w-20 sm:h-20 md:h-28 md:w-28 text-primary opacity-80" />
    </div>
    {/* Orbiting elements */}
    {orbitPaths.map((path, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full w-4 h-4 bg-accent/70 shadow-md"
        style={{ 
          top: '50%', 
          left: '50%', 
          x: '-50%', // Center the orbiting element itself
          y: '-50%',
        }}
        animate={{
          translateX: path.x, // Use translateX/Y for path animation
          translateY: path.y,
        }}
        transition={{ duration: 5 + i*2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
      />
    ))}
  </motion.div>
  );
};


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
          {isClient ? <AnimatedCoin /> : (
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 flex items-center justify-center">
              <ShieldCheck className="w-16 h-16 sm:w-20 sm:h-20 md:h-28 md:w-28 text-primary opacity-50" />
            </div>
          )}
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
