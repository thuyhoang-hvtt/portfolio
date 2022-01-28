module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.thuyhoang.hvtt',
    title: 'Thuy Hoang',
    image: '/og.png',
    description:
      'Thuy Hoang is a software engineer who owns a passionate interest in new technologies (Web, AI, Blockchain and Metaverse).',
    twitterUsername: '@thuyhoang_hvtt',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Thuy Hoang',
        short_name: '0xShikYe',
        start_url: '/',
        icon: 'src/images/logo@512px.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
  ],
};
