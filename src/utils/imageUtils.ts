import React from 'react';

// Global Fallback Images & Safe Error Handlers
export const FALLBACK_PROPERTY_IMAGE =
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80';

export const FALLBACK_AVATAR_IMAGE =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = FALLBACK_PROPERTY_IMAGE
) => {
  const target = e.currentTarget;
  if (target.src !== fallbackSrc) {
    target.onerror = null; // Prevent infinite loop if fallback also fails
    target.src = fallbackSrc;
  }
};

export const handleAvatarError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  handleImageError(e, FALLBACK_AVATAR_IMAGE);
};
