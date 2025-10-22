import { PerformanceDate, Language } from '@/types';

/**
 * Utilitaires de formatage de dates pour le site IPS
 */

/**
 * Formate une date complète avec jour de la semaine
 * FR: "dimanche 15 décembre 2024"
 * EN: "Sunday, December 15, 2024"
 */
export function formatFullDate(dateString: string, lang: Language): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return '';
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  
  return date.toLocaleDateString(locale, options);
}

/**
 * Formate une date courte au format dd.mm
 * Ex: "15.12"
 */
export function formatShortDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return '';
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  
  return `${day}.${month}`;
}

/**
 * Récupère les dates à venir (futures), triées par date
 */
export function getUpcomingDates(
  dates: PerformanceDate[],
  limit?: number
): PerformanceDate[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Reset to start of day
  
  // Filtrer les dates futures et trier par date
  const upcomingDates = dates
    .filter((date) => {
      if (!date.fullDate) return false;
      const dateObj = new Date(date.fullDate);
      return dateObj >= now;
    })
    .sort((a, b) => {
      const dateA = new Date(a.fullDate!);
      const dateB = new Date(b.fullDate!);
      return dateA.getTime() - dateB.getTime();
    });
  
  // Limiter le nombre de résultats si spécifié
  return limit ? upcomingDates.slice(0, limit) : upcomingDates;
}

/**
 * Génère un pourcentage de remplissage aléatoire (mock)
 * TODO: En production, récupérer depuis la base de données
 */
export function getMockFillPercentage(): number {
  // Génère un nombre aléatoire entre 40 et 95
  return Math.floor(Math.random() * (95 - 40 + 1)) + 40;
}

/**
 * Formate la venue complète avec ville
 * Ex: "Le Centquatre - Paris"
 */
export function formatVenueCity(venue: string, city: string): string {
  return `${venue} - ${city}`;
}

/**
 * Formate une date complète pour affichage dans la section dates
 * Ex: "Le Centquatre - Paris, dimanche 15 décembre 2024"
 */
export function formatDateDisplay(
  date: PerformanceDate,
  lang: Language
): string {
  const venueCity = formatVenueCity(date.venue, date.city);
  const fullDate = date.fullDate ? formatFullDate(date.fullDate, lang) : '';
  
  if (!fullDate) {
    return venueCity;
  }
  
  return `${venueCity}, ${fullDate}`;
}

