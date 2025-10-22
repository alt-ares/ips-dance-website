"use client";

import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { DateForm } from '@/components/admin/DateForm';

export default function NewDatePage() {
  return (
    <ProtectedRoute>
      <div className="max-w-3xl">
        <div className="mb-8">
          <h2 className="font-grotesk font-bold text-3xl text-white mb-2">
            Nouvelle date de spectacle
          </h2>
          <p className="text-gray-light font-inter">
            Ajoutez une nouvelle date de représentation
          </p>
        </div>

        <div className="glass rounded-lg p-6">
          <DateForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}

