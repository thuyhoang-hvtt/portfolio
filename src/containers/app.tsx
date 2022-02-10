import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ThemeContextProvider } from '@/contexts';
import { navigateToSection, targetExternalLinkToNewPage } from '@/utils';
import GlobalTheme from '@/components/layouts/theme';
import ConditionalRenderer from '@/components/conditional-renderer';
import AnimatedLoader from '@/components/animated-loader';
import Head from '@/components/head';
import Nav from '@/components/nav';
import Social from '@/components/social';
import Email from '@/components/email';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  overflow: overlay;
`;

function App({ location, children }) {
  const isHome = useMemo(() => location.pathname === '/', []);
  const [isLoading, setIsLoading] = useState(isHome);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      const targetId = location.hash.substring(1);
      setTimeout(() => navigateToSection(targetId), 0);
    }

    targetExternalLinkToNewPage();
  }, [isLoading]);

  return (
    <>
      <Head />
      <div className="app">
        <ThemeContextProvider>
          <GlobalTheme>
            <ConditionalRenderer
              condition={isLoading}
              caseTrue={<AnimatedLoader finishLoading={() => setIsLoading(false)} />}
              caseFalse={
                <StyledContent>
                  <Nav isHome={isHome} />
                  <Social isHome={isHome} />
                  <Email isHome={isHome} />
                  <div className="underground">{children}</div>
                </StyledContent>
              }
            />
          </GlobalTheme>
        </ThemeContextProvider>
      </div>
    </>
  );
}

export default App;
