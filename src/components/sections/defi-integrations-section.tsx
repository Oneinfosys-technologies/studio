// src/components/sections/defi-integrations-section.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { Zap, Repeat, TrendingUp, Layers } from 'lucide-react'; // Example icons
import { motion } from 'framer-motion';

interface Protocol {
  name: string;
  icon: React.ElementType;
  description: string;
  websiteUrl: string;
  category: string; // e.g., Lending, DEX, Yield Farming
}

const protocols: Protocol[] = [
  {
    name: 'Aave',
    icon: Repeat, // Placeholder for Aave icon style
    description: 'A leading decentralized lending and borrowing protocol.',
    websiteUrl: '#',
    category: 'Lending',
  },
  {
    name: 'Curve Finance',
    icon: TrendingUp, // Placeholder
    description: 'Optimized for stablecoin trading with low slippage.',
    websiteUrl: '#',
    category: 'DEX',
  },
  {
    name: 'Uniswap',
    icon: Zap, // Placeholder
    description: 'A popular decentralized exchange (DEX) for swapping tokens.',
    websiteUrl: '#',
    category: 'DEX',
  },
  {
    name: 'Compound',
    icon: Layers, // Placeholder
    description: 'An algorithmic, autonomous interest rate protocol.',
    websiteUrl: '#',
    category: 'Lending',
  },
   {
    name: 'Yearn Finance',
    icon: TrendingUp,
    description: 'A suite of products in Decentralized Finance (DeFi) that provides yield generation.',
    websiteUrl: '#',
    category: 'Yield Aggregator',
  },
  {
    name: 'Balancer',
    icon: Layers,
    description: 'A programmable liquidity protocol, automated portfolio manager, and trading platform.',
    websiteUrl: '#',
    category: 'Liquidity Protocol',
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};


export default function DeFiIntegrationsSection() {
  return (
    <motion.section 
      id="defi" 
      className="py-16 lg:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 lg:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Integrated Across <span className="text-gradient-futuristic">The DeFi Ecosystem</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg lg:text-xl text-muted-foreground">
            USDA is designed for broad compatibility, enabling seamless use across a growing network of decentralized finance protocols and applications.
          </p>
        </motion.div>
        <TooltipProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {protocols.map((protocol) => (
              <motion.div key={protocol.name} variants={cardVariants}>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Link href={protocol.websiteUrl} target="_blank" rel="noopener noreferrer" passHref>
                      <Card className="group h-full flex flex-col text-center hover:shadow-xl hover:shadow-secondary/20 transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="items-center pt-8">
                          <div className="p-4 mb-4 rounded-full bg-secondary/10 ring-2 ring-secondary/30 neon-border-secondary opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                            <protocol.icon className="w-10 h-10 text-secondary text-glow-secondary" />
                          </div>
                          <CardTitle className="text-glow-secondary">{protocol.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow pb-8">
                          <p className="text-sm text-muted-foreground">{protocol.description}</p>
                        </CardContent>
                         <div className="p-4 border-t border-border/30">
                            <span className="text-xs font-medium text-secondary uppercase tracking-wider">{protocol.category}</span>
                        </div>
                      </Card>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="glassmorphism text-foreground">
                    <p>Visit {protocol.name}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>
         <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-muted-foreground text-lg">And many more integrations planned...</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
