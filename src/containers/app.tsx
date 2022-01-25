import React, { useEffect, useMemo, useState } from 'react';
import GlobalTheme from '@/components/layouts/theme';
import { ThemeContextProvider } from '@/contexts';
import { navigateToSection, targetExternalLinkToNewPage } from '@/utils';
import ConditionalRenderer from '@/components/conditional-renderer';
import AnimatedLoader from '@/components/animated-loader';

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
    <ThemeContextProvider>
      <GlobalTheme>
        <ConditionalRenderer
          condition={isLoading}
          caseTrue={<AnimatedLoader finishLoading={() => setIsLoading(false)} />}
          caseFalse={<div className="app">{children}</div>}
        />
      </GlobalTheme>
    </ThemeContextProvider>
  );
}

export default App;
