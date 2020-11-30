import React from 'react';
import Button from '../button';
import * as colors from '../colors';

const FilledSuccess = ({
  disabled,
  children,
  endIcon,
  startIcon,
  backgroundColor = colors.success5,
  backgroundColorDisabled = colors.dark12,
  backgroundColorHover = colors.success6,
  backgroundColorFocus = colors.success7,
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
      disabled={disabled}
      endIcon={endIcon}
      startIcon={startIcon}
      style={style}
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

export default FilledSuccess;
