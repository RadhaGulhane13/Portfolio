import React, { useState, useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
// import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledArtsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    grid-gap: 20px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(2, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledArt = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);
  

  
  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-12px);
      }

      .img {
        border: 2px solid var(--green); 
      }

    }
  }

  .project-inner {
    flex: '0 0 calc(33.33% - 20px)';
    maxWidth: 'calc(33.33% - 20px)';
    position: 'relative';
    transition: border-color 0.3s ease;

    .image-container {
      position: relative;
      width: 300px; /* Set the width of the container */
      height: 400px; /* Set the height of the container */
      overflow: hidden; /* Hide overflowing border */
    }

    .img {
      border-radius: var(--border-radius);
      width: 100%;
      height: 100%;
      object-fit: cover;
      
    }

    .text-overlay {
      position: absolute;
      bottom: 0; 
      left: 0;
      width: 100%;
      padding: 10px; 
      color: var(--white); 
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease; 
      border-radius: 0 0 var(--border-radius) var(--border-radius);
      font-family: var(--font-mono);
      // background-color: rgba(0, 0, 0, 0.7);
      .title {
        font-size: var(--fz-sm);
        font-weight: bold;
      }
      .material {
        font-size: var(--fz-xxs);
      }
    }

    .image-container:hover .text-overlay {
      opacity: 1;
      animation: animateText 0.6s forwards;
    }

    @keyframes animateText {
      from {
        transform: translateY(50%);
      }
      to {
        transform: translateY(0);
      }
`;

const ArtPage = ({ location, data }) => {
  const arts = data.arts.edges.filter(({ node }) => node);
  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArts = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const GRID_LIMIT = 6;
  const firstSix = arts.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? arts : firstSix;

  const projectInner = node => {
    const { frontmatter } = node;
    const { title, material, cover } = frontmatter;
    const image = getImage(cover.childImageSharp);

    return (
      <div className="project-inner">
        <div className="image-container">
          <GatsbyImage image={image} alt={title} className="img" />
          <div className="text-overlay">
            <span className="title"> {title}</span>

            <br />
            <span className="material"> {material}</span>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealArts.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Art" />

      <main>
        <header ref={revealTitle}>
          <h1 className="big-heading">Art</h1>
          <p className="subtitle">Flawless Emotive Creativity</p>
        </header>
        <StyledArtsSection>
          <ul className="projects-grid">
            {prefersReducedMotion ? (
              <>
                {projectsToShow &&
                  projectsToShow.map(({ node }, i) => (
                    <StyledArt key={i}>{projectInner(node)}</StyledArt>
                  ))}
              </>
            ) : (
              <TransitionGroup component={null}>
                {projectsToShow &&
                  projectsToShow.map(({ node }, i) => (
                    <CSSTransition
                      key={i}
                      classNames="fadeup"
                      timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                      exit={false}
                    >
                      <StyledArt
                        key={i}
                        ref={el => (revealArts.current[i] = el)}
                        style={{
                          transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                        }}
                      >
                        {projectInner(node)}
                      </StyledArt>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            )}
          </ul>

          <button className="more-button" onClick={() => setShowMore(!showMore)}>
            Show {showMore ? 'Less' : 'More'}
          </button>
        </StyledArtsSection>
      </main>
    </Layout>
  );
};
ArtPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ArtPage;

export const pageQuery = graphql`
  {
    arts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/about/art/" } }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            material
            cover {
              childImageSharp {
                gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
          html
        }
      }
    }
  }
`;
