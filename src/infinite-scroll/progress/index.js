/**@jsx jsx */
import {jsx} from '@emotion/core';
import {forwardRef, memo} from 'react';
const Progress = memo (
  forwardRef ((props, ref) => {
    const {
      background = '#EBECF2',
      color = '#0095FF',
      progressColor = '#7F828E',
      progress = 69,
      size = 120,
      strokeWidth = 8,
      ...other
    } = props;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    return (
      <div
        {...other}
        ref={ref}
        css={{
          alignItems: 'center',
          //   backgroundColor: 'rgba(0, 0, 0, 0.45)',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <svg
          height={size}
          width={size}
          css={{
            position: 'relative',
            display: 'flex',
            margin: '0',
          }}
        >
          <circle
            fill={'none'}
            stroke={background}
            strokeWidth={strokeWidth}
            cx={center}
            cy={center}
            r={radius}
          />
          <circle
            fill={'none'}
            stroke={color}
            strokeLinecap={'round'}
            strokeDasharray={circumference}
            strokeWidth={strokeWidth}
            cx={center}
            cy={center}
            r={radius}
          />
        </svg>
        <span
          css={{
            color: progressColor,
            fontSize: '20px',
            fontWeight: '400',
            lineHeight: '24px',
            MozUserSelect: 'none',
            position: 'absolute',
            transform: `translateY(-${strokeWidth / 2}px)`,
            userSelect: 'none',
          }}
        >
          {progress}%
        </span>
      </div>
    );
  })
);

export default Progress;
