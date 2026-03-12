/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  i18n: {
    locales: ["en", "es", "fr"],
    defaultLocale: "en",
    localeDetection: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'my3.optima-crm.com' },
      { protocol: 'https', hostname: 'mkpremiumproperties.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  }
};

export default nextConfig;
