import React, { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-[#f97316]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_6_319)">
                    <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_6_319"><rect fill="white" height="48" width="48"></rect></clipPath>
                  </defs>
                </svg>
              </div>
              <h2 className="text-xl font-bold font-montserrat">InfluencerHub</h2>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a className="text-neutral-100 hover:text-[#f97316] transition-colors" href="/home">Home</a>
              <a className="text-neutral-100 hover:text-[#f97316] transition-colors" href="#">Features</a>
              <a className="text-neutral-100 hover:text-[#f97316] transition-colors" href="/pricing">Pricing</a>
              <a className="text-neutral-100 hover:text-[#f97316] transition-colors" href="#">Contact</a>
            </nav>
            <div className="flex items-center gap-4">
              {/* UPDATED: Login Button with new styling */}
              <a className="inline-block rounded-md bg-[#f97316] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90" href="/login">Login</a>
              {/* Mobile Menu Button */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-neutral-100 z-50">
                <span className="material-symbols-outlined">
                  {isMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-900/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-medium">
            <a onClick={() => setIsMenuOpen(false)} className="text-neutral-100 hover:text-[#f97316] transition-colors" href="#">Home</a>
            <a onClick={() => setIsMenuOpen(false)} className="text-neutral-100 hover:text-[#f97316] transition-colors" href="#">Features</a>
            <a onClick={() => setIsMenuOpen(false)} className="text-neutral-100 hover:text-[#f97316] transition-colors" href="#">Pricing</a>
            <a onClick={() => setIsMenuOpen(false)} className="text-neutral-100 hover:text-[#f97316] transition-colors" href="#">Contact</a>
          </nav>
        </div>
      )}
    </>
  );
};

export const Hero = () => {
  return (
    <section className="relative pt-16 md:pt-24 lg:pt-32">
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="absolute inset-0 bg-cover  " style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdfhlDy1AY65RIHPzWKlgEeU442K398T7KhFjQGSWnLWBmwzWT-H5Tyc6boDKdGR47BwdDzH70SwFCoU6FppMbjnNh1KT_Sba7HYELsP25nd17qcRJ_cQcbepNOc-pdA4RGcO0-117o4xgV9CAi-RyahTXlRa7CfMXsJeZxMwbs7Qqu-P2FG8niSgSClbKplnDwiEzdIVAMl6lhQl3AufG2A3BSwzKqm0xb4kw_lCvUCWXhBZEuNwlyl-HxegPT_NWCQixjFdGphQ")' }}></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white drop-shadow-lg font-montserrat">
          Access the Best Influencers in Your Industry
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-100/90 drop-shadow-md">
          Our platform provides access to a comprehensive database of influencers, enabling you to find the perfect match for your brand and campaign goals.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="inline-flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-neutral-900 text-base font-bold tracking-wide transition-all transform hover:scale-105">
            <span>Discover Influencers</span>
          </button>
        </div>
        <div className="mt-12 lg:mt-16 pb-16">
          <div className="inline-block bg-neutral-800/50 backdrop-blur-sm rounded-lg px-6 py-4">
            <p className="text-3xl font-bold text-white">
              <span className="bg-gradient-to-r from-[#f97316] to-[#ea580c] bg-clip-text text-transparent">50K+</span> Influencers and counting
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Features = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-montserrat">Everything You Need to Find the Right Influencer</h2>
          <p className="mt-4 text-lg text-neutral-400">
            Our platform offers a comprehensive suite of tools to help you find, analyze, and manage your influencer campaigns with ease and precision.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-neutral-700/50 rounded-xl p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] p-3 rounded-full">
              <span className="material-symbols-outlined text-4xl text-neutral-100">database</span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white font-montserrat">Complete Database</h3>
            <p className="mt-2 text-sm text-neutral-400">Access a vast database of over 50,000 influencers across various industries and niches.</p>
          </div>
          {/* Feature 2 */}
          <div className="bg-neutral-700/50 rounded-xl p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] p-3 rounded-full">
              <span className="material-symbols-outlined text-4xl text-neutral-100">pie_chart</span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white font-montserrat">Advanced Analytics</h3>
            <p className="mt-2 text-sm text-neutral-400">Gain insights into influencer performance, audience demographics, and engagement metrics.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-neutral-700/50 rounded-xl p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] p-3 rounded-full">
              <span className="material-symbols-outlined text-4xl text-neutral-100">tune</span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white font-montserrat">Smart Filters</h3>
            <p className="mt-2 text-sm text-neutral-400">Filter influencers based on criteria such as audience size, engagement rate, location, and more.</p>
          </div>
          {/* Feature 4 */}
          <div className="bg-neutral-700/50 rounded-xl p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] p-3 rounded-full">
              <span className="material-symbols-outlined text-4xl text-neutral-100">campaign</span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white font-montserrat">Campaign Management</h3>
            <p className="mt-2 text-sm text-neutral-400">Manage your campaigns from start to finish, including outreach, content approval, and tracking.</p>
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
            Ready to find the perfect influencer?
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-xl">
            Start your free trial today and unlock the power of our influencer database. No credit card required.
          </p>
          <div className="mt-8">
            <button className="inline-flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-8 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-neutral-900 text-base font-bold tracking-wide transition-all transform hover:scale-105">
              <span>Start Your Free Trial</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-neutral-400">
        <p>© 2024 InfluencerHub. All rights reserved.</p>
      </div>
    </footer>
  );
};


function LandingPage() {
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