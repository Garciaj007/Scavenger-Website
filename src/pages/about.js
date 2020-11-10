import { graphql } from "gatsby"
import React from "react"
import Layout from "../layouts/layout"

export default function About({ data }) {
  return (
    <Layout>
      <h1>{data.site.siteMetadata.title}</h1>
      <p>
        We&apos;re the only site running on your computer dedicated to showing the
        best photos and videos of pandas eating lots of food.
      </p>
      <small></small>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
