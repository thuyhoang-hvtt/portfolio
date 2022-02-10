import React from 'react';
import styled from 'styled-components';
import { email } from '@/configs';
import Side from './side';

const StyledEmail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  a {
    margin: 20px auto;
    padding: 10px;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: var(--fz-lg);
    letter-spacing: 0.1em;
    writing-mode: vertical-rl;

    &:hover,
    &:focus {
      transform: translateY(-3px);
    }
  }
`;

interface IProps {
  isHome: boolean;
}

function Email({ isHome }: IProps) {
  return (
    <Side isHome={isHome} orientation="left">
      <StyledEmail>
        <a href={`mailto:${email}`}>{email}</a>
      </StyledEmail>
    </Side>
  );
}

export default Email;
