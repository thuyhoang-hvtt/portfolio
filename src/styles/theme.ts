import { ThemeMode } from '@/constants';
import { ITheme } from '@/types';
import { dark, light } from './palettes';
import { breakpoint } from './breakpoint';

export const DarkTheme: ITheme = {
  mode: ThemeMode.Dark,
  breakpoint,
  palette: dark,
};

export const LightTheme: ITheme = {
  mode: ThemeMode.Light,
  breakpoint,
  palette: light,
};
