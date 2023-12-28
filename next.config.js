/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/book',
                permanent: true
            }
        ]
    },
    api: {
        bodyParser: {
            sizeLimit: '1mb', // 设置合适的请求体大小限制
        },
    },
    // async rewrites() {
    //     return [{
    //         source: '/api/:path*',
    //         // destination: 'http://localhost:3000/api/:path*',
    //         destination: 'https://mock.apifox.cn/m1/2398938-0-default',
    //     }]
    // }
}

module.exports = nextConfig
