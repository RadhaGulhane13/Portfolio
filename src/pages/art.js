import React, { useRef, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
// import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const ArtPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    {
      art: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const ArtProjects = data.art.edges.filter(({ node }) => node);

  const revealTitle = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Art" />

      <main>
        <header ref={revealTitle}>
          <h1 className="big-heading">Art</h1>
          <p className="subtitle">You don't need Language to express</p>
        </header>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {ArtProjects.map(({ node }) => {
            const { title, cover } = node.frontmatter;
            const image = getImage(cover.childImageSharp);

            return (
              <div
                key={title}
                style={{
                  flex: '0 0 calc(33.33% - 20px)',
                  maxWidth: 'calc(33.33% - 20px)',
                  position: 'relative',
                }}
              >
                <GatsbyImage image={image} alt={title} style={{ borderRadius: '8px' }} />
                <h2
                  style={{
                    display: 'none',
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    padding: '5px',
                    borderRadius: '4px',
                  }}
                >
                  {title}
                </h2>
                {/* Additional content */}
              </div>
            );
          })}
        </div>
      </main>
    </Layout>
  );
};
ArtPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ArtPage;
