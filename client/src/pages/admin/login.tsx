import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StarsBackground } from "../../components/StarsBackground";
import { Lock } from 'lucide-react';
import { useAuth } from "../../contexts/AuthContext";
import { GlowButton } from "../../components/ui/glow-button";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { checkAuth, isAuthenticated, isLoading: authLoading } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/admin/form-submissions');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include' // Important for cookies
      });

      const data = await response.json();

      if (response.ok) {
        // Small delay to ensure session is saved
        await new Promise(resolve => setTimeout(resolve, 100));
        // Update auth state before navigating
        await checkAuth();
        navigate('/admin/form-submissions');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center" style={{ 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)'
    }}>
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <Suspense fallback={null}>
            <StarsBackground />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#4746a4]/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-[#4746a4]" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-white/60 mt-2">Enter password to access admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-white/80 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#4746a4] transition-colors"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3 text-red-200">
                {error}
              </div>
            )}

            <GlowButton
              onClick={handleSubmit}
              className="w-full"
              showArrow={true}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </GlowButton>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-white/60 hover:text-white transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}