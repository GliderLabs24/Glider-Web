import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Users, Coins, Shield, TrendingUp } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: Users,
    title: 'User-Owned Identity',
    description: 'Your profile, your data, your control'
  },
  {
    icon: Coins,
    title: 'Tokenized Engagement',
    description: 'Earn rewards through genuine connections'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'End-to-end encryption for all interactions'
  },
  {
    icon: TrendingUp,
    title: 'Social Capital',
    description: 'Build reputation that has real value'
  }
];

export function SocialFiSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      id="socialfi" 
      ref={ref}
      className="py-32 relative overflow-hidden"
      data-testid="section-socialfi"
    >
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" data-testid="text-socialfi-title">
              Own your profile.
              <br />
              <span className="text-primary">Earn through connection.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Glider's SocialFi layer puts you in control. Your identity, connections, and content 
              are yours.. stored on-chain, monetizable, and portable across the decentralized web.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="p-6 glass border-white/10 hover:border-primary/30 transition-all hover-elevate h-full"
                  data-testid={`card-socialfi-${index}`}
                >
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
    </section>
  );
}
