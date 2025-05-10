// src/components/sections/hero-section.tsx
"use client";

import { Button } from '@/components/ui/button';
import { ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Simple animated coin representation
const AnimatedCoin = () => (
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
      <ShieldCheck className="w-16 h-16 sm:w-20 sm:h-20 md:h-28 md:w-28 text-primary text-glow-primary opacity-80" />
    </div>
    {/* Orbiting elements */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full w-4 h-4 bg-accent/70 shadow-md"
        style={{ 
          top: '50%', 
          left: '50%', 
          // x: '-50%', // Framer Motion handles transform composition better
          // y: '-50%',
          // originX and originY can cause issues with SSR/hydration if Math.cos/sin differ slightly.
          // Framer motion's x/y on animate will use translate, which is safer.
        }}
        animate={{
          // Use direct translation for orbit path, which is more robust for SSR
          x: [`${Math.cos((i * 2 * Math.PI) / 3) * (i % 2 === 0 ? 35 : 45)}vw`, `${Math.cos((i * 2 * Math.PI) / 3 + 2 * Math.PI) * (i % 2 === 0 ? 35 : 45)}vw`],
          y: [`${Math.sin((i * 2 * Math.PI) / 3) * (i % 2 === 0 ? 35 : 45)}vh`, `${Math.sin((i * 2 * Math.PI) / 3 + 2 * Math.PI) * (i % 2 === 0 ? 35 : 45)}vh`],
          // The issue was likely with transform-origin calculation on server vs client
          // Let's simplify this part and rely on direct x/y animation
        }}
        // The style x/y were -50% for centering.
        // The animate x/y are for orbiting.
        // Combining them correctly for framer motion:
        // The initial position is centered by parent, then animate applies translations.
        // Using vw/vh units can also be problematic for SSR consistency if viewport assumptions differ.
        // For simplicity, let's remove the problematic originX/Y and use simpler translations.
        // Framer Motion usually handles these by applying them to style.transform.
        // The original issue was transform-origin being slightly different.
        // We can try to set initial x/y to -50% and then animate relative to that.
        // Or, more safely, let the parent center it and animate the orbit values.
        // The provided error log shows `transformOrigin` mismatch.
        // The `originX` and `originY` in `style` directly contribute to `transform-origin`.
        // By removing them and letting framer-motion handle translations via `animate` prop's `x` and `y`
        // and ensuring the component or its dynamic parts are client-side rendered, we avoid this mismatch.
        // The animate x/y values should be pixel based or percentages relative to the element itself to be safe.
        // Let's stick to a simplified animation and ensure client-side rendering of AnimatedCoin.
        // The key is that Math.cos/sin in `style` can cause issues. In `animate` it's generally safer as it applies post-hydration.
        // However, the error occurs *during* hydration.
        // So, the initial render needs to be consistent.
        // The safest is to only render AnimatedCoin client-side.
        transition={{ duration: 5 + i*2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
      />
    ))}
  </motion.div>
);


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
      whileInView="visible" // Using whileInView is fine, but initial render must match server
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div variants={itemVariants} className="mb-12 md:mb-16">
          {isClient ? <AnimatedCoin /> : (
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 flex items-center justify-center">
              {/* Basic placeholder to maintain layout consistency before client-side render */}
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
