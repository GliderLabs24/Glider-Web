import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Brain, Sparkles, MessageSquare, FileSearch, Shield } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const features = [
  { icon: MessageSquare, title: 'Message Summaries', description: 'AI-powered conversation insights' },
  { icon: FileSearch, title: 'Meeting Notes', description: 'Automatic transcription & analysis' },
  { icon: Sparkles, title: 'Smart Analytics', description: 'Data-driven recommendations' }
];

export function AIHubSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section 
      id="ai-hub" 
      ref={ref}
      className="py-32 relative overflow-hidden"
      data-testid="section-ai-hub"
    >
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <Card className="p-12 glass-strong border-secondary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10" />
              
              {/* Particle effects */}
              {particles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? {
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  } : {}}
                  transition={{
                    duration: 3,
                    delay: particle.delay,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
              ))}

              <div className="relative z-10 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1 }}
                  className="relative"
                >
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-20 blur-3xl absolute inset-0" />
                  <div className="w-48 h-48 rounded-full glass-strong flex items-center justify-center relative">
                    <Brain className="w-24 h-24 text-primary" />
                  </div>
                  
                  {/* Orbiting elements */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        width: '200px',
                        height: '200px',
                        marginLeft: '-100px',
                        marginTop: '-100px',
                      }}
                      animate={isInView ? {
                        rotate: 360,
                      } : {}}
                      transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary absolute top-0 left-1/2 -translate-x-1/2"
                        style={{ 
                          boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" data-testid="text-ai-hub-title">
              Intelligence. Privacy.
              <br />
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Empowered.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Glider's AI Hub brings intelligent automation to your workflow — from summarizing 
              conversations to analyzing data — all while keeping your information private and secure.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Card className="p-5 glass border-white/10 hover:border-secondary/30 transition-all hover-elevate" data-testid={`card-ai-${index}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center shrink-0">
                        <feature.icon className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex items-start gap-3 p-4 glass rounded-lg border border-secondary/20 mt-6">
              <Shield className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                All AI processing respects your privacy. Data stays encrypted, models run locally 
                where possible, and you maintain full control over what gets analyzed.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-secondary/5 blur-3xl rounded-full" />
    </section>
  );
}
