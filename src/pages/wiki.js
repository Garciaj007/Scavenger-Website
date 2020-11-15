import React from "react"
import Layout from "../layouts/layout"
import { graphql, Link } from "gatsby"

import "../styles.scss"
import "./wiki.scss"

export default function WikiPage({ data }) {
  const listings = data.allMarkdownRemark.nodes.map(function (n) {
    return { title: n.frontmatter.title, slug: "/" + n.fields.slug }
  })
  var sectioned = []
  for (var i = listings.length - 1; i >= 0; --i) {
    var index = listings[i].title.charAt(0)
    index = /[a-z]/gi.test(index) ? index : "#"
    if (sectioned[index] === undefined) sectioned[index] = []
    sectioned[index].push(listings[i])
  }
  sectioned = Object.entries(sectioned).sort()
  return (
    <Layout>
      {sectioned.map(section => (
        <section key={section[0]}>
          <h2>{section[0]}</h2>
          <div>
            {section[1].map(item => (
              <Link key={item.title} to={item.slug}>
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/wiki/i" } } }
      sort: { order: ASC, fields: frontmatter___title }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`
