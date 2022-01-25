import React from 'react';

function Logo() {
  return (
    <svg
      id="logo"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100"
      height="100"
      className="icon icon-logo"
    >
      <title>Loader Logo</title>
      <g transform="translate(30.000000, 30.000000)">
        <path
          id="zerox"
          d="M8.402 25.28l3.105-3.212-3.86-5.209-4.915-6.954A19.904 19.904 0 0 0 0 20c0 6.1 2.732 11.562 7.04 15.23l6.239-4.408a12.796 12.796 0 0 1-4.877-5.541zM14.72 8.402l3.212 3.105 5.209-3.86 6.954-4.915A19.904 19.904 0 0 0 20 0C13.9 0 8.438 2.732 4.77 7.04l4.408 6.239a12.795 12.795 0 0 1 5.541-4.877zm13.773 9.53l3.86 5.209 4.915 6.954A19.904 19.904 0 0 0 40 20c0-6.1-2.732-11.562-7.04-15.23l-6.24 4.408a12.796 12.796 0 0 1 4.877 5.541l-3.105 3.213zM35.23 32.96l-4.408-6.239a12.795 12.795 0 0 1-5.541 4.877l-3.213-3.105-5.209 3.86-6.954 4.915A19.904 19.904 0 0 0 20 40c6.1 0 11.562-2.732 15.23-7.04z"
          fill="currentColor"
        />
      </g>
      <path
        id="border"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 50, 5
             L 11, 27
             L 11, 72
             L 50, 95
             L 89, 73
             L 89, 28 z"
      />
    </svg>
  );
}

export default Logo;
