import HeroSection from '@/components/sections/hero-section';
import KeyFeaturesSection from '@/components/sections/key-features-section';
import DashboardPreviewSection from '@/components/sections/dashboard-preview-section';
import DeFiIntegrationsSection from '@/components/sections/defi-integrations-section';
import GovernanceSection from '@/components/sections/governance-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <KeyFeaturesSection />
      <DashboardPreviewSection />
      <DeFiIntegrationsSection />
      <GovernanceSection />
    </>
  );
}
