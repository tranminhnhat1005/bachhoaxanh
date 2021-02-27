/**@jsx jsx */
import PropTypes from 'prop-types';
import { forwardRef, memo, useEffect, useRef } from 'react';
import Portal from './portal';
import { randomString } from '../../utils/Diginet-Core-UI/randomString';
import { css, jsx } from '@emotion/core';
import { useState } from 'react';

const defaultColor       = 'rgba(255, 255, 255, 0.9)';
const defaultBg          = 'rgba(10, 10, 10, 0.7)';
const defaultViewPadding = 4;

const getScrollTop = () => {
    return ( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0 );
};
const getScrollLeft = () => {
    return ( window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0 );
};
const getArrowSpacing = (arrow, arrowSize, distance) => {
    const defaultArrowSpacing = arrow ? arrowSize : 0;
    return typeof distance === 'number' ? distance : defaultArrowSpacing;
};
const parseAlignMode = (alignMode) => {
    if (alignMode.split('-').length > 1) { return alignMode.split('-')[1]; }
    return 'middle';
};
// const getScrollParent = (element) => {
// 	const style = getComputedStyle(element);
// 	let scrollParent = window;
// 	if (style.position !== 'fixed') {
// 		let parent = element.parentElement;
// 		while (parent) {
// 			const parentStyle = getComputedStyle(parent);
// 			if (/(auto|scroll)/.test(parentStyle.overflow + parentStyle.overflowY + parentStyle.overflowX)) {
// 				scrollParent = parent;
// 				parent = undefined;
// 			} else {
// 				parent = parent.parentElement;
// 			}
// 		}
// 	}
// 	return scrollParent;
// };

