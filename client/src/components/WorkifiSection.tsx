import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Mail, Video, FileText, Lock } from 'lucide-react';
import { useRef } from 'react';

const tools = [
  { icon: Mail, name: 'Encrypted Email', description: 'Secure communication' },
  { icon: Video, name: 'Video Calls', description: 'End-to-end encrypted' },
  { icon: FileText, name: 'Shared Docs', description: 'Collaborative editing' }
];

export function WorkifiSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      id="workifi" 
      ref={ref}
      className="py-32 relative"
      data-testid="section-workifi"
    >
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" data-testid="text-workifi-title">
              Work smarter.
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Secure everything.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Workifi brings enterprise-grade productivity tools to the decentralized web. 
              Collaborate with confidence knowing your data is encrypted and authentication 
              is blockchain-verified.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card 
                className="p-8 glass border-white/10 hover:border-primary/30 transition-all hover-elevate group relative overflow-hidden"
                data-testid={`card-workifi-${index}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl glass-strong flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <tool.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-accent">
                    <Lock className="w-3 h-3" />
                    <span>Blockchain secured</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 p-8 glass-strong rounded-2xl border border-primary/20 max-w-3xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Privacy-First Architecture</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every Workifi tool uses blockchain for authentication and IPFS for decentralized 
                storage. Your team's data never sits on centralized servers — it's distributed, 
                encrypted, and under your control.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
