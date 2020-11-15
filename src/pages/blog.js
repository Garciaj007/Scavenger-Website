import React from "react"
import Layout from "../layouts/layout"
import { graphql, Link } from "gatsby"

import "../styles.scss"
import "./blog.scss"

export default function BlogPage({ data }) {
  const listings = data.allMarkdownRemark.nodes.map(n => {
    return {
      slug: "/" + n.fields.slug,
      title: n.frontmatter.title,
      date: n.frontmatter.date,
      heading: n.headings[0].value,
      length: n.timeToRead,
    }
  })
  console.log(listings)
  return (
    <Layout>
      {listings.map(l => (
        <Link className='blog-listing' to={l.slug} key={l.title}>
          <div>
            <h1>{l.title}</h1>
            <h2>{l.heading}</h2>
            <div className='details'>
              <span>{l.date}</span>
              <span> · </span>
              <span>{l.length} min read</span>
            </div>
          </div>
          <img src=""/>
        </Link>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/posts/i" } } }
      sort: { order: ASC, fields: frontmatter___date }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date
        }
        headings {
          value
        }
        timeToRead
      }
    }
  }
`
