import React, { useEffect, useMemo, useState } from 'react';
import GlobalTheme from '@/components/layouts/theme';
import { ThemeContextProvider } from '@/contexts';
import { navigateToSection, targetExternalLinkToNewPage } from '@/utils';
import ConditionalRenderer from '@/components/conditional-renderer';
import AnimatedLoader from '@/components/animated-loader';
import Head from '@/components/head';

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
  }, []);

  return (
    <>
      <Head />
      <div className="app">
        <ThemeContextProvider>
          <GlobalTheme>
            <ConditionalRenderer
              condition={isLoading}
              caseTrue={<AnimatedLoader finishLoading={() => setIsLoading(false)} />}
              caseFalse={children}
            />
          </GlobalTheme>
        </ThemeContextProvider>
      </div>
    </>
  );
}

export default App;
