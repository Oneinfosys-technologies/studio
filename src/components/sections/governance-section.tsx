import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vote, PieChart, Users } from 'lucide-react';

export default function GovernanceSection() {
  return (
    <section id="governance" className="py-16 lg:py-24 bg-background/70 dark:bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Community-Led <span className="text-gradient-primary">Governance</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            USDA is governed by its community through the SKY token, ensuring decentralized decision-making.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <Card className="bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="flex flex-row items-center space-x-3">
                <Users className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl">Decentralized Autonomous Organization (DAO)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The USDA protocol is managed by a DAO composed of SKY token holders. This structure empowers the community to propose, debate, and implement changes, ensuring the protocol evolves with the needs of its users.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="flex flex-row items-center space-x-3">
                <Vote className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl">Voting Power</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  SKY tokens represent voting power within the DAO. The more SKY tokens a user holds, the greater their influence on governance proposals, such as updating protocol parameters, allocating treasury funds, and integrating new features.
                </p>
                <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary/10">
                  Learn More About Voting
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                <PieChart className="w-6 h-6 mr-2 text-primary" />
                Interactive Tokenomics
              </h3>
              <div className="relative aspect-video w-full bg-muted rounded-lg shadow-lg overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/tokenomics/600/338"
                  alt="Interactive Tokenomics Graph"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="tokenomics graph futuristic"
                  className="transition-transform duration-500 hover:scale-105"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-4">
                    <p className="text-white text-sm">Hover or click for details (conceptual)</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">Conceptual visualization of SKY token distribution and utility.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                <Vote className="w-6 h-6 mr-2 text-primary" />
                Voting System Mockup
              </h3>
              <div className="relative aspect-video w-full bg-muted rounded-lg shadow-lg overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/voting/600/338"
                  alt="Voting System Animation Mockup"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="3d voting pool"
                  className="transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-4">
                    <p className="text-white text-sm">Animated representation of the voting process (conceptual)</p>
                </div>
              </div>
               <p className="text-xs text-muted-foreground mt-2 text-center">Illustrative mockup of the DAO voting interface.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
