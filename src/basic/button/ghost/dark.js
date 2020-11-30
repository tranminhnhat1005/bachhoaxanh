import React from 'react';
import Button from '../button';
import * as colors from '../colors';

const GhostDark = ({
  disabled,
  children,
  backgroundColor = colors.brand,
  backgroundColorHover = '#3D4D9E',
  backgroundColorDisabled = colors.dark12,
  backgroundColorFocus = '#697CCE',
  color = colors.white,
  colorDisabled = colors.dark4,
  colorHover = colors.white,
  colorFocus = colors.white,
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

export default GhostDark;
