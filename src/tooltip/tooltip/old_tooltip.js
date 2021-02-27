import propTypes from 'prop-types';
import React from 'react';
import {getScrollParent} from './functions';
import Portal from './portal';
import positions from './position';

// default colors
const defaultColor = 'rgba(255, 255, 255, 0.9)';
const defaultBg = 'rgba(0, 0, 0, 0.7)';

const resizeThrottle = 100;
const resizeThreshold = 5;

const stopProp = e => e.stopPropagation ();
const isBrowser = typeof window !== 'undefined';

class Tooltip extends React.Component {
  static propTypes = {
    arrow: propTypes.bool,
    arrowSize: propTypes.number,
    background: propTypes.string,
    children: propTypes.node.isRequired,
    className: propTypes.string,
    color: propTypes.string,
    content: propTypes.node.isRequired,
    direction: propTypes.string,
    distance: propTypes.number,
    eventOff: propTypes.string,
    eventOn: propTypes.string,
    eventToggle: propTypes.string,
    forceDirection: propTypes.bool,
    hoverDelay: propTypes.number,
    isOpen: propTypes.bool,
    mouseOutDelay: propTypes.number,
    padding: propTypes.oneOfType ([propTypes.string, propTypes.number]),
    styles: propTypes.object,
    tagName: propTypes.string,
    tipContentHover: propTypes.bool,
    tipContentClassName: propTypes.string,
    useDefaultStyles: propTypes.bool,
    useHover: propTypes.bool,
    zIndex: propTypes.number,
    onToggle: propTypes.func,
  };

  static defaultProps = {
    arrow: false,
    arrowSize: 6,
    background: defaultBg,
    className: '',
    color: defaultColor,
    direction: 'down',
    distance: undefined,
    eventOff: undefined,
    eventOn: undefined,
    eventToggle: undefined,
    forceDirection: false,
    hoverDelay: 0,
    isOpen: undefined,
    mouseOutDelay: undefined,
    padding: '4px',
    styles: {},
    tagName: 'div',
    tipContentHover: false,
    tipContentClassName: undefined,
    useDefaultStyles: false,
    useHover: true,
    zIndex: 1502,
    onToggle: undefined,
    minWidth: 'max-content',
    minHeight: 'max-content',
  };

  static getDerivedStateFromProps (nextProps) {
    return isBrowser && nextProps.isOpen ? {hasBeenShown: true} : null;
  }

  debounceTimeout = false;

  hoverTimeout = false;

  constructor () {
    super ();

    this.state = {
      showTip: false,
      hasHover: false,
      ignoreShow: false,
      hasBeenShown: false,
    };

    this.showTip = this.showTip.bind (this);
    this.hideTip = this.hideTip.bind (this);
    this.checkHover = this.checkHover.bind (this);
    this.toggleTip = this.toggleTip.bind (this);
    this.startHover = this.startHover.bind (this);
    this.endHover = this.endHover.bind (this);
    this.listenResizeScroll = this.listenResizeScroll.bind (this);
    this.handleResizeScroll = this.handleResizeScroll.bind (this);
    this.bodyTouchStart = this.bodyTouchStart.bind (this);
    this.bodyTouchEnd = this.bodyTouchEnd.bind (this);
    this.targetTouchStart = this.targetTouchStart.bind (this);
    this.targetTouchEnd = this.targetTouchEnd.bind (this);
  }

  componentDidMount () {
    if (this.props.isOpen) {
      this.setState ({isOpen: true});
    }

    this.scrollParent = getScrollParent (this.target);

    window.addEventListener ('resize', this.listenResizeScroll);
    this.scrollParent.addEventListener ('scroll', this.listenResizeScroll);
    window.addEventListener ('touchstart', this.bodyTouchStart);
    window.addEventListener ('touchend', this.bodyTouchEnd);
  }

  componentDidUpdate (_, prevState) {
    if (!this.state.hasBeenShown && this.props.isOpen) {
      this.setState ({hasBeenShown: true});

      return setTimeout (this.showTip, 0);
    }
    if (!prevState.hasBeenShown && this.state.hasBeenShown) {
      this.showTip ();
    }
  }

  componentWillUnmount () {
    window.removeEventListener ('resize', this.listenResizeScroll);
    this.scrollParent.removeEventListener ('scroll', this.listenResizeScroll);
    window.removeEventListener ('touchstart', this.bodyTouchStart);
    window.removeEventListener ('touchend', this.bodyTouchEnd);
    clearTimeout (this.debounceTimeout);
    clearTimeout (this.hoverTimeout);
  }

  listenResizeScroll () {
    clearTimeout (this.debounceTimeout);

    this.debounceTimeout = setTimeout (this.handleResizeScroll, resizeThrottle);

    if (this.state.targetTouch) {
      this.setState ({targetTouch: undefined});
    }
  }

  handleResizeScroll () {
    if (this.state.showTip) {
      const clientWidth =
        Math.round (document.documentElement.clientWidth / resizeThreshold) *
        resizeThreshold;
      this.setState ({clientWidth});
    }
  }

  targetTouchStart () {
    this.setState ({targetTouch: true});
  }

