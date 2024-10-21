// next.config.mjs
export default {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    API_URL: process.env.API_URL,
  },

  webpack: (config) => {
    // Perform customizations to the webpack config
    return config;
  },

  images: {
    domains: ['example.com'], // Replace with your allowed image domains
  },

  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
};
