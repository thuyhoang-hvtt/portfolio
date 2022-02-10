import React from 'react';
import styled from 'styled-components';
import { ThemeMode } from '@/constants';
import { useTheme } from '@/hooks/useTheme';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
}

const Wrapper = styled.div`
  margin-bottom: 4px;

  .sky {
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    border-radius: ${(props) => 0.5 * props.height}px;
    margin: auto;
    position: relative;
    cursor: pointer;
    background-image: linear-gradient(aqua, skyblue);
    overflow: hidden;

    .notch {
      height: ${(props) => 0.9 * props.height}px;
      width: ${(props) => 0.9 * props.height}px;
      border-radius: 50%;
      background: yellow;
      position: absolute;
      top: 5%;
      left: 2.5%;
      box-shadow: 0 0 5px yellow;
      z-index: 1;
      transition: var(--transition);
    }

    .crater {
      background: burlywood;
      border-radius: 50%;
      position: absolute;
      opacity: 0;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4) inset;

      &:first-child {
        left: 5%;
        top: 15%;
        height: 15%;
        width: 40%;
        transform: rotate(-45deg);
      }

      &:last-child {
        right: 10%;
        top: 15%;
        height: 15%;
        width: 25%;
        transform: rotate(45deg);
      }
    }

    .sparkle {
      position: absolute;
      background: whitesmoke;
      border-radius: 50%;
      transition: var(--transition);

      &.sm {
        height: 5%;
        width: 25%;
        top: 50%;
        left: 60%;
      }

      &.md {
        height: 10%;
        width: 37.5%;
        top: 25%;
        left: 25%;
        z-index: 2;
      }

      &.lg {
        height: 15%;
        width: 50%;
        bottom: 20%;
        left: 25%;
      }
    }

    &.night {
      background-image: linear-gradient(midnightblue, rebeccapurple);

      .notch {
        background: whitesmoke;
        box-shadow: 0 0 5px whitesmoke;
        transform: translate(${(props) => props.height}px, 0);
      }

      .crater {
        opacity: 0.4;
      }

      .sparkle {
        background: lightgray;
        box-shadow: 0 0 10px 2px violet;

        &.sm {
          height: 10%;
          width: 5%;
          transform: translate(${(props) => -0.4 * props.height}px, 0);
        }

        &.sm:first-of-type {
          transform: translate(
            ${(props) => -0.8 * props.height}px,
            ${(props) => -0.1 * props.height}px
          );
        }

        &.md {
          height: 10%;
          width: 5%;
          transform: translate(${(props) => 0.1 * props.height}px, 0);
        }

        &.lg {
          height: 15%;
          width: 7.5%;
          transform: translate(${(props) => -0.1 * props.height}px, 0);
        }
      }
    }
  }
`;

function ThemeToggle(props: IProps) {
  const { className, width = 64, height = 32 } = props;
  const { mode, toggleTheme } = useTheme();

  return (
    <Wrapper className={className} width={width} height={height}>
      <button
        className={`sky ${mode === ThemeMode.Dark ? 'night' : 'sun'}`}
        onClick={toggleTheme}
        type="button"
      >
        <div className="notch">
          <div className="crater" />
          <div className="crater" />
        </div>
        <div>
          <div className="sparkle sm" />
          <div className="sparkle sm" />
          <div className="sparkle md" />
          <div className="sparkle lg" />
        </div>
      </button>
    </Wrapper>
  );
}

export default ThemeToggle;
