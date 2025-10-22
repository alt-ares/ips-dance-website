export const translations = {
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      about: "Qui sommes-nous",
      works: "Réalisations",
      dates: "Les dates",
      contact: "Contact",
    },
    // Hero Section
    hero: {
      title: "Images par seconde",
      subtitle: "Compagnie de danse contemporaine",
    },
    // Info Cards
    infoCards: {
      nextPerformance: "Prochaine représentation",
      upcomingPerformances: "Prochaines représentations",
      hallPercentFull: "Salle {percent}% remplie",
      allDates: "Toutes les dates",
    },
    // About Section
    about: {
      sectionTitle: "Qui sommes-nous",
      heading: "Mouvement. Image. Rythme.",
      description: "IPS explore le lien entre corps, cadence et image. Chaque création mêle danse, lumière et narration visuelle pour faire vibrer une seconde en mille fragments. Direction artistique: IPS.",
      stats: {
        years: "années de création",
        shows: "spectacles joués",
        dancers: "danseurs invités",
      },
      cards: {
        choreography: {
          title: "Chorégraphie",
          description: "Création de mouvements qui transcendent la simple exécution pour devenir langage universel.",
        },
        visualResearch: {
          title: "Recherche visuelle",
          description: "Exploration des liens entre corps et image, lumière et ombre, temps et espace.",
        },
        transmission: {
          title: "Transmission",
          description: "Partage de notre vision artistique à travers ateliers, masterclasses et collaborations.",
        },
      },
    },
    // Works Section
    works: {
      sectionTitle: "Réalisations",
      filters: {
        all: "Tout",
        longPieces: "Pièces longues",
        duoTrio: "Duo/Trio",
        inSitu: "In situ",
        youngAudience: "Jeune public",
      },
      shows: {
        parallaxe: {
          title: "PARALLAXE",
          description: "pièce pour 6 danseurs",
        },
        focal: {
          title: "FOCAL",
          description: "duo lumière-corps",
        },
        "24ips": {
          title: "24 i/s",
          description: "écrans et chœur",
        },
        noise: {
          title: "NOISE",
          description: "solo in situ",
        },
        persistance: {
          title: "PERSISTANCE",
          description: "trio",
        },
        pixels: {
          title: "PIXELS",
          description: "jeune public",
        },
      },
    },
    // Dates Section
    dates: {
      sectionTitle: "Les dates",
      requestDate: "Demander une date",
    },
    // Contact Section
    contact: {
      sectionTitle: "Contact",
      form: {
        name: "Nom",
        namePlaceholder: "Votre nom",
        email: "Email",
        emailPlaceholder: "votre@email.com",
        subject: "Sujet",
        subjectPlaceholder: "Sujet de votre message",
        message: "Message",
        messagePlaceholder: "Votre message...",
        rgpd: "J'accepte que mes données soient utilisées pour répondre à ma demande conformément à la politique de confidentialité.",
        send: "Envoyer le message",
      },
      info: {
        company: "IPS — Images Par Seconde",
        booking: "Booking",
        press: "Presse",
        followUs: "Suivez-nous",
      },
    },
    // Footer
    footer: {
      rights: "Tous droits réservés",
      legalNotice: "Mentions légales",
      privacy: "Politique de confidentialité",
      credits: "Crédits",
    },
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About us",
      works: "Works",
      dates: "Dates",
      contact: "Contact",
    },
    // Hero Section
    hero: {
      title: "Images par seconde",
      subtitle: "Contemporary dance company",
    },
    // Info Cards
    infoCards: {
      nextPerformance: "Next performance",
      upcomingPerformances: "Upcoming performances",
      hallPercentFull: "{percent}% full",
      allDates: "All dates",
    },
    // About Section
    about: {
      sectionTitle: "About us",
      heading: "Movement. Image. Rhythm.",
      description: "IPS explores the link between body, cadence and image. Each creation blends dance, light and visual storytelling to make a second vibrate in a thousand fragments. Artistic direction: IPS.",
      stats: {
        years: "years of creation",
        shows: "shows performed",
        dancers: "guest dancers",
      },
      cards: {
        choreography: {
          title: "Choreography",
          description: "Creating movements that transcend mere execution to become a universal language.",
        },
        visualResearch: {
          title: "Visual Research",
          description: "Exploring the connections between body and image, light and shadow, time and space.",
        },
        transmission: {
          title: "Transmission",
          description: "Sharing our artistic vision through workshops, masterclasses and collaborations.",
        },
      },
    },
    // Works Section
    works: {
      sectionTitle: "Works",
      filters: {
        all: "All",
        longPieces: "Long pieces",
        duoTrio: "Duo/Trio",
        inSitu: "In situ",
        youngAudience: "Young audience",
      },
      shows: {
        parallaxe: {
          title: "PARALLAXE",
          description: "piece for 6 dancers",
        },
        focal: {
          title: "FOCAL",
          description: "light-body duo",
        },
        "24ips": {
          title: "24 f/s",
          description: "screens and choir",
        },
        noise: {
          title: "NOISE",
          description: "in situ solo",
        },
        persistance: {
          title: "PERSISTANCE",
          description: "trio",
        },
        pixels: {
          title: "PIXELS",
          description: "young audience",
        },
      },
    },
    // Dates Section
    dates: {
      sectionTitle: "Dates",
      requestDate: "Request a date",
    },
    // Contact Section
    contact: {
      sectionTitle: "Contact",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "your@email.com",
        subject: "Subject",
        subjectPlaceholder: "Subject of your message",
        message: "Message",
        messagePlaceholder: "Your message...",
        rgpd: "I agree that my data will be used to respond to my request in accordance with the privacy policy.",
        send: "Send message",
      },
      info: {
        company: "IPS — Images Par Seconde",
        booking: "Booking",
        press: "Press",
        followUs: "Follow us",
      },
    },
    // Footer
    footer: {
      rights: "All rights reserved",
      legalNotice: "Legal notice",
      privacy: "Privacy policy",
      credits: "Credits",
    },
  },
};

export type Language = keyof typeof translations;
export type Translations = typeof translations.fr;

