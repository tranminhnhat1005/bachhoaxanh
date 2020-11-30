import {useEffect, useLayoutEffect} from 'react';

export const useOnEscape = (handler = () => {}, active = true) => {
  useEffect (
    () => {
      if (!active) return;
      const listener = event => {
        if (event.key === 'Escape') handler ();
      };
      document.addEventListener ('keyup', listener);

      return () => {
        if (!active) return;
        document.removeEventListener ('keyup', listener);
      };
    },
    [handler, active]
  );
};

export const useRepositionOnResize = (handler = () => {}, active = true) => {
  useEffect (
    () => {
      if (!active) return;
      const listener = () => {
        handler ();
      };

      window.addEventListener ('resize', listener);

      return () => {
        if (!active) return;
        window.removeEventListener ('resize', listener);
      };
    },
    [handler, active]
  );
};

export const useOnClickOutside = (ref, handler = () => {}, active = true) => {
  useEffect (
    () => {
      if (!active) return;
      const listener = event => {
        const refs = Array.isArray (ref) ? ref : Array.from (ref);

        let contains = false;
        refs.forEach (r => {
          if (!r.current || r.current.contains (event.target)) {
            contains = true;
            return;
          }
        });
        event.stopPropagation ();
        if (!contains) handler ();
      };

      document.addEventListener ('mousedown', listener);
      document.addEventListener ('touchstart', listener);

      return () => {
        if (!active) return;
        document.removeEventListener ('mousedown', listener);
        document.removeEventListener ('touchstart', listener);
      };
    },
    [ref, handler, active]
  );
};

// Make sure that user is not able TAB out of the Modal content on Open
export const useTabbing = (contentRef, active = true) => {
  useEffect (
    () => {
      if (!active) return;
      const listener = event => {
        //check if key is a Tab
        if (event.keyCode === 9) {
          const element = contentRef.current.querySelectorAll (
            'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
          );

          const focusableElement = Array.prototype.slice.call (element);
          if (focusableElement.length === 1) {
            event.preventDefault ();
            return;
          }

          const firstFE = focusableElement[0];
          const lastFE = focusableElement[focusableElement.length - 1];
          if (event.shiftKey && document.activeElement === firstFE) {
            event.preventDefault ();
            lastFE.focus ();
          } else if (document.activeElement === lastFE) {
            event.preventDefault ();
            firstFE.focus ();
          }
        }
      };
      document.addEventListener ('keydown', listener);

      return () => {
        if (!active) return;
        document.removeEventListener ('keydown', listener);
      };
    },
    [contentRef, active]
  );
};

export const useIsomorphicLayoutEffect = typeof window !== 'undefined'
  ? useLayoutEffect
  : useEffect;
