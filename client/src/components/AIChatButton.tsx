import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Knowledge base for the AI with enhanced conversational abilities
const knowledgeBase = {
  // Enhanced greeting with more personality and variety
  greeting: [
    "Hey there! I'm your Glider AI assistant, here to help you navigate the future of decentralized communication and productivity. What's on your mind today? 🚀",
    "Welcome to Glider! I'm your AI co-pilot in this decentralized ecosystem. Whether you're here for messaging, crypto, or workspaces, I've got you covered. What would you like to explore first?",
    "Hi! I'm Glider AI, your guide to a more private, connected digital life. I can help you with anything from secure messaging to managing your crypto assets. What would you like to do?",
    "Hello! I'm your personal AI assistant in the Glider ecosystem. I'm here to help you communicate, collaborate, and transact with complete privacy. How can I assist you today?",
    "Hey! I'm Glider AI, your partner in the decentralized web. Whether you're new here or a power user, I'm ready to help you make the most of our platform. What would you like to know?"
  ],
  whatIsGlider: [
    "Glider is a fundamental shift in how we interact online - it's a decentralized social and productivity ecosystem where you're in complete control. Unlike traditional platforms, Glider combines secure messaging, multi-chain crypto wallets, collaborative workspaces, and AI assistance into one seamless experience where privacy and ownership are built-in by design.",
    "Imagine a world where your digital life isn't scattered across a dozen different platforms, but unified in one secure environment you control. That's Glider - a decentralized platform where your messages are private, your identity is yours, and your data stays with you. It's the future of how we'll work, communicate, and transact online.",
    "Glider is like having your own private digital nation - complete with its own economy, communication systems, and governance. It's where Web3 meets practical daily use, giving you the power of blockchain without the complexity. Whether you're sending a message, making a payment, or collaborating on a project, everything happens in one secure, private space.",
    "At its core, Glider is about giving power back to users. It's a complete rethinking of how we interact online - where you're not just a user, but a sovereign individual. With encrypted communications, self-custodial wallets, and decentralized infrastructure, Glider puts you in control of your digital life in ways traditional platforms never could."
  ],
  features: [
    "Let me break down what makes Glider special:\n\n🔒 *Privacy First*\n- End-to-end encrypted everything (messages, files, calls)\n- Decentralized storage where you control access\n- No data harvesting or tracking\n\n💬 *Communication*\n- Private 1:1 and group messaging\n- Encrypted voice/video calls\n- Decentralized social networking\n- Built-in crypto transfers in chat\n\n� *Web3 Integration*\n- Multi-chain wallet (Solana, Ethereum, Polygon+)\n- Send/receive crypto and NFTs in chat\n- Sign transactions securely\n- Connect to dApps\n\n💼 *Workifi Workspace*\n- Encrypted email and docs\n- Secure video meetings\n- Collaborative tools\n- Task management\n\n🤖 *AI Assistant*\n- Privacy-focused help across all features\n- Message summarization\n- Smart replies\n- Workflow automation\n\n🌐 *And More*\n- Cross-platform availability\n- Open source foundation\n- User-controlled identity\n- No platform lock-in"
  ],
  security: [
    "Security isn't just a feature at Glider - it's the foundation. Here's how we protect you:\n\n🔐 *Encryption Everywhere*\n- End-to-end encryption for all messages and files\n- Encrypted metadata to protect who you talk to and when\n- Encrypted storage for all your data\n\n🔑 *Key Management*\n- You control your private keys (we never see them)\n- Hardware wallet support for maximum security\n- Secure key backup and recovery options\n\n🌐 *Decentralized Infrastructure*\n- No central point of failure\n- Distributed storage of encrypted data\n- Open-source code that anyone can audit\n\n🛡️ *Privacy Protections*\n- No tracking or behavioral profiling\n- Minimal metadata collection\n- Local AI processing when possible\n- Clear data controls and permissions"
  ],
  socialLayer: [
    "Glider's social layer is where Web3 meets real social interaction. Unlike traditional platforms:\n\n👤 *Your Identity, Your Rules*\n- Truly own your profile and connections\n- Portable identity that works across apps\n- Verified on-chain credentials\n\n🌱 *Genuine Connections*\n- No algorithms deciding who sees your posts\n- Direct relationships with your audience\n- Community-owned spaces, not corporate feeds\n\n💎 *Value to Creators*\n- Direct monetization without middlemen\n- NFT-gated communities\n- Transparent supporter relationships\n\n🛡️ *Privacy First*\n- Share what you want, with who you want\n- No shadow profiles or hidden tracking\n- Control over your social graph"
  ],
  messaging: [
    "Glider's messaging is where secure communication meets Web3 functionality. Here's what makes it special:\n\n💬 *Private by Design*\n- End-to-end encrypted messages and calls\n- Disappearing messages with self-destruct timers\n- Secure file sharing with encryption\n- No message scanning or data mining\n\n💰 *Crypto-Native*\n- Send/receive crypto in any chat\n- Request and split payments\n- Sign transactions securely\n- View NFTs and tokens in-line\n\n👥 *Group Features*\n- Encrypted group chats\n- Admin controls and permissions\n- Custom emojis and reactions\n- Pinned messages and announcements\n\n🌐 *Seamless Experience*\n- Cross-device sync\n- Message search and history\n- Custom notifications\n- Read receipts and typing indicators"
  ],
  wallet: [
    "Your Glider wallet is your passport to Web3, built right into the platform. Key features include:\n\n🔗 *Multi-Chain Support*\n- Native support for Solana, Ethereum, Polygon, and more\n- Unified view of all your assets\n- Easy switching between networks\n\n💳 *Spend & Manage*\n- Send/receive crypto in chats\n- Buy/sell/swap with best rates\n- Track portfolio performance\n- View NFT collections\n\n🔒 *Security First*\n- Non-custodial - your keys, your crypto\n- Hardware wallet compatible\n- Transaction previews\n- Phishing protection\n\n🔄 *DeFi & dApps*\n- Connect to any Web3 app\n- Stake and earn yield\n- Bridge between chains\n- Sign messages and transactions"
  ],
  workifi: [
    "Workifi is your private, decentralized workspace in the Glider ecosystem. It's where productivity meets privacy:\n\n📧 *Secure Communication*\n- Encrypted email with blockchain verification\n- Private team messaging channels\n- Secure file sharing with access controls\n\n💼 *Collaboration Tools*\n- Real-time document editing\n- Task and project management\n- Shared calendars and scheduling\n- Whiteboard and brainstorming tools\n\n🎥 *Meetings & Calls*\n- End-to-end encrypted video calls\n- Screen sharing and collaboration\n- Meeting recordings (encrypted)\n- Virtual workspaces\n\n🔐 *Data Control*\n- Client-side encryption for all files\n- Granular permission settings\n- Self-hosted option for enterprises\n- Full data portability"
  ],
  aiHub: [
    "Glider's AI is your private assistant across the entire platform. Here's what makes it special:\n\n🤖 *Your Private Assistant*\n- On-device processing when possible\n- No data leaves your control\n- Works across all Glider features\n- Learns your preferences (if you want it to)\n\n💡 *Smart Features*\n- Message and email drafting\n- Document summarization\n- Meeting notes and action items\n- Research assistance\n- Code help and explanations\n\n🔍 *Web3 Superpowers*\n- Transaction explanations\n- Portfolio insights\n- Smart contract analysis\n- Security alerts\n- Gas optimization tips\n\n⚙️ *Complete Control*\n- Toggle features on/off\n- Adjust privacy levels\n- View and manage training data\n- Open-source models"
  ],
  gettingStarted: [
    "Welcome to Glider! Let's get you started on your decentralized journey:\n\n1. *Create Your Account*\n   - Download the Glider app\n   - Set up your decentralized identity\n   - Secure with 2FA and recovery options\n\n2. *Set Up Your Wallet*\n   - Create a new wallet or import existing\n   - Add some crypto (SOL, ETH, etc.)\n   - Explore your wallet interface\n\n3. *Connect & Explore*\n   - Find and connect with friends\n   - Join communities that interest you\n   - Try sending your first encrypted message\n\n4. *Discover More*\n   - Set up your Workifi workspace\n   - Try a secure video call\n   - Explore dApps in the ecosystem\n\nWould you like me to guide you through any of these steps in more detail?"
  ],
  default: [
    "I'm here to help you navigate Glider's decentralized ecosystem. Whether you're looking to send secure messages, manage crypto, collaborate with your team, or explore Web3, I've got you covered. What would you like to do?",
    "I'm your Glider assistant, here to help you make the most of our platform. You can ask me about messaging, your wallet, workspaces, or anything else about Glider. What's on your mind?",
    "I'm here to help you with all things Glider. Whether you're new to decentralized platforms or a Web3 pro, I can help you with secure messaging, crypto transactions, private workspaces, and more. What would you like to know?",
    "Welcome! I'm your guide to Glider's decentralized world. From private messaging to managing your crypto to collaborating securely, I'm here to help. What would you like to explore first?",
    "Hey there! I'm your personal assistant for everything Glider. Whether you need help with the basics or want to explore advanced features, just ask. What can I help you with today?"
  ]
};

