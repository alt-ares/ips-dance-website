"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { PerformanceDate } from '@/types';

export default function AdminPage() {
  const [dates, setDates] = useState<PerformanceDate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDates();
  }, []);

  const loadDates = async () => {
    try {
      const response = await fetch('/api/dates');
      if (!response.ok) throw new Error('Erreur de chargement');
      const data = await response.json();
      setDates(data);
    } catch (err) {
      setError('Impossible de charger les dates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette date ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/dates/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur de suppression');
      
      // Recharger les dates
      loadDates();
    } catch (err) {
      alert('Impossible de supprimer la date');
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-grotesk font-bold text-3xl text-white mb-2">
              Gestion des dates
            </h2>
            <p className="text-gray-light font-inter">
              Gérez les dates de spectacles affichées sur le site
            </p>
          </div>
          
          <Link
            href="/admin/dates/new"
            className="px-6 py-3 rounded-lg bg-brand-orange text-white font-inter font-medium hover:bg-brand-orange/90 transition-colors"
          >
            + Nouvelle date
          </Link>
        </div>

        {error && (
          <div className="glass rounded-lg p-4 border-l-4 border-red-500">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="glass rounded-lg p-8 text-center">
            <p className="text-gray-light">Chargement...</p>
          </div>
        ) : dates.length === 0 ? (
          <div className="glass rounded-lg p-8 text-center">
            <p className="text-gray-light mb-4">Aucune date enregistrée</p>
            <Link
              href="/admin/dates/new"
              className="inline-block px-6 py-3 rounded-lg bg-brand-orange text-white font-inter font-medium hover:bg-brand-orange/90 transition-colors"
            >
              Créer la première date
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {dates.map((date) => (
              <div
                key={date.id}
                className="glass rounded-lg p-6 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-2xl font-grotesk font-bold text-brand-orange">
                      {date.date}
                    </span>
                    <h3 className="text-xl font-grotesk font-bold text-white">
                      {date.show}
                    </h3>
                  </div>
                  <p className="text-gray-light font-inter">
                    {date.venue} — {date.city}
                  </p>
                  {date.fullDate && (
                    <p className="text-gray text-sm font-inter mt-1">
                      {new Date(date.fullDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Link
                    href={`/admin/dates/${date.id}/edit`}
                    className="px-4 py-2 rounded-lg glass text-white font-inter hover:bg-gray-dark/50 transition-colors"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(date.id)}
                    className="px-4 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="glass rounded-lg p-6">
          <h3 className="font-grotesk font-bold text-xl text-white mb-4">
            Actions rapides
          </h3>
          <div className="space-y-2">
            <Link
              href="/fr"
              className="block text-gray-light hover:text-white transition-colors font-inter"
            >
              → Voir le site en français
            </Link>
            <Link
              href="/en"
              className="block text-gray-light hover:text-white transition-colors font-inter"
            >
              → Voir le site en anglais
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

