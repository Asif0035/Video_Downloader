import React, { useEffect } from 'react';

export default function SEO({ 
  title = "Free Social Media Video Downloader | YT, Insta, FB", 
  description = "Fast, free, high-quality media downloader. Save YouTube videos, Instagram Reels, and Facebook videos instantly without ads.",
  canonicalUrl,
  pageType = "website",
  includeFAQ = false,
  faqPairs = []
}) {

  useEffect(() => {
    // 1. Safe SSR fallback for canonical URL
    const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');

    document.title = title;

    const createdElements = [];

    const updateMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
        createdElements.push(element); // Track dynamically created elements
      }
      element.setAttribute('content', content);
    };

    const updateCanonicalLink = (url) => {
      if (!url) return;
      let element = document.querySelector('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
        createdElements.push(element);
      }
      element.setAttribute('href', url);
    };

    updateMetaTag('name', 'description', description);
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', pageType);
    updateMetaTag('property', 'og:url', currentUrl);
    updateCanonicalLink(currentUrl);

    // 2. Cleanup function to remove injected meta tags on component unmount
    return () => {
      createdElements.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, [title, description, canonicalUrl, pageType]);

  // Combined WebApplication and SoftwareApplication schema structure
  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "name": title,
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "browserRequirements": "Requires HTML5 support",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  let faqSchema = null;
  if (includeFAQ && faqPairs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqPairs.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };
  }

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(applicationSchema)}
      </script>

      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </>
  );
}