  targetTouchEnd () {
    if (this.state.targetTouch) {
      this.toggleTip ();
    }
  }

  bodyTouchEnd () {
    if (this.state.targetTouch) {
      this.setState ({targetTouch: undefined});
    }
  }

  bodyTouchStart (e) {
    if (
      !(this.target && this.target.contains (e.target)) &&
      !(this.tip && this.tip.contains (e.target)) &&
      !this.props.isOpen
    ) {
      this.hideTip ();
    }
  }

  toggleTip () {
    this.state.showTip ? this.hideTip () : this.showTip ();
  }

  showTip () {
    if (!this.state.hasBeenShown) {
      return this.setState ({hasBeenShown: true});
    }

    if (!this.state.showTip) {
      this.setState ({showTip: true}, () => {
        if (typeof this.props.onToggle === 'function') {
          this.props.onToggle (this.state.showTip);
        }
      });
    }
  }

  hideTip () {
    this.setState ({hasHover: false});

    if (this.state.showTip) {
      this.setState ({showTip: false}, () => {
        if (typeof this.props.onToggle === 'function') {
          this.props.onToggle (this.state.showTip);
        }
      });
    }
  }

  startHover () {
    if (!this.state.ignoreShow) {
      this.setState ({hasHover: true});

      clearTimeout (this.hoverTimeout);
      this.hoverTimeout = setTimeout (this.checkHover, this.props.hoverDelay);
    }
  }

  endHover () {
    this.setState ({hasHover: false});

    clearTimeout (this.hoverTimeout);
    this.hoverTimeout = setTimeout (
      this.checkHover,
      this.props.mouseOutDelay || this.props.hoverDelay
    );
  }

  checkHover () {
    this.state.hasHover ? this.showTip () : this.hideTip ();
  }

  render () {
    const {
      arrow,
      arrowSize,
      background,
      className,
      children,
      color,
      content,
      direction,
      distance,
      eventOff,
      eventOn,
      eventToggle,
      forceDirection,
      isOpen,
      mouseOutDelay,
      padding,
      styles,
      tagName: TagName,
      tipContentHover,
      useDefaultStyles,
      useHover,
    } = this.props;

    const isControlledByProps =
      typeof isOpen !== 'undefined' && isOpen !== null;
    const showTip = isControlledByProps ? isOpen : this.state.showTip;

    const wrapperStyles = {
      ...styles,
      position: 'relative',
    };

    const props = {
      style: wrapperStyles,
      ref: target => {
        this.target = target;
      },
      className,
    };

    const portalProps = {
      onClick: stopProp,
    };

    if (eventOff) {
      props[eventOff] = this.hideTip;
    }

    if (eventOn) {
      props[eventOn] = this.showTip;
    }

    if (eventToggle) {
      props[eventToggle] = this.toggleTip;
    } else if (useHover && !isControlledByProps) {
      props.onMouseEnter = this.startHover;
      props.onMouseLeave = tipContentHover || mouseOutDelay
        ? this.endHover
        : this.hideTip;
      props.onTouchStart = this.targetTouchStart;
      props.onTouchEnd = this.targetTouchEnd;

      if (tipContentHover) {
        portalProps.onMouseEnter = this.startHover;
        portalProps.onMouseLeave = this.endHover;
        portalProps.onTouchStart = stopProp;
      }
    }

    let tipPortal;

    if (this.state.hasBeenShown) {
      const currentPositions = positions (
        direction,
        forceDirection,
        this.tip,
        this.target,
        {...this.state, showTip},
        {
          background: useDefaultStyles ? defaultBg : background,
          arrow,
          arrowSize,
          distance,
        }
      );
      const tipStyles = {
        ...currentPositions.tip,
        background: useDefaultStyles ? defaultBg : background,
        borderRadius: '5px',
        boxSizing: 'border-box',
        color: useDefaultStyles ? defaultColor : color,
        display: 'inline-block',
        eventPointer: 'none',
        fontFamily: 'sans-serif',
        maxWidth: '300px',
        opacity: 1,
        padding,
        position: 'absolute',
        userSelect: 'none',
        textAlign: 'center',
        // transition: 'all 0.2s cubic-bezier(1.000, 0.000, 0.000, 1.000)',
        wordWrap: 'break-word',
        zIndex: this.props.zIndex,
      };

      const arrowStyles = {
        ...currentPositions.arrow.positionStyles,
        ...currentPositions.arrow.borderStyles,
        position: 'absolute',
        width: '0px',
        userSelect: 'none',
        // transition: 'all 0.2s cubic-bezier(1.000, 0.000, 0.000, 1.000)',
        height: '0px',
        zIndex: this.props.zIndex + 1,
      };

      tipPortal = (
        <Portal id={'tooltip'}>
          <span
            style={arrowStyles}
            className={`tooltip-arrow tooltip-${currentPositions.realDirection}-arrow`}
          />
          <span
            style={tipStyles}
            ref={tip => {
              this.tip = tip;
            }}
          >
            {content}
          </span>

        </Portal>
      );
    }

    return (
      <TagName {...props}>
        {children}
        {tipPortal}
      </TagName>
    );
  }
}

export default Tooltip;
