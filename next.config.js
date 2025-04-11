module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'via.placeholder.com',
      'images.unsplash.com',
      'strapi.dev.demo-amit.com',
      'amitgroup.vn',
      'amitgroup.asia',
      'admin.amitgroup.vn',
      'admin.amitgroup.asia',
      'localhost', // Add localhost for Strapi
      'localhost:1337', // Ensure Strapi's address is allowed
      '127.0.0.1', // Ensure 127.0.0.1 is allowed for local connections
    ],
    formats: ['image/webp'],
  },
  experimental: {
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: true,
  },
  i18n: {
    locales: ['default', 'en', 'vi', 'ko'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: true,

  async headers() {
    return [
      {
        source: '/((?!api$|api/).*)',
        headers: [
          {
            key: 'Accept-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
};
