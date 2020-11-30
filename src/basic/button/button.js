/**@jsx jsx */
import React from 'react';
import ButtonBase from './button-base';
import StartIcon from './startIcon';
import EndIcon from './endIcon';
import {jsx} from '@emotion/core';

const Button = React.forwardRef (function Button (props, ref) {
  const {
    backgroundColor,
    border,
    children,
    component = 'button',
    color,
    disabled = false,
    endIcon: endIconProp,
    iconSize = 'large',
    iconStyle,
    labelStyle,
    startIcon: startIconProp,
    style,
    ...other
  } = props;

  return (
    <ButtonBase
      backgroundColor={backgroundColor}
      border={border}
      color={color}
      component={component}
      css={{
        boxSizing: 'border-box',
        minWidth: '120px',
        minHeight: '40px',
        padding: '6px 16px',
        ...style,
      }}
      disabled={disabled}
      ref={ref}
      {...other}
    >
      <span
        css={{
          alignItems: 'inherit',
          boxSizing: 'inherit',
          display: 'inherit',
          justifyContent: 'inherit',
          width: '100%',
          ...labelStyle,
        }}
      >
        {startIconProp &&
          <StartIcon
            startIconProp={startIconProp}
            iconSize={iconSize}
            iconStyle={iconStyle}
          />}
        {children}
        {endIconProp &&
          <EndIcon
            endIconProp={endIconProp}
            iconSize={iconSize}
            iconStyle={iconStyle}
          />}
      </span>
    </ButtonBase>
  );
});

export default Button;
