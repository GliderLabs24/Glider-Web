import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MessageCircle, Lock, Coins as CoinsIcon, CheckCircle } from 'lucide-react';
import { useRef } from 'react';

const messages = [
  { text: 'Hey! Ready to collaborate?', isSent: false, amount: null },
  { text: 'Absolutely! Sending payment now', isSent: true, amount: '50 SOL' },
  { text: 'Payment received ✓', isSent: false, amount: null },
];

export function MessagingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      id="messaging" 
      ref={ref}
      className="py-32 relative"
      data-testid="section-messaging"
    >
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <Card className="p-4 sm:p-6 glass-strong border-primary/20">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: message.isSent ? 50 : -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
                    data-testid={`message-${index}`}
                  >
                    <div className={`max-w-[80%] sm:max-w-xs ${message.isSent ? 'text-right' : 'text-left'}`}>
                      <div 
                        className={`inline-block px-3 py-2 rounded-xl ${
                          message.isSent 
                            ? 'bg-primary text-primary-foreground' 
                            : 'glass border border-white/10'
                        }`}
                      >
                        <p className="text-xs sm:text-sm">{message.text}</p>
                        {message.amount && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: (index * 0.2) + 0.3 }}
                            className="mt-1 flex items-center gap-1 text-[10px] sm:text-xs font-semibold"
                          >
                            <CoinsIcon className="w-4 h-4" />
                            {message.amount}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    <span>Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>On-chain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CoinsIcon className="w-4 h-4 text-primary" />
                    <span>Instant Crypto</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" data-testid="text-messaging-title">
              Chat. Transact.
              <br />
              <span className="text-secondary">Trust.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Send messages that become value. Glider Messaging integrates crypto transfers directly 
              into conversations.. encrypted, instant, and verified on-chain. No separate apps, 
              no friction.
            </p>
            <div className="flex items-start gap-4 glass p-4 rounded-lg border border-white/10">
              <MessageCircle className="w-6 h-6 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">End-to-End Security</h3>
                <p className="text-sm text-muted-foreground">
                  Every message is encrypted. Every transaction is confirmed. Your conversations 
                  stay private, your value stays safe.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
