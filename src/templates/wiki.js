import React from "react"
import { graphql } from "gatsby"
import Layout from "../layouts/layout"

export default function WikiPost({ data }) {
  const slugs = data.allMarkdownRemark.nodes
    .filter(n => n.fields.slug != data.markdownRemark.fields.slug)
    .map(function (node) {
      return {
        slug: "/" + node.fields.slug,
        name: node.fields.slug.replace("wiki", "").replaceAll("/", ""),
      }
    })

  var html = data.markdownRemark.html

  console.log(html);

  //! Modify This? https://regex101.com/r/dR0kS6/29

  for (let i = slugs.length - 1; i >= 0; --i) {
    console.log(slugs[i].name)

    let matches = [...html.matchAll(`/(?<=>)[^\<]*cat/ig`)];
    console.log(matches)
    matches.map(function(match) {
      return {match: match, linked: match.replace(slugs[i].name, `<a href='${slugs[i].slug}'>${slugs[i].name}</a>`)}
    })
    //html = html.replaceAll()

    // html = html.replaceAll(
    //   new RegExp(`(^|[^a-zA-Z])${slugs[i].name}(?![a-zA-Z])`, "ig"),
    //   ` <a href='${slugs[i].slug}'>${slugs[i].name}</a>`,
    // )
  }

  console.log(html)

  // const headers = html.match(/<+h+\d+>*.*<\/+h+\d+>/gm)
  // console.log(headers)

  // for(let i = 0; i < headers.length; i++)
  // {
  //   //html = html.replace(headers[i], )
  // }

  //console.log(html)

  return (
    <Layout>
      <div>
        <h1>Wiki - {data.markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <aside
        dangerouslySetInnerHTML={{
          __html: data.markdownRemark.tableOfContents,
        }}
      />
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
      tableOfContents(absolute: false)
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
