import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

// eslint-disable-next-line react/prop-types
export default function Nav() {
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
    <nav className="navbar">
      <h1 id='title'>{data.site.siteMetadata.title}</h1>
      <div className='navlinks'>
        {data.site.siteMetadata.menuLinks.map(link => (
          <Link key={`link_${link.name}`} to={link.link}>
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
