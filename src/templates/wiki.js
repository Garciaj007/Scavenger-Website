import React from "react"
import { graphql } from "gatsby"
import Layout from "../layouts/layout"

export default function WikiPost({ data }) {
  const slugs = data.allMarkdownRemark.nodes.filter(n => n.fields.slug != data.markdownRemark.fields.slug).map(function (node) {
    return {
      slug: "/" + node.fields.slug,
      name: node.fields.slug.replace("wiki", "").replaceAll("/", ""),
    }
  })

  var html = data.markdownRemark.html

  for (var i = slugs.length - 1; i >= 0; --i) {
    console.log(slugs[i].name)
    html = html.replaceAll(new RegExp(`(^|[^a-zA-Z])${slugs[i].name}(?![a-zA-Z])`, 'ig'), ` <a href=${slugs[i].slug}>${slugs[i].name}</a>`)
  }

  return (
    <Layout>
      <div>
        <h1>Wiki - {data.markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    allMarkdownRemark(filter: { fields: { slug: { regex: "/wiki/i" } } }) {
      nodes {
        fields {
          slug
        }
      }
    }
  }
`
