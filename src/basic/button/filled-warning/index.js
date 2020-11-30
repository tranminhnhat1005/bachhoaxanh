import React from 'react';
import Button from '../button';
import * as colors from '../colors';

const FilledWarning = ({
  disabled,
  children,
  endIcon,
  startIcon,
  backgroundColor = colors.warning5,
  backgroundColorDisabled = colors.dark12,
  backgroundColorHover = colors.warning6,
  backgroundColorFocus = colors.warning7,
  color = colors.white,
  colorHover = colors.white,
  colorDisabled = colors.dark4,
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
      endIcon={endIcon}
      startIcon={startIcon}
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

export default FilledWarning;
