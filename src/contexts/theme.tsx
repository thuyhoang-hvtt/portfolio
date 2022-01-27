import React from 'react';
import { ThemeMode } from '@/constants';
import { IThemeContext } from '@/types';
import { isDay } from '@/utils';

export const ThemeContext = React.createContext<IThemeContext>(null);

export function ThemeContextProvider({ children }) {
  const defaultMode = React.useMemo(() => (isDay() ? ThemeMode.Light : ThemeMode.Dark), []);
  const [theme, setTheme] = React.useState(defaultMode);

  const toggleTheme = React.useCallback(() => {
    setTheme((current) => (current === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark));
  }, [setTheme]);

  const context = React.useMemo(
    () => ({ mode: theme, toggleTheme } as IThemeContext),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
}
