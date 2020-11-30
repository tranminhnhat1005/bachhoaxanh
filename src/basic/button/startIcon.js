import React from 'react';
import capitalize from '../../utils/Diginet-Core-UI/capitalize';

const StartIcon = React.forwardRef ((props, ref) => {
  const {startIconProp, iconSize, iconStyle, ...other} = props;
  const styles = {
    startIconSmall: {
      display: 'inherit',
      fontSize: '16px',
      marginLeft: '-2px',
      marginRight: '8px',
    },
    startIconMedium: {
      display: 'inherit',
      fontSize: '20px',
      marginLeft: '-4px',
      marginRight: '8px',
    },
    startIconLarge: {
      display: 'inherit',
      fontSize: '24px',
      marginLeft: '-4px',
      marginRight: '8px',
    },
  };
  return (
    <span
      {...other}
      ref={ref}
      style={{...styles[`startIcon${capitalize (iconSize)}`], ...iconStyle}}
    >
      {startIconProp}
    </span>
  );
});

export default React.memo (StartIcon);
