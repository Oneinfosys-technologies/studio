// src/components/sections/governance-section.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vote, Users, Archive, BarChartHorizontalBig, FileText, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress'; // Assuming Progress component exists

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const mockProposals = [
  { id: 'P001', title: 'Integrate New Collateral Type: Tokenized Real Estate', status: 'Voting Active', votesFor: 65, votesAgainst: 20, endsIn: '3 days' },
  { id: 'P002', title: 'Adjust Stability Fee from 0.5% to 0.75%', status: 'Passed', votesFor: 80, votesAgainst: 10, endsIn: 'Ended' },
  { id: 'P003', title: 'Allocate Treasury Funds for Marketing Campaign', status: 'Failed', votesFor: 30, votesAgainst: 55, endsIn: 'Ended' },
];

export default function GovernanceSection() {
  return (
    <motion.section 
      id="governance" 
      className="py-16 lg:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 lg:mb-20"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Community-Driven <span className="text-gradient-futuristic">DAO Governance</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg lg:text-xl text-muted-foreground">
            USDA is governed by its community through the SKY token (example), ensuring decentralized decision-making and protocol evolution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center space-x-3">
                <Users className="w-8 h-8 text-primary text-glow-primary" />
                <CardTitle>Decentralized Autonomous Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The USDA protocol is managed by a DAO. SKY token holders propose, debate, and vote on changes, ensuring the protocol serves its users.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center space-x-3">
                <Vote className="w-8 h-8 text-secondary text-glow-secondary" />
                <CardTitle>Voting Power & Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  SKY tokens grant voting rights. Influence protocol parameters, treasury allocations, and new feature integrations.
                </p>
                <Button variant="neon" className="mt-4 w-full border-secondary text-secondary shadow-[0_0_10px_theme(colors.secondary.DEFAULT),0_0_20px_theme(colors.secondary.DEFAULT)_inset] hover:shadow-[0_0_15px_theme(colors.secondary.DEFAULT),0_0_30px_theme(colors.secondary.DEFAULT)_inset] hover:text-glow-secondary">
                  View Governance Forum
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
            <div className="flex items-center space-x-3 mb-6">
               <BarChartHorizontalBig className="w-8 h-8 text-primary text-glow-primary" />
               <h3 className="text-2xl font-semibold text-foreground">Live Governance Proposals</h3>
            </div>
            
            <div className="space-y-6">
              {mockProposals.map((proposal) => {
                const totalVotes = proposal.votesFor + proposal.votesAgainst;
                const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
                const againstPercentage = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;

                return (
                  <Card key={proposal.id} className="hover:shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-glow-primary pr-4">{proposal.title}</CardTitle>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          proposal.status === 'Voting Active' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                          proposal.status === 'Passed' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                          'bg-red-500/20 text-red-400 border border-red-500/50'
                        }`}>
                          {proposal.status}
                        </span>
                      </div>
                      <CardDescription>Proposal ID: {proposal.id} {proposal.status === 'Voting Active' && `| Ends in: ${proposal.endsIn}`}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {proposal.status === 'Voting Active' && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-muted-foreground mb-1">
                            <span>For: {proposal.votesFor} ({forPercentage.toFixed(1)}%)</span>
                            <span>Against: {proposal.votesAgainst} ({againstPercentage.toFixed(1)}%)</span>
                          </div>
                          <div className="flex space-x-1">
                            <Progress value={forPercentage} className="h-3 bg-green-500/70 flex-grow" indicatorClassName="bg-green-400" />
                          </div>
                        </div>
                      )}
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                          <FileText className="mr-2 h-4 w-4" /> Read Proposal
                        </Button>
                        {proposal.status === 'Voting Active' && (
                          <Button variant="default" size="sm" className="bg-primary hover:bg-primary/80">
                            <Vote className="mr-2 h-4 w-4" /> Vote Now
                          </Button>
                        )}
                         {proposal.status === 'Passed' && (
                          <span className="flex items-center text-green-400 text-sm"><CheckCircle className="mr-2 h-4 w-4" /> Passed</span>
                        )}
                        {proposal.status === 'Failed' && (
                          <span className="flex items-center text-red-400 text-sm"><XCircle className="mr-2 h-4 w-4" /> Failed</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="text-center mt-8">
               <Button variant="link" className="text-lg text-primary hover:text-glow-primary">
                 Explore All Proposals <Archive className="ml-2 h-5 w-5" />
               </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Add this to ui/progress.tsx if you don't have indicatorClassName prop
// const ProgressPrimitiveIndicator = React.forwardRef<..., { indicatorClassName?: string }>(
//   ({ className, indicatorClassName, ...props }, ref) => (
//     <ProgressPrimitive.Indicator
//       ref={ref}
//       className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName, className)}
//       style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
//       {...props}
//     />
//   )
// );
// ProgressPrimitiveIndicator.displayName = ProgressPrimitive.Indicator.displayName;
// replace ProgressPrimitive.Indicator with ProgressPrimitiveIndicator usage
// For now, I'll assume the Progress component is flexible enough or a simple one will do.
// The default Progress from shadcn doesn't have specific indicatorClassName, so coloring the bar itself.
