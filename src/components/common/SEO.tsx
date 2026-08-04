import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = 'Shreeji Homes - Premium Luxury Home Linen Store specializing in bedsheets, razais, quilts, dohars, curtains, and high-quality home textiles.',
  keywords = 'luxury home linens, jaipuri quilts, cotton bedsheets, blockprint razais, premium curtains drapes, designer sofa covers, shreeji homes, the jaipur wala'
}) => {
  useEffect(() => {
    // Set document title with premium brand suffix
    document.title = `${title} | Shreeji Homes - Premium Luxury Home Linens`;
    
    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords;
      document.head.appendChild(meta);
    }
  }, [title, description, keywords]);

  return null;
};
