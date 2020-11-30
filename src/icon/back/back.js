import React from 'react';
import * as colors from '../../colors';

const Back = ({
  width = '1em',
  height = '1em',
  bgFill = colors.iconHover,
  pathFill = colors.fillPath,
  viewBox = '0 0 24 24',
  transition = 'all 0.33s ease-in-out',
  style,
}) => {
  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      fill={bgFill}
      style={style}
    >
      <g data-name="Group 57">
        <path data-name="Rectangle 23" fill="none" d="M0 0h24v24H0z" />
        <g data-name="Group 22" fillRule="evenodd">
          <path
            style={{transition: transition}}
            data-name="Path 20"
            d="M24 12.004a12 12 0 10-12 12 12.013 12.013 0 0012-12"
            fill={bgFill}
          />
          <path
            style={style}
            data-name="Path 21"
            d="M9.767 16.428l-3.434-3.6a1.158 1.158 0 01-.116-.181 1.194 1.194 0 01-.125-.194 1.178 1.178 0 010-.912 1.186 1.186 0 01.26-.39l3.6-3.6a1.202 1.202 0 011.7 1.7L10.1 10.804h6.7a1.2 1.2 0 110 2.4H10l1.5 1.571a1.2 1.2 0 11-1.736 1.657"
            fill={pathFill}
          />
        </g>
      </g>
    </svg>
  );
};

export default Back;
