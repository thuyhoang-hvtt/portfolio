import React from 'react';
import { ThemeContextProvider } from '@/contexts';
import GlobalTheme from './theme';

function Layout({ children }) {
  return (
    <ThemeContextProvider>
      <GlobalTheme>{children}</GlobalTheme>
    </ThemeContextProvider>
  );
}

export default Layout;
