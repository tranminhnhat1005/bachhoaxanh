import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import {makePlacements} from '../utils/placements';
import useSemanticProp from '../hooks/useSemanticProp';
import {omit} from '../utils/helpers';

import PortalOverlay from './Overlay.Portal';
import AbsoluteOverlay from './Overlay.Absolute';

const mPlacements = makePlacements ('fui-overlay');
const lPlacements = Object.keys (mPlacements);

const Overlay = ({absolute, ...otherProps}) => {
  const placement = useSemanticProp ('placement', otherProps, lPlacements);
  const passedProps = useMemo (
    () => omit (otherProps, [...lPlacements, 'placement']),
    [otherProps]
  );

  return absolute
    ? <AbsoluteOverlay
        absolute={absolute}
        placement={placement || 'top'}
        {...passedProps}
      />
    : <PortalOverlay
        absolute={absolute}
        placement={placement || 'top'}
        {...passedProps}
      />;
};

Overlay.displayName = 'Overlay';
Overlay.propTypes = {
  absolute: PropTypes.bool,
};
Overlay.defaultProps = {};

export default Overlay;