const Tooltip = memo(forwardRef((props, ref) => {
    const {
        alignMode,
        arrow,
        arrowSize,
        backgroundColor,
        children,
        className,
        color,
        direction,
        distance,
        fontSize,
        forceDirection,
        hoverDelay,
        onToggle,
        padding,
        style,
        tagCreatedName: TagCreatedName,
        textAlign,
        title,
        tooltipMaxWidth,
        viewportPadding,
        ...other
    } = props;
    const Id = randomString(6, { allowSymbol: false }),
        IDs = {
            arrow: 'DCUI-tooltip-arrow-' + Id,
            container: 'DCUI-tooltip-container-' + Id,
            main: 'DCUI-tooltip-main-' + Id,
        },
        arrowRef = useRef(null),
        containerRef = useRef(null),
        tooltipRef = useRef(null),
        containerProps = {
            ...other,
            ref: ref || containerRef,
            className: IDs.container,
            style: {
                ...style,
                boxSizing: 'border-box',
                height: 'max-content',
                position: 'relative',
                width: 'max-content',
            },
        },
        hiddenPositions = {
            tooltip: {
                left: '-10000000px',
                opacity: 0,
            },
            arrow: {
                border: 'none',
                left: '-10000000px',
                opacity: 0,
                top: '-10000000px',
            }
        },
        [existed, setExisted] = useState(false);
    let calculateTimeout, hoverTimeout, tooltip;

    const styles = {
        arrow: css`
            height     : 0;
            opacity    : 0;
            position   : absolute;
            transition : opacity 0.1s ease-in-out;
            user-select: none;
            width      : 0;
            z-index    : 9005;
        `,
        main: css`
            background-color: ${backgroundColor};
            border-radius   : 3px;
            box-sizing      : border-box;
            color           : ${color};
            display         : inline-block;
            font-family     : sans-serif;
            font-size       : ${fontSize}px;
            opacity         : 0;
            padding         : ${padding};
            position        : absolute;
            text-align      : ${textAlign};
            transition      : opacity 0.1s ease-in-out;
            user-select     : none;
            word-wrap       : break-word;
            z-index         : 9004;
        `,
    };
    const checkHorizontal = (distance, el, parent) => {
        const parentRect = parent.getBoundingClientRect();
        const clientW    = document.documentElement.clientWidth;
        const deadSpace = Math.min(parentRect.left, clientW - parentRect.right);
        return ( (el.offsetWidth + parent.offsetWidth + distance + 4 + deadSpace) < clientW );
    };
    const checkParent = (el, parent) => {
        const parentRect     = parent.getBoundingClientRect();
        const bottomOverhang = parentRect.bottom > window.innerHeight;
        const topOverhang    = parentRect.top < 0;
    
        if (topOverhang && bottomOverhang) {
            return true;
        }
        if (parent.offsetHeight > el.offsetHeight) {
            const halfTargetHeight = parent.offsetHeight / 2;
            const arrowFree        = arrowSize + 6;
            const bOAmount         = parentRect.bottom - window.innerHeight;
            const tOAmount         = -parentRect.top;
            const centerToBottom   = halfTargetHeight - bOAmount;
            const centerToTop      = halfTargetHeight - tOAmount;
    
            return ( centerToBottom >= arrowFree && centerToTop >= arrowFree );
        }
    
        return !bottomOverhang && !topOverhang;
    };
    const checkArrowOverhang = (arrowStyles) => {
        const scrollLeft  = getScrollLeft();
        const enoughLeft  = arrowStyles.position.left - scrollLeft > 4;
        const enoughRight = arrowStyles.position.left + arrowSize * 2 < scrollLeft + document.documentElement.clientWidth - 4;
        return !enoughLeft || !enoughRight;
    };  
    const getTooltipMaxWidth = () => {
        return typeof document !== 'undefined' ?  document.documentElement.clientWidth - viewportPadding * 2 : 300;
    };
    const getArrowStyles = (direction, el, parent) => {
        if (!parent || !arrow) {
            return {
                position: {
                    top: 0,
                    left: -10000000
                }
            };
        }
    
        const parentRect   = parent.getBoundingClientRect();
        const halfParentH  = Math.round(parent.offsetHeight / 2);
        const halfParentW  = Math.round(parent.offsetWidth / 2);
        const scrollTop    = getScrollTop();
        const scrollLeft   = getScrollLeft();
        const arrowSpacing = getArrowSpacing(arrow, arrowSize, distance);
        const border       = {};
        const position     = {};
    
        switch (direction) {
            case 'right':
                border.borderLeft   = `${arrowSize}px solid transparent`;
                border.borderTop    = `${arrowSize}px solid transparent`;
                border.borderBottom = `${arrowSize}px solid transparent`;
                border.borderRight  = `${arrowSize}px solid ${backgroundColor}`;
                position.top        = el ? parentRect.top + scrollTop + halfParentH - arrowSize : '-10000000px';
                position.left       = parentRect.right + scrollLeft - arrowSize;
                break;
            case 'left':
                border.borderRight  = `${arrowSize}px solid transparent`;
                border.borderTop    = `${arrowSize}px solid transparent`;
                border.borderBottom = `${arrowSize}px solid transparent`;
                border.borderLeft   = `${arrowSize}px solid ${backgroundColor}`;
                position.top        = el ? parentRect.top + scrollTop + halfParentH - arrowSize : '-10000000px';
                position.left       = parentRect.left + scrollLeft - arrowSpacing;
                break;
            case 'up':
                border.borderBottom = `${arrowSize}px solid transparent`;
                border.borderLeft   = `${arrowSize}px solid transparent`;
                border.borderRight  = `${arrowSize}px solid transparent`;
                border.borderTop    = `${arrowSize}px solid ${backgroundColor}`;
                position.left       = el ? parentRect.left + scrollLeft + halfParentW - arrowSize : '-10000000px';
                position.top        = parentRect.top + scrollTop - arrowSpacing;
                break;
            case 'down':
            default:
                border.borderUp     = `${arrowSize}px solid transparent`;
                border.borderLeft   = `${arrowSize}px solid transparent`;
                border.borderRight  = `${arrowSize}px solid transparent`;
                border.borderBottom = `${arrowSize}px solid ${backgroundColor}`;
                position.left       = el ? parentRect.left + scrollLeft + halfParentW - arrowSize : '-10000000px';
                position.top        = parentRect.bottom + scrollTop + arrowSpacing - arrowSize;
                break;
        }
        return { border, position };
    };
    const getDirection = (arrowStyles, currentDirection, el, parent, recursive) => {
        if (!parent) {
            return currentDirection;
        }
        const clientW      = document.documentElement.clientWidth;
        const parentRect   = parent.getBoundingClientRect();
        const arrowSpacing = getArrowSpacing(arrow, arrowSize, distance);
        const wrapperHight = el.offsetHeight + arrowSpacing + 4;
        const spaceBelow   = window.innerHeight - parentRect.bottom;
        const spaceAbove   = parentRect.top;
        const enoughBelow  = spaceBelow >= wrapperHight;
        const enoughAbove  = spaceAbove >= wrapperHight;
        
        switch (currentDirection) {
            case 'right':
                if (!checkHorizontal(arrowSpacing, el, parent) || !checkParent(el, parent)) {
                    return getDirection(arrowStyles, 'down', el, parent, true);
                }
                if (clientW - parentRect.right < el.offsetWidth + arrowSpacing + 4) {
                    return 'left';
                }
                return 'right';
            case 'left':
                if (!checkHorizontal(arrowSpacing, el, parent) || !checkParent(el, parent)) {
                    return getDirection(arrowStyles, 'down', el, parent, true);
                }
                if (parentRect.left < el.offsetWidth + arrowSpacing + 4) {
                    return 'right';
                }
                return 'left';
            case 'up':
                if (!recursive && arrowStyles && checkArrowOverhang(arrowStyles)) {
                    return getDirection(arrowStyles, 'left', el, parent, true);
                }
                if (!enoughAbove) {
                    if (enoughBelow) {
                        return 'down';
                    }
                    if (!recursive && arrowStyles && checkHorizontal(arrowSpacing, el, parent)) {
                        return getDirection(arrowStyles, 'right', el, parent, true);
                    }
                }
                return 'up';
            case 'down':
            default:
                if (!recursive && arrowStyles && checkArrowOverhang(arrowStyles)) {
                    return getDirection(arrowStyles, 'right', el, parent, true);
                }
                if (!enoughBelow) {
                    if (enoughAbove) {
                        return 'up';
                    }
                    if (!recursive && arrowStyles && checkHorizontal(arrowSpacing, el, parent)) {
                        return getDirection(arrowStyles, 'right', el, parent, true);
                    }
                }
                return 'down';
        }
    };
    const getVertical = (alignMode, direction, el, parent) => {
        let left = -10000000, top;
        const arrowSpacing = getArrowSpacing(arrow, arrowSize, distance);
        if (el) {
            const scrollLeft  = getScrollLeft();
            const parentRect  = parent.getBoundingClientRect();
            const parentLeft  = parentRect.left + scrollLeft;
            const halfParentW = Math.round(parent.offsetWidth / 2);
            const tooltipW    = Math.min(getTooltipMaxWidth(), el && el.offsetWidth);
            const arrowCenter = parentLeft + halfParentW;
            const arrowLeft   = arrowCenter - arrowSize;
            const arrowRight  = arrowCenter + arrowSize;
            if (alignMode === 'start') {
                left = arrow ? Math.min(arrowLeft, parentLeft) : parentLeft;
            } else if (alignMode === 'end') {
                const rightWithArrow = Math.max(arrowRight, parentLeft + parent.offsetWidth);
                const rightEdge      = arrow ? rightWithArrow : parentLeft + parent.offsetWidth;
                left = Math.max(rightEdge - tooltipW, scrollLeft + 4);
            } else {
                const centeredLeft  = parentLeft + halfParentW - Math.round(tooltipW / 2);
                const availableLeft = scrollLeft + 4;
                left = Math.max(centeredLeft, availableLeft);
            }

            const rightTooltip  = left + tooltipW;
            const rightScreen   = document.documentElement.clientWidth + scrollLeft - 4;
            const rightOverhang = rightTooltip - rightScreen;
            if (rightOverhang > 0) {
                left -= rightOverhang;
            }
            if (direction === 'up') {
                top = parentRect.top + getScrollTop() - (el.offsetHeight + arrowSpacing);
            } else {
                top = parentRect.bottom + getScrollTop() + arrowSpacing;
            }
        }
        return { left: left + 'px', top: top + 'px' };
    };
    const getHorizontal = (alignMode, direction, el, parent) => {
        let left = -10000000, top = 0;
        const arrowSpacing = getArrowSpacing(arrow, arrowSize, distance);
        const arrowPadding = arrow ? 6 : 0;
        if (el) {
            const scrollLeft  = getScrollLeft();
            const scrollTop   = getScrollTop();
            const parentRect  = parent.getBoundingClientRect();
            const parentTop   = parentRect.top + scrollTop;
            const halfParentH = Math.round(parent.offsetHeight / 2);
            const arrowTop    = parentTop + halfParentH - arrowSize;
            const arrowBottom = parentRect.top + scrollTop + halfParentH + arrowSize;

            if (alignMode === 'start') {
                top = arrow ? Math.min(parentTop, arrowTop) : parentTop;
            } else if (alignMode === 'end') {
                const topForBottomAlign = parentRect.bottom + scrollTop - el.offsetHeight;
                top = arrow ? Math.max(topForBottomAlign, arrowBottom - el.offsetHeight) : topForBottomAlign;
            } else {
                const centeredTop = Math.max(parentTop + halfParentH - Math.round(el.offsetHeight / 2), scrollTop + 4);
                top = Math.min(centeredTop, arrowTop - arrowPadding);
            }
            
            const bottomOverhang = top - scrollTop + el.offsetHeight + 4 - window.innerHeight;
            if (bottomOverhang > 0) {
                top = Math.max(top - bottomOverhang, arrowBottom + arrowPadding - el.offsetHeight);
            }

            if (direction === 'right') {
                left = parentRect.right + arrowSpacing + scrollLeft;
            } else {
                left = parentRect.left - arrowSpacing - el.offsetWidth + scrollLeft;
            }
        }

        return { left: left + 'px', top: top + 'px' };
    };
    const getPosition = (el, parent) => {
        const align = parseAlignMode(alignMode);
        let trueDirection = direction;
        const maxWidth = getTooltipMaxWidth() + 'px';
        let tooltipPosition, width;
        if (!forceDirection && el) {
            console.log(forceDirection);
            const arrowStylesForGetDirection = getArrowStyles(direction, el, parent);
            trueDirection = getDirection(arrowStylesForGetDirection, direction, el, parent, false);
        }
        if (el) {
            const space = el.style.width ? 0 : 5;
            width = Math.min(el.offsetWidth, maxWidth) + space + 'px';
            tooltipPosition = trueDirection === 'up' || trueDirection === 'down' ? getVertical(align, trueDirection, el, parent ) : getHorizontal(align, trueDirection, el, parent);
        }

        return {
            tooltip: {
                ...tooltipPosition,
                maxWidth,
                width
            },
            arrow: getArrowStyles(trueDirection, el, parent),
        };
    };
    const onSettingTooltip = (arrow, parent) => {
        if (!existed) {
            setExisted(true);
            onShowTooltip(arrow, parent);
        } else {
            onShowTooltip(arrow, parent);
        };
    };
    const onShowTooltip = (arrow, parent) => {
        const arrowEl = arrowRef.current,
            el = tooltipRef.current;
        let positions;
        clearTimeout(calculateTimeout);
        calculateTimeout = setTimeout(() => {
                positions = getPosition(el, parent);
            }, 0);
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            Object.assign(el.style, positions.tooltip, { opacity: 1 });
            if (arrow) {
                Object.assign(arrowEl.style, positions.arrow.border, { opacity: 1 });
                arrowEl.style.left = positions.arrow.position.left + 'px';
                arrowEl.style.top  = positions.arrow.position.top + 'px';
            } else {
                Object.assign(arrowEl.style, hiddenPositions.arrow);
            }
        }, hoverDelay);
        
    };
    const onHideTooltip = () => {
        const arrowEl = arrowRef.current,
            el = tooltipRef.current;
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            Object.assign(el.style, hiddenPositions.tooltip);
            Object.assign(arrowEl.style, hiddenPositions.arrow);
        }, hoverDelay);
    };

    tooltip = existed ? (
        <Portal id={'DGN-CORE-UI-portal'}>
            <span className={IDs.arrow} css={styles.arrow} ref={arrowRef} style={{ ...hiddenPositions.arrow }} />
            <span className={IDs.main} css={styles.main} ref={tooltipRef} style={{ ...hiddenPositions.tooltip }}>
                {title}
            </span>
        </Portal>
    ) : null;

    useEffect(() => {
        const parent = containerProps.ref.current;
        parent.addEventListener('mouseenter', () => onSettingTooltip(arrow, parent));
        parent.addEventListener('touchstart', () => onSettingTooltip(arrow, parent));
        parent.addEventListener('mouseleave', () => onHideTooltip());
        parent.addEventListener('touchend', () => onHideTooltip());
        return () => {
            parent.removeEventListener('mouseenter', () => onSettingTooltip(arrow, parent));
            parent.removeEventListener('touchstart', () => onSettingTooltip(arrow, parent));
            parent.removeEventListener('mouseleave', () => onHideTooltip());
            parent.removeEventListener('touchend', () => onHideTooltip());
            clearTimeout(calculateTimeout);
            clearTimeout(hoverTimeout);
        }
    }, []);

    return (
        <TagCreatedName {...containerProps}>
            {children}
            {tooltip}
        </TagCreatedName>
    );
}));
Tooltip.defaultProps = {
    alignMode      : 'middle',
    arrow          : false,
    arrowSize      : 6,
    backgroundColor: defaultBg,
    color          : defaultColor,
    direction      : 'down',
    fontSize       : 12,
    forceDirection : false,
    hoverDelay     : 50,
    padding        : '4px 6px',
    tagCreatedName : 'div',
    textAlign      : 'center',
    tooltipMaxWidth: 350,
    viewportPadding: defaultViewPadding,
};
Tooltip.propTypes = {
    alignMode      : PropTypes.oneOf(['flex-end', 'flex-start', 'middle']),
    arrow          : PropTypes.bool,
    arrowSize      : PropTypes.number,
    backgroundColor: PropTypes.string,
    children       : PropTypes.element.isRequired,
    className      : PropTypes.string,
    color          : PropTypes.string,
    direction      : PropTypes.oneOf(['down', 'left', 'right', 'up']),
    distance       : PropTypes.number,
    fontSize       : PropTypes.number,
    forceDirection : PropTypes.bool,
    hoverDelay     : PropTypes.number,
    padding        : PropTypes.string,
    style          : PropTypes.object,
    tagCreatedName : PropTypes.oneOf(['div', 'span', 'h1']),
    textAlign      : PropTypes.oneOf(['center', 'justify', 'left', 'right']),
    title          : PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
    tooltipMaxWidth: PropTypes.number,
    viewportPadding: PropTypes.number,
}

export default Tooltip;
