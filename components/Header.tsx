"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "@/lib/translations";

interface HeaderProps {
  lang?: "fr" | "en";
}

export function Header({ lang = "fr" }: HeaderProps = {}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  const navItems = [
    { label: t.nav.home, href: "#accueil" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.works, href: "#realisations" },
    { label: t.nav.dates, href: "#dates" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = (scrollTop / scrollableHeight) * 100;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-black/50 z-[100]">
        <motion.div
          className="h-full bg-brand-orange"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-none md:w-auto md:min-w-[800px] md:max-w-5xl">
        <div className="glass rounded-none md:rounded-full mx-4 md:mx-0">
          <div className="px-4 sm:px-6 md:px-12 py-2">
            <div className="flex items-center justify-between h-12 md:h-16">
              {/* Logo */}
              <a
                href="#accueil"
                onClick={(e) => handleNavClick(e, "#accueil")}
                className="font-grotesk font-bold text-2xl md:text-3xl text-white hover:text-brand-orange transition-colors"
              >
                IPS
              </a>

              {/* Desktop Navigation - Centered */}
              <nav className="hidden md:flex items-center gap-8">
                {navItems.slice(0, -1).map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="group relative font-inter text-sm text-white hover:text-brand-orange transition-colors"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-orange group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </nav>

              {/* Contact Button */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="hidden md:block px-8 py-3 rounded-full bg-brand-orange text-white font-inter text-sm font-medium hover:bg-brand-orange/90 hover:scale-105 transition-all duration-300 ease-out"
              >
                {t.nav.contact}
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                aria-label="Toggle menu"
              >
                <motion.span
                  className="w-6 h-0.5 bg-white"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -8 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 glass-strong backdrop-blur-2xl">
              <div className="px-4 sm:px-6 md:px-8 h-full flex items-center justify-center">
                <nav className="flex flex-col items-center gap-8">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="font-grotesk text-3xl text-white hover:text-brand-orange transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


