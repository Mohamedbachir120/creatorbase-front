import React, { useState, useEffect, type FC } from 'react';
import { useAuth } from '../context/AuthContext';

// --- Reusable SVG Icon Component for the Header ---
const MenuIcon: FC<{ open: boolean }> = ({ open }) => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {open ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16m-7 6h7"
      />
    )}
  </svg>
);


export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore scroll on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);


  return (
    <>
      <header className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-3" aria-label="InfluenceContact Home">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-[#f97316]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold font-montserrat">InfluenceContact</h2>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a className="text-neutral-100 hover:text-[#f97316] transition-colors" href="/home">Accueil</a>
              <a className="text-neutral-100 hover:text-[#f97316] transition-colors" href="#features">Fonctionnalités</a>
              <a className="text-neutral-100 hover:text-[#f97316] transition-colors" href="/pricing">Tarifs</a>
              <a className="text-neutral-100 hover:text-[#f97316] transition-colors" href="#footer">Contact</a>
            </nav>

            <div className="flex items-center gap-4">
              {!isLoading && !isAuthenticated &&
                <a className="hidden sm:inline-block rounded-md bg-[#f97316] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90" href="/login">Connexion</a>
              }
              {!isLoading && isAuthenticated &&
                <a className="hidden sm:inline-block rounded-md bg-[#f97316] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90" href="/dashboard">Dashboard</a>
              }

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-neutral-100 z-50 p-2 -mr-2"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <MenuIcon open={isMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-neutral-900/95 backdrop-blur-md md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-medium">
          <a onClick={() => setIsMenuOpen(false)} className="text-neutral-100 hover:text-[#f97316] transition-colors" href="/home">Accueil</a>
          <a onClick={() => setIsMenuOpen(false)} className="text-neutral-100 hover:text-[#f97316] transition-colors" href="#features">Fonctionnalités</a>
          <a onClick={() => setIsMenuOpen(false)} className="text-neutral-100 hover:text-[#f97316] transition-colors" href="/pricing">Tarifs</a>
          <a onClick={() => setIsMenuOpen(false)} className="text-neutral-100 hover:text-[#f97316] transition-colors" href="#footer">Contact</a>
          {/* Login/Dashboard button for mobile menu */}
          <div className="mt-4">
            {!isLoading && !isAuthenticated &&
              <a className="inline-block rounded-md bg-[#f97316] px-6 py-3 text-lg font-medium text-white transition-opacity hover:opacity-90" href="/login">Connexion</a>
            }
            {!isLoading && isAuthenticated &&
              <a className="inline-block rounded-md bg-[#f97316] px-6 py-3 text-lg font-medium text-white transition-opacity hover:opacity-90" href="/dashboard">Dashboard</a>
            }
          </div>
        </nav>
      </div>
    </>
  );
};

export const Hero = () => {
  return (
    <section className="relative pt-20 md:pt-24 lg:pt-32">
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdfhlDy1AY65RIHPzWKlgEeU442K398T7KhFjQGSWnLWBmwzWT-H5Tyc6boDKdGR47BwdDzH70SwFCoU6FppMbjnNh1KT_Sba7HYELsP25nd17qcRJ_cQcbepNOc-pdA4RGcO0-117o4xgV9CAi-RyahTXlRa7CfMXsJeZxMwbs7Qqu-P2FG8niSgSClbKplnDwiEzdIVAMl6lhQl3AufG2A3BSwzKqm0xb4kw_lCvUCWXhBZEuNwlyl-HxegPT_NWCQixjFdGphQ")' }}></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white drop-shadow-lg font-montserrat">
          Accédez aux meilleurs influenceurs de votre secteur
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-neutral-100/90 drop-shadow-md hidden md:block">
          Notre plateforme donne accès à une base de données complète d'influenceurs, vous permettant de trouver le partenaire idéal pour votre marque et vos objectifs de campagne.
        </p>
        <div className="mt-8 flex justify-center">
          <a className="inline-flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-neutral-900 text-sm sm:text-base font-bold tracking-wide transition-all transform hover:scale-105" href='/pricing'>
            <span>Découvrir les influenceurs</span>
          </a>
        </div>
        <div className="mt-12 lg:mt-16 pb-16 md:pb-20">
          <div className="inline-block bg-neutral-800/50 backdrop-blur-sm rounded-lg px-4 py-3 sm:px-6 sm:py-4">
            <p className="text-2xl sm:text-3xl font-bold text-white">
              <span className="bg-gradient-to-r from-[#f97316] to-[#ea580c] bg-clip-text text-transparent">+50K</span> Influenceurs et ça continue
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Features = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-neutral-800" id='features'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-montserrat">Tout ce dont vous avez besoin pour trouver le bon influenceur</h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Notre plateforme offre une suite complète d'outils pour vous aider à trouver, analyser et gérer vos campagnes d'influence avec facilité et précision.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature Cards remain the same as they were already well-structured */}
          <div className="bg-neutral-700/50 rounded-xl p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] p-3 rounded-full inline-flex">
              {/* Using inline SVG for better performance and reliability */}
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7V4H20V7L12 11L4 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 11V20H20V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white font-montserrat">Base de données complète</h3>
            <p className="mt-2 text-sm text-neutral-400">Accédez à une vaste base de données de plus de 600 000 influenceurs dans divers secteurs et niches.</p>
          </div>
          <div className="bg-neutral-700/50 rounded-xl p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] p-3 rounded-full inline-flex">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" /><path d="M12 8V12L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white font-montserrat">Analyses avancées</h3>
            <p className="mt-2 text-sm text-neutral-400">Obtenez des informations sur les performances des influenceurs, les données démographiques de l'audience et les métriques d'engagement.</p>
          </div>
          <div className="bg-neutral-700/50 rounded-xl p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] p-3 rounded-full inline-flex">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14H7M9 8H15M17 16H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white font-montserrat">Filtres intelligents</h3>
            <p className="mt-2 text-sm text-neutral-400">Filtrez les influenceurs en fonction de critères tels que la taille de l'audience, le taux d'engagement, l'emplacement, et plus encore.</p>
          </div>
          <div className="bg-neutral-700/50 rounded-xl p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] p-3 rounded-full inline-flex">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15V13C21 10.7909 19.2091 9 17 9H15L14 7H10L9 9H7C4.79086 9 3 10.7909 3 13V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 12L14 10M12 12L10 14M12 12L14 14M12 12L10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white font-montserrat">Gestion de campagnes</h3>
            <p className="mt-2 text-sm text-neutral-400">Gérez vos campagnes du début à la fin, y compris la prise de contact, l'approbation du contenu et le suivi.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CTA = () => {
  return (
    <section className="bg-neutral-900 py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-800 rounded-2xl p-8 md:p-12 lg:p-16 text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white max-w-2xl font-montserrat">
            Prêt à trouver l'influenceur parfait ?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl">
            Commencez votre essai gratuit aujourd'hui et débloquez la puissance de notre base de données d'influenceurs. Aucune carte de crédit requise.
          </p>
          <div className="mt-8">
            <a href='/dashboard' className="inline-flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 sm:px-8 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-neutral-900 text-sm sm:text-base font-bold tracking-wide transition-all transform hover:scale-105">
              <span>Commencer votre essai gratuit</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-neutral-800" id='footer'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-neutral-400">
        <p>© 2025 InfluenceContact. Tous droits réservés.</p>
      </div>
    </footer>
  );
};


function LandingPage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // We remove the '#' character from the start of the hash
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Scroll to the element
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);
  return (
    <div className="bg-neutral-900 text-neutral-100 font-poppins">
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;