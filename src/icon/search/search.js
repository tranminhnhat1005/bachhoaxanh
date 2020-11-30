import React from 'react';
import * as colors from '../../colors';

const Search = ({
  width = '100%',
  height = '100%',
  bgFill = '#fff',
  pathFill = colors.iconDefault,
  viewBox = '0 0 24 24',
  transition,
}) => {
  const style = {
    transition: transition,
  };
  return (
    <svg viewBox={viewBox} width={width} height={height} fill={bgFill} style={style}>
      <g data-name="Group 40">
        <path data-name="Rectangle 8" fill={bgFill} d="M0 0h24v24H0z" />
        <g data-name="Group 6">
          <path
            style={style}
            data-name="Path 6"
            d="M21.688 20.2l-4.933-4.949a7.856 7.856 0 00.227-10.1 8.385 8.385 0 00-4.643-2.925 8.626 8.626 0 00-5.517.526A8.226 8.226 0 002.86 6.5a7.819 7.819 0 00-.661 5.316 8.032 8.032 0 002.929 4.545 8.589 8.589 0 0010.019.313l4.964 4.987a1.094 1.094 0 00.349.243 1.125 1.125 0 00.843.023 1.1 1.1 0 00.363-.223 1.066 1.066 0 00.245-.341 1.023 1.023 0 00.009-.814 1.061 1.061 0 00-.238-.346zM10.363 4.1a6.336 6.336 0 013.433 1 6.017 6.017 0 012.276 2.677 5.778 5.778 0 01.353 3.447 5.9 5.9 0 01-1.69 3.056 6.246 6.246 0 01-3.163 1.634A6.379 6.379 0 018 15.578a6.137 6.137 0 01-2.773-2.2A5.8 5.8 0 016 5.85a6.3 6.3 0 014.363-1.75z"
            fill={pathFill}
          />
        </g>
      </g>
    </svg>
  );
};
export default Search;
