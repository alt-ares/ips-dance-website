"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { SectionLabel } from "@/components/SectionLabel";
import { LiquidCard } from "@/components/LiquidCard";
import { ShowTile } from "@/components/ShowTile";
import { InfoCard } from "@/components/InfoCard";
import { RealTimeClock } from "@/components/RealTimeClock";
import { TimeZones } from "@/components/TimeZones";
import { ContactForm } from "@/components/ContactForm";
import {
  scrollReveal,
  animateCounter,
  staggerFadeIn,
} from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks";
import { getShows } from "@/lib/data/shows";
import { fallbackDates } from "@/lib/data/dates";
import { Language, PerformanceDate } from "@/types";
import { translations } from "@/lib/translations";
import { 
  getUpcomingDates, 
  formatDateDisplay, 
  formatVenueCity
} from "@/lib/utils/dateFormatters";

interface HomePageProps {
  lang: Language;
}

export function HomePage({ lang }: HomePageProps) {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const binaryMaskRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const aboutImageMaskRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  
  const [dates, setDates] = useState<PerformanceDate[]>(fallbackDates);
  const [activeFilter, setActiveFilter] = useState<string>(lang === 'fr' ? 'Tout' : 'All');
  const [isInitialRender, setIsInitialRender] = useState(true);
  const t = translations[lang];
  const shows = getShows(lang);

  // Calculer les 2 prochaines dates pour les InfoCards
  const upcomingDates = getUpcomingDates(dates, 2);
  const nextDate1 = upcomingDates[0];
  const nextDate2 = upcomingDates[1];
  
  // Pourcentages de remplissage statiques (exemples)
  const fillPercent1 = 77;
  const fillPercent2 = 31;

  // Charger les dates depuis l'API
  useEffect(() => {
    fetch('/api/dates')
      .then(res => res.json())
      .then(data => setDates(data))
      .catch(err => {
        console.error('Failed to load dates:', err);
        // Utiliser les dates de fallback déjà définies
      });
  }, []);

  // Réinitialiser le filtre quand la langue change
  useEffect(() => {
    setActiveFilter(lang === 'fr' ? 'Tout' : 'All');
  }, [lang]);

  // Désactiver l'animation après le premier render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialRender(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    // Scroll reveal animations
    const scrollTriggers: any[] = [];
    
    scrollReveal(".scroll-reveal");
    staggerFadeIn(".stagger-fade-in", 0.5);

    // Animate counters
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target") || "0");
      animateCounter(counter as HTMLElement, 0, target, 2);
    });

    // Mouse glow effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      const { clientX, clientY } = e;
      
      // Update glow position
      glowRef.current.style.left = `${clientX}px`;
      glowRef.current.style.top = `${clientY}px`;
      
      // Update binary mask position
      if (binaryMaskRef.current) {
        binaryMaskRef.current.style.setProperty('--mouse-x', `${clientX}px`);
        binaryMaskRef.current.style.setProperty('--mouse-y', `${clientY}px`);
      }
      
      // Update about section image mask position
      if (aboutImageMaskRef.current && aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        // Only update if mouse is within the section
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          aboutImageMaskRef.current.style.setProperty('--mouse-x', `${x}px`);
          aboutImageMaskRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
      }
    };

    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Nettoyer les ScrollTriggers GSAP
      if (typeof window !== 'undefined') {
        const ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger;
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, [reducedMotion]);

  const filtersFr = ["Tout", "Pièces longues", "Duo/Trio", "In situ", "Jeune public"];
  const filtersEn = ["All", "Long pieces", "Duo/Trio", "In situ", "Young audience"];
  const filters = lang === 'fr' ? filtersFr : filtersEn;

  // Filtrer les shows en fonction du filtre actif
  const filteredShows = activeFilter === (lang === 'fr' ? 'Tout' : 'All')
    ? shows
    : shows.filter(show => show.category === activeFilter);

  return (
    <>
      <div className="transition-opacity duration-500 opacity-100">
        <Header lang={lang} />
        <main className="relative">
      
      {/* Hero Section */}
      <section
        id="accueil"
        ref={heroRef}
        className="hero-fixed overflow-hidden"
      >
        {/* Static Gradient Background */}
        <div 
          className="absolute inset-0" 
          style={{
            background: `
              radial-gradient(ellipse at 0% 0%, #000000 0%, transparent 60%),
              radial-gradient(ellipse at 100% 0%, #000000 0%, transparent 60%),
              radial-gradient(ellipse at 0% 100%, #000000 0%, transparent 60%),
              radial-gradient(ellipse at 100% 100%, #000000 0%, transparent 60%),
              radial-gradient(ellipse at 20% 10%, #000000 0%, transparent 40%),
              radial-gradient(ellipse at 80% 90%, #000000 0%, transparent 40%),
              radial-gradient(ellipse at 30% 20%, #E85002 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, #F9F9F9 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, #E85002 0%, transparent 70%),
              radial-gradient(ellipse at 15% 30%, #FFFFFF 0%, transparent 80%),
              radial-gradient(ellipse at 85% 70%, #FFFFFF 0%, transparent 80%),
              radial-gradient(ellipse at 40% 60%, #FFFFFF 0%, transparent 75%),
              radial-gradient(ellipse at 60% 40%, #FFFFFF 0%, transparent 75%),
              radial-gradient(ellipse at 10% 80%, #FFFFFF 0%, transparent 80%),
              radial-gradient(ellipse at 90% 20%, #FFFFFF 0%, transparent 80%),
              radial-gradient(ellipse at 25% 50%, #FFFFFF 0%, transparent 60%),
              radial-gradient(ellipse at 75% 50%, #FFFFFF 0%, transparent 60%),
              radial-gradient(ellipse at 50% 15%, #FFFFFF 0%, transparent 55%),
              radial-gradient(ellipse at 50% 85%, #FFFFFF 0%, transparent 55%),
              radial-gradient(ellipse at 35% 25%, #FFFFFF 0%, transparent 45%),
              radial-gradient(ellipse at 65% 75%, #FFFFFF 0%, transparent 45%),
              radial-gradient(ellipse at 20% 70%, #FFFFFF 0%, transparent 50%),
              radial-gradient(ellipse at 80% 30%, #FFFFFF 0%, transparent 50%),
              radial-gradient(ellipse at 45% 10%, #FFFFFF 0%, transparent 40%),
              radial-gradient(ellipse at 55% 90%, #FFFFFF 0%, transparent 40%),
              linear-gradient(135deg, #000000 0%, #E85002 20%, #F9F9F9 60%, #000000 100%)
            `
          }}
        />
        
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />

        {/* Binary Code Scroll */}
        <div 
          ref={binaryMaskRef}
          className="absolute inset-0 flex items-end pb-64 overflow-hidden pointer-events-none z-5"
          style={{
            '--mouse-x': '50%',
            '--mouse-y': '50%',
            maskImage: 'radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black, transparent)',
            WebkitMaskImage: 'radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black, transparent)'
          } as React.CSSProperties}
        >
          <div className="flex animate-binary-scroll-infinite">
            <div className="font-mono font-black whitespace-nowrap pr-32 flex-shrink-0" style={{ fontSize: '20rem', WebkitTextStroke: '2px white', color: 'transparent', opacity: 0.12 }}>
              01001001 01101101 01100001 01100111 01100101 01110011 00100000 01110000 01100001 01110010 00100000 01110011 01100101 01100011 01101111 01101110 01100100 01100101 01110011
            </div>
            <div className="font-mono font-black whitespace-nowrap pr-32 flex-shrink-0" style={{ fontSize: '20rem', WebkitTextStroke: '2px white', color: 'transparent', opacity: 0.12 }}>
              01001001 01101101 01100001 01100111 01100101 01110011 00100000 01110000 01100001 01110010 00100000 01110011 01100101 01100011 01101111 01101110 01100100 01100101 01110011
            </div>
          </div>
        </div>

        {/* Mouse Glow Effect */}
        <div 
          ref={glowRef}
          className="pointer-events-none absolute w-64 h-64 opacity-20 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 30%, rgba(255, 255, 255, 0.05) 60%, transparent 80%)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            filter: 'blur(30px)'
          }}
        />

        {/* Logo IPS - Top Left */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
          <div className="text-white">
            <div className="font-grotesk font-bold text-lg sm:text-2xl mb-1">
              ips:
            </div>
            <div className="text-xs sm:text-sm text-white font-inter">
              {t.hero.title.toLowerCase()}
            </div>
            <div className="text-xs sm:text-sm text-white font-inter">
              {t.hero.subtitle.toLowerCase()}
            </div>
          </div>
        </div>

        {/* Info Cards - Responsive Layout */}
        <div className="absolute top-4 right-4 bottom-4 sm:top-8 sm:right-8 sm:bottom-8 z-20 flex flex-col gap-2 sm:gap-5">
          {/* Mobile: Layout compact avec moins de cartes */}
          <div className="flex flex-col gap-2 sm:hidden">
            <InfoCard
              title="INFO"
              subtitle=""
              content=""
              href="#about"
              icon=""
              notification={false}
              small={true}
              compact={true}
            />
            
            {/* Une seule carte de date sur mobile */}
            {nextDate1 ? (
              <InfoCard
                title={nextDate1.show}
                subtitle={t.infoCards.nextPerformance}
                content={formatVenueCity(nextDate1.venue, nextDate1.city)}
                href="#dates"
                icon=""
                notification={false}
                rightContent={nextDate1.date + (lang === 'en' ? ' (dd/mm)' : '')}
                progressBar={true}
                progressValue={fillPercent1}
                bottomText={t.infoCards.hallPercentFull.replace('{percent}', fillPercent1.toString())}
                large={false}
                small={true}
                compact={true}
              />
            ) : (
              <InfoCard
                title="PARALLAXE"
                subtitle={t.infoCards.nextPerformance}
                content="Théâtre de la Ville - Paris"
                href="#dates"
                icon=""
                notification={false}
                rightContent={"15.12" + (lang === 'en' ? ' (dd/mm)' : '')}
                progressBar={true}
                progressValue={85}
                bottomText={t.infoCards.hallPercentFull.replace('{percent}', '85')}
                large={false}
                small={true}
                compact={true}
              />
            )}
            
            {/* Carte "Toutes les dates" compacte sur mobile */}
            <InfoCard
              title={t.infoCards.allDates.toUpperCase()}
              subtitle={t.infoCards.upcomingPerformances}
              content={dates[0] ? `${dates[0].date} • ${dates[0].city}` : ""}
              href="#dates"
              icon=""
              notification={false}
              rightContent=""
              bottomText={dates[1] ? `${dates[1].date} • ${dates[1].city}` : ""}
              bottomRightContent=""
              extraContent=""
              extraContent2=""
              uniformDates={true}
              highlightNextDate={true}
              small={true}
              compact={true}
            />
          </div>

          {/* Desktop: Layout complet */}
          <div className="hidden sm:flex flex-col gap-5 h-full">
            <InfoCard
              title="INFO"
              subtitle=""
              content=""
              href="#about"
              icon=""
              notification={false}
              small={false}
            />
            
            {/* Première date dynamique */}
            {nextDate1 ? (
              <InfoCard
                title={nextDate1.show}
                subtitle={t.infoCards.nextPerformance}
                content={formatVenueCity(nextDate1.venue, nextDate1.city)}
                href="#dates"
                icon=""
                notification={false}
                rightContent={nextDate1.date + (lang === 'en' ? ' (dd/mm)' : '')}
                progressBar={true}
                progressValue={fillPercent1}
                bottomText={t.infoCards.hallPercentFull.replace('{percent}', fillPercent1.toString())}
                large={true}
                small={false}
              />
            ) : (
              <InfoCard
                title="PARALLAXE"
                subtitle={t.infoCards.nextPerformance}
                content="Théâtre de la Ville - Paris"
                href="#dates"
                icon=""
                notification={false}
                rightContent={"15.12" + (lang === 'en' ? ' (dd/mm)' : '')}
                progressBar={true}
                progressValue={85}
                bottomText={t.infoCards.hallPercentFull.replace('{percent}', '85')}
                large={true}
                small={false}
              />
            )}
            
            {/* Deuxième date dynamique */}
            {nextDate2 ? (
              <InfoCard
                title={nextDate2.show}
                subtitle={t.infoCards.nextPerformance}
                content={formatVenueCity(nextDate2.venue, nextDate2.city)}
                href="#dates"
                icon=""
                notification={false}
                rightContent={nextDate2.date + (lang === 'en' ? ' (dd/mm)' : '')}
                progressBar={true}
                progressValue={fillPercent2}
                bottomText={t.infoCards.hallPercentFull.replace('{percent}', fillPercent2.toString())}
                large={true}
                small={false}
              />
            ) : (
              <InfoCard
                title="FOCAL"
                subtitle={t.infoCards.nextPerformance}
                content="Centre Pompidou - Paris"
                href="#dates"
                icon=""
                notification={false}
                rightContent={"22.01" + (lang === 'en' ? ' (dd/mm)' : '')}
                progressBar={true}
                progressValue={60}
                bottomText={t.infoCards.hallPercentFull.replace('{percent}', '60')}
                large={true}
                small={false}
              />
            )}
            
            {/* Toutes les dates */}
            <InfoCard
              title={t.infoCards.allDates.toUpperCase()}
              subtitle={t.infoCards.upcomingPerformances}
              content={dates[0] ? `${dates[0].date} • ${dates[0].city} • ${dates[0].venue}` : ""}
              href="#dates"
              icon=""
              notification={false}
              rightContent=""
              bottomText={dates[1] ? `${dates[1].date} • ${dates[1].city} • ${dates[1].venue}` : ""}
              bottomRightContent=""
              extraContent={dates[2] ? `${dates[2].date} • ${dates[2].city} • ${dates[2].venue}` : ""}
              extraContent2={dates[3] ? `${dates[3].date} • ${dates[3].city} • ${dates[3].venue}` : ""}
              uniformDates={true}
              highlightNextDate={true}
              small={false}
            />
          </div>
        </div>

        {/* Bottom Left Horizontal Layout - SMC + POINT + HEURES + REAL TIME */}
        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-20">
          <div className="flex items-center gap-2 sm:gap-6">
            {/* IPS */}
            <div className="text-white">
              <div className="font-grotesk font-bold text-xl sm:text-3xl md:text-4xl">
                IPS
              </div>
            </div>
            
            {/* POINT (icône circulaire) */}
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-orange rounded-full flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
            </div>
            
            {/* HEURES CET EDT CST */}
            <div className="text-white">
              <TimeZones />
            </div>
            
            {/* REAL TIME */}
            <div className="text-white">
              <div className="font-grotesk font-bold text-lg sm:text-2xl mb-1">
                REAL•TIME
              </div>
              <RealTimeClock />
            </div>
          </div>
        </div>

        {/* H1 Title - Center */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
          <h1 className="font-grotesk font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white text-center animate-float leading-tight">
            {t.hero.title.split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
        </div>

      </section>

      {/* Content Wrapper - Sections that scroll over the hero */}
      <div className="content-wrapper">
        {/* About Section */}
        <section id="about" ref={aboutRef} className="section-padding content-overlay overflow-hidden">
        {/* Image revealed by mouse cursor */}
        <div 
          ref={aboutImageMaskRef}
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            '--mouse-x': '-500px',
            '--mouse-y': '-500px',
            backgroundImage: `url('/img/DNSPD (c)Julien Benhamou.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), rgba(0,0,0,0.8) 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), rgba(0,0,0,0.8) 0%, transparent 100%)',
            opacity: 0.7
          } as React.CSSProperties}
        />
        
        <div className="container-custom relative z-10">
          <SectionLabel number="01" title={t.about.sectionTitle} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
            <div className="space-y-8 scroll-reveal">
              <h2 className="font-grotesk font-bold text-5xl md:text-6xl text-white">
                {t.about.heading}
              </h2>
              <p className="text-lg md:text-xl text-gray-light font-inter leading-relaxed">
                {t.about.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center stagger-fade-in">
              <div>
                <div className="text-4xl md:text-5xl font-grotesk font-bold text-brand-orange counter" data-target="8">
                  0
                </div>
                <p className="text-gray-light font-inter text-sm mt-2">{t.about.stats.years}</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-grotesk font-bold text-brand-orange counter" data-target="24">
                  0
                </div>
                <p className="text-gray-light font-inter text-sm mt-2">{t.about.stats.shows}</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-grotesk font-bold text-brand-orange counter" data-target="45">
                  0
                </div>
                <p className="text-gray-light font-inter text-sm mt-2">{t.about.stats.dancers}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <LiquidCard
              title={t.about.cards.choreography.title}
              description={t.about.cards.choreography.description}
              icon={
                <svg width="48" height="48" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 7.83984C19.0134 5.93261 15.5436 4.91919 12 4.91919C8.45636 4.91919 4.98661 5.93261 2 7.83984" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.8404 20.9199C14.7464 20.0528 13.3914 19.5808 11.9954 19.5808C10.5994 19.5808 9.2444 20.0528 8.15039 20.9199" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.9203 14.3599C16.8727 12.9846 14.4619 12.2502 11.9953 12.2502C9.52869 12.2502 7.11793 12.9846 5.07031 14.3599" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
            <LiquidCard
              title={t.about.cards.visualResearch.title}
              description={t.about.cards.visualResearch.description}
              icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              }
            />
            <LiquidCard
              title={t.about.cards.transmission.title}
              description={t.about.cards.transmission.description}
              icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12h4l2-4 4 8 4-8 2 4h4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
          </div>
        </div>
      </section>

        {/* Réalisations Section */}
        <section id="realisations" className="section-padding content-overlay">
        <div className="container-custom">
          <SectionLabel number="02" title={t.works.sectionTitle} />
          
          {/* Filter Bar */}
          <div className="sticky top-20 sm:top-24 z-30 mb-8 sm:mb-12">
            <div className="glass rounded-full p-1 sm:p-2 inline-flex gap-1 sm:gap-2 overflow-x-auto">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-inter transition-all duration-300 whitespace-nowrap ${
                    activeFilter === filter
                      ? 'bg-brand-orange text-white'
                      : 'text-gray-light hover:bg-brand-orange/20 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Shows Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredShows.map((show) => (
                <motion.div
                  key={show.title}
                  layout
                  initial={isInitialRender ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    layout: { duration: 0.5, ease: "easeInOut" },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 }
                  }}
                >
                  <ShowTile {...show} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

        {/* Dates Section */}
        <section id="dates" className="section-padding content-overlay">
        <div className="container-custom">
          <SectionLabel number="03" title={t.dates.sectionTitle} />
          
          <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
            <div className="space-y-6 sm:space-y-8">
              {dates.map((date, index) => (
                <div
                  key={date.id}
                  className="group scroll-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Carte principale */}
                  <div className="glass rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 cursor-pointer relative overflow-hidden">
                    {/* Image de fond visible au survol seulement */}
                    {date.imageUrl && (
                      <>
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                          style={{
                            backgroundImage: `url(${date.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(20px)',
                          }}
                        />
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                      </>
                    )}
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6 justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 flex-1">
                        <div className="flex-shrink-0">
                          <div className="text-3xl md:text-4xl font-grotesk font-bold text-brand-orange">
                            {date.date}
                            {lang === 'en' && (
                              <span className="text-xs text-gray-light ml-2">(dd/mm)</span>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-grotesk font-bold text-2xl md:text-3xl text-white mb-2">
                            {date.show}
                          </h3>
                          <p className="text-gray-light font-inter mb-1">
                            {formatDateDisplay(date, lang)}
                          </p>
                        </div>
                      </div>
                      
                      {/* CTA Billetterie si ticketsUrl existe */}
                      {date.ticketsUrl && (
                        <div className="flex-shrink-0">
                          <a
                            href={date.ticketsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 rounded-lg bg-brand-orange text-white font-inter font-medium hover:bg-brand-orange/90 transition-colors text-center"
                          >
                            {lang === 'fr' ? 'Réserver' : 'Book tickets'}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Carte image qui s'agrandit au survol et pousse le contenu (si imageUrl existe) */}
                  {date.imageUrl && (
                    <div className="rounded-2xl overflow-hidden max-h-0 group-hover:max-h-[400px] transition-all duration-700 ease-in-out mt-[5px]">
                      <div className="relative w-full h-[400px]">
                        <img
                          src={date.imageUrl}
                          alt={date.show}
                          className="w-full h-full object-cover"
                        />
                        {/* Overlay gradient pour meilleure lisibilité */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        {/* Nom du spectacle en overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
                          <div className="text-3xl md:text-4xl font-grotesk font-bold text-brand-orange mb-4">
                            {date.date}
                          </div>
                          <h4 className="font-grotesk font-bold text-3xl sm:text-4xl md:text-5xl text-white">
                            {date.show}
                          </h4>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12 scroll-reveal">
              <Button href="#contact" variant="primary">
                {t.dates.requestDate}
              </Button>
            </div>
          </div>
        </div>
      </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding content-overlay overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 orange-halo opacity-30" />
        
        <div className="container-custom">
          <SectionLabel number="04" title={t.contact.sectionTitle} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            {/* Contact Form */}
            <div className="scroll-reveal">
              <ContactForm lang={lang} />
            </div>

            {/* Contact Info */}
            <div className="space-y-8 scroll-reveal">
              <div>
                <h3 className="font-grotesk font-bold text-2xl text-white mb-6">
                  {t.contact.info.company}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-inter font-semibold text-white mb-2">{t.contact.info.booking}</h4>
                    <p className="text-gray-light font-inter">
                      <a href="mailto:booking@ips-danse.fr" className="hover:text-brand-orange transition-colors">
                        booking@ips-danse.fr
                      </a>
                    </p>
                    <p className="text-gray-light font-inter">
                      <a href="tel:+33600000000" className="hover:text-brand-orange transition-colors">
                        +33 6 00 00 00 00
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-inter font-semibold text-white mb-2">{t.contact.info.press}</h4>
                    <p className="text-gray-light font-inter">
                      <a href="mailto:presse@ips-danse.fr" className="hover:text-brand-orange transition-colors">
                        presse@ips-danse.fr
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-inter font-semibold text-white mb-4">{t.contact.info.followUs}</h4>
                <div className="flex flex-col gap-2">
                  {["Instagram", "Facebook", "YouTube", "Vimeo"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-gray-light hover:text-brand-orange transition-colors font-inter"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        <Footer />
      </div>
      </main>
      </div>
    </>
  );
}

