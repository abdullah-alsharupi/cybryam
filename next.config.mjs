/** @type {import('next').NextConfig} */
// next.config.js
import pkg from './next-i18next.config.js';
const { i18n } = pkg;

const nextConfig = {
    // i18n,
 
    async redirects() {
        return [ 
            {
                source: '/',
                destination: '/main',
                permanent: false,
            },
        ];
    },
    // async  headers() {
    //     return [{
    //         source:'/(.*)',
    //         headers: [
    //             {
    //               key: 'X-Content-Type-Options',
    //               value: 'nosniff',
    //             },
    //             {
    //               key: 'X-XSS-Protection',
    //               value: '1; mode=block',
    //             },
    //             {
    //               key: 'X-Frame-Options',
    //               value: 'DENY',
    //             },
    //             {
    //               key: 'Strict-Transport-Security',
    //               value: 'max-age=63072000; includeSubDomains',
    //             },
    //             // {
    //             //     key: 'Content-Security-Policy',
    //             //     value: "default-src 'self'; script-src 'self' http://localhost:3000; style-src 'self' 'unsafe-inline'; img-src 'self' data: http://localhost:3000",
    //             //   },
    //           ],
    //     }]
    // },
    pageExtensions:['tsx','ts']
};

export default nextConfig;
