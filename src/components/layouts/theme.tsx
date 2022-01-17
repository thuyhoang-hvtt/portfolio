import React from 'react';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, GlobalStyle, LightTheme } from '@/styles';
import { ThemeMode } from '@/constants';
import { useTheme } from '@/hooks/useTheme';

function GlobalTheme({ children }) {
  const { mode: themeMode } = useTheme();
  const theme = React.useMemo(
    () => (themeMode === ThemeMode.Light ? LightTheme : DarkTheme),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default GlobalTheme;
