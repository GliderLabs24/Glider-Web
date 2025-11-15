import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CheckCircle, ArrowRight, Zap, Lock, Star, Bell, Shield } from 'lucide-react';

// Floating orb component for background decoration
const FloatingOrb = ({ className = '' }) => (
  <div className={`absolute rounded-full filter blur-3xl opacity-20 animate-float ${className}`}></div>
);

export default function AppPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: 'I would like to join the waitlist for early access.'
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit form');
      }
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: 'I would like to join the waitlist for early access.'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-primary" />,
      title: "Lightning Fast",
      description: "Experience blazing fast performance"
    },
    {
      icon: <Lock className="w-5 h-5 text-primary" />,
      title: "Secure",
      description: "End-to-end encryption"
    },
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: "Privacy First",
      description: "Your data stays yours"
    }
  ];

  return (
    <div className={`min-h-screen bg-background text-foreground flex flex-col transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          <div className="absolute inset-0 bg-[#0f0a1a]" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cdefs%3E%3Cpattern id=%22pattern%22 width=%2240%22 height=%2240%22 patternUnits=%22userSpaceOnUse%22%3E%3Crect width=%222%22 height=%222%22 fill=%22%23885FF%22 opacity=%220.1%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23pattern)%22/%3E%3C/svg%3E")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
          </div>
          <FloatingOrb className="w-64 h-64 bg-purple-600/30 -top-32 -left-32" />
          <FloatingOrb className="w-96 h-96 bg-indigo-600/30 -bottom-48 -right-48" />
          <FloatingOrb className="w-80 h-80 bg-purple-700/30 top-1/2 right-1/4" />
        </div>
      </div>
      
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="relative z-10 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
                <span className="h-2 w-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-purple-200">Coming Soon</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 leading-tight">
                Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">amazing</span> is coming
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Join the waitlist to be the first to experience our revolutionary platform that's changing the game.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="font-medium text-white mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl overflow-hidden">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-700/30 to-gray-900/30 rounded-2xl blur opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Join the Waitlist</h2>
                    <p className="text-gray-400">Be the first to know when we launch</p>
                  </div>
                  
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-400/20 mb-4">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">You're on the list!</h3>
                      <p className="text-gray-300">We'll be in touch soon with exclusive updates.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        {/* Name Field */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                          <div className="relative">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 bg-black/40 border ${errors.name ? 'border-red-500' : 'border-gray-700/70'} rounded-lg text-white placeholder-gray-400/60 focus:outline-none focus:ring-2 focus:ring-gray-600/50 focus:border-transparent transition-all duration-200`}
                              placeholder="Your name"
                            />
                            {errors.name && (
                              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                            )}
                          </div>
                        </div>

                        {/* Email Field */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email address</label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 bg-black/40 border ${errors.email ? 'border-red-500' : 'border-gray-700/70'} rounded-lg text-white placeholder-gray-400/60 focus:outline-none focus:ring-2 focus:ring-gray-600/50 focus:border-transparent transition-all duration-200`}
                              placeholder="you@example.com"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                              </svg>
                            </div>
                            {errors.email && (
                              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                            )}
                          </div>
                        </div>

                        {/* Message Field */}
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                          <div className="relative">
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={3}
                              className={`w-full px-4 py-3 bg-black/40 border ${errors.message ? 'border-red-500' : 'border-gray-700/70'} rounded-lg text-white placeholder-gray-400/60 focus:outline-none focus:ring-2 focus:ring-gray-600/50 focus:border-transparent transition-all duration-200`}
                              placeholder="Tell us why you're interested in joining the waitlist"
                            />
                            {errors.message && (
                              <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-700/20 border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gray-600/50 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Joining...
                          </>
                        ) : (
                          <>
                            Join Waitlist
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </button>
                      
                      <p className="text-xs text-center text-gray-400/80 mt-4">
                        We respect your privacy. Unsubscribe at any time.
                      </p>
                    </form>
                  )}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full filter blur-3xl"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -z-10 -top-10 -right-10 w-32 h-32 bg-purple-600/20 rounded-full filter blur-3xl"></div>
              <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-blue-600/20 rounded-full filter blur-3xl"></div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Global styles for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          .animate-float:nth-child(2) {
            animation-delay: 2s;
          }
          .animate-float:nth-child(3) {
            animation-delay: 4s;
          }
        `
      }} />
    </div>
  );
}
