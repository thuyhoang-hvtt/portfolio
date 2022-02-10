import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'gatsby';
import { transparentize } from 'polished';
import { navLinks } from '@/configs';
import { LOADER_DELAY } from '@/constants';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollDirection } from '@/hooks/useScrollDirection';

import { IconLogo } from './icons';
import Menu from './menu';
import ThemeToggle from './theme-toggle';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  padding: 0 50px;
  top: 0;
  z-index: 11;
  width: 100%;
  height: var(--nav-height);
  background-color: ${({ theme }) => theme.palette.background};
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(10px);
  transition: var(--transition);

  @media (max-with: 1080px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${(props) =>
      props.scrollDirection === 'up' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background: linear-gradient(
          90deg,
          ${({ theme }) => transparentize(0.2, theme.palette.background)} 0%,
          ${({ theme }) => transparentize(0.8, theme.palette.background)} 98%,
          ${({ theme }) => transparentize(1, theme.palette.background)} 100%
        );
        box-shadow: 0 10px 30px -10px ${({ theme }) => transparentize(0.85, theme.palette.background)};
      `};

    ${(props) =>
      props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px ${({ theme }) => transparentize(0.85, theme.palette.background)};
      `};
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  color: ${({ theme }) => theme.palette.onSurface};
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      width: 42px;
      height: 42px;

      &:hover,
      &:focus {
        svg#logo {
          fill: ${({ theme }) => transparentize(0.85, theme.palette.primary)};
        }
      }

      svg#logo {
        color: ${({ theme }) => theme.palette.primary} !important;
        fill: none;
        transition: var(--transition);
        user-select: none;
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        padding: 10px;
        color: ${({ theme }) => theme.palette.onBackground};

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: ${({ theme }) => theme.palette.primary};
          font-size: var(--fz--xxs);
          text-align: right;
        }
      }
    }
  }

  .resume-button {
    margin-left: 15px;
    font-size: var(--fz-xs);
  }
`;

interface IProps {
  isHome: boolean;
}

function Nav({ isHome }: IProps) {
  const scrollDirection = useScrollDirection('down');
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isMounted, setIsMounted] = useState(!isHome);
  const [scrolledToTop, setScrolledToTop] = useState(true);

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    window.addEventListener('scroll', handleScroll);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? LOADER_DELAY : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';

  const Logo = (
    <div className="logo" tabIndex={-1}>
      {isHome ? (
        <a href="/" aria-label="home">
          <IconLogo />
        </a>
      ) : (
        <Link to="/" aria-label="home">
          <IconLogo />
        </Link>
      )}
    </div>
  );

  const ResumeLink = (
    <a
      className="button button-xs resume-button"
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      Resume
    </a>
  );

  const ThemeToggler = <ThemeToggle className="theme-toggle" />;

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        {prefersReducedMotion ? (
          <>
            {Logo}
            <StyledLinks>
              <ol>
                {navLinks &&
                  navLinks.map(({ url, name }) => (
                    <li key={name}>
                      <Link to={url}>{name}</Link>
                    </li>
                  ))}
              </ol>
              <div>{ResumeLink}</div>
            </StyledLinks>
            <Menu />
          </>
        ) : (
          <>
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  {Logo}
                </CSSTransition>
              )}
            </TransitionGroup>
            <StyledLinks>
              <ol>
                <TransitionGroup component={null}>
                  {isMounted &&
                    navLinks &&
                    navLinks.map(({ url, name }, i) => (
                      <CSSTransition key={name} classNames={fadeDownClass} timeout={timeout}>
                        <li key={name} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                          <Link to={url}>{name}</Link>
                        </li>
                      </CSSTransition>
                    ))}
                </TransitionGroup>

                <TransitionGroup component={null}>
                  {isMounted && (
                    <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                      <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                        {ThemeToggler}
                      </div>
                    </CSSTransition>
                  )}
                </TransitionGroup>
              </ol>
            </StyledLinks>
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <Menu />
                </CSSTransition>
              )}
            </TransitionGroup>
          </>
        )}
      </StyledNav>
    </StyledHeader>
  );
}

export default Nav;
