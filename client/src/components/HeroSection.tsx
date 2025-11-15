import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

export function HeroSection() {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const TypewriterText = () => {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);
    
    const words = ['Network.', 'Privacy.', 'Wallet.', 'Life.'];
    const baseText = 'Glider; Own Your ';
    const suffix = '';
    const typingDelay = 200; // Increased from 100
    const deletingDelay = 100; // Increased from 50
    const pauseDuration = 2000; // Increased from 1500

    useEffect(() => {
      const currentWord = words[wordIndex];
      let timeoutId: NodeJS.Timeout;

      if (!isDeleting) {
        if (text.length < currentWord.length) {
          timeoutId = setTimeout(() => {
            setText(currentWord.substring(0, text.length + 1));
            setTypingSpeed(typingDelay);
          }, typingDelay);
        } else {
          timeoutId = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        if (text.length > 0) {
          timeoutId = setTimeout(() => {
            setText(text.substring(0, text.length - 1));
            setTypingSpeed(deletingDelay);
          }, deletingDelay);
        } else {
          timeoutId = setTimeout(() => {
            setIsDeleting(false);
            setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            setTypingSpeed(typingDelay);
          }, 300);
        }
      }

      return () => clearTimeout(timeoutId);
    }, [text, isDeleting, wordIndex]);

    return (
      <>
        <span className="block">
          {baseText}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {text}
            <span className="inline-block w-0.5 h-8 -mb-1.5 ml-0.5 bg-accent align-middle animate-pulse" />
          </span>
          {suffix}
        </span>
        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Power Your World
        </span>
      </>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950" data-testid="section-hero">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1)_0%,transparent_70%)] animate-pulse-slow" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] [background-size:32px_32px] animate-grid-move" />
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgba(139,92,246,0.03)_1px,transparent_1px)] [background-size:40px_40px] animate-grid-pulse" />
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/80" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,10,60,0.5),transparent)]" />
      
      {/* Large GLIDER text shadow at bottom - responsive */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none h-1/3">
        <h1 className="text-[25vw] sm:text-[30vw] font-black text-white/[0.03] sm:text-white/[0.02] select-none leading-none mb-[-5%] sm:mb-[-3%] opacity-70 sm:opacity-100">GLIDER</h1>
      </div>
      
      <div className="relative z-10 container mx-auto px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-8 pt-16 sm:pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-primary/30 mb-4 transition-all duration-300 hover:border-primary/50 hover:shadow-glow-sm backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Powered by Solana</span>
          </div>

          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight px-2 sm:px-0"
            data-testid="text-hero-title"
          >
            {TypewriterText()}
          </h1>

          <p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-6"
            data-testid="text-hero-subtitle"
          >
            A decentralized social layer combining crypto messaging, multi-chain wallet, 
            secure workspace, and AI collaboration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8 sm:pt-10 px-4 sm:px-0">
            <Button 
              variant="outline"
              onClick={() => scrollToSection('socialfi')}
              className="h-12 px-6 text-sm font-medium tracking-wide transition-all duration-300 border-2 border-primary/30 hover:border-primary/60 bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 backdrop-blur-sm hover:shadow-glow-sm animate-pulse-slow"
              data-testid="button-explore"
            >
              Explore Glider
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/95 to-transparent" />
    </section>
  );
}

function TypewriterText() {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const words = ['Network', 'Privacy', 'Wallet', 'Life'];
  const baseText = 'Glider; Own Your ';
  const suffix = ',';

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const type = () => {
      // Determine if we're typing or deleting
      if (!isDeleting) {
        // Typing
        if (text.length < currentWord.length) {
          setText(currentWord.substring(0, text.length + 1));
          setTypingSpeed(150);
        } else {
          // Pause at end of word
          setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting
        if (text.length > 0) {
          setText(text.substring(0, text.length - 1));
          setTypingSpeed(100);
        } else {
          // Move to next word
          setIsDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          return;
        }
      }

      // Schedule next update
      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, typingSpeed]);

  return (
    <>
      <span className="block">
        {baseText}
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {text}
        </span>
        <span className="animate-pulse">|</span>
        {suffix}
      </span>
      <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Power Your World
      </span>
    </>
  );
}
