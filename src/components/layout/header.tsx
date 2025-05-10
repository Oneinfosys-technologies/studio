"use client";
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About USDA' },
  { href: '#collateral', label: 'Collateral' },
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#defi', label: 'DeFi' },
  { href: '#governance', label: 'Governance' },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 glassmorphism",
        isScrolled ? "shadow-xl" : "shadow-none border-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-glow-primary hover:text-foreground transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <Button variant="default" className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-md hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105">
            Launch App
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] glassmorphism p-0">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-border/50">
                  <Logo />
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-1 p-4 mt-4">
                  {NAV_ITEMS.map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href}
                        className="text-lg font-medium text-foreground/90 hover:text-glow-primary hover:text-primary rounded-md px-3 py-2 transition-all duration-300"
                        onClick={(e) => {
                           e.preventDefault();
                           document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                           setIsSheetOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto p-4 border-t border-border/50 space-y-4">
                   <Button variant="default" className="w-full bg-primary hover:bg-primary/80 text-primary-foreground shadow-md hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105">
                     Launch App
                   </Button>
                  <div className="flex justify-center">
                     <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
