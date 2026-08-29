import React from 'react';
import SEO from './SEO';
import Hero from './Hero';
import FAQ from './FAQ';
import Features from './Features';

export default function PlatformPage({ title, description, platformName, faqPairs }) {
  return (
    <>
      <SEO 
        title={title}
        description={description}
        pageType="website"
        includeFAQ={true}
        faqPairs={faqPairs}
      />
      <main>
        <Hero />
        <Features />
        <FAQ />
      </main>
    </>
  );
}