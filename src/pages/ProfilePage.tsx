import React, { useState, useRef, useEffect, type FC } from 'react';
import { useCreatePaymentIntent, useUserProfile } from '../hooks/useUser';
import { useAuth } from '../context/AuthContext';
import { useRegions, type Region } from '../hooks/useRegions';
// Import the search hook and Creator type
import { useRecordVisit, useSearchCreators, type Creator } from '../hooks/useContentCreator';
import { CheckIcon } from './Pricing';
import { FaInstagram, FaYoutube, FaTiktok, FaTimes, FaEnvelope, FaBars, FaUsers } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// --- Type Definitions ---

type NavLink = {
    name: string;
    iconPath: string;
};
const features = [
    "Accès à tous les influenceurs",
    "Recherches illimitées",
    "Analyses avancées",
    "Outils de gestion de campagne",
    "Support par e-mail prioritaire",
];

const stripePromise = loadStripe('pk_test_51Rki8VP0XFOMw1y33mFVSXbwlsKsm4nPgsGZNDbg4wUCvc5e2b6LA8bLXvnD2LUu9XwY33Y2fyNqpzcDszdJFZ0T00yFkyB9oV'); // Replace with your actual Stripe publishable key

// This type can now be removed if Creator is used everywhere, but we keep it for other components
interface Influencer {
    id: string;
    name: string; // Maps to nickname or username
    category?: string; // Optional, as category isn't directly in ContentCreator
    imageUrl?: string; // Optional, as imageUrl isn't in ContentCreator
    instagram?: string | null;
    youtube?: string | null;
    tiktok?: string | null;
    email?: string;
    followers?: number | null;
}


// --- Prop Types ---

type SidebarProps = {
    activePage: string;
    onNavigate: (page: string) => void;
    isOpen: boolean; // New prop to control sidebar visibility
    onToggle: () => void; // New prop to toggle sidebar
};
type NavIconProps = {
    path: string;
};

interface StatCardProps {
    title: string;
    value: string | number;
}

// Define the InfluencerCard props (assumed structure)
interface InfluencerCardProps extends Influencer {
    key: string;
}


// --- SVG Icon Components (no changes) ---
const LogoIcon: FC = () => (
    <svg className="h-8 w-8 text-[#f97316]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
    </svg>
);

const NavIcon: FC<NavIconProps> = ({ path }) => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d={path} fillRule="evenodd"></path>
    </svg>
);


// --- Reusable Component Sections ---

