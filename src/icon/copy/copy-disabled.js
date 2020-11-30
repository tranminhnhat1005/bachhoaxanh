import React from 'react';
import * as colors from '../../colors';

const CopyDisabled = ({
  width = '100%',
  height = '100%',
  bgFill = '#fff',
  pathFill = colors.iconDisabled,
  viewBox = '0 0 24 24',
}) => (
  <svg viewBox={viewBox} width={width} height={height} fill={bgFill}>
    <g data-name="Group 45">
      <path data-name="Rectangle 13" fill={bgFill} d="M0 0h24v24H0z" />
      <g data-name="Group 11">
        <path
          data-name="Path 52"
          d="M9 12v1H5.667A.667.667 0 015 12.333V5.667A.667.667 0 015.667 5h6.666a.667.667 0 01.667.667V9h-1a3 3 0 00-3 3m9-3h-3V5.667A2.669 2.669 0 0012.333 3H5.667A2.669 2.669 0 003 5.667v6.666A2.669 2.669 0 005.667 15H9v3a3 3 0 003 3h6a3 3 0 003-3v-6a3 3 0 00-3-3"
          fill={pathFill}
          fillRule="evenodd"
        />
      </g>
    </g>
  </svg>
);

export default CopyDisabled;
