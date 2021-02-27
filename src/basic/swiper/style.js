import { css } from '@emotion/core';

const randomColor = () => Math.random() * 255;
const getTanFromDegrees = degrees => Math.tan(degrees * Math.PI / 180);
const getRadiusOfCircle = (widthOrHeight, items) => widthOrHeight / getTanFromDegrees(360 / items);
export const styles = {
	container: css`
		background-color: turquoise;
		perspective: 1000px; //set perspective first
		position: relative;
		* {
			box-sizing: border-box;
		}
	`,
	selector: css`
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		transform-style: preserve-3d;
		.item:nth-child(1) {
			background-color: rgba(
				${randomColor()},
				${randomColor()},
				${randomColor()},
				0.5
			);
			transform: rotateX(0deg) translateZ(${getRadiusOfCircle(100, 12)}px);
		}
		.item:nth-child(2) {
			background-color: rgba(
				${randomColor()},
				${randomColor()},
				${randomColor()},
				0.5
			);
			transform: rotateX(30deg) translateZ(${getRadiusOfCircle(100, 12)}px);
		}
		.item:nth-child(3) {
			background-color: rgba(
				${randomColor()},
				${randomColor()},
				${randomColor()},
				0.5
			);
			transform: rotateX(60deg) translateZ(${getRadiusOfCircle(100, 12)}px);
		}
		.item:nth-child(4) {
			background-color: rgba(
				${randomColor()},
				${randomColor()},
				${randomColor()},
				0.5
			);
			transform: rotateX(90deg) translateZ(${getRadiusOfCircle(100, 12)}px);
		}
		.item:nth-child(5) {
			background-color: rgba(
				${randomColor()},
				${randomColor()},
				${randomColor()},
				0.5
			);
			transform: rotateX(120deg) translateZ(${getRadiusOfCircle(100, 12)}px);
		}
		.item:nth-child(6) {
			background-color: rgba(
				${randomColor()},
				${randomColor()},
				${randomColor()},
				0.5
			);
			transform: rotateX(150deg) translateZ(${getRadiusOfCircle(100, 12)}px);
		}
		.item:nth-child(7) {
			background-color: rgba(
				${randomColor()},
				${randomColor()},
				${randomColor()},
				0.5
			);
			transform: rotateX(180deg) translateZ(${getRadiusOfCircle(100, 12)}px);
		}
		.item:nth-child(8) {
			background-color: rgba(
				${randomColor()},
				${randomColor()},
				${randomColor()},
				0.5
			);
			transform: rotateX(210deg) translateZ(${getRadiusOfCircle(100, 12)}px);
		}
		.item:nth-child(9) {
			background-color: rgba(
				${randomColor()},
				${randomColor()},
				${randomColor()},
				0.5
			);
			transform: rotateX(240deg) translateZ(${getRadiusOfCircle(100, 12)}px);
		}
		.item:nth-child(10) {
			background-color: rgba(
				${randomColor()},
				${randomColor()},
				${randomColor()},
				0.5
			);
			transform: rotateX(270deg) translateZ(${getRadiusOfCircle(100, 12)}px);
		}
		.item:nth-child(11) {
			background-color: rgba(
				${randomColor()},
				${randomColor()},
				${randomColor()},
				0.5
			);
			transform: rotateX(300deg) translateZ(${getRadiusOfCircle(100, 12)}px);
		}
		.item:nth-child(12) {
			background-color: rgba(
				${randomColor()},
				${randomColor()},
				${randomColor()},
				0.5
			);
			transform: rotateX(330deg) translateZ(${getRadiusOfCircle(100, 12)}px);
		}
	`,
	item: css`
		align-items: center;
		backface-visibility: hidden;
		border: 2px solid salmon;
		border-radius: 3px;
		box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.15);
		display: flex;
		height: 100px;
		justify-content: center;
		position: absolute;
		top: 50%;
		width: 100px;
	`,
	content: css`
		color: #fff;
		font-size: 20px;
		font-weight: 550;
		line-height: 20px;
	`,
};
