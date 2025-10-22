import { Show } from '@/types';

/**
 * Données des spectacles de la compagnie IPS
 * Structure centralisée pour faciliter la maintenance
 */

export const showsFr: Show[] = [
  {
    title: "PARALLAXE",
    year: "2024",
    duration: "55'",
    description: "pièce pour 6 danseurs",
    category: "Pièces longues",
  },
  {
    title: "FOCAL",
    year: "2023",
    duration: "35'",
    description: "duo lumière-corps",
    category: "Duo/Trio",
  },
  {
    title: "24 i/s",
    year: "2022",
    duration: "50'",
    description: "écrans et chœur",
    category: "Pièces longues",
  },
  {
    title: "NOISE",
    year: "2021",
    duration: "20'",
    description: "solo in situ",
    category: "In situ",
  },
  {
    title: "PERSISTANCE",
    year: "2020",
    duration: "40'",
    description: "trio",
    category: "Duo/Trio",
  },
  {
    title: "PIXELS",
    year: "2019",
    duration: "30'",
    description: "jeune public",
    category: "Jeune public",
  },
];

export const showsEn: Show[] = [
  {
    title: "PARALLAXE",
    year: "2024",
    duration: "55'",
    description: "piece for 6 dancers",
    category: "Long pieces",
  },
  {
    title: "FOCAL",
    year: "2023",
    duration: "35'",
    description: "light-body duo",
    category: "Duo/Trio",
  },
  {
    title: "24 f/s",
    year: "2022",
    duration: "50'",
    description: "screens and choir",
    category: "Long pieces",
  },
  {
    title: "NOISE",
    year: "2021",
    duration: "20'",
    description: "in situ solo",
    category: "In situ",
  },
  {
    title: "PERSISTANCE",
    year: "2020",
    duration: "40'",
    description: "trio",
    category: "Duo/Trio",
  },
  {
    title: "PIXELS",
    year: "2019",
    duration: "30'",
    description: "young audience",
    category: "Young audience",
  },
];

export function getShows(lang: 'fr' | 'en'): Show[] {
  return lang === 'fr' ? showsFr : showsEn;
}

