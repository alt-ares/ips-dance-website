import { MetadataRoute } from 'next';
import { config } from '@/lib/config';

/**
 * Génère le sitemap XML du site
 * Inclut les balises hreflang pour le multilingue
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.siteUrl;
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/fr`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr`,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];
}

