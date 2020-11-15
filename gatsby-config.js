/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Scavenger`,
    menuLinks: [
      {
        name: `Scavenger`,
        link: `/`,
      },
      {
        name: `Blog`,
        link: `/blog/`,
      },
      {
        name: `Wiki`,
        link: `/wiki/`,
      },
      {
        name: `Our Partners`,
        link: `/about/`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
  ],
}
