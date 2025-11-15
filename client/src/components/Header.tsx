import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

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
      className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6"
      data-testid="header-main"
    >
      <div className={`max-w-7xl mx-auto h-16 flex items-center justify-between bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}>
        <div className="flex items-center">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center"
            aria-label="Go to top"
          >
            <img 
              src="https://green-rainy-clam-911.mypinata.cloud/ipfs/bafkreif4rnp5754if77z747skgfhwgjj4vh5jb56d5dgrbjudsxl2nppsi" 
              alt="Glider Logo" 
              className="h-12 w-auto transition-all duration-300 hover:scale-105 ml-2 sm:ml-4"
            />
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-2 sm:gap-4" data-testid="nav-menu">
          <button 
            onClick={() => scrollToSection('socialfi')} 
            className="text-sm font-medium text-white/80 hover:text-white transition-all hover:bg-white/10 px-3 py-2 rounded-lg"
            data-testid="link-socialfi"
          >
            SocialFi
          </button>
          <button 
            onClick={() => scrollToSection('messaging')} 
            className="text-sm font-medium text-white/80 hover:text-white transition-all hover:bg-white/10 px-3 py-2 rounded-lg"
            data-testid="link-messaging"
          >
            Messaging
          </button>
          <button 
            onClick={() => scrollToSection('wallet')} 
            className="text-sm font-medium text-white/80 hover:text-white transition-all hover:bg-white/10 px-3 py-2 rounded-lg"
            data-testid="link-wallet"
          >
            Wallet
          </button>
          <button 
            onClick={() => scrollToSection('workifi')} 
            className="text-sm font-medium text-white/80 hover:text-white transition-all hover:bg-white/10 px-3 py-2 rounded-lg"
            data-testid="link-workifi"
          >
            Workifi
          </button>
          <button 
            onClick={() => scrollToSection('ai-hub')} 
            className="text-sm font-medium text-white/80 hover:text-white transition-all hover:bg-white/10 px-3 py-2 rounded-lg"
            data-testid="link-ai-hub"
          >
            AI Hub
          </button>
          <div className="relative group">
            <button 
              className="text-sm font-medium text-white/60 px-3 py-2 rounded-lg cursor-not-allowed flex items-center gap-1.5 group-hover:bg-white/5 transition-colors"
              disabled
              data-testid="link-developer"
            >
              Developer
              <span className="bg-emerald-400/20 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30">
                Soon
              </span>
            </button>
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 mr-2 sm:mr-4">
          <Button 
            asChild
            variant="outline"
            className="relative overflow-hidden group bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/30 hover:border-primary/60 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 hover:shadow-glow-sm hover:from-primary/20 hover:to-primary/10"
            data-testid="button-app"
          >
            <a href="/app" className="relative z-10">
              Launch App
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
