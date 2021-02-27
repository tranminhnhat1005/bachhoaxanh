/**@jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import randomString from '../../utils/Diginet-Core-UI/randomString';
const data = [
	{ text: 'Lahm' },
	{ text: 'Ribery' },
	{ text: 'Robben' },
	{ text: 'Robert' },
	{ text: 'Thomas' },
	{ text: 'Neuer' },
];

const Swiper = (props) => {
	const Id = randomString({ allowSymbol: false, allowNumber: false });
	const IDs = {
		container: Id + '-swiper-container',
		highlight: Id + '-swiper-highlight',
		highlightSelector: Id + '-swiper-highlight-selector',
		mainSelector: Id + '-swiper-main-selector',
	};
	const {
		count = 12,
		el = '',
		onChange = null,
		sensitivity = 0.8,
		source = data,
		type = 'infinite',
		value = null,
		...other
	} = props;
	const containerRef = React.useRef(null);
	const mainSelectorRef = React.useRef(null);
	const highlightSelectorRef = React.useRef(null);
	const itemHeight = Math.ceil(
			// (containerRef.current.parentNode.offsetHeight * 3) / count,
			(80 * 3) / count,
		),
		itemAngle = 360 / count,
		radius = itemHeight / Math.tan((itemAngle * Math.PI) / 180);
	let newCount = count - (count % 4),
		halfCount = newCount / 2,
		quarterCount = newCount / 4,
		a = sensitivity * 10,
		selected = source[0],
		exceedA = 10,
		moveT = 0,
		moving = false,
		newSource = source,
		elements = {
			mainSelector: null,
			mainOptions: null,

			highlight: null,
			highlightSelector: null,
			highlightOptions: null,
		};
	const renderSwiper = (array) => {
		if (!array.length) {
			return;
		}

		if (type === 'infinite') {
			let concatArray = [].concat(array);
			while (concatArray.length < halfCount) {
				concatArray = concatArray.concat(array);
			}
			array = concatArray;
		}
		newSource = array;

		let arrayLength = array.length,
			mainSelector = '',
			highlightSelector = '';

		for (let i in array) {
			mainSelector += `<li class='select-option'
									style='
										top: ${itemHeight * -0.5}px;
										height: ${itemHeight}px;
										line-height: ${itemHeight}px;
										transform: rotateX(${-itemAngle * i}deg) translateZ(${radius}px);'
									data-index='${i}'>
									${array[i].text}
								</li>`;
			highlightSelector += `<li class='highlight-option' style='height: ${itemHeight}px;'>${array[i].text}</li>`;
		}
		if (type === 'infinite') {
			for (let i = 0; i < quarterCount; i++) {
				mainSelector =
					`<li class='select-option'
										style='
											top: ${itemHeight * -0.5}px;
											height: ${itemHeight}px;
											line-height: ${itemHeight}px;
											transform: rotateX(${itemAngle * (i + 1)}deg) translateZ(${radius}px);'
										data-index='${-i - 1}'>
										${array[arrayLength - i - 1].text}
									</li>` + mainSelector;
				mainSelector += `<li class='select-option'
										style='
											top: ${itemHeight * -0.5}px;
											height: ${itemHeight}px;
											line-height: ${itemHeight}px;
											transform: rotateX(${
												-itemAngle * (i + arrayLength)
											}deg) translateZ(${radius}px);'
											data-index='${i + arrayLength}'>
										${array[i].text}
									</li>`;
			}

			highlightSelector =
				`<li class='highlight-option' style='height: ${itemHeight}px;'>${
					array[arrayLength - 1].text
				}</li>` + highlightSelector;
			highlightSelector += `<li class='highlight-option' style='height: ${itemHeight}px;'>${array[0].text}</li>`;
		}
		mainSelectorRef.current.innerHTML = mainSelector;
		highlightSelectorRef.current.innerHTML = highlightSelector;
		elements.mainSelector = mainSelectorRef.current;
		elements.highlight = highlightSelectorRef.current.parentNode;
		elements.highlightSelector = highlightSelectorRef.current;
		elements.mainOptions = elements.mainSelector.querySelectorAll('.select-option');
		elements.highlightOptions = elements.highlightSelector.querySelectorAll('.highlight-option');

		if (type === 'infinite') {
			elements.highlightSelector.style.top = -itemHeight - 2 + 'px';
		}

		elements.highlight.style.height = itemHeight + 'px';
		elements.highlight.style.lineHeight = itemHeight + 'px';
	};
	React.useEffect(() => {
		renderSwiper(source);
	});
	return (
		<div className={IDs.container} ref={containerRef}>
			<ul
				className={IDs.mainSelector}
				ref={mainSelectorRef}
				style={{
					listStyle: 'none',
					transform: `translateZ(${-radius}px)S`,
				}}
			/>
			<div className={IDs.highlight}>
				<ul
					className={IDs.highlightSelector}
					ref={highlightSelectorRef}
				/>
			</div>
		</div>
	);
};

export default Swiper;

////////////////////////////////////////////////
////////////////////////////////////////////////
