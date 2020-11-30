/** @jsx jsx */
import {jsx} from '@emotion/core';
import propTypes from 'prop-types';
import React, {useRef} from 'react';
import {emphasize} from '../../styles/colorManipulator';
import {white, dark6, dark4, brand, blue13, blue4} from './colors';
import Ripple from './ripple-effect';

const ButtonBase = React.forwardRef (function ButtonBase (props, ref) {
  const {
    action,
    backgroundColor = white,
    backgroundColorDisabled = white,
    backgroundColorFocus = blue4,
    backgroundColorHover = blue13,
    border = false,
    buttonRef: buttonRefProp,
    children,
    color = dark6,
    colorDisabled = dark4,
    colorHover = brand,
    colorFocus = brand,
    disabled = false,
    onBlur,
    onClick,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    onDragLeave,
    tabIndex = 0,
    style,
    ...other
  } = props;

  const buttonRef = useRef (null);

  return (
    <button
      disabled={disabled}
      css={{
        alignItems: 'center',
        backgroundColor: backgroundColor,
        border: border ? 'solid 1.5px currentColor' : '0',
        borderRadius: '4px',
        boxShadow: 'none',
        boxSizing: 'border-box',
        color: color,
        cursor: 'pointer',
        display: 'inline-flex',
        fontFamily: 'sans-serif',
        fontSize: '14px',
        fontWeight: '700',
        justifyContent: 'center',
        letterSpacing: '0.02857em',
        lineHeight: '1.75',
        margin: '0',
        minWidth: '120px',
        minHeight: '40px',
        MozAppearance: 'none',
        outline: '0',
        overflow: 'hidden',
        padding: '6px 16px',
        pointerEvents: 'auto',
        position: 'relative',
        textDecoration: 'none',
        textRendering: 'auto',
        textTransform: 'uppercase',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        userSelect: 'none',
        verticalAlign: 'middle',
        WebkitTapHighlightColor: 'transparent',
        WebkitAppearance: 'none',
        WebkitWritingMode: 'horizontal-tb !important',
        whiteSpace: 'nowrap',
        '&:disabled': {
          backgroundColor: backgroundColorDisabled,
          color: colorDisabled,
          cursor: 'default',
          pointerEvents: 'none',
        },
        '&:hover': {
          backgroundColor: backgroundColorHover,
          color: colorHover ? colorHover : emphasize (color),
        },
        '&:focus': {
          backgroundColor: backgroundColorFocus,
          color: colorFocus,
        },
        ...style,
      }}
      onBlur={onBlur}
      onClick={onClick}
      onFocus={onFocus}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onDragLeave={onDragLeave}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
      ref={buttonRef}
      tabIndex={disabled ? -1 : tabIndex}
      style={style}
      {...other}
    >
      <Ripple color={emphasize (backgroundColorFocus)} />
      {children}
    </button>
  );
});

ButtonBase.propTypes = {
  /**
   * The content of the component.
   */
  children: propTypes.node,
  /**
   * If `true`, the base button will be disabled.
   */
  disabled: propTypes.bool,
  /**
   * @ignore
   */
  href: propTypes.string,
  /**
   * @ignore
   */
  onBlur: propTypes.func,
  /**
   * @ignore
   */
  onClick: propTypes.func,
  /**
   * @ignore
   */
  onDragLeave: propTypes.func,
  /**
   * @ignore
   */
  onFocus: propTypes.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: propTypes.func,
  /**
   * @ignore
   */
  onKeyDown: propTypes.func,
  /**
   * @ignore
   */
  onKeyUp: propTypes.func,
  /**
   * @ignore
   */
  onMouseDown: propTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: propTypes.func,
  /**
   * @ignore
   */
  onMouseUp: propTypes.func,
  /**
   * @ignore
   */
  onTouchEnd: propTypes.func,
  /**
   * @ignore
   */
  onTouchMove: propTypes.func,
  /**
   * @ignore
   */
  onTouchStart: propTypes.func,
  /**
   * @ignore
   */
  tabIndex: propTypes.oneOfType ([propTypes.number, propTypes.string]),
};

export default React.memo (ButtonBase);
