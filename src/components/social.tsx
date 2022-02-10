import React from 'react';
import styled from 'styled-components';
import { socialMedia } from '@/configs';
import { Icon } from './icons';
import Side from './side';

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.palette.onBackground};
  }

  li {
    &:last-of-type {
      margin-bottom: 20px;
    }

    a {
      padding: 10px;

      &:hover,
      &:active {
        transform: translateY(-3px);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

interface IProps {
  isHome: boolean;
}

function Social({ isHome }: IProps) {
  return (
    <Side isHome={isHome} orientation="right">
      <StyledSocialList>
        {socialMedia &&
          socialMedia.map(({ url, name }) => (
            <li key={name}>
              <a href={url} aria-label={name} target="_blank" rel="noreferrer">
                <Icon name={name} />
              </a>
            </li>
          ))}
      </StyledSocialList>
    </Side>
  );
}

export default Social;
