/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: "/:path*",
            headers: [
                {
                  key: 'Cache-Control',
                  value: 'no-store',
                },
            ],
          },
        ];
    },
    images: {
      domains: ['pub-06cec14001984a6eb96293e99a86db73.r2.dev'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'pub-06cec14001984a6eb96293e99a86db73.r2.dev',
          pathname: '/**',
        }
      ],
    },
}

module.exports = nextConfig
