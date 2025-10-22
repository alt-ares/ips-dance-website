"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isResourcesLoaded, setIsResourcesLoaded] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [languageSelected, setLanguageSelected] = useState(false);

  useEffect(() => {
    // Check if resources are loaded
    if (document.readyState === "complete") {
      setIsResourcesLoaded(true);
    } else {
      const handleLoad = () => setIsResourcesLoaded(true);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    // Minimum loading time: 3 seconds (increased for modal to show)
    const startTime = Date.now();
    const minDuration = 3000;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const elapsed = Date.now() - startTime;
        const targetProgress = Math.min((elapsed / minDuration) * 100, 100);
        
        // Smooth progression
        const newProgress = prev + (targetProgress - prev) * 0.1;
        
        // Stop at 99% and show language modal
        if (newProgress >= 99 && isResourcesLoaded && elapsed >= minDuration && !showLanguageModal && !languageSelected) {
          setShowLanguageModal(true);
          return 99;
        }
        
        // DON'T complete until language is selected - stay at 99%
        if (!languageSelected) {
          return Math.min(newProgress, 99);
        }
        
        // After language selection, reach 100% (redirect happens in handleLanguageSelect)
        if (languageSelected) {
          return 100;
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isResourcesLoaded, showLanguageModal, languageSelected]);

  const handleLanguageSelect = (lang: string) => {
    // Store language preference in localStorage
    localStorage.setItem("preferredLanguage", lang);
    setLanguageSelected(true);
    setShowLanguageModal(false);
    setProgress(100);
    
    // Redirect to appropriate page after brief animation
    setTimeout(() => {
      if (lang === "fr") {
        window.location.href = "/fr";
      } else {
        window.location.href = "/en";
      }
    }, 500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      fontFamily: 'monospace',
      color: '#E85002',
      opacity: 1
    }}>
      {/* Gradient Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(ellipse at 10% 10%, #000000 0%, transparent 60%),
          radial-gradient(ellipse at 90% 10%, #000000 0%, transparent 60%),
          radial-gradient(ellipse at 10% 90%, #000000 0%, transparent 60%),
          radial-gradient(ellipse at 90% 90%, #000000 0%, transparent 60%),
          radial-gradient(ellipse at 25% 25%, #E85002 0%, transparent 30%),
          radial-gradient(ellipse at 75% 75%, #F9F9F9 0%, transparent 25%),
          radial-gradient(ellipse at 50% 50%, #E85002 0%, transparent 35%),
          radial-gradient(ellipse at 20% 60%, #FFFFFF 0%, transparent 40%),
          radial-gradient(ellipse at 80% 40%, #FFFFFF 0%, transparent 40%),
          linear-gradient(120deg, #000000 0%, #E85002 30%, #000000 60%, #000000 100%)
        `
      }} />
      
      {/* Grain overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
      
      {/* Top decorative border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', zIndex: 10 }}>
        <div style={{ height: '100%', width: '33.333333%', backgroundColor: '#E85002' }} />
      </div>
      
      {/* Header */}
      <div style={{ position: 'absolute', top: '16px', left: 0, right: 0, padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '12px', zIndex: 10 }}>
        <div>
          <div style={{ letterSpacing: '0.1em' }}>IPS SYSTEM VER. 2.1.24.005</div>
        </div>
        <div style={{ letterSpacing: '0.1em' }}>BIO 39.2</div>
      </div>

      {/* Status Check */}
      <div style={{ position: 'absolute', top: '48px', left: '32px', fontSize: '12px', letterSpacing: '0.05em', zIndex: 10 }}>
        <span>STATUS CHECK</span>
        <span style={{ display: 'inline-block', margin: '0 8px' }}>.............</span>
        <span style={{ color: '#00FF00' }}>OK</span>
      </div>

      {/* Sound message */}
      <div style={{ position: 'absolute', top: '48px', right: '32px', fontSize: '12px', letterSpacing: '0.1em', border: '1px solid #E85002', padding: '4px 12px', zIndex: 10 }}>
        FOR BEST EXPERIENCE: SOUND ON
      </div>

      {/* Central loading box */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '520px', zIndex: 10 }}>
        <div style={{ border: '2px solid #E85002', padding: '32px 48px', position: 'relative' }}>
          {/* Corner decorations */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '16px', height: '16px', borderTop: '2px solid #E85002', borderLeft: '2px solid #E85002' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '16px', height: '16px', borderTop: '2px solid #E85002', borderRight: '2px solid #E85002' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '16px', height: '16px', borderBottom: '2px solid #E85002', borderLeft: '2px solid #E85002' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderBottom: '2px solid #E85002', borderRight: '2px solid #E85002' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Title */}
            <div style={{ textAlign: 'center', fontSize: '12px', letterSpacing: '0.1em', color: '#9CA3AF' }}>
              //SYSTEM LOADING
            </div>
            
            {/* Progress section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', letterSpacing: '0.05em' }}>PROGRESS</span>
                <span style={{ fontSize: '14px', letterSpacing: '0.05em' }}>{Math.round(progress)}%</span>
              </div>
              
              {/* Progress bar */}
              <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(232, 80, 2, 0.2)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${progress}%`, 
                  height: '100%', 
                  backgroundColor: '#E85002',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              
              <div style={{ textAlign: 'center', fontSize: '12px', letterSpacing: '0.1em', color: '#9CA3AF' }}>
                «IMPOSSIBLE D'ANNULER»
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skip button (disabled) */}
      <div style={{ position: 'absolute', bottom: '32px', right: '32px', zIndex: 10 }}>
        <button
          disabled
          style={{
            border: '1px solid #E85002',
            padding: '8px 16px',
            fontSize: '12px',
            letterSpacing: '0.1em',
            opacity: 0.5,
            cursor: 'not-allowed',
            backgroundColor: 'transparent',
            color: '#E85002',
            fontFamily: 'monospace'
          }}
        >
          SKIP LOADING
        </button>
      </div>

      {/* Bottom technical text */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid #E85002', overflow: 'hidden', zIndex: 10 }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', fontSize: '10px', padding: '8px 0', animation: 'scroll-left 20s linear infinite' }}>
          <span style={{ display: 'inline-block', padding: '0 32px' }}>CALIBRATING NEURAL UPLINK IN THE CYBER NETWORK</span>
          <span style={{ display: 'inline-block', padding: '0 32px' }}>PLEASE WAIT AS WE INITIALIZE THE CONNECTION</span>
          <span style={{ display: 'inline-block', padding: '0 32px' }}>ESTABLISHING SECURE LINK TO THE CYBER NETWORK</span>
          <span style={{ display: 'inline-block', padding: '0 32px' }}>CALIBRATING NEURAL UPLINK IN THE CYBER NETWORK</span>
          <span style={{ display: 'inline-block', padding: '0 32px' }}>PLEASE WAIT AS WE INITIALIZE THE CONNECTION</span>
          <span style={{ display: 'inline-block', padding: '0 32px' }}>ESTABLISHING SECURE LINK TO THE CYBER NETWORK</span>
        </div>
      </div>

      {/* Bottom corner decorations */}
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '10px', letterSpacing: '0.1em', opacity: 0.5, zIndex: 10 }}>
        CALIBRATING MODULE: ON-RAY
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}>
          <div style={{ position: 'relative', border: '2px solid #E85002', backgroundColor: '#000000', padding: '32px 48px', maxWidth: '448px', width: '90%' }}>
            {/* Corner decorations */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '16px', height: '16px', borderTop: '2px solid #E85002', borderLeft: '2px solid #E85002' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '16px', height: '16px', borderTop: '2px solid #E85002', borderRight: '2px solid #E85002' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '16px', height: '16px', borderBottom: '2px solid #E85002', borderLeft: '2px solid #E85002' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderBottom: '2px solid #E85002', borderRight: '2px solid #E85002' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
              <div style={{ textAlign: 'center', fontSize: '12px', letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: '32px' }}>
                //SELECT LANGUAGE
              </div>
              
              <button
                onClick={() => handleLanguageSelect("fr")}
                style={{
                  width: '100%',
                  border: '2px solid #E85002',
                  padding: '16px 24px',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  letterSpacing: '0.1em',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#E85002';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                FRANÇAIS
              </button>
              
              <button
                onClick={() => handleLanguageSelect("en")}
                style={{
                  width: '100%',
                  border: '2px solid #E85002',
                  padding: '16px 24px',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  letterSpacing: '0.1em',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#E85002';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                ENGLISH
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}