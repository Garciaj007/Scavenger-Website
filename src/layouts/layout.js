import React from "react"
import { css } from "@emotion/core"
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
    `
  )

  console.log(data.site.siteMetadata.menuLinks)

  return (
    <div>
      <Helmet title={data.site.siteMetadata.title} />
      <header>
        <h1 id="title">Scavenger</h1>
      </header>
      <div>
        <nav>
          {data.site.siteMetadata.menuLinks.forEach(elem => {
            console.log(elem)
            return <Link to={elem.path}>{elem.name}</Link>
          })}
          <hr />
          <div className="social"></div>
        </nav>
        <main>{children}</main>
      </div>
    </div>
    // <div
    //   css={css`
    //     margin: 0 auto;
    //     max-width: 700px;
    //     padding: ${rhythm(2)};
    //     padding-top: ${rhythm(1.5)};
    //   `}
    // />
  )
}
