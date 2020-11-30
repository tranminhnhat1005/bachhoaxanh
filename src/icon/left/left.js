import React from 'react';
import * as colors from '../../colors';

const Left = ({
  width = '1em',
  height = '1em',
  bgFill = 'none',
  pathFill = colors.iconDefault,
  viewBox = '0 0 24 24',
}) => {
  return (
    <svg viewBox={viewBox} width={width} height={height} fill={bgFill}>
      <g data-name="Group 13">
        <g
          data-name="Group 4"
          transform="translate(-120.348 -.242)"
          clipPath="url(#left_svg__a)"
        >
          <path
            data-name="Path 4"
            d="M128.348 12.057a1.066 1.066 0 01.071-.384 1 1 0 01.2-.325l5.431-5.813a.894.894 0 011.325 0 1.054 1.054 0 010 1.418l-4.769 5.1 4.769 5.1a1.008 1.008 0 01.2.325 1.072 1.072 0 010 .767 1.007 1.007 0 01-.2.325.933.933 0 01-.3.217.881.881 0 01-.717 0 .931.931 0 01-.3-.217l-5.431-5.813a1.007 1.007 0 01-.2-.325 1.066 1.066 0 01-.079-.375z"
            fill={pathFill}
          />
        </g>
      </g>
    </svg>
  );
};
export default Left;
