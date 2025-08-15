import Script from 'next/script';

interface StructuredDataProps {
  type?: 'organization' | 'course' | 'website' | 'product';
  data?: Record<string, any>;
}

export function StructuredData({ type = 'organization', data = {} }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case 'organization':
        return {
          ...baseData,
          "@type": "Organization",
          "name": "The Indian Startup",
          "description": "Launch Your Startup in 30 Days - India-specific startup program for founders",
          "url": "https://theindianstartup.in",
          "logo": "https://theindianstartup.in/logo.png",
          "foundingDate": "2025",
          "founders": [
            {
              "@type": "Person",
              "name": "The Indian Startup Team"
            }
          ],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN",
            "addressRegion": "India"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "support@theindianstartup.in",
            "contactType": "customer service"
          },
          "sameAs": [
            "https://twitter.com/theindianstartup",
            "https://linkedin.com/company/theindianstartup"
          ],
          ...data
        };

      case 'course':
        return {
          ...baseData,
          "@type": "Course",
          "name": "30-Day India Launch Sprint",
          "description": "Complete startup program designed specifically for Indian founders. Go from idea to launch-ready in 30 days.",
          "provider": {
            "@type": "Organization",
            "name": "The Indian Startup",
            "url": "https://theindianstartup.in"
          },
          "offers": {
            "@type": "Offer",
            "price": "4999",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "url": "https://theindianstartup.in/pricing"
          },
          "courseMode": "online",
          "educationalLevel": "intermediate",
          "timeRequired": "P30D",
          "inLanguage": "en-IN",
          "audience": {
            "@type": "EducationalAudience",
            "educationalRole": "entrepreneur"
          },
          "teaches": [
            "Startup incorporation in India",
            "DPIIT registration process",
            "Business model development",
            "Market research techniques",
            "Legal compliance for startups",
            "Funding and investment basics",
            "Product development and validation"
          ],
          ...data
        };

      case 'website':
        return {
          ...baseData,
          "@type": "WebSite",
          "name": "The Indian Startup",
          "description": "Launch Your Startup in 30 Days - India-specific startup program",
          "url": "https://theindianstartup.in",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://theindianstartup.in/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "author": {
            "@type": "Organization",
            "name": "The Indian Startup"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Indian Startup"
          },
          "inLanguage": "en-IN",
          ...data
        };

      case 'product':
        return {
          ...baseData,
          "@type": "Product",
          "name": "30-Day India Launch Sprint",
          "description": "Complete startup program designed specifically for Indian founders. Get from idea to launch-ready with expert guidance, templates, and community support.",
          "brand": {
            "@type": "Brand",
            "name": "The Indian Startup"
          },
          "offers": {
            "@type": "Offer",
            "price": "4999",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "url": "https://theindianstartup.in/pricing",
            "seller": {
              "@type": "Organization",
              "name": "The Indian Startup"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150",
            "bestRating": "5",
            "worstRating": "1"
          },
          "category": "Education/Business Training",
          "audience": {
            "@type": "PeopleAudience",
            "suggestedMinAge": 18,
            "geographicArea": {
              "@type": "Country",
              "name": "India"
            }
          },
          ...data
        };

      default:
        return baseData;
    }
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}