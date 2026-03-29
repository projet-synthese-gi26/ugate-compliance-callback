// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    basePath: '/compliance',
    assetPrefix: '/compliance',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
                pathname: '/api/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com', // Pour les photos de test d'Unsplash
            },
            // Ajoute ici le domaine de ton backend si tu stockes les vraies photos plus tard
            // ex: { protocol: 'https', hostname: 'api.yowyob.com' }
        ],
    },
};

export default nextConfig;