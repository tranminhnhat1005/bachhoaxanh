import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import {makePlacements} from '../utils/placements';
import renderPlacement from './render-placement.absolute';
import useOverlay from './useOverlay';

import withCheatTargetNode from './withCheatTargetNode';

const mPlacements = makePlacements ('fui-overlay');

const Overlay = ({
  className,
  overlayClass,
  children,
  arrow,
  overlay,
  targetNode,
  ...otherProps
}) => {
  const {visible, overlayStyle, overlayRef} = useOverlay (
    otherProps,
    targetNode,
    renderPlacement
  );

  return (
    <div className={cn ('fui-absolute-overlay-container', className)}>
      {children}
      <div
        ref={overlayRef}
        className={cn (
          'fui-overlay fui-overlay-absolute',
          mPlacements[otherProps.placement],
          {
            'fui-overlay--hidden': !visible,
            'fui-overlay--arrow': arrow,
          },
          overlayClass
        )}
        style={overlayStyle}
      >
        {visible && overlay}
      </div>
    </div>
  );
};

Overlay.displayName = 'Overlay.Absolute';
Overlay.propTypes = {
  placement: PropTypes.string,
  gap: PropTypes.number,
  defaultVisible: PropTypes.bool,
  overlay: PropTypes.any,
  children: PropTypes.any,
  arrow: PropTypes.bool,
  trigger: PropTypes.string,
  onVisibleChange: PropTypes.func,
  canOutsideClickClose: PropTypes.bool,
  absolute: PropTypes.bool,
};
Overlay.defaultProps = {
  placement: 'top',
  gap: 5,
  trigger: 'click',
  onVisibleChange: f => f,
};

export default withCheatTargetNode (Overlay);
