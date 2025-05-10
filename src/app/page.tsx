'use client';

import HeroSection from '@/components/sections/hero-section';
import AboutUSDASection from '@/components/sections/about-usda-section';
import CollateralizationSection from '@/components/sections/collateralization-section';
import LiveDashboardSection from '@/components/sections/dashboard-preview-section';
import DeFiIntegrationsSection from '@/components/sections/defi-integrations-section';
import GovernanceSection from '@/components/sections/governance-section';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Helper component for section transitions if needed
const MotionSection = ({ children, id }: { children: ReactNode, id: string }) => (
  <motion.div
    id={id} // Keep ID for navigation
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }} // Adjust amount based on section height
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);


export default function Home() {
  return (
    <>
      {/* HeroSection already has its own motion wrapper */}
      <HeroSection /> 
      
      {/* Wrap other sections for consistent scroll-triggered reveals */}
      <MotionSection id="about"><AboutUSDASection /></MotionSection>
      <MotionSection id="collateral"><CollateralizationSection /></MotionSection>
      <MotionSection id="dashboard"><LiveDashboardSection /></MotionSection>
      <MotionSection id="defi"><DeFiIntegrationsSection /></MotionSection>
      <MotionSection id="governance"><GovernanceSection /></MotionSection>
    </>
  );
}
