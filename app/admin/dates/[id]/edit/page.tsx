"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { DateForm } from '@/components/admin/DateForm';
import { PerformanceDate } from '@/types';

export default function EditDatePage() {
  const params = useParams();
  const [date, setDate] = useState<PerformanceDate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDate();
  }, [params.id]);

  const loadDate = async () => {
    try {
      const response = await fetch(`/api/dates/${params.id}`);
      if (!response.ok) throw new Error('Date non trouvée');
      const data = await response.json();
      setDate(data);
    } catch (err) {
      setError('Impossible de charger la date');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-3xl">
        <div className="mb-8">
          <h2 className="font-grotesk font-bold text-3xl text-white mb-2">
            Modifier la date
          </h2>
          <p className="text-gray-light font-inter">
            Mettez à jour les informations de la représentation
          </p>
        </div>

        {isLoading ? (
          <div className="glass rounded-lg p-8 text-center">
            <p className="text-gray-light">Chargement...</p>
          </div>
        ) : error ? (
          <div className="glass rounded-lg p-6 border-l-4 border-red-500">
            <p className="text-red-500">{error}</p>
          </div>
        ) : date ? (
          <div className="glass rounded-lg p-6">
            <DateForm initialData={date} isEditing />
          </div>
        ) : null}
      </div>
    </ProtectedRoute>
  );
}

