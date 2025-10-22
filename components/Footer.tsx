"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "YouTube", href: "#" },
    { name: "Vimeo", href: "#" },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <h3 className="font-grotesk font-bold text-2xl text-white">
              IPS
            </h3>
            <p className="text-gray-light font-inter text-sm">
              Images Par Seconde
              <br />
              Compagnie de danse contemporaine
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-grotesk font-bold text-sm uppercase tracking-wider text-white">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                "Accueil",
                "Qui sommes-nous",
                "Réalisations",
                "Les dates",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-light hover:text-brand-orange text-sm transition-colors font-inter"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h4 className="font-grotesk font-bold text-sm uppercase tracking-wider text-white">
              Suivez-nous
            </h4>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-light hover:text-brand-orange text-sm transition-colors font-inter"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-light text-sm font-inter">
            © {currentYear} IPS — Images Par Seconde. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-sm font-inter">
            <a
              href="#"
              className="text-gray-light hover:text-white transition-colors"
            >
              Mentions légales
            </a>
            <a
              href="#"
              className="text-gray-light hover:text-white transition-colors"
            >
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


