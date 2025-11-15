import { Switch, Route, useLocation, useRoute } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AIChatButton } from "@/components/AIChatButton";
import { CookieBanner } from "@/components/CookieBanner";
import Home from "@/pages/Home";
import AppPage from "@/pages/App";
import Cookies from "@/pages/Cookies";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";

// Simple password protection for admin routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, verify password on the server
    if (password === import.meta.env.VITE_ADMIN_PASSWORD || password === 'glider2023') {
      localStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAdminRoute) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/app" component={AppPage} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/admin/waitlist">
        {() => {
          window.location.href = '/admin';
          return null;
        }}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          <ProtectedRoute>
            <Router />
          </ProtectedRoute>
          <AIChatButton />
          <CookieBanner />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
