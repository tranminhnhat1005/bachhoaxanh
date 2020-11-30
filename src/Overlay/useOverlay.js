/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo, useState, useEffect, useRef, useCallback} from 'react';
import getPosition from '../utils/getPosition';

const useOverlay = (
  {
    placement,
    trigger,
    onVisibleChange,
    gap,
    canOutsideClickClose,
    absolute,
    ...otherProps
  },
  targetNode,
  renderPlacement
) => {
  const isControlled = useMemo (() => otherProps.hasOwnProperty ('visible'), [
    otherProps,
  ]);
  const [visible, setVisible] = useState (
    isControlled ? otherProps.visible : otherProps.defaultVisible
  );
  const [isOverlayHover, setIsOverlayHover] = useState (false);
  const [isTargetHover, setIsTargetHover] = useState (false);

  useMemo (
    () => {
      if (isControlled) {
        return setVisible (otherProps.visible);
      }
    },
    [isControlled, otherProps.visible, setVisible]
  );

  useEffect (
    () => {
      onVisibleChange (visible);
    },
    [onVisibleChange, visible]
  );

  const overlayRef = useRef ();

  const applyHover = useMemo (() => trigger === 'hover', [trigger]);
  const applyClick = useMemo (() => trigger === 'click', [trigger]);

  const clickOutsideHandler = useCallback (
    () => {
      if (canOutsideClickClose) {
        setVisible (false);
      }
    },
    [setVisible, canOutsideClickClose]
  );

  useEffect (
    () => {
      if (!targetNode) {
        return f => f;
      }

      const listener = event => {
        if (
          targetNode.contains (event.target) ||
          overlayRef.current.contains (event.target)
        ) {
          return;
        }
        return clickOutsideHandler ();
      };

      document.addEventListener ('mousedown', listener);
      document.addEventListener ('touchstart', listener);

      return () => {
        document.removeEventListener ('mousedown', listener);
        document.removeEventListener ('touchstart', listener);
      };
    },
    [targetNode, overlayRef, clickOutsideHandler]
  );

  useEffect (
    () => {
      if (!targetNode) {
        return f => f;
      }

      if (applyHover) {
        let timer = null;
        let timer2 = null;

        const _eventMouseLeaveHandler = () => {
          timer = setTimeout (() => {
            setIsOverlayHover (prev => {
              if (prev) {
                return prev;
              }

              setVisible (false);
              return prev;
            });
          }, 100);
        };
        const _eventMouseLeaveOverlayHandler = () => {
          timer2 = setTimeout (() => {
            setIsTargetHover (prev => {
              if (prev) {
                return prev;
              }

              setVisible (false);
              return prev;
            });
          }, 100);
        };

        const _eventMouseEnterHandler = () => setVisible (true);

        targetNode.addEventListener ('mouseenter', _eventMouseEnterHandler);
        targetNode.addEventListener ('mouseleave', _eventMouseLeaveHandler);
        overlayRef.current.addEventListener (
          'mouseleave',
          _eventMouseLeaveOverlayHandler
        );

        return () => {
          clearTimeout (timer);
          clearTimeout (timer2);
          targetNode.removeEventListener (
            'mouseenter',
            _eventMouseEnterHandler
          );
          targetNode.removeEventListener (
            'mouseleave',
            _eventMouseLeaveHandler
          );
          overlayRef.current.removeEventListener (
            'mouseleave',
            _eventMouseLeaveOverlayHandler
          );
        };
      }
    },
    [
      applyHover,
      overlayRef,
      setVisible,
      setIsOverlayHover,
      setIsTargetHover,
      targetNode,
    ]
  );

  useEffect (
    () => {
      if (!targetNode) {
        return f => f;
      }

      const _eventMouseEnterOverlayHandler = () => setIsOverlayHover (true);
      const _eventMouseLeaveOverlayHandler = () => setIsOverlayHover (false);
      const _eventMouseEnterHandler = () => setIsTargetHover (true);
      const _eventMouseLeaveHandler = () => setIsTargetHover (false);

      overlayRef.current.addEventListener (
        'mouseenter',
        _eventMouseEnterOverlayHandler
      );
      overlayRef.current.addEventListener (
        'mouseleave',
        _eventMouseLeaveOverlayHandler
      );
      targetNode.addEventListener ('mouseenter', _eventMouseEnterHandler);
      targetNode.addEventListener ('mouseleave', _eventMouseLeaveHandler);

      return () => {
        overlayRef.current.removeEventListener (
          'mouseenter',
          _eventMouseEnterOverlayHandler
        );
        overlayRef.current.removeEventListener (
          'mouseleave',
          _eventMouseLeaveOverlayHandler
        );
        targetNode.removeEventListener ('mouseenter', _eventMouseEnterHandler);
        targetNode.removeEventListener ('mouseleave', _eventMouseLeaveHandler);
      };
    },
    [overlayRef, setIsOverlayHover, setIsTargetHover, targetNode]
  );

  // In 'click' trigger mode, when ever user click on taget, toogle overlay
  useEffect (
    () => {
      if (!targetNode) {
        return f => f;
      }

      if (applyClick) {
        const _eventClickHandler = () => setVisible (prev => !prev);
        targetNode.addEventListener ('click', _eventClickHandler);

        return () => {
          targetNode.removeEventListener ('mouseenter', _eventClickHandler);
        };
      }
    },
    [applyClick, setVisible, targetNode]
  );

  const [targetPosition, setTargetPosition] = useState ({
    pageX: 0,
    pageY: 0,
    clientHeight: 0,
    clientWidth: 0,
  });
  const [overlayPosition, setOverlayPosition] = useState ({
    pageX: 0,
    pageY: 0,
    clientHeight: 0,
    clientWidth: 0,
  });

  useEffect (
    () => {
      if (!visible || absolute || !targetNode) {
        return f => f;
      }
      setTargetPosition (getPosition (targetNode));
    },
    [targetNode, absolute, visible]
  );

  useEffect (
    () => {
      if (!visible || absolute) {
        return f => f;
      }

      setOverlayPosition (getPosition (targetNode));
      console.log(overlayPosition)
    },
    [targetNode, visible, absolute]
  );

  const overlayStyle = useMemo (
    () => renderPlacement[placement] (targetPosition, overlayPosition, gap),
    [renderPlacement, placement, targetPosition, overlayPosition, gap]
  );

  return {
    overlayRef,
    overlayStyle,
    visible,
  };
};

export default useOverlay;
