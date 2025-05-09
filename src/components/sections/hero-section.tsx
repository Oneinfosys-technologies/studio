
"use client"; // Add this directive

import { Button } from '@/components/ui/button';
import { ChevronRight, DollarSign } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Removed local background overlay divs to let global effect show */}
      {/* The global .site-background-effect will provide the background */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
          <span className="block text-gradient-primary">USDA</span>
          <span className="block text-foreground mt-2 md:mt-4">The Next Generation USD-Backed Stablecoin</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-muted-foreground">
          Decentralized. Collateralized. Stable.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
            Get USDA Now
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-lg transform hover:scale-105 transition-transform duration-300">
            Explore Protocol
          </Button>
        </div>
        
        {/* Placeholder for where the 3D coin model was, now an animated effect */}
        <div className="mt-16 lg:mt-24 h-48 sm:h-64 md:h-80 flex items-center justify-center">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse opacity-50"></div>
            <div className="absolute inset-2 bg-primary/30 rounded-full animate-pulse animation-delay-200 opacity-60"></div>
            <div className="absolute inset-4 bg-primary/40 rounded-full animate-pulse animation-delay-400 opacity-70"></div>
            <div className="w-full h-full rounded-full border-4 border-primary/50 flex items-center justify-center animate-spin-slow">
              <DollarSign className="text-primary opacity-80 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" />
            </div>
          </div>
        </div>
        <style jsx global>{`
          .animation-delay-200 { animation-delay: 0.2s; }
          .animation-delay-400 { animation-delay: 0.4s; }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
}

