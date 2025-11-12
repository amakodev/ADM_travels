import { useEffect } from 'react';

/**
 * SEO Component for dynamic meta tags per route
 * Usage: <SEO title="Page Title" description="Page description" />
 */
const SEO = ({ 
  title = 'ADM Travels | Discover Cape Town',
  description = 'Explore Cape Town with ADM Travels - Your trusted travel agency for premium tours, safaris, wine tasting, and unforgettable cultural experiences in South Africa.',
  keywords = 'Cape Town tours, Table Mountain tours, Robben Island tours, wine tasting Cape Town, safari tours South Africa',
  image = 'https://admtravelssa.com/images/logo.png',
  url = 'https://admtravelssa.com',
  type = 'website'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Update primary meta tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Update Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);

    // Update Twitter Card tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:url', url);
  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEO;

