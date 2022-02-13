import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Layout from '@/components/layouts';

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.palette.primary};
  font-family: var(--font-mono);
  font-size: clamp(100px, 25vw, 200px);
  line-height: 1;
`;

const StyledSubtitle = styled.h2`
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 400;
`;

const StyledHomeButton = styled(Link)`
  margin-top: 40px;
`;

function NotFoundPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout>
      <Helmet title="Page Not Found" />
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition timeout={500} className="fadeup">
            <StyledMain className="fillHeight">
              <StyledTitle>404</StyledTitle>
              <StyledSubtitle>Page Not Found</StyledSubtitle>
              <StyledHomeButton to="/">Go Home</StyledHomeButton>
            </StyledMain>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Layout>
  );
}

export default NotFoundPage;
