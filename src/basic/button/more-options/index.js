/**@jsx jsx */
import {jsx, keyframes} from '@emotion/core';
import React, {useRef, useState} from 'react';
import useOnClickOutside from '../../../utils/useOnClickOutside';
import Button from '../button';
import Ripple from '../ripple-effect';

const show = keyframes`
  from{
    transform: scale(0);
    opacity:0;
    z-index:-1;
  }
  to{
    transform: scale(1);
    opacity: 1;
    z-index:2;
  }
`;

const Option = React.memo (
  React.forwardRef (function Option (props, ref) {
    const {
      i,
      index,
      onClickItem,
      backgroundColor = '#FFF',
      backgroundColorFocus = '#A2CFFF',
      backgroundColorHover = '#DFEFFF',
      color = '#000000',
      colorHover = '#AA3696',
      colorFocus = '#111D5E',
      style,
      ...other
    } = props;

    return (
      <li
        {...other}
        css={{
          backgroundColor: backgroundColor,
          boxSizing: 'border-box',
          color: '#000',
          cursor: 'pointer',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 400,
          outline: 'none',
          overflow: 'hidden',
          padding: '16px',
          position: 'relative',
          transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          WebkitTapHighlightColor: 'transparent',
          WebkitFontSmoothing: 'antialiased',
          '&:hover': {
            backgroundColor: backgroundColorHover,
            color: colorHover,
          },
          '&:focus': {
            backgroundColor: backgroundColorFocus,
            color: colorFocus,
          },
          ...style,
        }}
        ref={ref}
        tabIndex={0}
        onClick={onClickItem}
        key={index}
      >
        {i}
        <Ripple />
      </li>
    );
  })
);

const MoreOptions = React.memo (function MoreOptions (props) {
  const {
    backgroundColorHover = '#DFEFFF',
    backgroundColorFocus = '#A2CFFF',
    color = '#111D5E',
    endIconActive,
    endIconBase,
    startIcon,
    data,
    onClickItem = (index, i) => {
      console.log (index, i);
    },
    title = 'title',
    ...other
  } = props;

  const ref = useRef ();
  const childrenRef = useRef ();
  const [visible, setVisible] = useState (false);

  const toggleCLick = () => {
    setVisible (!visible);
    childrenRef.current.style.display = childrenRef.current.style.display !==
      'block'
      ? 'block'
      : 'none';
  };

  const onClickOutside = () => {
    setVisible (false);
    const parent = ref.current;
    // parent.childNodes[1] === [0]<Button />, [1]<div />
    const node = parent.childNodes[1];
    node.style.display = 'none';
  };

  useOnClickOutside (ref, () => onClickOutside ());

  return (
    <div style={{display: 'block'}} ref={ref}>
      <Button
        {...other}
        onClick={toggleCLick}
        backgroundColorHover={backgroundColorHover}
        backgroundColorFocus={backgroundColorFocus}
        border
        color={color}
        colorFocus={'#111D5E'}
        endIcon={visible ? endIconActive : endIconBase}
        iconSize={'large'}
        startIcon={startIcon}
      >
        {title}
      </Button>
      <div
        ref={childrenRef}
        css={{
          animation: `${show} .25s`,
          borderRadius: '4px',
          boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
          margin: '10px 0px 0px 0px',
          maxWidth: 'calc(100% -32px)',
          minHeight: '16px',
          minWidth: '120px',
          opacity: 1,
          outline: 0,
          overflowX: 'hidden',
          overflowY: 'auto',
          position: 'absolute',
          transform: 'scale(1)',
          zIndex: 2,
        }}
        style={{display: 'none'}}
      >
        <ul
          css={{
            display: 'block',
            boxSizing: 'inherit',
            flexDirection: 'column',
            listStyle: 'none',
            position: 'relative',
            margin: 0,
            outline: 0,
            padding: 0,
          }}
        >
          {data &&
            data.map ((i, index) => (
              <Option
                i={i}
                key={index}
                onClickItem={() => onClickItem (index, i)}
              />
            ))}
        </ul>
      </div>
    </div>
  );
});

export default MoreOptions;
