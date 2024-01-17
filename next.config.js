const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  images: {
    domains: ['github.com'],
  },
};

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);

module.exports = {
  async redirects() {
    return [
      {
        source: '/twitter',
        destination: 'https://twitter.com/yashsehgaldev',
        permanent: true,
      },
      {
        source: '/linkedin',
        destination: 'https://linkedin.com/in/sehgalyash',
        permanent: true,
      },
      {
        source: '/meeting',
        destination: 'https://cal.com/yashsehgal',
        permanent: true,
      },
      {
        source: '/calcom',
        destination: 'https://cal.com/yashsehgal',
        permanent: true,
      },
      {
        source: '/instagram',
        destination: 'https://instagram.com/sehgalyash_',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/yashsehgal',
        permanent: true,
      }
    ]
  },
}
