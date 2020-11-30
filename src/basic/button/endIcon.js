import React from 'react';
import capitalize from '../../utils/Diginet-Core-UI/capitalize';

const EndIcon = React.forwardRef (function endIcon (props, ref) {
  const {endIconProp, iconSize, iconStyle, ...other} = props;
  const styles = {
    endIconSmall: {
      display: 'inherit',
      fontSize: '16px',
      marginLeft: '8px',
      marginRight: '-2px',
    },
    endIconMedium: {
      display: 'inherit',
      fontSize: '20px',
      marginLeft: '8px',
      marginRight: '-4px',
    },
    endIconLarge: {
      display: 'inherit',
      fontSize: '24px',
      marginLeft: '8px',
      marginRight: '-4px',
    },
  };
  return (
    <span
      {...other}
      ref={ref}
      style={{...styles[`endIcon${capitalize (iconSize)}`], ...iconStyle}}
    >
      {endIconProp}
    </span>
  );
});

export default React.memo (EndIcon);
