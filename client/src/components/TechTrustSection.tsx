import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Lock, Database, Shield } from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'Military-grade encryption for all communications and data storage'
  },
  {
    icon: Database,
    title: 'IPFS Storage',
    description: 'Decentralized file storage ensures your data is always accessible'
  },
  {
    icon: Shield,
    title: 'On-Chain Identity',
    description: 'Blockchain-verified authentication without centralized control'
  }
];

export function TechTrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      ref={ref}
      className="py-32 relative"
      data-testid="section-tech-trust"
    >
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6" data-testid="text-tech-trust-title">
            Tech + Trust
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built on the principles of decentralization, transparency, and user sovereignty
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card 
                className="p-8 glass border-white/10 hover:border-primary/20 transition-all hover-elevate text-center group h-full"
                data-testid={`card-tech-${index}`}
              >
                <div className="w-20 h-20 rounded-2xl glass-strong flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform glow-blue">
                  <feature.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
