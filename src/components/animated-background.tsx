// src/components/animated-background.tsx
'use client';

import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const particleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particleContainerRef.current;
    if (!container) return;

    const numParticles = 50; // Adjust for performance/density
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size, position, animation delay, and movement vectors
      const size = Math.random() * 4 + 1; // 1px to 5px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      const animationDuration = Math.random() * 15 + 10; // 10s to 25s
      particle.style.animationDuration = `${animationDuration}s`;
      particle.style.animationDelay = `${Math.random() * animationDuration}s`;

      // Custom properties for animation variance in CSS
      particle.style.setProperty('--vx', (Math.random() * 200 - 100).toString()); // -100px to 100px horizontal movement
      particle.style.setProperty('--vy', (Math.random() * 200 - 100).toString()); // -100px to 100px vertical movement
      particle.style.setProperty('--s', (Math.random() * 0.5 + 0.75).toString()); // Scale variance

      // Randomly assign colors from palette (primary, secondary, accent)
      const colorVar = ['--primary', '--secondary', '--accent'][Math.floor(Math.random() * 3)];
      particle.style.backgroundColor = `hsl(var(${colorVar}) / ${Math.random() * 0.4 + 0.3})`; // Random opacity
      
      particles.push(particle);
      container.appendChild(particle);
    }

    return () => {
      particles.forEach(p => container.removeChild(p));
    };
  }, []);

  return (
    <div className="site-background-effect" aria-hidden="true">
      {/* Gradient wave is now handled by ::before pseudo-element in CSS */}
      <div ref={particleContainerRef} className="particles-layer"></div>
    </div>
  );
};

export default AnimatedBackground;
