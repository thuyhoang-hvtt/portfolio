import { transparentize } from 'polished';
import { createGlobalStyle } from 'styled-components';
import transitions from './transitions';
import variables from './variables';
import fonts from './fonts';

export default createGlobalStyle`
  ${variables}
  ${transitions}
  ${fonts}

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: ${(props) => props.theme.palette.surface};
    color: ${(props) => transparentize(0.2, props.theme.palette.onSurface)};
  }

  /* Provide basic, default focus styles.*/
  :focus {
    outline: 2px dashed ${(props) => props.theme.palette.primary};
    outline-offset: 3px;
  }

  /*
    Remove default focus styles for mouse users ONLY if
    :focus-visible is supported on this platform.
  */
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0px;
  }

  /*
    Optionally: If :focus-visible is supported on this
    platform, provide enhanced focus styles for keyboard
    focus.
  */
  :focus-visible {
    outline: 2px dashed ${(props) => props.theme.palette.primary};
    outline-offset: 3px;
  }

  /* Scrollbar Styles */
  html {
    scrollbar-width: thin;
    scrollbar-color:
      ${(props) => props.theme.palette.onSurface}
      ${(props) => props.theme.palette.background};
  }
  body::-webkit-scrollbar {
    width: 12px;
  }
  body::-webkit-scrollbar-track {
    background: ${(props) => props.theme.palette.background};
  }
  body::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.palette.onSurface};
    border: 3px solid ${(props) => props.theme.palette.background};
    border-radius: 10px;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${(props) => props.theme.palette.background};
    color: ${(props) => props.theme.palette.onBackground};
    font-family: var(--font-sans);
    font-size: var(--fz-xl);
    line-height: 1.3;
    transition: background-color 0.3s ease, color 0.3s ease;

    @media (max-width: 480px) {
      font-size: var(--fz-lg);
    }

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      header {
        background-color: transparent;
      }

      #content > * {
        filter: blur(5px) brightness(0.7);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    padding: 200px 150px;

    @media (max-width: 1080px) {
      padding: 200px 100px;
    }
    @media (max-width: 768px) {
      padding: 150px 50px;
    }
    @media (max-width: 480px) {
      padding: 125px 25px;
    }

    &.fillHeight {
      padding: 0 150px;

      @media (max-width: 1080px) {
        padding: 0 100px;
      }
      @media (max-width: 768px) {
        padding: 0 50px;
      }
      @media (max-width: 480px) {
        padding: 0 25px;
      }
    }
  }

  section {
    margin: 0 auto;
    padding: 100px 0;
    max-width: 1000px;

    @media (max-width: 768px) {
      padding: 80px 0;
    }

    @media (max-width: 480px) {
      padding: 60px 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: ${(props) => transparentize(0.2, props.theme.palette.onSurface)};
    line-height: 1.1;
  }

  img,
  svg,
  .gatsby-image-wrapper {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;

    &.feather {
      fill: none;
    }
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus {
      color: ${(props) => props.theme.palette.primary};
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }

  input, textarea {
    border-radius: 0;
    outline: 0;

    &:focus {
      outline: 0;
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 15px 0;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > code {
      background-color:${(props) => props.theme.palette.surface};
      color: ${(props) => props.theme.palette.onBackground};
      font-size: var(--fz-sm);
      border-radius: var(--border-radius);
      padding: 0.3em 0.5em;
    }
  }

  ul {
    &.fancy-list {
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: var(--fz-lg);
      li {
        position: relative;
        padding-left: 30px;
        margin-bottom: 10px;
        &:before {
          content: '▹';
          position: absolute;
          left: 0;
          color: ${(props) => props.theme.palette.primary};
        }
      }
    }
  }

  blockquote {
    border-left-color: ${(props) => props.theme.palette.primary};
    border-left-style: solid;
    border-left-width: 1px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 1.5rem;

    p {
      font-style: italic;
      font-size: 24px;
    }
  }

  hr {
    background-color: ${(props) => props.theme.palette.surface};
    height: 1px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: 1rem;
  }

  code {
    font-family: var(--font-mono);
    font-size: var(--fz-md);
  }

  .button {
    color: ${(props) => props.theme.palette.primary};
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.palette.primary};
    border-radius: var(--border-radius);
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    padding: 1.25rem 1.75rem;

    &:hover,
    &:active {
      background-color: ${(props) => transparentize(0.9, props.theme.palette.primary)};
      outline: none;
    }
    &:after {
      display: none !important;
    }

    &.button-xs {
      padding: 0.75rem 1rem;
    }

    &.button-md {
      padding: 1.25rem 1.75rem;
    }

    &.button-lg {
      font-size: var(--fz-sm);
    }
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, var(--fz-heading));
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      color: ${(props) => props.theme.palette.primary};
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));
      font-weight: 400;

      @media (max-width: 480px) {
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: ${(props) => props.theme.palette.surface};

      @media (max-width: 1080px) {
        width: 200px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }

  .heading {
    margin: 0;

    &.heading-lg {
      font-size: clamp(40px, 8vw, 80px);
    }

    .heading-md {
      font-size: clamp(40px, 8vw, 60px);
    }
  }


  .list {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${(props) => props.theme.palette.primary};
      }
    }
  }

  .link {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    &:hover,
    &:active,
    &:focus {
      color: ${(props) => props.theme.palette.primary};
      outline: 0;
    }

    &.inline-link {
      display: inline-block;
      text-decoration: none;
      text-decoration-skip-ink: auto;
      position: relative;
      transition: var(--transition);
      color: ${(props) => props.theme.palette.primary};
      &:hover,
      &:focus,
      &:active {
        color: ${(props) => props.theme.palette.primary};
        outline: 0;
        &:after {
          width: 100%;
        }
        & > * {
          color: ${(props) => props.theme.palette.primary} !important;
          transition: var(--transition);
        }
      }
      &:after {
        content: '';
        display: block;
        width: 0;
        height: 1px;
        position: relative;
        bottom: 0.37em;
        background-color: ${(props) => props.theme.palette.primary};
        transition: var(--transition);
        opacity: 0.5;
      }
    }
  }
`;
