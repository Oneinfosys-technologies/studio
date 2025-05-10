// src/components/sections/about-usda-section.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, LockKeyhole, Network, Users, DollarSign, LucideIcon, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const aboutItems: AboutItem[] = [
  {
    icon: DollarSign,
    title: 'Pegged to USD',
    description: 'USDA is a stablecoin meticulously designed to maintain a 1:1 peg with the US Dollar, offering reliability in the volatile crypto market.',
  },
  {
    icon: ShieldCheck,
    title: 'Robust Collateralization',
    description: 'Every USDA token is backed by a transparent and verifiable portfolio of high-quality reserve assets, ensuring stability and holder confidence.',
  },
  {
    icon: Network,
    title: 'Cross-Chain Interoperability',
    description: 'Engineered for the multi-chain future, USDA facilitates seamless transactions and interactions across diverse blockchain ecosystems.',
  },
  {
    icon: TrendingUp,
    title: 'Capital Efficiency',
    description: 'USDA aims to provide a highly capital-efficient stablecoin solution, optimizing for liquidity and utility within DeFi protocols.',
  },
  {
    icon: LockKeyhole,
    title: 'Secure Smart Contracts',
    description: 'Built on rigorously audited smart contracts, USDA prioritizes security and transparency, safeguarding user assets and protocol integrity.',
  },
  {
    icon: Users,
    title: 'Community Governance',
    description: 'The USDA protocol is guided by its community through a DAO, empowering token holders to shape its future development and policies.',
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export default function AboutUSDASection() {
  return (
    <motion.section 
      id="about" 
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
            Understanding <span className="text-gradient-futuristic">USDA</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg lg:text-xl text-muted-foreground">
            USDA is more than just a stablecoin; it's a foundational layer for a decentralized financial future, offering stability, transparency, and broad utility.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {aboutItems.map((item) => (
            <motion.div key={item.title} variants={cardVariants} >
              <Card className="h-full hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full inline-block mb-4 ring-2 ring-primary/30 neon-border-primary opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    <item.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
