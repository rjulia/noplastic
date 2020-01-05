const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/obra.js`)
  const result = await graphql(
    `
      {
        allContentfulObras {
          edges {
            node {
              slug
              title
              description {
                json
                content {
                  nodeType
                }
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog obras pages.
  const obras = result.data.allContentfulObras.edges

  obras.forEach((post, index) => {
    const previous = index === obras.length - 1 ? null : obras[index + 1].node
    const next = index === 0 ? null : obras[index - 1].node

    createPage({
      path: post.node.slug,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    })
  })
}


