'use client';

import { useEffect } from 'react';

export function PreloadHints() {
  useEffect(() => {
    // Preload critical resources
    const criticalResources = [
      '/api/user/profile',
      '/journey',
      '/community',
      '/portfolio'
    ];

    criticalResources.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });

    // Cleanup
    return () => {
      criticalResources.forEach(url => {
        const links = document.querySelectorAll(`link[href="${url}"]`);
        links.forEach(link => link.remove());
      });
    };
  }, []);

  return null;
}