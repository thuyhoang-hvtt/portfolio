import React from 'react';
import styled from 'styled-components';
import ThemeToggle from '@/components/theme-toggle';

const StyledFace = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

function FaceSection() {
  return (
    <StyledFace>
      <p className="heading">Hi there, I&apos;m </p>
      <p className="heading heading-lg highlight">Thuy Hoang</p>
      <p className="heading heading-md">👻 Welcome to my cyber-world 👻</p>
      <ThemeToggle />
    </StyledFace>
  );
}

export default FaceSection;
