import { Metadata } from 'next';
import { config } from './config';

type Language = 'fr' | 'en';

/**
 * Génère les metadata SEO complets pour une page donnée
 */
export function generateMetadata(lang: Language): Metadata {
  const title = lang === 'fr' 
    ? 'IPS — Images Par Seconde | Compagnie de danse contemporaine'
    : 'IPS — Images Par Seconde | Contemporary dance company';
  
  const description = config.site.description[lang];
  
  const url = `${config.siteUrl}/${lang}`;
  const ogImage = lang === 'fr' ? config.images.ogImageFr : config.images.ogImageEn;
  const absoluteOgImage = `${config.siteUrl}${ogImage}`;

  return {
    title,
    description,
    keywords: lang === 'fr' 
      ? ['danse contemporaine', 'chorégraphie', 'spectacle', 'performance', 'art visuel', 'IPS', 'Images Par Seconde']
      : ['contemporary dance', 'choreography', 'show', 'performance', 'visual art', 'IPS', 'Images Par Seconde'],
    authors: [{ name: 'IPS - Images Par Seconde' }],
    creator: 'IPS - Images Par Seconde',
    publisher: 'IPS - Images Par Seconde',
    
    // Open Graph
    openGraph: {
      type: 'website',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      url,
      title,
      description,
      siteName: config.site.name,
      images: [
        {
          url: absoluteOgImage,
          width: 1200,
          height: 630,
          alt: config.site.name,
        },
      ],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteOgImage],
    },
    
    // Canonical URL
    alternates: {
      canonical: url,
      languages: {
        'fr': `${config.siteUrl}/fr`,
        'en': `${config.siteUrl}/en`,
        'x-default': config.siteUrl,
      },
    },
    
    // Icons
    icons: {
      icon: config.images.favicon,
      apple: config.images.appleTouchIcon,
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Verification (à compléter lors de la mise en production)
    // verification: {
    //   google: 'votre-code-google',
    // },
  };
}

/**
 * Metadata pour la page racine (noindex)
 */
export const rootMetadata: Metadata = {
  title: 'IPS — Images Par Seconde',
  description: 'Compagnie de danse contemporaine',
  robots: {
    index: false,
    follow: true,
  },
  icons: {
    icon: config.images.favicon,
    apple: config.images.appleTouchIcon,
  },
};

