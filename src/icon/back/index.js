import React, {useState} from 'react';
import * as colors from '../../colors';
import Back from './back';

const Icon = ({
  disabled, 
  width = 100, 
  bgFill = colors.iconHover,
  pathFill = colors.fillPath,
  bgFillHover = colors.fillHover,
  pathFillHover = colors.iconHover,
  transitionOfIcon,
  style,
}) => {
  const [state, setState] = useState ({
    bgFill: bgFill,
    pathFill: pathFill,
});
  return (
    <span
      disabled={disabled}
      style={{
        width: width,
        padding: 0,
        outline: 'none',
        ...style,
      }}
      onMouseEnter={() =>
        setState ({
          pathFill: pathFillHover,
          bgFill: bgFillHover,
        })}
      onMouseLeave={() =>
        setState ({
          pathFill: pathFill,
          bgFill: bgFill,
        })}
    >
      <Back
        transition={transitionOfIcon}
        width={width}
        height={width}
        viewBox={'0 0 24 24'}
        pathFill={disabled ? colors.iconDisabled : state.pathFill}
        bgFill={disabled ? colors.fillDisabled : state.bgFill}
      />
    </span>
  );
};

export default Icon;
