// src/components/wallet-modal.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image'; // For logos if available

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const walletOptions = [
  { 
    name: 'MetaMask', 
    iconUrl: '/icons/metamask.svg', // Placeholder - ensure you have these icons
    description: 'Connect using your browser extension.',
    aiHint: "fox logo"
  },
  { 
    name: 'WalletConnect', 
    iconUrl: '/icons/walletconnect.svg', // Placeholder
    description: 'Scan QR code with your mobile wallet.',
    aiHint: "WC logo"
  },
  // Add more wallet options if needed
];

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const handleConnect = (walletName: string) => {
    console.log(`Attempting to connect with ${walletName}`);
    // Actual wallet connection logic would go here (e.g., using ethers.js)
    onClose(); // Close modal after attempting connection
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glassmorphism sm:max-w-md p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border/30">
          <DialogTitle className="text-2xl text-glow-primary">Connect Your Wallet</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your preferred wallet provider to continue.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {walletOptions.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="w-full justify-between items-center p-4 h-auto text-left glassmorphism hover:bg-primary/10 hover:border-primary transition-all duration-300 group"
              onClick={() => handleConnect(wallet.name)}
            >
              <div className="flex items-center space-x-3">
                {/* Placeholder for actual image if not available */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-muted group-hover:bg-primary/20">
                   {/* Fallback icon, replace with Image if icons are available */}
                  <svg data-ai-hint={wallet.aiHint} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8H20V18ZM4 6H20V7H4V6Z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{wallet.name}</p>
                  <p className="text-xs text-muted-foreground">{wallet.description}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Button>
          ))}
        </div>

        <DialogFooter className="p-6 pt-4 border-t border-border/30">
          <DialogClose asChild>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
