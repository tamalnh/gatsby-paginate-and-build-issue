import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const Index = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();
  return (
    <div>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <div key={node.fields.slug}>
            <GatsbyImage
              image={node.frontmatter.thumbnail.childImageSharp.gatsbyImageData}
              alt="image"
            />
            <h3>
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            <br />
          </div>
        );
      })}

      <div>
        {!isFirst && (
          <Link to={`/${prevPage}`} rel="prev">
            ← Previous Page
          </Link>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <li
            key={`pagination-number${i + 1}`}
            style={{
              margin: 0,
            }}
          >
            <Link
              to={`/${i === 0 ? '' : i + 1}`}
              style={{
                textDecoration: 'none',
                color: i + 1 === currentPage ? '#ffffff' : '',
                background: i + 1 === currentPage ? '#007acc' : '',
              }}
            >
              {i + 1}
            </Link>
          </li>
        ))}
        {!isLast && (
          <Link to={`/${nextPage}`} rel="next">
            Next Page →
          </Link>
        )}
      </div>
    </div>
  );
};

export default Index;

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            thumbnail {
              childImageSharp {
                gatsbyImageData(placeholder: TRACED_SVG)
              }
            }
          }
        }
      }
    }
  }
`;
