import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, ArrowRightLeft, TrendingUp, Shield } from 'lucide-react';
import { SiSolana, SiEthereum, SiPolygon } from 'react-icons/si';
import { useRef } from 'react';

const chains = [
  { name: 'Solana', icon: SiSolana, color: 'text-[#14F195]' },
  { name: 'Ethereum', icon: SiEthereum, color: 'text-[#627EEA]' },
  { name: 'Polygon', icon: SiPolygon, color: 'text-[#8247E5]' }
];

const features = [
  { icon: ArrowRightLeft, label: 'Cross-chain Swaps' },
  { icon: TrendingUp, label: 'Staking Rewards' },
  { icon: Shield, label: 'Secure Storage' }
];

export function WalletSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      id="wallet" 
      ref={ref}
      className="py-32 relative overflow-hidden"
      data-testid="section-wallet"
    >
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" data-testid="text-wallet-title">
              One Wallet.
              <br />
              <span className="text-accent">Every Chain.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Manage all your crypto assets in one unified interface. Glider Wallet supports 
              multiple blockchains, seamless swaps, and secure staking — all without leaving 
              the platform.
            </p>
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Badge 
                    variant="outline" 
                    className="px-4 py-2 glass border-primary/20 hover:border-primary/40 transition-colors"
                    data-testid={`badge-wallet-${index}`}
                  >
                    <feature.icon className="w-4 h-4 mr-2" />
                    {feature.label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <Card className="p-8 glass-strong border-accent/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-secondary/10" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-accent" />
                    <span className="font-semibold text-lg">Multi-Chain Wallet</span>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-0">Active</Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="text-sm text-muted-foreground">Total Balance</div>
                  <div className="text-4xl font-bold">$24,582.45</div>
                </div>

                <div className="space-y-3">
                  {chains.map((chain, index) => (
                    <motion.div
                      key={chain.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className="flex items-center justify-between p-4 rounded-lg glass border border-white/5 hover-elevate"
                      data-testid={`chain-${index}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full glass-strong flex items-center justify-center ${chain.color}`}>
                          <chain.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-semibold">{chain.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {index === 0 ? '8.5 SOL' : index === 1 ? '2.3 ETH' : '1,245 MATIC'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${index === 0 ? '8,245' : index === 1 ? '9,890' : '6,447'}
                        </div>
                        <div className="text-xs text-green-400">+12.5%</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Connection lines visual */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 1 }}>
                  <motion.line
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    x1="50%" y1="30%" x2="50%" y2="50%"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                  />
                  <motion.line
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    x1="50%" y1="50%" x2="50%" y2="70%"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-accent/5 blur-3xl rounded-full -translate-y-1/2" />
    </section>
  );
}
