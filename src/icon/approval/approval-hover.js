import React from 'react';
import * as colors from '../../colors';

const ApprovalHover = ({
  width = '1em',
  height = '1em',
  bgFill = 'none',
  pathFill = colors.uiSuccess,
  viewBox = '0 0 24 24',
}) => (
  <svg viewBox={viewBox} width={width} height={height} fill={bgFill}>
    <g data-name="Group 50">
      <path data-name="Rectangle 18" fill={bgFill} d="M0 0h24v24H0z" />
      <g data-name="Group 16">
        <path
          data-name="Path 14"
          d="M9.608 17.478a.958.958 0 01-.7-.3L4.26 12.223a.956.956 0 111.394-1.309l3.946 4.2 8.043-8.8a.956.956 0 111.413 1.289l-8.74 9.565a.955.955 0 01-.7.312z"
          fill={pathFill}
          fillRule="evenodd"
        />
      </g>
    </g>
  </svg>
);

export default ApprovalHover;
