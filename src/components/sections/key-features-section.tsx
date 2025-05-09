import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, LockKeyhole, Network, Landmark, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: '1:1 USD Collateralization',
    description: 'Every USDA token is backed by an equivalent amount of USD reserves, ensuring stability and trust.',
  },
  {
    icon: LockKeyhole,
    title: 'Non-Custodial Smart Contracts',
    description: 'Your assets remain in your control. Our smart contracts are audited and operate transparently on the blockchain.',
  },
  {
    icon: Network,
    title: 'Seamless DeFi Integration',
    description: 'Easily use USDA across a wide range of decentralized finance applications and protocols.',
  },
  {
    icon: Landmark, // Using Landmark as a proxy for DAO/Governance, 'Vote' or 'Users' could also work
    title: 'DAO Governance via SKY Token',
    description: 'Participate in the future of USDA through decentralized governance powered by the SKY token.',
  },
];

export default function KeyFeaturesSection() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Why Choose <span className="text-gradient-primary">USDA</span>?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Discover the core advantages that make USDA the leading stablecoin solution.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
