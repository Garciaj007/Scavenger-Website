const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const basePath = getNode(node.parent).relativeDirectory
    const slug = createFilePath({ node, getNode, basePath: basePath })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            parent {
              ... on File {
                relativeDirectory
              }
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const blogTemplate = path.resolve(`./src/templates/blog.js`)
    const wikiTemplate = path.resolve(`./src/templates/wiki.js`)
    console.log(node.parent.relativeDirectory)
    createPage({
      path: node.fields.slug,
      component: node.parent.relativeDirectory === "posts" ? blogTemplate : wikiTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
