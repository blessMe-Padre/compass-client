/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shop.compass25.ru',
            },
        ],
    },
    experimental: {
        viewTransition: true,
    },
};

export default nextConfig;