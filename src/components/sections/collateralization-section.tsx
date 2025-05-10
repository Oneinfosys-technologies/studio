// src/components/sections/collateralization-section.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart as PieChartIcon, Banknote, ShieldAlert } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const initialData = [
  { name: 'USD Treasury Bills', value: 70, color: 'hsl(var(--primary))' },
  { name: 'Cash Deposits (Insured)', value: 25, color: 'hsl(var(--secondary))' },
  { name: 'Short-Term Gov. Bonds', value: 5, color: 'hsl(var(--accent))' },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CollateralizationSection() {
  const [chartData, setChartData] = useState(initialData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simulate data update if needed, for now static after mount
  }, []);

  const totalCollateral = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.section 
      id="collateral" 
      className="py-16 lg:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 lg:mb-20"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Transparent <span className="text-gradient-futuristic">Collateralization</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg lg:text-xl text-muted-foreground">
            USDA maintains its stability through a diversified and transparent portfolio of reserve assets, ensuring every token is fully backed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <PieChartIcon className="h-8 w-8 text-primary text-glow-primary" />
                  <CardTitle>Reserve Composition</CardTitle>
                </div>
                <CardDescription>
                  Illustrative breakdown of assets backing USDA. (Always aiming for 100%+ collateralization)
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] sm:h-[400px]">
                {isClient ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius="80%"
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ 
                          background: 'hsl(var(--card) / 0.8)', 
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)',
                        }}
                        itemStyle={{ color: 'hsl(var(--card-foreground))' }}
                      />
                      <Legend wrapperStyle={{fontSize: "0.875rem", color: "hsl(var(--muted-foreground))"}} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">Loading chart...</div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-start space-x-4">
                <Banknote className="h-10 w-10 text-primary text-glow-primary mt-1 flex-shrink-0" />
                <div>
                  <CardTitle>1:1 Backing Commitment</CardTitle>
                  <CardDescription className="mt-1">
                    Each USDA token is designed to be redeemable for $1.00 USD, backed by an equivalent value in reserve assets. This commitment is fundamental to USDA's stability.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-start space-x-4">
                <ShieldAlert className="h-10 w-10 text-secondary text-glow-secondary mt-1 flex-shrink-0" />
                <div>
                  <CardTitle>Regular Audits & Transparency</CardTitle>
                  <CardDescription className="mt-1">
                    We are committed to regular third-party audits of our reserves and transparent reporting to ensure the integrity and full backing of USDA.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
             <div className="text-center lg:text-left pt-4">
                <p className="text-lg font-semibold text-foreground">
                  Total Collateralization: <span className="text-primary text-glow-primary">{totalCollateral}%</span> (Target: ≥100%)
                </p>
              </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
