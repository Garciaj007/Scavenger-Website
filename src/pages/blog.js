import React from "react"
import Layout from "../layouts/layout"
import { graphql, Link } from "gatsby"

import "../styles.scss"
import "./blog.scss"

export default function BlogPage({ data }) {
  const listings = data.allMarkdownRemark.nodes.map(n => {
    console.log("Author: ", n.frontmatter.author);
    return {
      slug: "/" + n.fields.slug,
      title: n.frontmatter.title,
      date: n.frontmatter.date,
      description: n.frontmatter.description !== null ? n.frontmatter.description : n.headings[0].value,
      length: n.timeToRead,
      author: n.frontmatter.author
    }
  })
  console.log(listings)
  return (
    <Layout>
      {listings.map(l => (
        <Link className='blog-listing' to={l.slug} key={l.title}>
          <div>
            <h1>{l.title}</h1>
            <h2>{l.description}</h2>
            <div className='details'>
              <span>{l.date}</span>
              <span> · </span>
              <span>{l.length} min read</span>
              <span className="author">{l.author}</span>
            </div>
          </div>
          <img src='' />
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
          author
          description
        }
        headings {
          value
        }
        timeToRead
      }
    }
  }
`
