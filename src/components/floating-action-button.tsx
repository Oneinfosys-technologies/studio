// src/components/floating-action-button.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import WalletModal from './wallet-modal'; // To be created

export default function FloatingActionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="default"
          size="lg"
          className="rounded-full p-4 shadow-xl bg-gradient-to-tr from-primary to-secondary text-primary-foreground hover:shadow-primary/50"
          onClick={() => setIsModalOpen(true)}
          aria-label="Connect Wallet"
        >
          <Wallet className="h-6 w-6 mr-2" />
          Connect Wallet
        </Button>
      </motion.div>
      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