// Helper function to get AI response with more natural conversation flow
// Helper function to check if a message is casual conversation
const isCasualGreeting = (message: string): boolean => {
  return /^(how are you|how's it going|how are things|what's up|sup|hey|hi|hello|greetings?|yo|what's new|howdy|good (morning|afternoon|evening)|h[ie]y there)\b/i.test(message);
};

// Helper function to check if message is asking for name
const isAskingName = (message: string): boolean => {
  return /(what'?s|what is) (your|ur) name\??$|who are you\??$/i.test(message);
};

// Helper function to check if message is expressing thanks
const isThanking = (message: string): boolean => {
  return /(thanks|thank you|appreciate it|cheers|ty|thx|grateful|i appreciate)/i.test(message);
};

// Helper function to check if message is asking for help
const isAskingForHelp = (message: string): boolean => {
  return /(help|support|what can you do|what do you do|how does this work|how to use|tutorial)/i.test(message);
};

// Helper function to get a random response from an array
const getRandomResponse = (responses: string[]): string => {
  return responses[Math.floor(Math.random() * responses.length)];
};

const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Handle casual greetings
  if (isCasualGreeting(lowerMessage)) {
    const responses = [
      "I'm doing great, thanks for asking! I'm here to help you explore Glider. What can I assist you with today?",
      "Hello there! I'm doing well. How about you? What brings you to Glider?",
      "Hi! I'm just a bunch of code, but I'm excited to help you with anything about Glider. What would you like to know?",
      "Hey! I'm here and ready to assist you with Glider. What's on your mind?"
    ];
    return getRandomResponse(responses);
  }
  
  // Handle name requests
  if (isAskingName(lowerMessage)) {
    const responses = [
      "I'm Glider AI, your personal assistant for all things related to the Glider platform. Nice to meet you! How can I help you today?",
      "You can call me Glider AI. I'm here to help you navigate our decentralized ecosystem. What would you like to explore?",
      "I'm your Glider assistant! I help users like you get the most out of our platform. What can I help you with?"
    ];
    return getRandomResponse(responses);
  }
  
  // Handle thanks
  if (isThanking(lowerMessage)) {
    const responses = [
      "You're welcome! Is there anything else I can help you with in Glider?",
      "Happy to help! Let me know if you have any other questions about the platform.",
      "Anytime! That's what I'm here for. What else would you like to know?",
      "No problem at all! If you need anything else, just ask!"
    ];
    return getRandomResponse(responses);
  }
  
  // Handle help requests
  if (isAskingForHelp(lowerMessage)) {
    const responses = [
      "I'm here to help! I can assist you with messaging, your wallet, workspaces, or any other Glider features. What do you need help with?",
      "I'd be happy to help! I can explain how to use Glider, help with transactions, or answer any questions you have. What would you like to know?",
      "I'm your Glider assistant! I can help you with secure messaging, crypto transactions, workspaces, and more. What do you need assistance with?"
    ];
    return getRandomResponse(responses);
  }
  
  // Check knowledge base for other queries
  if (/(what|tell me about|explain|who is|what is).*glider/i.test(lowerMessage)) {
    return knowledgeBase.whatIsGlider[Math.floor(Math.random() * knowledgeBase.whatIsGlider.length)];
  }
  
  if (/features?|what can.*do|capabilities?|show me what glider can do/i.test(lowerMessage)) {
    return knowledgeBase.features[Math.floor(Math.random() * knowledgeBase.features.length)];
  }
  
  if (/(secure|security|privacy|safe|encryption|how safe|private).*(glider|data|messages?|wallet|chats?|crypto|transactions?|files?|documents?|meetings?|email|workifi|ai|assistant)|(glider|your).*(secure|safe|private|encrypt)/i.test(lowerMessage)) {
    return knowledgeBase.security[Math.floor(Math.random() * knowledgeBase.security.length)];
  }
  
  if (/(social|profile|community|communities|follow|following|feed|post|share|like|comment|reputation).*(glider|how|what)|(glider|your).*(social|community|profile|follow|feed)/i.test(lowerMessage)) {
    return knowledgeBase.socialLayer[Math.floor(Math.random() * knowledgeBase.socialLayer.length)];
  }
  
  if (/(message|chat|talk|conversation|dm|direct message|group chat).*(glider|how|what)|(glider|your).*(message|chat|talk|conversation|dm|group)/i.test(lowerMessage)) {
    return knowledgeBase.messaging[Math.floor(Math.random() * knowledgeBase.messaging.length)];
  }
  
  if (/(wallet|crypto|nft|token|blockchain|defi|ethereum|solana|polygon|bitcoin|btc|eth|sol|matic|send money|receive money|transaction|pay|payment).*(glider|how|what)|(glider|your).*(wallet|crypto|nft|token|blockchain|defi|ethereum|solana|polygon|bitcoin|btc|eth|sol|matic|send money|receive money|transaction|pay|payment)/i.test(lowerMessage)) {
    return knowledgeBase.wallet[Math.floor(Math.random() * knowledgeBase.wallet.length)];
  }
  
  if (/(workifi|workspace|work|productivity|task|project|meeting|email|document|file|collaborat(e|ion)|team).*(glider|how|what)|(glider|your).*(workifi|workspace|work|productivity|task|project|meeting|email|document|file|collaborat(e|ion)|team)/i.test(lowerMessage)) {
    return knowledgeBase.workifi[Math.floor(Math.random() * knowledgeBase.workifi.length)];
  }
  
  if (/(ai|assistant|bot|chatbot|help|support|how to|how do i|can you|what can you do|what should i do|what's next|get started|begin|start using|new to glider).*(glider|you)|(glider|you).*(ai|assistant|bot|chatbot|help|support|how to|how do i|can you|what can you do)/i.test(lowerMessage)) {
    if (/(get started|begin|start using|new to glider|first time|how to start|onboard|tutorial)/i.test(lowerMessage)) {
      return knowledgeBase.gettingStarted[Math.floor(Math.random() * knowledgeBase.gettingStarted.length)];
    }
    return knowledgeBase.aiHub[Math.floor(Math.random() * knowledgeBase.aiHub.length)];
  }
  
  return knowledgeBase.default[Math.floor(Math.random() * knowledgeBase.default.length)];
};

type Message = {
  role: 'ai' | 'user';
  content: string;
};

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: knowledgeBase.greeting[0] + '\n\nTry asking:\n• What is Glider?\n• What features do you offer?\n• How secure is Glider?'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Get AI response
    const aiResponse = getAIResponse(input);
    
    // Simulate typing effect
    const words = aiResponse.split(' ');
    let response = '';
    
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 40));
      response += (i > 0 ? ' ' : '') + words[i];
      
      // Create a new messages array with the latest AI response
      const updatedMessages = [...messages, userMessage];
      if (i === words.length - 1) {
        // If this is the final update, include the full response
        setMessages([...updatedMessages, { role: 'ai' as const, content: response }]);
      } else {
        // For intermediate typing effect, replace the last message
        setMessages([...updatedMessages, { role: 'ai' as const, content: response }]);
      }
    }
    
    setIsTyping(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-20 right-6 w-[calc(100vw-3rem)] sm:w-96 bg-background rounded-xl shadow-2xl border border-border/50 overflow-hidden flex flex-col backdrop-blur-lg bg-background/90"
            style={{ 
              height: '70vh', 
              maxHeight: '600px',
              zIndex: 9999
            }}
          >
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 border-b border-border/50 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-primary/30 rounded-full blur opacity-75"></div>
                  <Bot className="relative w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Glider AI Assistant</h3>
              </div>
            </div>

            <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-foreground/20">
              {messages.map((message, index) => {
                const isUser = message.role === 'user';
                return (
                  <div 
                    key={index} 
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-sm leading-relaxed ${
                        isUser 
                          ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20' 
                          : 'bg-muted/80 border border-border/20 shadow-sm'
                      } whitespace-pre-line`}
                    >
                      {message.content}
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex items-center gap-1.5 px-4 py-2 bg-muted/50 rounded-2xl w-fit">
                  <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-border/30 bg-background/80">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about Glider..."
                  className="w-full pr-10 pl-3 py-2 sm:pl-4 sm:py-2.5 text-sm rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent placeholder:text-foreground/40"
                  disabled={isTyping}
                />
                <button 
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg ${
                    isTyping || !input.trim() 
                      ? 'text-foreground/30' 
                      : 'text-primary hover:bg-primary/10'
                  } transition-colors`}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl ${
          isOpen 
            ? 'bg-primary/90 text-primary-foreground' 
            : 'bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground hover:shadow-primary/30'
        } transition-all duration-300 hover:shadow-lg z-[10000]`}
        aria-label="Chat with Glider AI"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem'
        }}
      >
        <div className={`absolute inset-0 rounded-full bg-primary/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isOpen ? '!opacity-0' : ''}`}></div>
        <Sparkles className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>
    </div>
  );
}
