import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import ConditionalRenderer from '../conditional-renderer';
import { LOADER_DELAY } from '@/constants';

const StyledFace = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  @media (max-height: 660px) {
    justify-content: flex-start;
    margin-top: var(--nav-height);
  }

  .greeting {
    margin: 0 0 30px 4px;
    color: ${({ theme }) => theme.palette.primary};
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  .guru {
    margin: 0;
  }

  .role {
    color: ${({ theme }) => theme.palette.onSurface};
    line-height: 0.9;
  }

  .highlight {
    color: ${({ theme }) => theme.palette.primary};
  }

  .description {
    max-width: 540px;
    margin-bottom: 10px;
  }

  .resume-button {
    padding: 18px 50px;
    margin: 10% auto 0;
    width: max-content;
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));

    svg {
      margin-left: 4px;
      width: clamp(var(--fz-md), 5vw, var(--fz-xl));
      height: clamp(var(--fz-md), 5vw, var(--fz-xl));
      fill: ${({ theme }) => theme.palette.primary};
    }

    &:hover {
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
  }
`;

function FaceSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true));

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeout);
  }, []);

  const items = [
    <p className="greeting">Hi, my name is</p>,
    <p className="heading heading-lg guru">Thuy Hoang.</p>,
    <p className="heading heading-lg role">
      I pursue <i>art</i> inspired by <span className="highlight">programing language.</span>
    </p>,
    <p className="description">
      I&apos;m a software engineer specializing in building exceptional digital experiences for not
      only customers but also developers.
    </p>,
    <a
      className="button button-xs resume-button"
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      Check out my resume!
    </a>,
  ];

  const keys = ['greeting', 'guru', 'role', 'description', 'resume'];

  return (
    <StyledFace>
      <ConditionalRenderer
        condition={prefersReducedMotion}
        caseTrue={
          <>
            {items.map((item, i) => (
              <div key={keys[i]}>{item}</div>
            ))}
          </>
        }
        caseFalse={
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={keys[i]} classNames="fadeup" timeout={LOADER_DELAY}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        }
      />
    </StyledFace>
  );
}

export default FaceSection;
