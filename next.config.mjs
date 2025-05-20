/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '90.156.134.142',
                port: '1337',
            },
        ],
    },
    experimental: {
        viewTransition: true,
    },
};

export default nextConfig;