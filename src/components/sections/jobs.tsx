/* eslint-disable react/no-danger */
import { graphql, useStaticQuery } from 'gatsby';
import { transparentize } from 'polished';
import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { KEY_CODES } from '@/constants';

const StyledJobsSection = styled.section`
  max-width: 700px;
`;

const StyledJobsContent = styled.div`
  display: flex;

  @media (max-width: 600px) {
    display: block;
  }

  // Prevent container from flicking
  @media (min-width: 700px) {
    min-height: 340px;
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }

      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }

    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }

      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px;
  border-left: 2px solid ${({ theme }) => theme.palette.onSurface};
  background-color: transparent;
  color: ${({ isActive, theme }) => (isActive ? theme.palette.primary : theme.palette.onSurface)};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }

  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 120px;
    padding 0 15px;
    border-left: 0;
    border-bottom: 2px solid ${({ theme }) => theme.palette.onSurface};
    text-align: center;
  }

  &:hover {
    background-color: ${({ theme }) => transparentize(0.8, theme.palette.primary)};
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: ${({ theme }) => theme.palette.primary};
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: var(--transition);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }

  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-md);
    color: ${({ theme }) => theme.palette.onSurface};
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${({ theme }) => theme.palette.primary};
      }
    }
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .title {
      color: ${({ theme }) => theme.palette.onBackground};
    }

    .company {
      color: ${({ theme }) => theme.palette.primary};
    }
  }

  .range {
    margin-bottom: 25px;
    color: ${({ theme }) => theme.palette.onSurface};
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .stack {
    font-size: var(--fz-md);
    color: ${({ theme }) => theme.palette.onSurface};
    font-style: italic;
    font-weight: 700;
  }
`;

function JobsSection() {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            html
            headings {
              depth
              value
            }
            frontmatter {
              title
              company
              location
              stack
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const { sr, srConfig } = useScrollReveal();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end {
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  useEffect(() => focusTab(), [tabFocus]);

  const onKeyDown = (e) => {
    e.preventDefault();
    switch (e.key) {
      case KEY_CODES.ARROW_DOWN: {
        setTabFocus((currentFocus) => currentFocus + 1);
        break;
      }
      case KEY_CODES.ARROW_UP: {
        setTabFocus((currentFocus) => currentFocus - 1);
        break;
      }
      default:
        break;
    }
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Where I&lsquo;ve Worked</h2>

      <StyledJobsContent>
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={onKeyDown}>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { company } = node.frontmatter;
              return (
                <StyledTabButton
                  key={company}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  // eslint-disable-next-line no-return-assign
                  ref={(el) => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i}
                  aria-controls={`panel-${i}`}
                >
                  {company}
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, url, company, stack, range } = frontmatter;

              return (
                <CSSTransition
                  key={company}
                  in={activeTabId === i}
                  timeout={250}
                  classNames="fadeup"
                >
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}
                  >
                    <h3>
                      <span className="title">{title}</span>
                      <span className="company">
                        &nbsp;@&nbsp;
                        <a href={url} className="inline-link">
                          {company}
                        </a>
                      </span>
                    </h3>

                    <p className="range">{range}</p>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                    <span className="stack">Tech Stack: {stack}</span>
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </StyledJobsContent>
    </StyledJobsSection>
  );
}

export default JobsSection;
