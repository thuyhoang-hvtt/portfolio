import React from 'react';
import { ThemeContext } from '@/contexts/theme';

export const useTheme = () => React.useContext(ThemeContext);
