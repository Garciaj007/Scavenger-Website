import React from "react"
import { graphql } from "gatsby"
import Layout from "../layouts/layout"

export default function WikiPost({ data }) {
  return (
    <Layout>
      <div>
        <h1>Wiki - {data.markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
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
    }
  }
`