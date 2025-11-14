import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SocialFiSection } from '@/components/SocialFiSection';
import { MessagingSection } from '@/components/MessagingSection';
import { WalletSection } from '@/components/WalletSection';
import { WorkifiSection } from '@/components/WorkifiSection';
import { AIHubSection } from '@/components/AIHubSection';
import { TechTrustSection } from '@/components/TechTrustSection';
import { InvestorSection } from '@/components/InvestorSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <SocialFiSection />
        <MessagingSection />
        <WalletSection />
        <WorkifiSection />
        <AIHubSection />
        <TechTrustSection />
        <InvestorSection />
      </main>
      <Footer />
    </div>
  );
}
