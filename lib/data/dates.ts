import { PerformanceDate } from '@/types';
import datesData from './dates.json';

/**
 * Gestion des dates de spectacles
 * En production, cette logique sera remplacée par une vraie base de données
 */

export function getAllDates(): PerformanceDate[] {
  return datesData as PerformanceDate[];
}

export function getDateById(id: string): PerformanceDate | undefined {
  return datesData.find((date) => date.id === id);
}

// Fallback statique si l'API échoue
export const fallbackDates: PerformanceDate[] = [
  {
    id: "fallback-1",
    date: "15.11",
    fullDate: "2025-11-15",
    city: "Paris",
    venue: "Le Centquatre",
    show: "PARALLAXE",
    imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=800&fit=crop",
  },
  {
    id: "fallback-2",
    date: "08.12",
    fullDate: "2025-12-08",
    city: "Marseille",
    venue: "La Criée",
    show: "FOCAL",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=800&fit=crop",
  },
  {
    id: "fallback-3",
    date: "22.01",
    fullDate: "2026-01-22",
    city: "Lyon",
    venue: "Les Subs",
    show: "24 i/s",
  },
];

