import { SiYoutube, SiInstagram, SiLinkedin, SiTelegram, SiGithub, SiX } from 'react-icons/si';

export function Footer() {
  return (
    <footer className="relative py-20 bg-black/40 backdrop-blur-xl border-t border-white/10 overflow-hidden" data-testid="footer-main">
      {/* Glider text logo background */}
      <div className="absolute inset-x-0 -top-20 h-40 w-full flex items-center justify-center pointer-events-none">
        <img 
          src="https://green-rainy-clam-911.mypinata.cloud/ipfs/bafybeieni6d3tyn2oyr2p4ucgbbh6lbal65ovwu2ui5dsgnmh7yvxl4aue" 
          alt="Glider" 
          className="w-full max-w-4xl h-auto opacity-10"
          style={{ transform: 'translateY(50%)' }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://green-rainy-clam-911.mypinata.cloud/ipfs/bafkreif4rnp5754if77z747skgfhwgjj4vh5jb56d5dgrbjudsxl2nppsi"
                alt="Glider Logo"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Glider
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built decentralized. Powered by Glider.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="flex flex-wrap gap-2">
              <a 
                href="https://www.linkedin.com/in/glider-labs-751415373/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center hover-elevate transition-all hover:border-blue-400/50"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="w-4 h-4 text-blue-400" />
              </a>
              <a 
                href="https://x.com/Gliderweb3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center hover-elevate transition-all hover:border-gray-400/50"
                aria-label="X (Twitter)"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/gliderweb3/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center hover-elevate transition-all hover:border-pink-500/50"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4 text-pink-400" />
              </a>
              <a 
                href="https://github.com/GliderLabs24" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center hover-elevate transition-all hover:border-gray-400/50"
                aria-label="GitHub"
              >
                <SiGithub className="w-4 h-4 text-gray-200" />
              </a>
              <a 
                href="https://www.youtube.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center hover-elevate transition-all hover:border-red-500/50"
                aria-label="YouTube"
              >
                <SiYoutube className="w-4 h-4 text-red-500" />
              </a>
              <a 
                href="https://t.me/+2ErSV0N4ufZiNDZl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center hover-elevate transition-all hover:border-blue-400/50"
                aria-label="Telegram"
              >
                <SiTelegram className="w-4 h-4 text-blue-400" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <p className="text-sm text-muted-foreground">
              © 2025 Goodluck Labs
              <br />
              All rights reserved
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Built decentralized. Powered by Glider.
          </p>
        </div>
      </div>
    </footer>
  );
}
