import React from 'react';
import GlobalTheme from '@/components/layouts/theme';
import { ThemeContextProvider } from '@/contexts';

function App({ children }) {
  return (
    <ThemeContextProvider>
      <GlobalTheme>
        <div className="app">{children}</div>
      </GlobalTheme>
    </ThemeContextProvider>
  );
}

export default App;
