import React from 'react';
import Button from '../button';
import * as colors from '../colors';

const GhostLight = ({
  disabled,
  children,
  backgroundColor = colors.white,
  backgroundColorHover = colors.blue13,
  backgroundColorDisabled = colors.white,
  backgroundColorFocus = colors.blue4,
  color = colors.dark6,
  colorDisabled = colors.dark4,
  colorHover = colors.brand,
  colorFocus = colors.brand,
  style,
  ...other
}) => {
  return (
    <Button
      {...other}
      children={children}
      style={style}
      disabled={disabled}
      backgroundColor={backgroundColor}
      backgroundColorDisabled={backgroundColorDisabled}
      backgroundColorHover={backgroundColorHover}
      backgroundColorFocus={backgroundColorFocus}
      color={color}
      colorDisabled={colorDisabled}
      colorHover={colorHover}
      colorFocus={colorFocus}
    />
  );
};

export default GhostLight;
