import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { github } from '@/configs';
import { Icon } from './icons';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledCredit = styled.div`
  color: ${({ theme }) => theme.palette.onSurface};
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;

  a {
    padding: 10px;
  }

  .github-stats {
    margin-top: 10px;

    & > span {
      display: inline-flex;
      align-items: center;
      margin: 0 7px;
    }

    svg {
      display: inline-block;
      margin-right: 5px;
      width: 14px;
      height: 14px;
    }
  }
`;

function Footer() {
  const [githubInfo, setGithubInfo] = useState({
    stars: null,
    forks: null,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    fetch(github.api)
      .then((response) => response.json())
      .then((json) => {
        const { stargazers_count: stars, forks_count: forks } = json;
        setGithubInfo({
          stars,
          forks,
        });
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <StyledFooter className="underground">
      <StyledCredit tabIndex="-1">
        <a href={github.repo}>
          <div>Redesigned &amp; Built by Thuy Hoang</div>

          <div className="github-stats">
            <span>
              <Icon name="Star" />
              <span>{githubInfo.stars?.toLocaleString() ?? '10,000'}</span>
            </span>
            <span>
              <Icon name="Fork" />
              <span>{githubInfo.forks?.toLocaleString() ?? '9,999'}</span>
            </span>
          </div>
        </a>
      </StyledCredit>
    </StyledFooter>
  );
}

export default Footer;
