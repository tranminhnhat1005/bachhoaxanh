export default function getBoundingClientRect (element) {
  const rect = element.getBoundingClientRect ();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left  : rect.left,
    right : rect.right,
    top   : rect.top,
    width : rect.width,
    x     : rect.left,
    y     : rect.top,
  };
}
