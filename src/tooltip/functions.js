export const minArrowPadding = 5;
export const bodyPadding = 10;
export const noArrowDistance = 3;

export const getScrollTop = () => {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
};

export const getScrollLeft = () => {
  return (
    window.pageXOffset ||
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    0
  );
};

export const getArrowSpacing = props => {
  const defaultArrowSpacing = props.arrow ? props.arrowSize : noArrowDistance;
  return typeof props.distance === 'number'
    ? props.distance
    : defaultArrowSpacing;
};

export const getScrollParent = element => {
  const style = getComputedStyle (element);
  let scrollParent = window;
  if (style.position !== 'fixed') {
    let parent = element.parentElement;
    while (parent) {
      const parentStyle = getComputedStyle (parent);
      if (
        /(auto|scroll)/.test (
          parentStyle.overflow + parentStyle.overflowY + parentStyle.overflowX
        )
      ) {
        scrollParent = parent;
        parent = undefined;
      } else {
        parent = parent.parentElement;
      }
    }
  }
  return scrollParent;
};
