'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart as LucideBarChart, TrendingUp, CircleDollarSign, Server, Activity } from 'lucide-react'; // Renamed BarChart to avoid conflict
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Bar, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { useState, useEffect } from 'react';


const initialStats = [
  { name: 'Total Supply', value: 125000000, icon: Server, unit: 'USDA' },
  { name: 'Total Backing', value: 125050000, icon: CircleDollarSign, unit: 'USD' },
  { name: 'Current Peg', value: 1.00, icon: TrendingUp, unit: 'USD', precision: 2 },
];

const supplyChartData = [{ month: "Jan", desktop: 186 }, { month: "Feb", desktop: 205 }, { month: "Mar", desktop: 237 }, { month: "Apr", desktop: 203 }, { month: "May", desktop: 250 }, { month: "Jun", desktop: 280 }];
const chartConfig = { desktop: { label: "USDA Supply", color: "hsl(var(--primary))" } };

const pegStabilityData = [
  { name: 'Stable', value: 98, fill: 'hsl(var(--primary))' },
  { name: 'Slight Deviation', value: 2, fill: 'hsl(var(--accent))' },
];

export default function DashboardPreviewSection() {
  const [stats, setStats] = useState(initialStats);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prevStats => prevStats.map(stat => ({
        ...stat,
        value: stat.name === 'Current Peg' ? 
               (1 + (Math.random() - 0.5) * 0.005) : // Simulate slight peg fluctuation
               Math.floor(stat.value + (Math.random() - 0.45) * 10000) // Simulate supply/backing changes
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    // Render basic structure or skeletons SSR, then enhance on client
    return (
      <section id="dashboard" className="py-16 lg:py-24 bg-background/70 dark:bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Live <span className="text-gradient-primary">USDA</span> Market Stats
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Real-time insights into the USDA ecosystem. Values are illustrative.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
             {initialStats.map((stat) => (
              <Card key={stat.name} className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Loading...</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="py-16 lg:py-24 bg-background/70 dark:bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Live <span className="text-gradient-primary">USDA</span> Market Stats
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Real-time insights into the USDA ecosystem. Values are illustrative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {stats.map((stat) => (
            <Card key={stat.name} className="bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {stat.unit === 'USD' && stat.name !== 'Current Peg' ? '$' : ''}
                  {stat.value.toLocaleString(undefined, { minimumFractionDigits: stat.precision || 0, maximumFractionDigits: stat.precision || 0 })}
                  {stat.unit !== 'USD' || stat.name === 'Current Peg' ? ` ${stat.unit}` : ''}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.name === 'Current Peg' ? 'Target: 1.00 USD' : `Last updated: ${new Date().toLocaleTimeString()}`}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <Card className="bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle>USDA Supply Over Time</CardTitle>
              <CardDescription>Illustrative growth of total USDA supply.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={supplyChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle>Peg Stability</CardTitle>
              <CardDescription>Representation of USDA peg consistency.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full flex items-center justify-center">
              <ChartContainer config={{}} className="w-full max-w-[250px] aspect-square mx-auto">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                        innerRadius="60%" 
                        outerRadius="90%" 
                        data={pegStabilityData} 
                        startAngle={90} 
                        endAngle={-270}
                    >
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar background dataKey="value" cornerRadius={10} angleAxisId={0} />
                        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                        <ChartTooltip content={<ChartTooltipContent cursor={false} nameKey="name" />} />
                    </RadialBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 text-center p-8 bg-card/60 dark:bg-card/40 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-foreground mb-2">Conceptual Dashboard Visualization</h3>
          <p className="text-muted-foreground mb-4">
            Data insights through dynamic effects and interactive elements.
          </p>
          <div className="mt-4 h-40 flex items-center justify-center bg-muted/30 rounded-md p-4">
            {/* Example of an "effect" - could be animated bars, particles, etc. */}
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 bg-primary/70 animate-pulse rounded-sm"
                  style={{ 
                    height: `${Math.random() * 80 + 20}px`, 
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1.5s'
                  }}
                />
              ))}
            </div>
             <Activity className="w-16 h-16 text-accent opacity-50 ml-8" />
          </div>
           <p className="text-sm text-muted-foreground mt-4">Conceptual dashboard interface reimagined with dynamic visual effects.</p>
        </div>

      </div>
    </section>
  );
}
