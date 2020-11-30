import PropTypes from 'prop-types';
import React from 'react';

const TabHeader = props => {
  const {children, style, ...other} = props;
  return (
    <div
      style={{
        justifyContent: 'space-between',
        minWidth: 'max-content',
        width: '100%',
        height: 'max-content',
        display: 'flex',
        ...style,
      }}
      {...other}
    >
      {children}
    </div>
  );
};
TabHeader.PropTypes = {
  children: PropTypes.element.isRequired,
  style   : PropTypes.object,
};
export default React.memo (TabHeader);
