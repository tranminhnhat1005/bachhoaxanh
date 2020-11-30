import React from 'react';
import Button from '../button';
import * as colors from '../colors';

const Outline = ({
  disabled,
  children,
  endIcon,
  startIcon,
  backgroundColor = colors.white,
  backgroundColorHover = colors.blue13,
  backgroundColorDisabled = colors.dark12,
  backgroundColorFocus = colors.blue4,
  color = colors.brand,
  colorDisabled = colors.dark4,
  colorFocus = colors.brand,
  colorHover = colors.brand,
  style,
  ...other
}) => {
  return (
    <Button
      {...other}
      border={true}
      children={children}
      endIcon={endIcon}
      startIcon={startIcon}
      style={style}
      disabled={disabled}
      backgroundColor={backgroundColor}
      backgroundColorDisabled={backgroundColorDisabled}
      backgroundColorHover={backgroundColorHover}
      backgroundColorFocus={backgroundColorFocus}
      color={color}
      colorDisabled={colorDisabled}
      colorFocus={colorFocus}
      colorHover={colorHover}
    />
  );
};

export default Outline;
