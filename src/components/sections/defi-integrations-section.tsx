import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface Protocol {
  name: string;
  logoUrl: string;
  description: string;
  websiteUrl: string;
  aiHint: string;
}

const protocols: Protocol[] = [
  {
    name: 'Aave',
    logoUrl: 'https://picsum.photos/seed/aave/64/64',
    description: 'A leading decentralized lending and borrowing protocol.',
    websiteUrl: '#',
    aiHint: 'protocol logo finance',
  },
  {
    name: 'Curve Finance',
    logoUrl: 'https://picsum.photos/seed/curve/64/64',
    description: 'Optimized for stablecoin trading with low slippage.',
    websiteUrl: '#',
    aiHint: 'protocol logo exchange',
  },
  {
    name: 'Uniswap',
    logoUrl: 'https://picsum.photos/seed/uniswap/64/64',
    description: 'A popular decentralized exchange (DEX) for swapping tokens.',
    websiteUrl: '#',
    aiHint: 'protocol logo unicorn',
  },
  {
    name: 'Compound',
    logoUrl: 'https://picsum.photos/seed/compound/64/64',
    description: 'An algorithmic, autonomous interest rate protocol.',
    websiteUrl: '#',
    aiHint: 'protocol logo letter C',
  },
];

export default function DeFiIntegrationsSection() {
  return (
    <section id="defi" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Seamlessly Integrated with <span className="text-gradient-primary">DeFi</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            USDA is designed for broad compatibility across the decentralized finance landscape.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {protocols.map((protocol) => (
            <Link href={protocol.websiteUrl} key={protocol.name} target="_blank" rel="noopener noreferrer" passHref>
              <Card className="group bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
                <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                  <div className="relative w-16 h-16 mb-4 group-hover:animate-pulse">
                    <Image
                      src={protocol.logoUrl}
                      alt={`${protocol.name} Logo`}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                      data-ai-hint={protocol.aiHint}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{protocol.name}</h3>
                  <p className="text-sm text-muted-foreground flex-grow">{protocol.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
         <div className="mt-12 text-center">
            <p className="text-muted-foreground">And many more to come...</p>
        </div>
      </div>
    </section>
  );
}
