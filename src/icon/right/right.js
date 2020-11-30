import React from 'react';
import * as colors from '../../colors';

const Right = ({
  width = '1em',
  height = '1em',
  bgFill = 'none',
  pathFill = colors.iconDefault,
  viewBox = '0 0 24 24',
}) => {
  return (
    <svg viewBox={viewBox} width={width} height={height} fill={bgFill}>
      <g data-name="Group 49">
        <g data-name="Group 15">
          <g
            data-name="Group 2"
            transform="translate(-41.348 -80.242)"
            clipPath="url(#right_svg__a)"
          >
            <path
              data-name="Path 11"
              d="M56.652 92.058a1.058 1.058 0 01-.071.384 1 1 0 01-.2.325L50.95 98.58a.894.894 0 01-1.325 0 1.053 1.053 0 010-1.418l4.769-5.1-4.769-5.1a1.011 1.011 0 01-.2-.325 1.069 1.069 0 010-.767 1.01 1.01 0 01.2-.325.935.935 0 01.3-.217.88.88 0 01.717 0 .934.934 0 01.3.217l5.431 5.813a1 1 0 01.2.325 1.058 1.058 0 01.071.384z"
              fill={pathFill}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
export default Right;
