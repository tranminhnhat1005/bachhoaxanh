import {useCallback, useEffect, useLayoutEffect, useRef} from 'react';

const useEnhancedEffect = typeof window !== 'undefined'
  ? useLayoutEffect
  : useEffect;

/**
 *
 * @param {function} fn
 */
const useEventCallback = fn => {
  const ref = useRef (fn);
  useEnhancedEffect (() => {
    ref.current = fn;
  });
  return useCallback ((...args) => (0, ref.current) (...args), []);
};

export default useEventCallback;
