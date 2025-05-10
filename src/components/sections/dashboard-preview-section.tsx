// src/components/sections/dashboard-preview-section.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, Activity, Server } from 'lucide-react'; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from 'recharts'; // Renamed BarChart to avoid conflict
import { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion'; // Import animate
import type { ChartConfig } from "@/components/ui/chart"; // Import ChartConfig
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"; // Import ChartContainer and ChartTooltipContent


interface StatCardProps {
  title: string;
  value: number;
  previousValue?: number;
  unit: string;
  icon: React.ElementType;
  precision?: number;
  isCurrency?: boolean;
}

const AnimatedCounter: React.FC<{ value: number; precision?: number; isCurrency?: boolean; unit?: string }> = ({ value, precision = 0, isCurrency = false, unit ="" }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    // Use the imported 'animate' function directly
    const animation = animate(currentValue, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setCurrentValue(latest),
    });
    return () => animation.stop(); // Ensure stop is called on the returned controls
  }, [value, currentValue]); // Added currentValue to dependencies

  return (
    <span className="text-3xl font-bold text-foreground">
      {isCurrency && '$'}
      {currentValue.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })}
      {unit && ` ${unit}`}
    </span>
  );
};


const StatCard: React.FC<StatCardProps> = ({ title, value, previousValue, unit, icon: Icon, precision = 0, isCurrency = false }) => {
  const percentageChange = previousValue && previousValue !== 0 ? ((value - previousValue) / previousValue) * 100 : null;
  const [displayTime, setDisplayTime] = useState('');

  useEffect(() => {
    setDisplayTime(new Date().toLocaleTimeString());
  }, []); // Will run once on mount client-side
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <AnimatedCounter value={value} precision={precision} isCurrency={isCurrency} unit={unit === 'USD' && !isCurrency ? '' : unit} />
        {percentageChange !== null && (
          <p className={`text-xs mt-1 ${percentageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {percentageChange >= 0 ? '+' : ''}
            {percentageChange.toFixed(2)}% from last period
          </p>
        )}
         <p className="text-xs text-muted-foreground mt-1">
           {title === 'Current Peg' ? 'Target: 1.00 USD' : `Updated: ${displayTime || 'Loading...'}`}
         </p>
      </CardContent>
    </Card>
  );
};


const initialStatsData = [
  { title: 'Total USDA Supply', value: 125000000, previousValue: 124500000, unit: 'USDA', icon: Server, isCurrency: false },
  { title: 'Market Cap', value: 125050000, previousValue: 124550000, unit: 'USD', icon: TrendingUp, isCurrency: true },
  { title: '24h Transactions', value: 15230, previousValue: 14800, unit: '', icon: Activity, isCurrency: false },
];

const supplyHistoryData = [
  { name: 'Jan', supply: 10000000, minted: 2000000, burned: 500000 }, 
  { name: 'Feb', supply: 11500000, minted: 3000000, burned: 1000000 }, 
  { name: 'Mar', supply: 13500000, minted: 2500000, burned: 500000 }, 
  { name: 'Apr', supply: 15000000, minted: 3500000, burned: 1500000 },
  { name: 'May', supply: 17000000, minted: 4000000, burned: 2000000 }, 
  { name: 'Jun', supply: 19000000, minted: 3000000, burned: 1000000 }
];

const supplyChartData = supplyHistoryData.map(d => ({ month: d.name, desktop: d.supply, mobile: d.minted - d.burned }));

const chartConfig = {
  desktop: {
    label: "Total Supply",
    color: "hsl(var(--primary))",
  },
  mobile: { // Example for net change, can be adapted
    label: "Net Change",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig;

const mintBurnChartConfig = {
  minted: {
    label: "Minted",
    color: "hsl(var(--primary))",
  },
  burned: {
    label: "Burned",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;


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

export default function LiveDashboardSection() {
  const [stats, setStats] = useState(initialStatsData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setStats(prevStats => prevStats.map(stat => {
        const changeFactor = (Math.random() - 0.45) * (stat.unit === 'USDA' || stat.title === 'Market Cap' ? 50000 : 100);
        const newValue = Math.max(0, stat.value + changeFactor);
        return { ...stat, previousValue: stat.value, value: newValue };
      }));
    }, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return (
      <motion.section 
        id="dashboard" 
        className="py-16 lg:py-24"
        initial="hidden"
        animate="visible" // Use animate here for initial load
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            variants={itemVariants} // Apply variants here too for consistency
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Live <span className="text-gradient-futuristic">USDA Dashboard</span>
            </h2>
             <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Loading real-time data...</p>
          </motion.div>
        </div>
      </motion.section>
    );
  }


  return (
    <motion.section 
      id="dashboard" 
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
            Live <span className="text-gradient-futuristic">USDA Dashboard</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg lg:text-xl text-muted-foreground">
            Real-time insights into the USDA ecosystem. Data is illustrative and updates dynamically.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12" variants={itemVariants}>
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>USDA Supply Over Time (Illustrative)</CardTitle>
              <CardDescription>Monthly growth of total USDA supply.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] sm:h-[350px] w-full">
             <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={supplyHistoryData} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize="0.75rem" />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize="0.75rem" tickFormatter={(value) => `${value/1000000}M`} />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Legend wrapperStyle={{fontSize: "0.875rem"}} />
                    <Line type="monotone" dataKey="supply" stroke="var(--color-desktop)" strokeWidth={2} dot={{ r: 4, fill: 'var(--color-desktop)' }} activeDot={{ r: 6 }} name="Total Supply" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Mint & Burn Activity (Illustrative)</CardTitle>
              <CardDescription>Monthly USDA minting and burning volumes.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] sm:h-[350px] w-full">
              <ChartContainer config={mintBurnChartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={supplyHistoryData} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize="0.75rem" />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize="0.75rem" tickFormatter={(value) => `${value/1000000}M`} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <Legend wrapperStyle={{fontSize: "0.875rem"}} />
                    <Bar dataKey="minted" fill="var(--color-minted)" name="Minted" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="burned" fill="var(--color-burned)" name="Burned" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
