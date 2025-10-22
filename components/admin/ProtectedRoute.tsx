"use client";

import { useState, useEffect, FormEvent } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Composant de protection basique pour l'admin
 * En production, remplacer par une vraie authentification (NextAuth, Clerk, etc.)
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si déjà authentifié
    const auth = localStorage.getItem('admin_auth');
    setIsAuthenticated(auth === 'true');
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Mot de passe sécurisé via variable d'environnement
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    
    if (password === correctPassword) {
      localStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="glass rounded-lg p-8">
            <h1 className="font-grotesk font-bold text-3xl text-white mb-6 text-center">
              Admin IPS
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-inter text-gray-light mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-light focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  placeholder="Entrez le mot de passe"
                  autoFocus
                />
              </div>
              
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-brand-orange text-white font-inter font-medium hover:bg-brand-orange/90 transition-colors"
              >
                Se connecter
              </button>
            </form>
            
            <p className="text-gray-light text-xs mt-6 text-center">
              Mot de passe par défaut : admin123
              <br />
              <span className="text-brand-orange">⚠️ À changer en production</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="font-grotesk font-bold text-2xl text-white">
            Admin IPS
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-light hover:text-white transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}

