import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import lodash, { debounce, throttle } from 'lodash';
import { lighten, transparentize } from 'polished';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { KEY_CODES } from '@/constants';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { navLinks } from '@/configs';

const StyledMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledHamburgerButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 10;
    margin-right: -15px;
    padding: 15px;
    border: 0;
    background-color: transparent;
    color: inherit;
    text-transform: none;
    transition-timing-function: linear;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
  }

  .hamburger-box {
    display: inline-block;
    position: relative;
    width: var(--hamburger-width);
    height: 24px;
  }

  .hamburger-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: var(--hamburger-width);
    height: 2px;
    border-radius: var(--border-radius);
    background-color: ${(props) => props.theme.palette.primary};
    transition-duration: 0.22s;
    transition-property: transform;
    transition-delay: ${(props) => (props.menuOpen ? `0.12s` : `0s`)};
    transform: rotate(${(props) => (props.menuOpen ? `225deg` : `0deg`)});
    transition-timing-function: cubic-bezier(
      ${(props) => (props.menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
    );

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: auto;
      right: 0;
      width: var(--hamburger-width);
      height: 2px;
      border-radius: 4px;
      background-color: ${(props) => props.theme.palette.primary};
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;
    }

    &:before {
      width: ${(props) => (props.menuOpen ? `100%` : `120%`)};
      top: ${(props) => (props.menuOpen ? `0` : `-10px`)};
      opacity: ${(props) => (props.menuOpen ? 0 : 1)};
      transition: ${({ menuOpen }) =>
        menuOpen ? 'var(--ham-before-active)' : 'var(--ham-before)'};
    }

    &:after {
      width: ${(props) => (props.menuOpen ? `100%` : `80%`)};
      bottom: ${(props) => (props.menuOpen ? `0` : `-10px`)};
      transform: rotate(${(props) => (props.menuOpen ? `-90deg` : `0`)});
      transition: ${({ menuOpen }) => (menuOpen ? 'var(--ham-after-active)' : 'var(--ham-after)')};
    }
  }
`;

const StyledSidebar = styled.aside`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 50px 10px;
    width: min(75vw, 400px);
    height: 100vh;
    outline: 0;
    background-color: ${(props) => lighten(0.2, props.theme.palette.primary)};
    box-shadow: -10px 0px 30px -15px ${(props) => transparentize(0.85, props.theme.palette.primary)};
    z-index: 9;
    transform: translateX(${(props) => (props.menuOpen ? 0 : 100)}vw);
    visibility: ${(props) => (props.menuOpen ? 'visible' : 'hidden')};
    transition: var(--transition);
  }

  nav {
    display: flex;
    justify-content: flex-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    color: ${(props) => props.theme.palette.onPrimary};
    font-family: var(--font-mono);
    text-align: center;
  }

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      position: relative;
      margin: 0 auto 20px;
      counter-increment: item 1;
      font-size: clamp(var(--fz-sm), 4vw, var(--fz-lg));

      @media (max-width: 600px) {
        margin: 0 auto 10px;
      }

      &:before {
        content: '0' counter(item) '.';
        display: block;
        margin-bottom: 5px;
        color: ${(props) => props.theme.palette.primary};
        font-size: var(--fz-sm);
      }
    }

    a {
      width: 100%;
      padding: 3px 20px 20px;
    }
  }

  .resume-link {
    padding: 18px 50px;
    margin: 10% auto 0;
    width: max-content;
  }
`;

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const buttonRef = useRef(null);
  const navRef = useRef(null);

  const wrapperRef = useRef();
  useOnClickOutside(wrapperRef, () => setMenuOpen(false));

  let focusableMenuEls;
  let firstFocusableEl;
  let lastFocusableEl;

  const setFocusable = () => {
    focusableMenuEls = [buttonRef.current, ...Array.from(navRef.current.querySelectorAll('a'))];
    firstFocusableEl = lodash.first(focusableMenuEls);
    lastFocusableEl = lodash.last(focusableMenuEls);
  };

  const handleBackwardTab = (e) => {
    if (document.activeElement === firstFocusableEl) {
      e.preventDefault();
      lastFocusableEl.focus();
    }
  };

  const handleForwardTab = (e) => {
    if (document.activeElement === lastFocusableEl) {
      e.preventDefault();
      firstFocusableEl.focus();
    }
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11:
        setMenuOpen(false);
        break;
      case KEY_CODES.TAB: {
        if (focusableMenuEls && focusableMenuEls.length === 1) {
          e.preventDefault();
          break;
        }
        if (e.shiftKey) {
          handleBackwardTab(e);
        } else {
          handleForwardTab(e);
        }
        break;
      }
      default:
        break;
    }
  };

  const onResize = (e) => {
    if (e.currentTarget.innerWidth > 768) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const debouncedListener = debounce(onKeyDown, 300);
    const throttledListener = throttle(onResize, 300);
    document.addEventListener('keydown', debouncedListener);
    window.addEventListener('resize', throttledListener);

    setFocusable();

    return () => {
      document.removeEventListener('keydown', debouncedListener);
      window.removeEventListener('resize', throttledListener);
    };
  }, []);

  return (
    <StyledMenu>
      <Helmet>
        <body className={menuOpen ? 'blur' : ''} />
      </Helmet>

      <div ref={wrapperRef}>
        <StyledHamburgerButton
          ref={buttonRef}
          aria-label="Menu"
          menuOpen={menuOpen}
          onClick={toggleMenu}
        >
          <div className="hamburger-box">
            <div className="hamburger-box-inner" />
          </div>
        </StyledHamburgerButton>
      </div>
      <StyledSidebar menuOpen={menuOpen} aria-hidden={!menuOpen} tabIndex={menuOpen ? 1 : -1}>
        <nav ref={navRef}>
          {navLinks && (
            <ol>
              {navLinks.map(({ url, name }) => (
                <li key={name}>
                  <Link to={url} onClick={() => setMenuOpen(false)}>
                    {name}
                  </Link>
                </li>
              ))}
            </ol>
          )}

          <a className="button button-lg resume-link" href="/resume.pdf">
            Resume
          </a>
        </nav>
      </StyledSidebar>
    </StyledMenu>
  );
}

export default Menu;
