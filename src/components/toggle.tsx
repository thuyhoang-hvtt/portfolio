import React from 'react';
import { useTheme } from '@/hooks/useTheme';

function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <>
      <h1 className="header header-lg link inline-link">H1</h1>
      <h2>H2</h2>
      <h3>H3</h3>
      <button className="button button-md" type="button" onClick={toggleTheme}>
        BUTTON
      </button>
    </>
  );
}

export default ThemeToggle;
