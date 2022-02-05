import { ThemeMode } from '@/constants';

export interface IPalette {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  onBackground: string;
  onSurface: string;
  onPrimary: string;
  onSecondary: string;
}

export interface IBreakpoint {
  mobileS: 'max-width: 330px';
  mobileM: 'max-width: 400px';
  mobileL: 'max-width: 480px';
  tabletS: 'max-width: 600px';
  tabletM: 'max-width: 768px';
  tabletL: 'max-width: 900px';
  desktopS: 'max-width: 1080px';
  desktopM: 'max-width: 1200px';
  desktopL: 'max-width: 1400px';
}

export interface ITheme {
  mode: ThemeMode;
  palette: IPalette;
  breakpoint: IBreakpoint;
}

export interface IThemeContext {
  mode: ThemeMode;
  toggleTheme?: () => void;
}
