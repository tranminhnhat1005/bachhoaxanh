import React from 'react';
import * as colors from '../../colors';

const DownDisabled = ({
  width = '1em',
  height = '1em',
  bgFill = 'none',
  pathFill = colors.iconDisabled,
  viewBox = '0 0 24 24',
}) => (
  <svg viewBox={viewBox} width={width} height={height} fill={bgFill}>
    <defs>
      <clipPath id="Down_svg__a">
        <path
          data-name="Rectangle 1"
          transform="translate(6.242 88.462)"
          fill={bgFill}
          d="M0 0h13.63v7.304H0z"
        />
      </clipPath>
    </defs>
    <g data-name="Group 48">
      <path data-name="Rectangle 16" fill={bgFill} d="M0 0h24v24H0z" />
      <g data-name="Group 14">
        <g
          data-name="Group 1"
          transform="translate(-1.242 -80.462)"
          clipPath="url(#Down_svg__a)"
        >
          <path
            data-name="Path 10"
            d="M13.057 95.766a1.058 1.058 0 01-.384-.071 1 1 0 01-.325-.2l-5.813-5.434a.894.894 0 010-1.325 1.053 1.053 0 011.418 0l5.1 4.769 5.1-4.769a1.009 1.009 0 01.325-.2 1.068 1.068 0 01.767 0 1.009 1.009 0 01.325.2.936.936 0 01.217.3.881.881 0 010 .717.935.935 0 01-.217.3l-5.813 5.431a1.006 1.006 0 01-.325.2 1.058 1.058 0 01-.384.071z"
            fill={pathFill}
          />
        </g>
      </g>
    </g>
  </svg>
);

export default DownDisabled;
