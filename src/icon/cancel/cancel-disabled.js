import React from 'react';
import * as colors from '../../colors';

const CancelDisabled = ({
  width = '1em',
  height = '1em',
  bgFill = 'none',
  pathFill = colors.iconDisabled,
  viewBox = '0 0 24 24',
}) => (
  <svg viewBox={viewBox} width={width} height={height} fill={bgFill}>
    <g id="Group_10" data-name="Group 10" transform="translate(-917.556 -528.778)">
      <rect id="Rectangle_31" data-name="Rectangle 31" width="24" height="24" transform="translate(917.556 528.778)" fill={bgFill}/>
      <path
          id="Path_26"
          data-name="Path 26"
          d="M13.7,2477.132,9.072,2472.5l4.631-4.632a1.661,1.661,0,1,0-2.349-2.348l-4.631,4.63-4.633-4.63a1.661,1.661,0,0,0-2.349,2.348l4.633,4.632-4.633,4.632a1.661,1.661,0,1,0,2.349,2.349l4.633-4.632,4.631,4.632a1.661,1.661,0,0,0,2.349-2.349Z"
          transform="translate(922.833 -1931.722)"
          fill={pathFill}
          fillRule="evenodd"/>
    </g>
  </svg>
);

export default CancelDisabled;
