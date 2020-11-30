import React, {useState} from 'react';
import * as colors from '../../colors';
import Edit from './edit';

const Icon = ({
  disabled, 
  width = 100, 
  pathFill = colors.iconDefault,
  pathFillHover = colors.uiInfo,
  transitionOfIcon = 'all 0.33s ease-in-out',
  style,
}) => {
  const [state, setState] = useState ({
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
      onMouseEnter={() => setState ({pathFill: pathFillHover})}
      onMouseLeave={() => setState ({pathFill: pathFill})}
    >
      <Edit
        transition={transitionOfIcon}
        width={width}
        height={width}
        viewBox={'0 0 24 24'}
        pathFill={disabled ? colors.iconDisabled : state.pathFill}
      />
    </span>
  );
};

export default Icon;
