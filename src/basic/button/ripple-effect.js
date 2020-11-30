import styled from '@emotion/styled';
import React, {useLayoutEffect, useState} from 'react';
const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
  useLayoutEffect (
    () => {
      if (rippleCount > 0) {
        const bounce = setTimeout (() => cleanUpFunction (), duration);
        return () => clearTimeout (bounce);
      }
      return undefined;
    },
    [rippleCount, duration, cleanUpFunction]
  );
};

const RippleContainer = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    opacity: 0.75;
    background-color: ${props => props.color};
    animation-name: ripple;
    animation-duration: ${props => props.duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;

const Ripple = ({duration = 850, color = '#fff'}) => {
  const [rippleArray, setRippleArray] = useState ([]);
  useDebouncedRippleCleanUp (rippleArray.length, duration, () => {
    setRippleArray ([]);
  });
  const addRipple = event => {
    const rippleContainer = event.currentTarget.getBoundingClientRect ();
    const size = rippleContainer.width > rippleContainer.height
      ? rippleContainer.width
      : rippleContainer.height;

    const x = event.pageX - rippleContainer.x - rippleContainer.width / 2;
    const y = event.pageY - rippleContainer.y - rippleContainer.width / 2;
    const newRippleArray = {
      x,
      y,
      size,
    };

    setRippleArray (prevState => [...prevState, newRippleArray]);
  };

  return (
    <RippleContainer duration={duration} color={color} onMouseDown={addRipple}>
      {rippleArray.length > 0 &&
        rippleArray.map ((ripple, index) => {
          return (
            <span
              key={'ripple_' + index}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          );
        })}
    </RippleContainer>
  );
};

export default React.memo (Ripple);
