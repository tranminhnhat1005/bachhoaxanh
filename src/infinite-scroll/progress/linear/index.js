import React, {useEffect} from 'react';
import animation from 'c:/Users/ADMIN/diginet-core-ui/src/utils/animation';

const IndeterminateLinear = ({loading, bgColor, color, style}) => {
  useEffect (
    () => {
      if (loading) {
        animation ({
          targets: '.linear-progress-animation .el',
          width: '80%',
          left: '100%',
          easing: 'easeInOutQuad',
          loop: true,
          duration: 800,
        });
      }
    },
    [loading]
  );

  return (
    <div
      className={'linear-progress-animation'}
      style={{
        ...style,
        position: 'absolute',
        width: '100%',
        overflow: 'hidden',
        height: 4,
        display: loading ? 'flex' : 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        color: color,
        backgroundColor: bgColor,
        // boxShadow: '1px 1px 3px 3px #ccc',
        // WebkitBoxShadow: '1px 1px 3px 3px rgba(0, 0, 0, 0.3)',
        // MozBoxShadow: '1px 1px 3px 3px #ccc',
      }}
    >
      <div
        className={'el'}
        style={{
          position: 'absolute',
          left: '-110%',
          width: '10px',
          height: '4px',
          backgroundColor: 'currentColor',
        }}
      />
    </div>
  );
};

export const DeterminateLinear = ({
  loading,
  bgColor,
  color,
  value = 0,
  style,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          height: 20,
          borderRadius: 4,
          color: color,
          backgroundColor: bgColor,
          // boxShadow: '1px 1px 3px 3px #ccc',
          // WebkitBoxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.25)',
          // MozBoxShadow: '1px 1px 3px 3px #ccc',
          // position: 'relative',
          width: 'auto',
          ...style,
          display: loading ? 'flex' : 'none',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 4,
            position: 'relative',
            backgroundColor: 'currentColor',
            ...style,
            width: `${Math.max (Math.min (value - 0.5, 100), 0.2)}%`,
            transition: `all ${value <= 50 ? 0.4 : 0.6}s linear`,
          }}
        />
      </div>
      <span
        style={{
          position: 'relative',
          fontFamily: 'sans-serif',
          fontSize: 12,
          fontWeight: 400,
          left: `${Math.max (Math.min (value - 0.5, 98), 0.2)}%`,
          transition: `all ${value <= 50 ? 0.4 : 0.6}s linear`,
        }}
      >
        {Math.max (Math.min (value, 100), 0)}%
      </span>
    </div>
  );
};

const LinearProgress = React.forwardRef (function LinearProgress (props, ref) {
  const {
    bgColor = '#EBECF2',
    color = '#0095FF',
    loading = true,
    determinate = false,
    value,
    style,
    ...other
  } = props;

  return loading
    ? determinate
        ? <DeterminateLinear
            {...other}
            loading={loading}
            value={value}
            bgColor={bgColor}
            color={color}
            style={style}
          />
        : <IndeterminateLinear
            {...other}
            loading={loading}
            bgColor={bgColor}
            color={color}
          />
    : null;
});

export default LinearProgress;
