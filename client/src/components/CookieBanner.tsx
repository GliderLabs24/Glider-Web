import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    // You can add your analytics initialization here if needed
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col space-y-4">
          <h3 className="text-white font-medium">We value your privacy</h3>
          <p className="text-sm text-gray-300">
            We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={declineCookies}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white flex-1"
            >
              Decline
            </Button>
            <Button 
              size="sm"
              onClick={acceptCookies}
              className="bg-primary hover:bg-primary/90 flex-1"
            >
              Accept All
            </Button>
          </div>
          <a 
            href="/cookies" 
            className="text-xs text-primary hover:underline text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  );
}
