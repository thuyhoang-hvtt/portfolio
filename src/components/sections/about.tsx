import { StaticImage } from 'gatsby-plugin-image';
import { transparentize } from 'polished';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 50px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledParagraph = styled.div`
  color: ${({ theme }) => theme.palette.onSurface};

  & > p {
    text-align: justify;
    text-justify: inter-word;
  }
`;

const StyledTechStack = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  grid-gap: 0 10px;
  padding: 0;
  margin: 20px 0 0 0;
  overflow: hidden;
  list-style: none;

  li {
    position: relative;
    margin-bottom: 10px;
    padding-left: 20px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.palette.primary};
      font-size: var(--fz-sm);
      line-height: 12px;
    }
  }
`;

const StyledPortrait = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: ${({ theme }) => theme.palette.primary};
    box-shadow: 0 10px 30px -15px ${({ theme }) => theme.palette.primary};
    transition: var(--transition);

    &:hover,
    &:focus {
      box-shadow: 0 20px 30px -15px ${({ theme }) => theme.palette.primary};
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .portrait {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .portrait {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: ${({ theme }) => transparentize(0.4, theme.palette.primary)};
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid ${({ theme }) => theme.palette.primary};
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

function AboutSection() {
  const revealContainer = useRef(null);

  const { sr, srConfig } = useScrollReveal();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'JavaScript (ES6+)',
    'TypeScript',
    'Python 3',
    'Node.js',
    'Java',
    'Solidity',
    'Hardhat',
    'React',
    'NestJS',
    'FastAPI',
    'PyTorch',
    'Sprint Boot',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>
      <StyledContent>
        <StyledParagraph>
          <p>
            Yo!! This is Thuy (Lachy) and I work as a software engineer attempting to bring
            exceptional experiences not only to customers but also to developers. Experiences from
            maintaining more than 10 projects shows me that developer experience (DX) is obviously
            important on the road to a successful product.
          </p>

          <p>
            Back to today, and I’ve had the privilege of working at{' '}
            <a href="https://emagevisionpl.com">a machine vision - machine learning system</a>,{' '}
            <a href="https://apps.apple.com/vn/app/forbie/id1522643654">a healthtech startup</a>,{' '}
            <a href="https://greenphire.com">a clinical research platform</a>, and{' '}
            <a href="https://github.com/thuyhoang-hvtt">
              an open-source blockchain-based community
            </a>
            . My main focus these days is to design, architect, implement inclusive products and
            digital experiences for a variety of clients.
          </p>

          <p>Here are a few technologies I’ve been working with recently:</p>
          <StyledTechStack>
            {skills && skills.map((skill) => <li key={skill}>{skill}</li>)}
          </StyledTechStack>
        </StyledParagraph>
        <StyledPortrait>
          <div className="wrapper">
            <StaticImage
              className="portrait"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['auto', 'webp', 'avif']}
              alt="Headshot"
            />
          </div>
        </StyledPortrait>
      </StyledContent>
    </StyledAboutSection>
  );
}

export default AboutSection;
