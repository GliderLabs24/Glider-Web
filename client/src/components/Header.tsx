import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/20 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
      data-testid="header-main"
    >
      <div className="container mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-lg glow-blue">
            G
          </div>
          <span className="text-xl font-bold tracking-tight">Glider</span>
        </div>

        <nav className="hidden md:flex items-center gap-8" data-testid="nav-menu">
          <button 
            onClick={() => scrollToSection('socialfi')} 
            className="text-sm font-medium hover:text-primary transition-colors hover-elevate px-3 py-2 rounded-md"
            data-testid="link-socialfi"
          >
            SocialFi
          </button>
          <button 
            onClick={() => scrollToSection('messaging')} 
            className="text-sm font-medium hover:text-primary transition-colors hover-elevate px-3 py-2 rounded-md"
            data-testid="link-messaging"
          >
            Messaging
          </button>
          <button 
            onClick={() => scrollToSection('wallet')} 
            className="text-sm font-medium hover:text-primary transition-colors hover-elevate px-3 py-2 rounded-md"
            data-testid="link-wallet"
          >
            Wallet
          </button>
          <button 
            onClick={() => scrollToSection('workifi')} 
            className="text-sm font-medium hover:text-primary transition-colors hover-elevate px-3 py-2 rounded-md"
            data-testid="link-workifi"
          >
            Workifi
          </button>
          <button 
            onClick={() => scrollToSection('ai-hub')} 
            className="text-sm font-medium hover:text-primary transition-colors hover-elevate px-3 py-2 rounded-md"
            data-testid="link-ai-hub"
          >
            AI Hub
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            asChild
            className="glow-blue font-semibold"
            data-testid="button-app"
          >
            <a href="https://app.glider.world" target="_blank" rel="noopener noreferrer">
              Launch App
            </a>
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="md:hidden"
            data-testid="button-menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
