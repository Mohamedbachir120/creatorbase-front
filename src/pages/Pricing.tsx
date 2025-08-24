import React from 'react';

// --- SVG Icon Components (for reusability and cleaner code) ---

const LogoIcon = () => (
  <svg className="h-8 w-8 text-[#f47b25]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
  </svg>
);

const CheckIcon = () => (
  <svg className="h-6 w-6 flex-shrink-0 text-[#f47b25]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="h-6 w-6 text-[#f47b25] transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
  </svg>
);


// --- Page Section Components ---

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#000000]/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-6 py-4">
        <div className="flex items-center gap-4">
          <LogoIcon />
          <h2 className="text-xl font-bold tracking-tight text-white">InfluencerBase</h2>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <a className="text-base font-medium text-[#a3a3a3] transition-colors hover:text-[#f47b25]" href="/home">Home</a>
          <a className="text-base font-medium text-[#a3a3a3] transition-colors hover:text-[#f47b25]" href="#">Features</a>
          <a className="text-base font-semibold text-[#f47b25]" href="#">Pricing</a>
          <a className="text-base font-medium text-[#a3a3a3] transition-colors hover:text-[#f47b25]" href="#">Contact</a>
        </nav>
        <div className="flex items-center gap-4">
          <a className="hidden text-base font-medium text-[#a3a3a3] transition-colors hover:text-[#f47b25] sm:block" href="#">Login</a>
          <button className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-[#f47b25] text-black text-base font-bold transition-transform hover:scale-105">
            <span className="truncate">Get Started</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const PricingSection = () => {
  const features = [
    "Access to all influencers",
    "Unlimited searches",
    "Advanced analytics",
    "Campaign management tools",
    "Priority email support",
  ];

  return (
    <section className="container mx-auto px-6 pb-20 flex flex-col items-center">
      {/* Hero Text */}
      <div className="py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl text-white">One-Time Payment Plan</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[#a3a3a3]">
          Unlock full access to our entire influencer database with a single, simple payment. No recurring fees, no hidden costs.
        </p>
      </div>
      
      {/* Pricing Card */}
      <div className="flex w-full max-w-md flex-col gap-6 rounded-lg border-2 border-[#f47b25] bg-[#1a1a1a] p-8">
        <div className="flex-grow">
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-white">Lifetime Access</h3>
            <p className="mt-2 flex items-baseline justify-center gap-2">
              <span className="text-6xl font-bold tracking-tight text-white">€49.90</span>
            </p>
            <p className="text-lg text-[#a3a3a3]">One-time payment</p>
          </div>
          <ul className="mt-8 space-y-4 text-left">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-white">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <button className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-[#f47b25] text-black text-base font-bold transition-transform hover:scale-105 w-full mt-8">
          Get Access Now
        </button>
      </div>
    </section>
  );
};

const FaqItem = ({ question, children }) => (
    <details className="group rounded-lg border border-[#333333] bg-[#1a1a1a] p-6">
        <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-white">
            {question}
            <ChevronDownIcon />
        </summary>
        <p className="mt-4 text-[#a3a3a3]">{children}</p>
    </details>
);

const FaqSection = () => {
  return (
    <section className="container mx-auto px-6 py-20">
      <h2 className="text-center text-4xl font-bold tracking-tight text-white">Frequently Asked Questions</h2>
      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        <FaqItem question="Is this really a one-time payment?">
          Yes, absolutely. You pay once and get lifetime access to all the features included in this plan. There are no monthly or annual subscription fees.
        </FaqItem>
        <FaqItem question="What payment methods do you accept?">
          We accept all major credit cards (Visa, Mastercard, American Express) and PayPal for your convenience. All transactions are securely processed.
        </FaqItem>
        <FaqItem question="What happens after I purchase?">
          You will receive an email with your login credentials immediately after your payment is confirmed. You can then log in and start using the platform right away.
        </FaqItem>
        <FaqItem question="Do I get future updates?">
          Yes, your one-time payment includes all future updates to the platform and features included in this plan. We are constantly working to improve our service.
        </FaqItem>
      </div>
    </section>
  );
};

const CtaSection = () => {
  return (
    <section className="bg-[#111111]">
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white">Have more questions?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[#a3a3a3]">
          Our team is here to help. Contact us for any additional inquiries about our one-time payment plan.
        </p>
        <div className="mt-8 flex justify-center">
          <button className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-[#f47b25] text-black text-base font-bold transition-transform hover:scale-105">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};


// --- Main Page Component ---

function PricingPage() {
  return (
    <div className="bg-[#000000] text-white font-['Inter',_sans-serif]">
      <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1">
          <PricingSection />
          <FaqSection />
          <CtaSection />
        </main>
      </div>
    </div>
  );
}

export default PricingPage;