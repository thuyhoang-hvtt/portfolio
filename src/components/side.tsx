import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { LOADER_DELAY } from '@/constants';
import ConditionalRenderer from './conditional-renderer';

const StyledSideElement = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: ${(props) => (props.orientation === 'left' ? '40px' : 'auto')};
  right: ${(props) => (props.orientation === 'right' ? '40px' : 'auto')};
  z-index: 10;
  color: ${({ theme }) => theme.palette.onSurface};

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.palette.onSurface};
  }

  @media (max-width: 1080px) {
    left: ${(props) => (props.orientation === 'left' ? '20px' : 'auto')};
    right: ${(props) => (props.orientation === 'right' ? '20px' : 'auto')};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

interface IProps {
  isHome: boolean;
  orientation: 'left' | 'right';
  children?: React.ReactElement;
}

function Side({ isHome, orientation, children }: IProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isMounted, setIsMounted] = useState(!isHome);

  useEffect(() => {
    if (!isHome || prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), 100);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledSideElement orientation={orientation}>
      <ConditionalRenderer
        condition={prefersReducedMotion}
        caseTrue={children}
        caseFalse={
          <TransitionGroup component={null}>
            {isMounted && (
              <CSSTransition classNames={isHome ? 'fade' : ''} timeout={isHome ? LOADER_DELAY : 0}>
                {children}
              </CSSTransition>
            )}
          </TransitionGroup>
        }
      />
    </StyledSideElement>
  );
}

export default Side;
