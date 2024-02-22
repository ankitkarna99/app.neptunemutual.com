/** @type {() => import('next').NextConfig} */
const nextConfig = () => {
  return {
    reactStrictMode: true,
    output: 'export',
    experimental: {
      swcPlugins: [
        ['@lingui/swc-plugin', {}]
      ]
    },
    eslint: {
      dirs: ['http', 'lib', 'src']
    }
  }
}

module.exports = nextConfig
