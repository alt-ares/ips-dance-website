"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { PerformanceDate } from '@/types';

interface DateFormProps {
  initialData?: PerformanceDate;
  isEditing?: boolean;
}

export function DateForm({ initialData, isEditing = false }: DateFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullDate: initialData?.fullDate || '',
    city: initialData?.city || '',
    venue: initialData?.venue || '',
    show: initialData?.show || '',
    ticketsUrl: initialData?.ticketsUrl || '',
    imageUrl: initialData?.imageUrl || '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Calculer automatiquement le format court (dd.mm) depuis fullDate
      let shortDate = '';
      if (formData.fullDate) {
        const date = new Date(formData.fullDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        shortDate = `${day}.${month}`;
      }

      const dataToSend = {
        ...formData,
        date: shortDate, // Généré automatiquement
      };

      const url = isEditing 
        ? `/api/dates/${initialData?.id}` 
        : '/api/dates';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="glass rounded-lg p-4 border-l-4 border-red-500">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="fullDate" className="block text-sm font-inter text-gray-light mb-2">
          Date de la représentation *
        </label>
        <input
          type="date"
          id="fullDate"
          name="fullDate"
          value={formData.fullDate}
          onChange={handleChange}
          className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-light focus:ring-2 focus:ring-brand-orange focus:outline-none"
          required
        />
        <p className="text-xs text-gray-light mt-2">
          Le format court (JJ.MM) sera calculé automatiquement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="city" className="block text-sm font-inter text-gray-light mb-2">
            Ville *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-light focus:ring-2 focus:ring-brand-orange focus:outline-none"
            placeholder="Paris"
            required
          />
        </div>

        <div>
          <label htmlFor="venue" className="block text-sm font-inter text-gray-light mb-2">
            Lieu *
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-light focus:ring-2 focus:ring-brand-orange focus:outline-none"
            placeholder="Le Centquatre"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="show" className="block text-sm font-inter text-gray-light mb-2">
          Spectacle *
        </label>
        <input
          type="text"
          id="show"
          name="show"
          value={formData.show}
          onChange={handleChange}
          className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-light focus:ring-2 focus:ring-brand-orange focus:outline-none"
          placeholder="PARALLAXE"
          required
        />
      </div>

      <div>
        <label htmlFor="ticketsUrl" className="block text-sm font-inter text-gray-light mb-2">
          Lien billetterie (optionnel)
        </label>
        <input
          type="url"
          id="ticketsUrl"
          name="ticketsUrl"
          value={formData.ticketsUrl}
          onChange={handleChange}
          className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-light focus:ring-2 focus:ring-brand-orange focus:outline-none"
          placeholder="https://..."
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-inter text-gray-light mb-2">
          Image du spectacle (optionnel)
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-light focus:ring-2 focus:ring-brand-orange focus:outline-none"
          placeholder="https://example.com/image.jpg"
        />
        <p className="text-xs text-gray-light mt-2">
          L'image s'affichera au survol de la carte dans la section "Les dates"
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg bg-brand-orange text-white font-inter font-medium hover:bg-brand-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enregistrement...' : isEditing ? 'Mettre à jour' : 'Créer'}
        </button>
        
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-lg glass text-white font-inter font-medium hover:bg-gray-dark/50 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

