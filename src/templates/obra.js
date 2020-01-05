import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image";
//import Bio from "../components/bio"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class ObrasTemplate extends React.Component {
  render() {
    console.log(this.props)


    const post = this.props.data.contentfulObras
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    const Bold = ({ children }) => <span className="bold">{children}</span>
    const Text = ({ children }) => <p className="align-center">{children}</p>
    const options = {
      renderMark: {
        [MARKS.BOLD]: text => <Bold>{text}</Bold>,
        bold: text => <b style={{ color: "red" }}>{text}</b>,
      },
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      },
    }
    const textRich = documentToReactComponents(post.description.json, options)
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Img fluid={post.picture.fluid} />
        <SEO
          title={post.title}
          description={post.description || post.excerpt}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.createdAt}
            </p>
          </header>
          {textRich}
          {/* <section dangerouslySetInnerHTML={{ __html: textRich }} /> */}
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            {/* <Bio /> */}
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.slug} rel="prev">
                  ← {previous.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.slug} rel="next">
                  {next.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default ObrasTemplate

export const pageQuery = graphql`
  query ObrasBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulObras(slug: {eq: $slug }) {
      id
      slug
      picture {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      category
      description {
        json
      }
      title
      createdAt(formatString: "DD-MM-YY")
    }
  }
`
