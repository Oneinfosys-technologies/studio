import { Github, Twitter, Linkedin, FileText, Bot } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const contractAddress = "0x1234...abcd"; // Placeholder

  return (
    <footer className="glassmorphism border-t border-border/30 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">
              Backed. Stable. Trusted.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Contract: <a href="#" className="hover:text-primary break-all">{contractAddress}</a>
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Protocol</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Whitepaper</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Audits</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Community</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Discord</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Telegram</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Governance Forum</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} USDA.money. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </a>
             <a href="#" className="text-muted-foreground hover:text-primary transition-colors" title="Whitepaper">
              <span className="sr-only">Whitepaper</span>
              <FileText className="h-5 w-5" />
            </a>
             <a href="#" className="text-muted-foreground hover:text-primary transition-colors" title="Discord">
              <span className="sr-only">Discord</span>
              <Bot className="h-5 w-5" /> {/* Using Bot icon for Discord as an example */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
