import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class ObrasIndex extends React.Component {
  render() {
    console.log(this.props)
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulObras.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All obras" />

        {posts.map(({ node }) => {
          const title = node.title || node.slug
          return (
            <article key={node.id}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link to={node.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.createdAt}</small>
              </header>
              {/* <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section> */}
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default ObrasIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulObras(
      filter: {
        node_locale: {eq: "es-ES"}
      },
      sort: {fields: [updatedAt], order: DESC }
      
    ) {
      edges {
        node {   
            id     
            title
            createdAt(formatString: "DD-MM-YY")
            slug
        }
      }
    }
  }
`
