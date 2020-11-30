import {keyframes} from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

/**keyframes */
const keyframeStart = keyframes`
    from {
        max-height: 0;
        opacity: 0;
    }
    to {
        max-height: 20px;
        opacity: 1;
    }
`;
const keyframeProgressLinearMovement = keyframes`
    0% {
        left: -100%;
    }
    50% {
        left: 100%;
    }
    100% {
        left: 100%;
    }
`;

/**components */
const LinearProgress = styled.div`
    animation: ${props => props.keyframeStart} 0.3s ease-in;
    background-color: ${props => props.background};
    border-radius: 4px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
    height: ${props => props.height}px;
    overflow: ${props => props.overflow};
    position: relative;
    width: 100%;
`;
const FirstBar = styled.div`
    animation: ${props => props.keyframeProgressLinearMovement} 3s infinite;
    background: ${props => props.color};
    border-radius: 4px;
    bottom: 0;
    left: 0;
    position: absolute;
    transition: -webkit-transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
    top: 0;
    width: ${props => props.width}%;
    -webkit-transition: -webkit-transform 0.3s ease-in-out;
    -webkit-animation: ${props => props.keyframeProgressLinearMovement} 3s infinite;
    
`;
const SecondBar = styled.div`
    animation-delay: 1.5s;
    animation: ${props => props.keyframeProgressLinearMovement} 3s infinite;
    background: ${props => props.color};
    border-radius: 4px;
    bottom: 0;
    left: -100%;
    position: absolute;
    transition: -webkit-transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
    top: 0;
    width: 100%;
    -webkit-transition: -webkit-transform 0.3s ease-in-out;
    -webkit-animation: ${props => props.keyframeProgressLinearMovement} 3s infinite;
    -webkit-animation-delay: 1.5s;
`;
const Value = styled.span`
    color: ${props => props.color};
    font-family: sans-serif;
    font-size: ${props => props.fontSize}px;
    font-weight: 400;
    left: ${props => props.left}%;
    line-height: ${props => props.fontSize * 1.19}px;
    position: absolute;
    transform: translate(-45%, 100%);
    user-select: none;
`;

export const Indeterminate = React.memo (
  React.forwardRef ((props, ref) => {
    const {background = '#EBECF2', color = '#0095FF', height = 8} = props;
    return (
      <LinearProgress
        ref={ref}
        background={background}
        height={height}
        keyframeStart={keyframeStart}
        overflow={'hidden'}
      >
        <FirstBar
          color={color}
          keyframeProgressLinearMovement={keyframeProgressLinearMovement}
          width={100}
        />
        <SecondBar
          color={color}
          keyframeProgressLinearMovement={keyframeProgressLinearMovement}
        />
      </LinearProgress>
    );
  })
);

export const Determinate = React.memo (
  React.forwardRef ((props, ref) => {
    const {
      background = '#EBECF2',
      color = '#0095FF',
      height = 8,
      percent = 69,
      percentColor = '#7F828E',
    } = props;
    return (
      <LinearProgress
        ref={ref}
        background={background}
        height={height}
        keyframeStart={keyframeStart}
      >
        <FirstBar color={color} width={percent} />
        <Value color={percentColor} fontSize={height * 3 / 2} left={percent}>
          {percent}%
        </Value>
      </LinearProgress>
    );
  })
);

const Linear = props => {
  const {determinate = false, ...other} = props;
  return determinate
    ? <Determinate {...other} />
    : <Indeterminate {...other} />;
};

export default Linear;
