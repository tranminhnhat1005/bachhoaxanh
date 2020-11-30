/**@jsx jsx */
import {css, jsx} from '@emotion/core';
import PropTypes, {oneOf} from 'prop-types';
import React from 'react';
import Ripple from '../../button/ripple-effect';
import StartIcon from '../../button/startIcon';
const Tab = React.forwardRef ((props, ref) => {
  const {
    index,
    backgroundColor = 'transparent',
    backgroundColorActive = '#FFF',
    backgroundColorFocus = '#FFF',
    backgroundColorHover = '#FFF',
    children,
    color = 'inherit',
    colorActive = '#111D5E',
    colorHover = '#0095FF',
    colorFocus = '#111D5E',
    disabled = false,
    iconSize = 'small',
    iconStyle,
    icon: startIconProp,
    label,
    onClick,
    tabIndex = 0,
    ...other
  } = props;

  const TabButton = css`
    align-items: center;
    appearance: none;
    background-color: ${backgroundColor};
    border: 0;
    box-shadow: none;
    box-sizing: border-box;
    color: ${color};
    cursor: pointer;
    display: inline-flex;
    font-size: 14px;
    font-weight: 700;
    justify-content: center;
    line-height: 1.4285;
    margin: 0 2px;
    min-height: 40px;
    min-width: 36px;
    outline: none;
    overflow: hidden;
    padding: 6px 12px;
    pointer-events: auto;
    position: relative;
    text-decoration: none;
    text-rendering: auto;
    text-transform: uppercase;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    writing-mode: horizontal-tb !important;
    -webkit-tap-highlight-color: transparent;
    ::after {
        border-bottom: solid 4px;
        bottom: 0;
        content: '';
        left: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        transform: scaleX(0);
        transition: 0.2s ease-in-out;
    }
    ::before {
        border-bottom: solid 4px ${color === 'inherit' ? '#EBECF2' : color};
        bottom: 0;
        content: '\\00a0';
        left: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        transition: 0.2s ease-in-out;
    }
    :disabled {
        background-color: transparent;
        color: #AAACB4;
        cursor: default;
        pointer-events: none;
    }
    :focus {
        background-color: ${backgroundColorFocus};
        color: ${colorFocus};
        ::after {
            transform: scaleX(1);
        }
        ::before {
            border-bottom: solid 4px ${colorFocus};
        }
    }
    :hover:not(:focus):not(:disabled) {
      background-color: ${backgroundColorHover};
      color: ${colorHover};
      ::after {
          border-bottom: solid 4px ${colorHover};
          transform: scaleX(1);
      }
    }
    &.is-active {
      background-color: ${backgroundColorActive};
      color: ${colorActive};
      ::after {
          transform: scaleX(1);
      }
      ::before {
          border-bottom: solid 4px ${colorActive};
      }
    }
  `;

  return (
    <button
      className={'tab-button'}
      css={TabButton}
      disabled={disabled}
      id={`tab-button-${index}`}
      onClick={onClick}
      ref={ref}
      tabIndex={disabled ? -1 : tabIndex}
      {...other}
    >
      <Ripple />
      {startIconProp &&
        <StartIcon
          startIconProp={startIconProp}
          iconSize={iconSize}
          iconStyle={
            label ? iconStyle : {marginLeft: 0, marginRight: 0, ...iconStyle}
          }
        />}
      {label || children}
    </button>
  );
});
Tab.PropTypes = {
  backgroundColor      : PropTypes.string,
  backgroundColorActive: PropTypes.string,
  backgroundColorFocus : PropTypes.string,
  backgroundColorHover : PropTypes.string,
  color                : PropTypes.string,
  colorActive          : PropTypes.string,
  colorFocus           : PropTypes.string,
  colorHover           : PropTypes.string,
  disabled             : PropTypes.bool,
  iconSize             : oneOf[('large', 'small', 'medium')],
  iconStyle            : PropTypes.object,
  icon                 : PropTypes.element,
  index                : PropTypes.string,
  label                : PropTypes.string,
  onClick              : PropTypes.func.isRequired,
};
export default React.memo (Tab);
