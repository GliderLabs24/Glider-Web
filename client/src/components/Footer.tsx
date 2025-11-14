import { SiDiscord, SiX, SiGithub } from 'react-icons/si';

export function Footer() {
  return (
    <footer className="py-16 bg-black/40 backdrop-blur-xl border-t border-white/10" data-testid="footer-main">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-lg glow-blue">
                G
              </div>
              <span className="text-xl font-bold">Glider</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built decentralized. Powered by Glider.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="flex gap-4">
              <a 
                href="https://discord.gg/glider" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center hover-elevate transition-all hover:border-primary/30"
                data-testid="link-discord"
                aria-label="Discord"
              >
                <SiDiscord className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/glider" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center hover-elevate transition-all hover:border-primary/30"
                data-testid="link-x"
                aria-label="X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/glider" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center hover-elevate transition-all hover:border-primary/30"
                data-testid="link-github"
                aria-label="GitHub"
              >
                <SiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <p className="text-sm text-muted-foreground">
              © 2024 Goodluck Technologies
              <br />
              All rights reserved
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-muted-foreground">
            Built decentralized. Powered by Glider.
          </p>
        </div>
      </div>
    </footer>
  );
}
