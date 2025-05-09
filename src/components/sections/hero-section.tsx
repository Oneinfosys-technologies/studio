import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-70 dark:opacity-50" />
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat opacity-20 dark:opacity-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23177E89' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c-5.523 0-10-4.477-10-10zm0 0c0-5.523-4.477-10-10-10S30 44.477 30 50s4.477 10 10 10c5.523 0 10-4.477 10-10zm0 0c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10c-5.523 0-10 4.477-10 10zm0 0c0 5.523-4.477 10-10-10s-10-4.477-10-10 4.477-10 10-10c5.523 0 10 4.477 10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" 
        }}
        />
        {/* Subtle particle like effect using radial gradients */}
        <div className="absolute inset-0 hero-particles-animation" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, hsl(var(--accent) / 0.1) 0%, transparent 20%),
            radial-gradient(circle at 80% 30%, hsl(var(--primary) / 0.1) 0%, transparent 20%),
            radial-gradient(circle at 30% 80%, hsl(var(--secondary) / 0.1) 0%, transparent 20%),
            radial-gradient(circle at 70% 70%, hsl(var(--accent) / 0.05) 0%, transparent 15%)
          `,
        }}></div>
      </div>

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
        <div className="mt-16 lg:mt-24 relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto animate-float">
          <Image
            src="https://picsum.photos/320/320"
            alt="3D USDA Coin Model"
            layout="fill"
            objectFit="contain"
            className="rounded-full shadow-2xl"
            data-ai-hint="3d coin crypto"
          />
        </div>
      </div>
    </section>
  );
}
