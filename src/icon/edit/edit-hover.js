import React from 'react';
import * as colors from '../../colors';

const EditHover = ({
  width = '100%',
  height = '100%',
  bgFill = '#fff',
  pathFill = colors.uiInfo,
  viewBox = '0 0 24 24',
}) => (
  <svg viewBox={viewBox} width={width} height={height} fill={bgFill}>
    <g data-name="Group 55">
      <path data-name="Rectangle 21" fill={bgFill} d="M0 0h24v24H0z" />
      <g data-name="Group 19">
        <path
          data-name="Path 51"
          d="M16.556 10.508l-3.04-3.04 2.2-2.2 3.039 3.039zm3.818-3.768l-3.088-3.089a2.228 2.228 0 00-3.063-.077L4.075 13.719a2.227 2.227 0 00-.643 1.37L3 19.792a1.129 1.129 0 001.123 1.23c.035 0 .069 0 .1-.005l4.7-.427a2.233 2.233 0 001.369-.641L20.451 9.8a2.172 2.172 0 00-.077-3.061z"
          fill={pathFill}
          fillRule="evenodd"
        />
      </g>
    </g>
  </svg>
);

export default EditHover;
