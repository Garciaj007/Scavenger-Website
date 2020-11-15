import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            menuLinks {
              name
              link
            }
          }
        }
      }
    `,
  )

  return (
    <div>
      <Helmet title={data.site.siteMetadata.title}></Helmet>
      <header>
        <h1 id='title'>Scavenger</h1>
      </header>
      <div>
        <nav>
          <div>
            {data.site.siteMetadata.menuLinks.map(link => (
              <Link key={`link_${link.name}`} to={link.link}>
                {link.name}
              </Link>
            ))}
            <hr />
          </div>
          <div className='social'></div>
        </nav>
        <main>{children}</main>
      </div>
      <div className='background-decal'></div>
      <div className='background-decal'></div>
      <div className='background-decal'></div>
    </div>
  )
}
