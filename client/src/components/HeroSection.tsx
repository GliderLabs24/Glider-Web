import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { NetworkCanvas } from './NetworkCanvas';

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
      <NetworkCanvas />
      
      <div className="relative z-10 container mx-auto px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Powered by Web3</span>
          </div>

          <h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
            data-testid="text-hero-title"
          >
            Glider — Own Your Network,
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Power Your World
            </span>
          </h1>

          <p 
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            A decentralized social layer combining crypto messaging, multi-chain wallet, 
            secure workspace, and AI collaboration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('socialfi')}
              className="text-base px-8 py-6 glass hover:bg-white/10 border-primary/30"
              data-testid="button-explore"
            >
              Explore Glider
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              asChild
              className="text-base px-8 py-6 glow-blue font-semibold"
              data-testid="button-launch-app"
            >
              <a href="https://app.glider.world" target="_blank" rel="noopener noreferrer">
                Launch App
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
