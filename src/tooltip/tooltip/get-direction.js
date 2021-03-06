import { getScrollLeft, getArrowSpacing, minArrowPadding } from './functions';

const checkLeftRightWidthSufficient = (tip, target, distance, bodyPadding) => {
	const targetRect = target.getBoundingClientRect();
    const deadSpace = Math.min(targetRect.left, document.documentElement.clientWidth - targetRect.right);
	return ( (tip.offsetWidth + target.offsetWidth + distance + bodyPadding + deadSpace) < document.documentElement.clientWidth );
};

const checkTarget = (target, tip, tipProps) => {
    const targetRect = target.getBoundingClientRect();
	const bottomOverhang = targetRect.bottom > window.innerHeight;
	const topOverhang = targetRect.top < 0;

	if (topOverhang && bottomOverhang) {
		return true;
	}
	if (target.offsetHeight > tip.offsetHeight) {
		const halfTargetHeight             = target.offsetHeight / 2;
		const arrowClearance               = tipProps.arrowSize + minArrowPadding;
		const bottomOverhangAmount         = targetRect.bottom - window.innerHeight;
		const topOverhangAmount            = -targetRect.top;
		const targetCenterToBottomOfWindow = halfTargetHeight - bottomOverhangAmount;
		const targetCenterToTopOfWindow    = halfTargetHeight - topOverhangAmount;

		return ( targetCenterToBottomOfWindow >= arrowClearance && targetCenterToTopOfWindow >= arrowClearance );
	}

	return !bottomOverhang && !topOverhang;
};

const checkForArrowOverhang = (tipProps, arrowStyles, bodyPadding) => {
	const scrollLeft = getScrollLeft();
	const hasLeftClearance = arrowStyles.positionStyles.left - scrollLeft > bodyPadding;
	const hasRightClearance = arrowStyles.positionStyles.left + tipProps.arrowSize * 2 < scrollLeft + document.documentElement.clientWidth - bodyPadding;

	return !hasLeftClearance || !hasRightClearance;
};

const getDirection = (currentDirection, tip, target, tipProps, bodyPadding, arrowStyles, recursive) => {
	if (!target) {
		return currentDirection;
	}

	const targetRect = target.getBoundingClientRect();
	const arrowSpacing = getArrowSpacing(tipProps);

	const heightOfTipWithArrow = tip.offsetHeight + arrowSpacing + bodyPadding;

	const spaceBelowTarget = window.innerHeight - targetRect.bottom;
	const spaceAboveTarget = targetRect.top;

	const hasSpaceBelow = spaceBelowTarget >= heightOfTipWithArrow;
	const hasSpaceAbove = spaceAboveTarget >= heightOfTipWithArrow;

	switch (currentDirection) {
		case 'right':
			if (!checkLeftRightWidthSufficient(tip, target, arrowSpacing, bodyPadding) || !checkTarget(target, tip, tipProps)) {
				return getDirection('down', tip, target, arrowSpacing, bodyPadding, arrowStyles, true);
			}
			if (document.documentElement.clientWidth - targetRect.right < tip.offsetWidth + arrowSpacing + bodyPadding) {
				return 'left';
			}
			return 'right';
		case 'left':
			if (!checkLeftRightWidthSufficient(tip, target, arrowSpacing, bodyPadding) || !checkTarget(target, tip, tipProps)) {
				return getDirection('down', tip, target, arrowSpacing, bodyPadding, arrowStyles, true);
			}
			if (targetRect.left < tip.offsetWidth + arrowSpacing + bodyPadding) {
				return 'right';
			}
			return 'left';
		case 'up':
			if (!recursive && arrowStyles && checkForArrowOverhang(tipProps, arrowStyles, bodyPadding)) {
				return getDirection('left', tip, target, arrowSpacing, bodyPadding, arrowStyles, true);
			}
			if (!hasSpaceAbove) {
				if (hasSpaceBelow) {
					return 'down';
				}
				if (!recursive && checkLeftRightWidthSufficient(tip, target, arrowSpacing, bodyPadding)) {
					return getDirection('right', tip, target, arrowSpacing, bodyPadding, arrowStyles, true);
				}
			}
			return 'up';
		case 'down':
		default:
			if (!recursive && arrowStyles && checkForArrowOverhang(tipProps, arrowStyles, bodyPadding)) {
				return getDirection('right', tip, target, arrowSpacing, bodyPadding, arrowStyles, true);
			}
			if (!hasSpaceBelow) {
				if (hasSpaceAbove) {
					return 'up';
				}
				if (!recursive && checkLeftRightWidthSufficient(tip, target, arrowSpacing, bodyPadding)) {
					return getDirection('right', tip, target, arrowSpacing, bodyPadding, arrowStyles, true);
				}
			}
			return 'down';
	}
};

export default getDirection;
