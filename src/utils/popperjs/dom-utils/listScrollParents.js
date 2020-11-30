import getScrollParent from './getScrollParent.js';
import getParentNode from './getParentNode.js';
import getNodeName from './getNodeName.js';
import getWindow from './getWindow.js';
import isScrollParent from './isScrollParent.js';

export default function listScrollParents (element, list = []) {
  const scrollParent = getScrollParent (element);
  const isBody = getNodeName (scrollParent) === 'body';
  const win = getWindow (scrollParent);
  const target = isBody
    ? [win].concat (
        win.visualViewport || [],
        isScrollParent (scrollParent) ? scrollParent : []
      )
    : scrollParent;
  const updatedList = list.concat (target);
  return isBody
    ? updatedList // $FlowFixMe: isBody tells us target will be an HTMLElement here
    : updatedList.concat (listScrollParents (getParentNode (target)));
}
