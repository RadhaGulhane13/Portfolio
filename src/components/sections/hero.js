import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import codingCat from '../../images/coding-cat.gif';
import monocleFace from '../../images/face-with-monocle.gif';
import ninja from '../../images/ninja.png';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  img {
    height: 30px;
    width: 30px;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Radha Gulhane.</h2>;
  const three = (
    <>
      <h3 className="small-heading">
        Problem Solver <img src={ninja} alt="loading..." /> | Love Coding{' '}
        <img src={codingCat} alt="loading..." /> | Enjoy Debugging{' '}
        <img src={monocleFace} alt="loading..." />{' '}
      </h3>
    </>
  );
  const four = (
    <>
      <p>
        I am a graduate student at <b>The Ohio State University</b>, majoring in{' '}
        <b>Computer Science & Engineering</b>. I am focused on expanding my knowledge in the areas
        of High-Performance Computing, Distributed Systems, and Deep Learning. Currently, my
        research efforts are dedicated to a project on Distributed Deep Learning, which I am
        undertaking at OSU's renowned High-Performance Computing lab,{' '}
        <a href="https://nowlab.cse.ohio-state.edu/">NOWLAB</a>.{' '}
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://github.com/OSU-Nowlab/MPI4DL"
      target="_blank"
      rel="noreferrer"
    >
      My recent contribution -&gt;
    </a>
  );

  const items = [one, two, three, four, five];
  // const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
