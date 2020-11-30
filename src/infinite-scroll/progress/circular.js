import {keyframes} from '@emotion/core';
import styled from '@emotion/styled';
import React, {useEffect, useRef} from 'react';

export const Determinate = React.memo (
  React.forwardRef ((props, ref) => {
    const {
      background = '#EBECF2',
      color = '#0095FF',
      percent = 25,
      percentColor = '#7F828E',
      size = 'medium',
      ...other
    } = props;
    let rect, strokeWidth, fontSize;
    switch (size) {
      case 'large':
        fontSize = 40;
        rect = 152;
        strokeWidth = 16;
        break;
      case 'medium':
        fontSize = 16;
        rect = 76;
        strokeWidth = 8;
        break;
      case 'small':
        fontSize = 12;
        rect = 38;
        strokeWidth = 4;
        break;
      default:
    }

    const radius = rect - strokeWidth * 2, circumference = radius * 2 * Math.PI;

    const svgRef = useRef ();
    useEffect (() => {
      const offset = circumference - percent / 100 * circumference;
      const circle = svgRef.current;
      circle.style.strokeDashoffset = offset;
    });
    return (
      <svg
        {...other}
        ref={ref}
        width={rect * 2}
        height={rect * 2}
        style={{position: 'relative'}}
      >
        <circle
          cx={rect}
          cy={rect}
          fill={'transparent'}
          r={radius}
          stroke={background}
          strokeWidth={strokeWidth}
        />
        <circle
          ref={svgRef}
          cx={rect}
          cy={rect}
          fill={'transparent'}
          r={radius}
          stroke={color}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap={'round'}
          strokeWidth={strokeWidth}
          style={{
            strokeDashoffset: circumference,
            transition: 'stroke-dashoffset 0.7s',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
        <text
          dominantBaseline="middle"
          fill={percentColor}
          fontSize={fontSize}
          style={{
            fontFamily: 'sans-serif',
            lineHeight: `${fontSize + 4}px`,
            userSelect: 'none',
          }}
          textAnchor="middle"
          x="50%"
          y="50%"
        >
          {percent}%
        </text>
      </svg>
    );
  })
);
// ==== Change color ====
// const keyframeColor = keyframes`
//     100%, 0%{
//         stroke: $red;
//     }
//     40%{
//         stroke: $blue;
//     }
//     66%{
//         stroke: $green;
//     }
//     80%, 90%{
//         stroke: $yellow;
//     }
// `;

export const Indeterminate = React.memo (
  React.forwardRef ((props, ref) => {
    const {
      background = '#EBECF2',
      color = '#0095FF',
      size = 'medium',
      ...other
    } = props;

    let rect, strokeWidth;
    switch (size) {
      case 'large':
        rect = 152;
        strokeWidth = 16;
        break;
      case 'medium':
        rect = 76;
        strokeWidth = 8;
        break;
      case 'small':
        rect = 38;
        strokeWidth = 4;
        break;
      default:
    }

    const radius = rect - strokeWidth * 2, radiusX10 = radius * 10;
    const keyframeRotate = keyframes`
    100%{
        transform: rotate(360deg);
    }
`;
    const keyframeDash = radiusX10 => keyframes`
    0%{
        stroke-dasharray: 1,${radiusX10};
        stroke-dashoffset: 0;
    }
    50%{
        stroke-dasharray: ${radiusX10 * 89 / 200},${radiusX10};
        stroke-dashoffset: -${radiusX10 * 35 / 200};
    }
    100%{
        stroke-dasharray: ${radiusX10 * 89 / 200},${radiusX10};
        stroke-dashoffset: -${radiusX10 * 124 / 200};
    }
`;
    const ElementSVG = styled.svg`
    animation: ${keyframeRotate} 2s linear infinite;
    position: relative;
`;

    const ElementCircle = styled.circle`
    stroke-dasharray: 10,${radiusX10};
    stroke-dashoffset: 0;
    animation: ${keyframeDash (radiusX10)} 2s ease-in-out infinite;
`;
    return (
      <ElementSVG ref={ref} {...other} width={rect * 2} height={rect * 2}>
        <circle
          color={color}
          fill={'transparent'}
          cx={rect}
          cy={rect}
          r={radius}
          stroke={background}
          strokeLinecap={'round'}
          strokeWidth={strokeWidth}
        />
        <ElementCircle
          color={color}
          fill={'transparent'}
          cx={rect}
          cy={rect}
          r={radius}
          stroke={color}
          strokeLinecap={'round'}
          strokeWidth={strokeWidth}
        />
      </ElementSVG>
    );
  })
);

const CircularProgress = props => {
  const {determinate = false, ...other} = props;
  return determinate
    ? <Determinate {...other} />
    : <Indeterminate {...other} />;
};

export default CircularProgress;
