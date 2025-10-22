import { config } from '@/lib/config';
import { Language } from '@/types';

interface StructuredDataProps {
  lang: Language;
}

/**
 * Composant pour les données structurées JSON-LD (schema.org)
 * Améliore le référencement et l'affichage dans les résultats de recherche
 */
export function StructuredData({ lang }: StructuredDataProps) {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'PerformingGroup',
    name: config.site.name,
    alternateName: config.site.shortName,
    url: config.siteUrl,
    logo: `${config.siteUrl}${config.images.logo}`,
    image: `${config.siteUrl}${lang === 'fr' ? config.images.ogImageFr : config.images.ogImageEn}`,
    description: config.site.description[lang],
    email: config.site.email.booking,
    telephone: config.site.phone,
    genre: lang === 'fr' ? 'Danse contemporaine' : 'Contemporary dance',
    sameAs: [
      config.social.instagram,
      config.social.facebook,
      config.social.youtube,
      config.social.vimeo,
    ].filter(url => url !== '#'), // Filtrer les liens non configurés
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'booking',
        email: config.site.email.booking,
        telephone: config.site.phone,
      },
      {
        '@type': 'ContactPoint',
        contactType: 'press',
        email: config.site.email.press,
      },
    ],
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.site.name,
    url: config.siteUrl,
    inLanguage: [lang === 'fr' ? 'fr-FR' : 'en-US'],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${config.siteUrl}/${lang}#dates?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
    </>
  );
}

