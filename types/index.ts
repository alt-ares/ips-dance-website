/**
 * Types centralisés pour l'application IPS
 */

export type Language = 'fr' | 'en';

export interface Show {
  title: string;
  year: string;
  duration: string;
  description: string;
  category: string;
  image?: string;
}

export interface PerformanceDate {
  id: string;
  date: string; // Format: "DD.MM"
  fullDate?: string; // Format ISO: "2024-12-15"
  city: string;
  venue: string;
  show: string;
  ticketsUrl?: string;
  imageUrl?: string; // URL de l'image du spectacle
  createdAt?: string;
  updatedAt?: string;
}

export interface InfoCardProps {
  title: string;
  subtitle?: string;
  content: string;
  href: string;
  icon?: string;
  notification?: boolean;
  small?: boolean;
  large?: boolean;
  rightContent?: string;
  bottomText?: string;
  bottomRightContent?: string;
  extraContent?: string;
  extraContent2?: string;
  progressBar?: boolean;
  progressValue?: number;
  uniformDates?: boolean;
  highlightNextDate?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  rgpd: boolean;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  rgpd?: string;
}

export interface AdminAuthState {
  isAuthenticated: boolean;
  password?: string;
}

