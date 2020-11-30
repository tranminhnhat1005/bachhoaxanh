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

export default React.memo (TabHeader);