const Sidebar: FC<SidebarProps> = ({ activePage, onNavigate, isOpen, onToggle }) => {
    const navLinks: NavLink[] = [
        { name: 'Tableau de bord', iconPath: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" },
        { name: 'Base de données', iconPath: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" },
        { name: 'Mes campagnes', iconPath: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" },
        { name: 'Analyses', iconPath: "M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" },
        { name: 'Facturation', iconPath: "M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" },
    ];

    return (
        <>
            {/* Sidebar for Desktop and Mobile */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#000000] border-r border-[#374151] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:static md:flex md:flex-col p-6`}
            >
                <div className="flex items-center gap-3 text-[#ffffff] mb-10">
                    <LogoIcon />
                    <a href="/">
                        <h1 className="text-xl font-bold">InfluenceContact</h1>
                    </a>
                </div>
                <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => {
                                onNavigate(link.name);
                                if (window.innerWidth < 768) { // Only toggle on mobile
                                    onToggle();
                                }
                            }}
                            className={`flex items-center text-left w-full gap-3 px-4 py-2.5 text-[#9ca3af] rounded-lg hover:bg-[#1a1a1a] hover:text-[#ffffff] transition-colors duration-200 ${link.name === activePage ? 'bg-[#1a1a1a] text-[#ffffff] font-semibold' : ''
                                }`}
                        >
                            <NavIcon path={link.iconPath} />
                            <span>{link.name}</span>
                        </button>
                    ))}
                </nav>
                <div className="mt-auto">
                    <button className="w-full py-3 px-4 rounded-lg text-sm font-semibold bg-[#f97316] text-white hover:opacity-90 transition-opacity">
                        Créer une nouvelle campagne
                    </button>
                </div>
            </aside>
            {/* Backdrop for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={onToggle}
                ></div>
            )}
        </>
    );
};

const Header: FC<{ title: string; onToggleSidebar: () => void }> = ({ title, onToggleSidebar }) => {
    const { data: user } = useUserProfile();
    const { logout } = useAuth();
    const [isUserTooltipVisible, setUserTooltipVisible] = useState<boolean>(false);
    const [isNotificationTooltipVisible, setNotificationTooltipVisible] = useState<boolean>(false);
    const userTooltipRef = useRef<HTMLDivElement>(null);
    const notificationTooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userTooltipRef.current && !userTooltipRef.current.contains(event.target as Node)) setUserTooltipVisible(false);
            if (notificationTooltipRef.current && !notificationTooltipRef.current.contains(event.target as Node)) setNotificationTooltipVisible(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-20 flex items-center justify-between bg-[#000000]/80 backdrop-blur-sm border-b border-[#374151] px-4 md:px-8 py-4">
            <div className="flex items-center gap-4">
                {/* Hamburger Menu for Mobile */}
                <button
                    className="md:hidden text-[#ffffff] p-2"
                    onClick={onToggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <FaBars className="w-6 h-6" />
                </button>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">{title}</h1>
            </div>
            <div className="flex items-center gap-3 md:gap-6">
                {/* Search bar moves here for better mobile layout */}
                <div className="hidden md:relative md:w-64">
                    <input
                        className="w-full rounded-lg border-0 bg-[#1a1a1a] py-2 pl-10 pr-4 text-sm text-[#ffffff] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                        placeholder="Rechercher..."
                        type="search"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                    </div>
                </div>
                <div className="relative" ref={notificationTooltipRef}>
                    <button
                        onClick={() => setNotificationTooltipVisible(!isNotificationTooltipVisible)}
                        className="relative rounded-full p-2 text-[#9ca3af] hover:bg-[#1a1a1a] hover:text-[#ffffff]"
                    >
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f97316] opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#f97316]"></span>
                        </span>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                    </button>
                    {isNotificationTooltipVisible && (
                        <div className="absolute right-0 mt-2 w-72 bg-[#1a1a1a] border border-[#374151] rounded-md shadow-lg p-4">
                            <p className="text-center text-sm text-[#9ca3af]">Aucune notification pour le moment.</p>
                        </div>
                    )}
                </div>
                <div className="relative" ref={userTooltipRef}>
                    <button onClick={() => setUserTooltipVisible(!isUserTooltipVisible)} className="flex items-center gap-3">
                        <img
                            alt="User avatar"
                            className="h-10 w-10 rounded-full object-cover"
                            src={`https://ui-avatars.com/api/?format=svg&name=${user?.firstName?.charAt(0) ?? "A"}&background=f97316&color=ffffff`}
                        />
                        <div className="hidden md:block text-left text-sm">
                            <div className="font-semibold text-[#ffffff]">{user?.firstName}</div>
                            <div className="text-xs uppercase text-[#9ca3af]">{user ? "activé" : "désactivé"}</div>
                        </div>
                    </button>
                    {isUserTooltipVisible && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-[#374151] rounded-md shadow-lg py-1">
                            <button
                                onClick={logout}
                                className="block w-full text-left px-4 py-2 text-sm text-[#ffffff] hover:bg-[#f97316] hover:text-[#ffffff] transition-colors"
                            >
                                Se déconnecter
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

// --- Individual Page Contents ---

const DashboardContent: FC = () => {
    const { data: userProfile, isLoading, error } = useUserProfile();

    // Fallback data if loading or error
    const isDataAvailable = !isLoading && !error && userProfile;

    // Map visitedProfiles to Influencer format for "Recommended For You"
    const recommendedInfluencers: Influencer[] = isDataAvailable
        ? userProfile.visitedProfiles.map((profile) => ({
            id: profile.creator.id,
            name: profile.creator.nickname || profile.creator.username || 'Inconnu',
            category: `${profile.creator.region?.flag} ${profile.creator.region?.countryName}` || 'Monde', // Fallback to region or static value
            imageUrl: undefined, // Image not provided by backend, set to undefined or use a placeholder
            instagram: profile.creator.instagram,
            youtube: profile.creator.youtube,
            tiktok: null, // Not provided by backend
            email: undefined, // Not provided by backend
            followers: profile.creator.followers,
        }))
        : [];

    // Map searchHistory to Recent Activity format
    const recentActivities = isDataAvailable
        ? userProfile.searchHistory.slice(0, 5).map((search) => ({
            id: search.id,
            description: `Recherche de "${search.keyword || 'N/A'}" dans ${search.country || 'N/A'}`,
            timestamp: new Date(search.createdAt).toLocaleDateString(),
        }))
        : [];

    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                            Bonjour, {isDataAvailable ? userProfile.firstName : 'Utilisateur'}!
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard
                                title="Influenceurs sauvegardés"
                                value={isDataAvailable ? userProfile.totalVisitsCount : 0}
                            />
                            <StatCard title="Campagnes actives" value={3} /> {/* Static, as no backend data */}
                            <StatCard
                                title="Recherches mensuelles"
                                value={isDataAvailable ? userProfile.totalSearchCount : 0}
                            />
                        </div>
                    </section>
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Récemment visités</h2>
                            <a className="text-sm font-semibold text-[#f97316] hover:underline" href="#">
                                Voir tout
                            </a>
                        </div>
                        {isLoading ? (
                            <p className="text-white">Chargement des influenceurs...</p>
                        ) : error ? (
                            <p className="text-red-500">Erreur lors du chargement des influenceurs. Veuillez réessayer.</p>
                        ) : recommendedInfluencers.length === 0 ? (
                            <p className="text-white">Aucun influenceur récemment visité.</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                {recommendedInfluencers.map((inf) => (
                                    <InfluencerCard
                                        key={inf.id}
                                        id={inf.id}
                                        name={inf.name}
                                        category={inf.category}
                                        imageUrl={`https://ui-avatars.com/api/?format=svg&name=${encodeURIComponent(inf.name)}&background=2a2a2a&color=ffffff`}
                                        followers={inf.followers}
                                        instagram={inf.instagram}
                                        youtube={inf.youtube}
                                        tiktok={inf.tiktok}
                                        email={inf.email}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
                <div className="lg:col-span-1 space-y-8">
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-4">Activité Récente</h2>
                        {isLoading ? (
                            <p className="text-white">Chargement des activités...</p>
                        ) : error ? (
                            <p className="text-red-500">Erreur lors du chargement des activités. Veuillez réessayer.</p>
                        ) : recentActivities.length === 0 ? (
                            <p className="text-white">Aucune activité récente.</p>
                        ) : (
                            <ul className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <li key={activity.id} className="text-white text-sm md:text-base">
                                        {activity.description} - {activity.timestamp}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
};

const DatabaseContent: FC = () => {
    const [keyword, setKeyword] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    // --- HOOKS ---
    const { data: regions, isLoading: isLoadingRegions, isError: isRegionsError } = useRegions();
    const { mutate: search, data: searchData, isPending: isSearching, isError: isSearchError } = useSearchCreators();

    const handleSearch = () => {
        // Pass the country code (e.g., "AE") to the mutation
        search({ keyword, country: selectedCountry });
    };

    // --- RENDER LOGIC ---
    // CORRECTED: Access the nested 'data' property from the search response
    const creators = searchData?.data.data;

    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <section>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Trouver des créateurs de contenu</h2>
                <div className="mt-6 flex flex-col md:flex-row gap-4">
                    <input className="w-full rounded-lg border-0 bg-[#1a1a1a] py-3 px-4 text-sm text-[#ffffff] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#f97316]" placeholder="Rechercher par mot-clé..." type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />

                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full rounded-lg border-0 bg-[#1a1a1a] py-3 px-4 text-sm text-[#ffffff] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                        disabled={isLoadingRegions}
                    >
                        <option value="" disabled>
                            {isLoadingRegions ? 'Chargement des pays...' : 'Sélectionnez un pays'}
                        </option>
                        {isRegionsError && <option disabled>Erreur lors du chargement des pays</option>}

                        {/* CORRECTED: Map directly over 'regions' and use region.name for the value */}
                        {regions?.data.map((region: Region) => (
                            <option key={region.id} value={region.name}>
                                {region.flag} {region.countryName}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="w-full md:w-auto py-3 px-8 rounded-lg text-sm font-semibold bg-[#f97316] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                        {isSearching ? 'Recherche en cours...' : 'Rechercher'}
                    </button>
                </div>
            </section>

            <section className="mt-10">
                <h3 className="text-xl font-bold tracking-tight text-white">Résultats</h3>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {isSearching && <p className="text-[#9ca3af] col-span-full">Chargement des résultats...</p>}
                    {isSearchError && <p className="text-red-500 col-span-full">Une erreur est survenue lors de la recherche.</p>}

                    {!isSearching && !isSearchError && (
                        <>
                            {!creators && <p className="text-[#9ca3af] col-span-full">Commencez une nouvelle recherche pour trouver des créateurs.</p>}
                            {creators && creators.length === 0 && <p className="text-[#9ca3af] col-span-full">Aucun résultat trouvé pour votre requête.</p>}

                            {creators?.map((creator: Creator) => {
                                const creatorName = creator.nickname || creator.username || 'N/A';
                                return (
                                    <InfluencerCard

                                        key={creator.id}
                                        id={creator.id}
                                        name={creatorName}
                                        category={creator.region.flag + " " + creator.region.countryName}
                                        imageUrl={`https://ui-avatars.com/api/?format=svg&name=${encodeURIComponent(creatorName)}&background=2a2a2a&color=ffffff`}
                                        instagram={creator.instagram}
                                        youtube={creator.youtube}
                                        tiktok={creator.profileLink}
                                        email={creator.email ?? undefined}
                                        followers={creator.followers ?? undefined}
                                    />
                                );
                            })}
                        </>
                    )}
                </div>
            </section>
        </main>
    );
};
const ComingSoonContent: FC = () => (
    // ... (no changes)
    <main className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
        <div className="text-center px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Bientôt disponible!</h2>
            <p className="text-base md:text-lg text-[#9ca3af]">Cette fonctionnalité est en cours de construction. Veuillez revenir plus tard.</p>
        </div>
    </main>
);

 
const PaymentForm: FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const { mutate: createPaymentIntent, isPending, data, error } = useCreatePaymentIntent();
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  
    // Handle payment intent creation
    const handleCreateIntent = async () => {
      if (!user?.id) {
        setPaymentError('Utilisateur non authentifié');
        return;
      }
      createPaymentIntent();
    };
  
    // Handle payment submission
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      if (!stripe || !elements || !data?.data.clientSecret) {
        setPaymentError('Stripe ou l\'intention de paiement n\'est pas initialisé');
        return;
      }
  
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setPaymentError('Élément de carte non trouvé');
        return;
      }
  
      try {
        const { error, paymentIntent } = await stripe.confirmCardPayment(data.data.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: user?.email ?? '', // Fallback to empty string if email is undefined
            },
          },
        });
  
        if (error) {
          setPaymentError(error.message || 'Échec du paiement');
          return;
        }
  
        if (paymentIntent?.status === 'succeeded') {
          setPaymentSuccess(true);
          // Optionally notify backend to update transaction status
          // You can add a mutation here to call a `/payment/confirm` endpoint
        }
      } catch (err) {
        setPaymentError('Une erreur est survenue lors du traitement du paiement');
        console.error(err);
      }
    };
  
    return (
      <div className="mt-6">
        {!data?.data.clientSecret && (
          <button
            onClick={handleCreateIntent}
            disabled={isPending || !user?.id}
            className="w-full py-3 px-6 rounded-lg text-base font-semibold bg-[#f97316] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Création de l\'intention de paiement...' : 'Démarrer le paiement'}
          </button>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
        {data?.data.clientSecret && (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="bg-[#1a1a1a] border border-[#374151] rounded-lg p-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#ffffff',
                      '::placeholder': {
                        color: '#9ca3af',
                      },
                    },
                    invalid: {
                      color: '#f97316',
                    },
                  },
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!stripe || isPending}
              className="w-full mt-4 py-3 px-6 rounded-lg text-base font-semibold bg-[#f97316] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Traitement...' : 'Payer €49.90'}
            </button>
          </form>
        )}
        {paymentError && <p className="text-red-500 text-sm mt-2">{paymentError}</p>}
        {paymentSuccess && (
          <p className="text-green-500 text-sm mt-2">Paiement effectué avec succès !</p>
        )}
      </div>
    );
  };
  
  // PaymentFormWrapper to provide Stripe context
  const PaymentFormWrapper: FC = () => {
    return (
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    );
  };
  
// PricingContent component
const PricingContent: FC = () => {
    const { data } = useUserProfile();
    const [showPaymentForm, setShowPaymentForm] = useState(false);
  
    return (
      <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Pricing Card */}
          <div className="flex w-full flex-col gap-6 rounded-lg border-2 border-[#f47b25] bg-[#1a1a1a] p-6 md:p-8">
            <div className="flex-grow">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-semibold text-white">Accès à vie</h3>
                <p className="mt-2 flex items-baseline justify-center gap-2">
                  <span className="text-5xl md:text-6xl font-bold tracking-tight text-white">€49.90</span>
                </p>
                <p className="text-base md:text-lg text-[#a3a3a3]">Paiement unique</p>
              </div>
              <ul className="mt-8 space-y-4 text-left">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckIcon color="#f47b25" />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            {!data?.hasPaid && !showPaymentForm && (
              <button
                onClick={() => setShowPaymentForm(true)}
                className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-[#f47b25] text-black text-base font-bold transition-transform hover:scale-105 w-full mt-8"
              >
                Obtenez l'accès maintenant
              </button>
            )}
            {!data?.hasPaid && showPaymentForm && <PaymentFormWrapper />}
            {data?.hasPaid && (
              <button className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-green-600 text-white text-base font-bold transition-transform hover:scale-105 w-full mt-8">
                <CheckIcon color="white" /> Déjà activé
              </button>
            )}
          </div>
        </div>
      </main>
    );
  };
  

const formatFollowers = (followers: number): string => {
    if (followers >= 1000000) {
        return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
        return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers.toString();
};

const InfluencerCard: FC<InfluencerCardProps> = ({ id, name, followers, email, category, imageUrl, instagram, tiktok, youtube }) => {
    const { mutate: recordVisit } = useRecordVisit();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        recordVisit(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* --- Influencer Card --- */}
            <div
                className="p-4 rounded-xl border border-gray-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
                onClick={handleCardClick}
            >
                <div className="w-full aspect-square overflow-hidden rounded-lg mb-3">
                    <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url("${imageUrl}")` }}
                    ></div>
                </div>
                <h3 className="font-semibold truncate text-white">{name}</h3>
                <p className="text-sm text-gray-400">{category}</p>
                {
                    followers !== undefined && followers !== null &&
                    <div className="flex items-center text-sm text-gray-500 mt-1 mb-3">
                        <FaUsers className="mr-1 w-4 h-4" />
                        <span>{formatFollowers(followers)} followers</span>
                    </div>
                }
                <div className="flex space-x-3">
                    {instagram && (
                        <a
                            href={instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-gray-800 rounded-full p-2">
                                <FaInstagram className="w-5 h-5" />
                            </div>
                        </a>
                    )}
                    {tiktok && (
                        <a
                            href={tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-gray-800 rounded-full p-2">
                                <FaTiktok className="w-5 h-5" />
                            </div>
                        </a>
                    )}
                    {youtube && (
                        <a
                            href={youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-gray-800 rounded-full p-2">
                                <FaYoutube className="w-5 h-5" />
                            </div>
                        </a>
                    )}
                </div>
            </div>

            {/* --- Improved Modal --- */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-fadeIn"
                    onClick={closeModal}
                >
                    <div
                        className="bg-[#121212] border border-gray-700 rounded-2xl shadow-2xl max-w-sm w-full relative transform transition-all duration-300 animate-scaleUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* --- Close Button --- */}
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors z-10"
                            aria-label="Close modal"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>

                        {/* --- Modal Content --- */}
                        <div className="p-6 md:p-8 text-center">
                            {/* --- Profile Image --- */}
                            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full mb-5 border-4 border-gray-700 overflow-hidden">
                                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                            </div>

                            {/* --- Influencer Info --- */}
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{name}</h2>
                            <p className="text-base md:text-md text-orange-500 font-medium">{category}</p>
                            {

                                followers != null && followers != undefined && <div className="flex items-center justify-center text-base text-gray-400 mt-1 mb-6">
                                    <FaUsers className="mr-2 w-5 h-5" />
                                    <span>{formatFollowers(followers)} followers</span>
                                </div>
                            }

                            {/* --- Social Links --- */}
                            <div className="flex justify-center space-x-5 mb-8">
                                {instagram && (
                                    <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d62976] transition-colors" aria-label="Instagram">
                                        <FaInstagram className="w-7 h-7 md:w-8 md:h-8" />
                                    </a>
                                )}
                                {tiktok && (
                                    <a href={tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00f2ea] transition-colors" aria-label="TikTok">
                                        <FaTiktok className="w-7 h-7 md:w-8 md:h-8" />
                                    </a>
                                )}
                                {youtube && (
                                    <a href={youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff0000] transition-colors" aria-label="YouTube">
                                        <FaYoutube className="w-7 h-7 md:w-8 md:h-8" />
                                    </a>
                                )}
                            </div>

                            {/* --- Call to Action Button --- */}
                            <a
                                href={`mailto:${email}`}
                                className="w-full inline-flex items-center justify-center bg-[#f97316] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#e55f12] transition-colors"
                            >
                                <FaEnvelope className="mr-2" />
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const StatCard: FC<StatCardProps> = ({ title, value }) => (
    // ... (no changes)
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#374151] flex flex-col justify-between">
        <p className="text-sm font-medium text-[#9ca3af]">{title}</p>
        <p className="text-3xl md:text-4xl font-bold text-[#ffffff]">{value}</p>
    </div>
);



// --- Main App Component ---
const DashboardPage: FC = () => {
    const [currentPage, setCurrentPage] = useState('Tableau de bord');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleNavigate = (page: string) => {
        setCurrentPage(page);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Prevent scrolling when sidebar is open on mobile
    useEffect(() => {
        if (isSidebarOpen && window.innerWidth < 768) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(false);
                document.body.style.overflow = 'auto';
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('resize', handleResize);
        };
    }, [isSidebarOpen]);

    const renderPage = () => {
        switch (currentPage) {
            case 'Tableau de bord':
                return <DashboardContent />;
            case 'Base de données':
                return <DatabaseContent />;
            case 'Mes campagnes':
                return <ComingSoonContent />;
            case 'Analyses':
                return <ComingSoonContent />;
            case 'Facturation':
                return <PricingContent />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="bg-[#000000] text-[#ffffff] font-['Inter',_sans-serif]">
            <div className="flex min-h-screen">
                <Sidebar
                    activePage={currentPage}
                    onNavigate={handleNavigate}
                    isOpen={isSidebarOpen}
                    onToggle={toggleSidebar}
                />
                <div className="flex-1 flex flex-col min-w-0">
                    <Header title={currentPage} onToggleSidebar={toggleSidebar} />
                    {renderPage()}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;