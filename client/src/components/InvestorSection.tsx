import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Rocket, Users, TrendingUp } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { insertContactSchema, type InsertContact } from '../../../shared/client-schemas';

export function InvestorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { toast } = useToast();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      // Use relative URL; if the API route is not available in static deploy, this will
      // be caught and surfaced as a toast without crashing the app.
      return await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: 'Message sent!',
        description: 'Thank you for your interest. We\'ll be in touch soon.',
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to send message. Please try again later.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (data: InsertContact) => {
    try {
      // Submit the form data to the backend
      await contactMutation.mutateAsync(data);
      // Success toast handled in onSuccess. Avoid double toasts here.
    } catch (error) {
      // Error toast handled in onError. Avoid console noise in production.
    }
  };

  const onInvalid = (errors: any) => {
    console.log('Form validation errors:', errors);
  };

  return (
    <section 
      id="investor" 
      ref={ref}
      className="py-32 relative overflow-hidden"
      data-testid="section-investor"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Join Our Mission</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6" data-testid="text-investor-title">
            Glider is actively raising funds
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Be part of the next generation of decentralized social infrastructure. 
            Partner with us to build the future of Web3.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <Card className="p-8 glass-strong border-primary/20">
              <h3 className="text-2xl font-semibold mb-6">Why Glider?</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Market Opportunity</h4>
                    <p className="text-sm text-muted-foreground">
                      Decentralized social platforms are projected to reach $50B+ by 2030
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Strategic Partnerships</h4>
                    <p className="text-sm text-muted-foreground">
                      Collaborating with leading Web3 protocols and infrastructure providers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0">
                    <Rocket className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Proven Technology</h4>
                    <p className="text-sm text-muted-foreground">
                      Battle-tested infrastructure serving thousands of users
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 glass-strong border-primary/20">
              <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} noValidate className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="glass border-white/10 focus:border-primary/50"
                            data-testid="input-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            className="glass border-white/10 focus:border-primary/50"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your interest in Glider..."
                            rows={5}
                            className="glass border-white/10 focus:border-primary/50 resize-none"
                            data-testid="input-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full glow-blue font-semibold"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit"
                  >
                    {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
