// import styled from '@emotion/styled';
// import React, {
// 	useEffect,
// 	useImperativeHandle,
// 	useRef,
// 	forwardRef,
// 	memo,
// } from 'react';
// import PropTypes from 'prop-types';
// import { randomString, useOnClickOutside } from '../../../utils/';
// import ClockIcon from '../../icons/general/clock/clock';
// import CancelIcon from '../../icons/usual/cancel/cancel';
// import Clock from '../../icons/general/clock/clock';

// const Id = randomString(7, { allowSymbol: false, allowNumber: false });
// const IDs = {
// 	container: `${Id}-container`,
// 	label: `${Id}-label`,
// 	main: `${Id}-main`,
// 	header: `${Id}-header`,
// 	input: `${Id}-input`,
// 	timeType: `${Id}-time-type`,
// 	icon: `${Id}-icon`,
// 	iconOpen: `${Id}-icon-open`,
// 	iconClose: `${Id}-icon-close`,
// 	clock: `${Id}-clock`,
// 	clockHourFace: `${Id}-clock-hour-face`,
// 	clockMinuteFace: `${Id}-clock-minute-face`,
// 	clockTitle: `${Id}-clock-title`,
// 	hour: `${Id}-hour`,
// 	hourBtn: `${Id}-hour-btn`,
// 	minuteBtn: `${Id}-minute-btn`,
// 	swapBtn: `${Id}-swap-btn`,
// 	needle: `${Id}-needle`,
// 	hourNeedle: `${Id}-hour-needle`,
// };

// const cutPX = (x) => {
// 	return isNaN(x) ? x : x + 'px';
// };
// const CLock = forwardRef((props, ref) => {
// 	const {
// 		disabled = false,
// 		label = 'Timer picker',
// 		defaultWidth = 145,
// 		activeWidth = 276,
// 		timeTypeProps,
// 		variant = 'line',
// 	} = props;
// 	const mainRef = useRef();
// 	const inputRef = useRef();
// 	useOnClickOutside(mainRef, () => onInputBlurred());
// 	useImperativeHandle(ref, () => {
// 		return { onChange: onChange };
// 	});
// 	const onChange = () => {
// 		return {
// 			value: inputRef.current.value,
// 			timeType: inputRef.current.parentNode.childNodes[1].innerText,
// 		};
// 	};
// 	const d = new Date();
// 	let timeType = timeTypeProps
// 		? timeTypeProps
// 		: d.getHours() >= 12
// 		? 'PM'
// 		: 'AM';
// 	let face = 0;
// 	const addZero = (i) => {
// 		if (i < 10) {
// 			i = '0' + i;
// 		}
// 		return i;
// 	};
// 	const getElById = (id) => {
// 		return document.getElementById(id);
// 	};
// 	const Container = styled.div`
// 		* {
// 			border-radius: 4px;
// 			box-sizing: border-box;
// 			font-style: normal;
// 			margin: 0;
// 			padding: 0;
// 		}
// 		background-color: #fff;
// 		height: max-content;
// 		width: max-content;
// 	`;
// 	const Label = styled.div`
// 		margin-bottom: 5px;
// 	`;
// 	const LabelContent = styled.label`
// 		color: #555868;
// 		font-weight: bold;
// 		font-size: 12px;
// 		line-height: 14px;
// 	`;
// 	const BoxMain = styled.div`
// 		border-radius: 4px;
// 		height: 40px;
// 		min-width: ${cutPX(defaultWidth)};
// 		pointer-events: ${disabled ? 'none' : 'initial'};
// 		position: relative;
// 		transition: width 0.3s, height 0.3s;
// 		width: ${cutPX(defaultWidth)};
// 		::before {
// 			top: 0;
// 			left: 0;
// 			right: 0;
// 			bottom: 0;
// 			position: absolute;
// 			content: '\\00a0';
// 			border: 1px solid;
// 			border-color: ${disabled ? '#AAACB4' : '#7F828E'};
// 			border-radius: 4px;
// 			pointer-events: none;
// 			user-select: none;
// 		}
// 		:hover:not(.focused) {
// 			background-color: #dfefff;
// 			${'#' + IDs.input}::placeholder, ${'#' + IDs.icon} ,${'#' + IDs.timeType} {
// 				color: #111d5e;
// 			}
// 			&::before {
// 				border: 1px solid #111d5e;
// 			}
// 		}
// 		&.focused {
// 			height: max-content;
// 			width: ${cutPX(activeWidth)};
// 			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
// 			${'#' + IDs.input}::placeholder, ${'#' + IDs.icon} ,${'#' + IDs.timeType} {
// 				color: #111d5e;
// 			}
// 			${'#' + IDs.clock} {
// 				transform: scale(1);
// 			}
// 			${'#' + IDs.header}::before {
// 				border-bottom: 1px solid #9597a1;
// 				bottom: 0;
// 				content: '\\00a0';
// 				left: 0;
// 				pointer-events: none;
// 				position: absolute;
// 				right: 0;
// 				top: 0;
// 				user-select: none;
// 			}
// 			&::before {
// 				top: -1px;
// 				left: -1px;
// 				right: -1px;
// 				bottom: -1px;
// 				border: solid 2px #0095ff;
// 			}
// 			${'#' + IDs.iconOpen} {
// 				transform: translateX(-100%) scale(0);
// 			}
// 			${'#' + IDs.iconClose} {
// 				color: #7f828e;
// 				transform: scale(1);
// 			}
// 		}
// 	`;
// 	const LineMain = styled.div`
// 		border-radius: 4px;
// 		height: 40px;
// 		min-width: ${cutPX(defaultWidth)};
// 		pointer-events: ${disabled ? 'none' : 'initial'};
// 		position: relative;
// 		transition: width 0.3s, height 0.3s;
// 		width: ${cutPX(defaultWidth)};
// 		:hover:not(.focused) {
// 			${'#' + IDs.input}::placeholder, ${'#' + IDs.icon} ,${'#' + IDs.timeType} {
// 				color: #111d5e;
// 			}
// 		}
// 		&.focused {
// 			height: max-content;
// 			width: ${cutPX(activeWidth)};
// 			${'#' + IDs.input}::placeholder, ${'#' + IDs.icon} ,${'#' + IDs.timeType} {
// 				color: #111d5e;
// 			}
// 			${'#' + IDs.clock} {
// 				box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
// 				transform: scale(1);
// 			}
// 			${'#' + IDs.header}::before {
// 				border-bottom: 2px solid #0095ff;
// 				bottom: 0;
// 				content: '\\00a0';
// 				left: 0;
// 				pointer-events: none;
// 				position: absolute;
// 				right: 0;
// 				top: 0;
// 				user-select: none;
// 			}
// 			${'#' + IDs.iconOpen} {
// 				transform: translateX(-100%) scale(0);
// 			}
// 			${'#' + IDs.iconClose} {
// 				color: #7f828e;
// 				transform: scale(1);
// 			}
// 		}
// 	`;
// 	const BoxHeader = styled.div`
// 		display: flex;
// 		align-items: center;
// 		margin: 0 16px;
// 		padding: 10px 0;
// 		position: relative;
// 	`;
// 	const LineHeader = styled.div`
// 		display: flex;
// 		align-items: center;
// 		margin: 0;
// 		padding: 10px 0;
// 		position: relative;
// 		&::before {
// 			border-bottom: 1px solid #7f828e;
// 			bottom: 0;
// 			content: '\\00a0';
// 			left: 0;
// 			pointer-events: none;
// 			position: absolute;
// 			right: 0;
// 			top: 0;
// 			user-select: none;
// 		}
// 	`;
// 	const Input = styled.input`
// 		background-color: transparent;
// 		border: 0;
// 		font-weight: normal;
// 		font-size: 16px;
// 		line-height: 20px;
// 		outline: 0;
// 		width: 100%;
// 		::placeholder {
// 			color: #7f828e;
// 		}
// 		&:disabled {
// 			::placeholder,
// 			${'#' + IDs.timeType} {
// 				color: #000;
// 			}
// 		}
// 	`;
// 	const TimeType = styled.span`
// 		color: #7f828e;
// 		left: 50px;
// 		pointer-events: none;
// 		position: absolute;
// 		user-select: none;
// 	`;
// 	const Icon = styled.div`
// 		align-items: center;
// 		color: #7f828e;
// 		display: flex;
// 		justify-content: center;
// 	`;
// 	const IconOpen = styled.span`
// 		cursor: pointer;
// 		transition: transform 0.1s cubic-bezier(0.19, 1, 0.22, 1);
// 		transform: translateX(100%);
// 	`;
// 	const IconClose = styled.span`
// 		cursor: pointer;
// 		transition: transform 0.2s cubic-bezier(0.19, 1, 0.22, 1);
// 		transform: scale(0);
// 	`;
// 	const Clock = styled.div`
// 		height: ${cutPX(activeWidth)};
// 		overflow: hidden;
// 		padding: 0 38px 26px 38px;
// 		position: relative;
// 		transform: scale(0);
// 		transform-origin: top left;
// 		transition: transform 0.3s;
// 		width: ${cutPX(activeWidth)};
// 	`;
// 	const ClockTitle = styled.div`
// 		align-items: baseline;
// 		color: #111d5e;
// 		display: flex;
// 		justify-content: center;
// 		line-height: normal;
// 		margin-top: 16px;
// 		margin-bottom: 11px;
// 		text-align: center;
// 		user-select: none;
// 	`;
// 	const ClockTitleButton = styled.button`
// 		background-color: transparent;
// 		border: 0;
// 		border-radius: 4px;
// 		color: #111d5e;
// 		cursor: pointer;
// 		margin: 0;
// 		outline: 0;
// 		padding: 1px;
// 		:hover {
// 			background-color: #dfefff;
// 		}
// 		:focus {
// 			background-color: #a2cfff;
// 		}
// 		&.active {
// 			background-color: #a2cfff;
// 		}
// 	`;
// 	const ClockHourFace = styled.div`
// 		background-color: #fafbfc;
// 		border-radius: 50%;
// 		height: 200px;
// 		pointer-events: none;
// 		position: absolute;
// 		user-select: none;
// 		width: 200px;
// 		top: 50%;
// 		left: 50%;
// 		transform: translate(-50%, -50%);
// 		:after {
// 			content: '';
// 			position: absolute;
// 			width: 100%;
// 			height: 100%;
// 			top: 0;
// 			left: 0;
// 			pointer-events: none;
// 			user-select: none;
// 		}
// 		:before {
// 			content: '';
// 			position: absolute;
// 			top: 50%;
// 			left: 50%;
// 			transform: translate(-50%, -50%);
// 			width: 8px;
// 			height: 8px;
// 			background-color: #111d5e;
// 			border-radius: 50%;
// 		}
// 		.${IDs.clockHourFace}-number {
// 			height: 100%;
// 			left: 0;
// 			position: absolute;
// 			top: 0;
// 			width: 100%;
// 			pointer-events: none;
// 			user-select: none;
// 		}
// 		.${IDs.clockHourFace}-number-24h {
// 			height: 100%;
// 			left: 0;
// 			position: absolute;
// 			top: 0;
// 			width: 100%;
// 			padding: 30px;
// 			pointer-events: none;
// 			user-select: none;
// 		}
// 		.${IDs.clockHourFace}-number-content {
// 			text-align: center;
// 			padding: 7px;
// 		}
// 		.${IDs.clockHourFace}-number-button {
// 			background-color: transparent;
// 			border: 0;
// 			border-radius: 50%;
// 			color: #151a30;
// 			cursor: pointer;
// 			font-size: 14px;
// 			height: 30px;
// 			outline: none;
// 			pointer-events: initial;
// 			transition: background-color 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
// 			width: 30px;
// 			:hover {
// 				background-color: #dfefff;
// 				color: #111d5e;
// 			}
// 			:focus {
// 				background-color: #a2cfff;
// 				color: #111d5e;
// 			}
// 		}
// 		.${IDs.clockHourFace}-24h {
// 			font-size: 12px;
// 			height: 24px;
// 			width: 24px;
// 			:hover {
// 				background-color: #dfefff;
// 			}
// 			:focus {
// 				background-color: #a2cfff;
// 			}
// 		}
// 	`;
// 	const ClockMinuteFace = styled.div`
// 		background-color: #fafbfc;
// 		border-radius: 50%;
// 		height: 200px;
// 		pointer-events: none;
// 		position: absolute;
// 		user-select: none;
// 		width: 200px;
// 		top: 50%;
// 		left: 50%;
// 		transform: scale(0) translate(-50%, -50%);
// 		:after {
// 			content: '';
// 			position: absolute;
// 			width: 100%;
// 			height: 100%;
// 			top: 0;
// 			left: 0;
// 			pointer-events: none;
// 			user-select: none;
// 		}
// 		:before {
// 			content: '';
// 			position: absolute;
// 			top: 50%;
// 			left: 50%;
// 			transform: translate(-50%, -50%);
// 			width: 8px;
// 			height: 8px;
// 			background-color: #111d5e;
// 			border-radius: 50%;
// 		}
// 		.${IDs.clockMinuteFace}-number {
// 			height: 100%;
// 			left: 0;
// 			position: absolute;
// 			top: 0;
// 			width: 100%;
// 			pointer-events: none;
// 			user-select: none;
// 		}
// 		.${IDs.clockMinuteFace}-number-24h {
// 			height: 100%;
// 			left: 0;
// 			position: absolute;
// 			top: 0;
// 			width: 100%;
// 			padding: 30px;
// 			pointer-events: none;
// 			user-select: none;
// 		}
// 		.${IDs.clockMinuteFace}-number-content {
// 			text-align: center;
// 			padding: 7px;
// 		}
// 		.${IDs.clockMinuteFace}-number-button {
// 			background-color: transparent;
// 			border: 0;
// 			border-radius: 50%;
// 			color: #151a30;
// 			cursor: pointer;
// 			font-size: 14px;
// 			height: 30px;
// 			outline: none;
// 			pointer-events: initial;
// 			transition: background-color 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
// 			width: 30px;
// 			:hover {
// 				background-color: #dfefff;
// 				color: #111d5e;
// 			}
// 			:focus {
// 				background-color: #a2cfff;
// 				color: #111d5e;
// 			}
// 		}
// 		.${IDs.clockMinuteFace}-24h {
// 			font-size: 12px;
// 			height: 24px;
// 			width: 24px;
// 			:hover {
// 				background-color: #dfefff;
// 			}
// 			:focus {
// 				background-color: #a2cfff;
// 			}
// 		}
// 	`;
// 	const ClockNeedleFace = styled.div`
// 		background-color: transparent;
// 		border-radius: 50%;
// 		height: 200px;
// 		position: absolute;
// 		pointer-events: none;
// 		user-select: none;
// 		width: 200px;
// 		top: 50%;
// 		left: 50%;
// 		transform: translate(-50%, -50%);
// 		:after {
// 			content: '';
// 			position: absolute;
// 			width: 100%;
// 			height: 100%;
// 			top: 0;
// 			left: 0;
// 			pointer-events: none;
// 			user-select: none;
// 		}
// 		:before {
// 			content: '';
// 			position: absolute;
// 			top: 50%;
// 			left: 50%;
// 			transform: translate(-50%, -50%);
// 			width: 8px;
// 			height: 8px;
// 			background-color: #111d5e;
// 			border-radius: 50%;
// 		}
// 	`;
// 	const Needle = styled.div`
// 		position: absolute;
// 		top: 0;
// 		left: 0;
// 		width: 100%;
// 		height: 100%;
// 		pointer-events: none;
// 		user-select: none;
// 	`;
// 	const HourNeedle = styled.div`
// 		background-color: #111d5e;
// 		border-radius: 0;
// 		bottom: 50%;
// 		height: 0px;
// 		left: 50%;
// 		pointer-events: none;
// 		position: absolute;
// 		transform: translateX(-50%);
// 		transition: height 0.2s linear;
// 		user-select: none;
// 		width: 2px;
// 	`;

// 	const renderClockNumber = () => {
// 		const clockHourFace = getElById(`${IDs.clockHourFace}`);
// 		const clockMinuteFace = getElById(`${IDs.clockMinuteFace}`);
// 		const hourNumbers = [
// 			'1',
// 			'2',
// 			'3',
// 			'4',
// 			'5',
// 			'6',
// 			'7',
// 			'8',
// 			'9',
// 			'10',
// 			'11',
// 			'12',
// 		];
// 		const minuteNumbers = [
// 			'05',
// 			'10',
// 			'15',
// 			'20',
// 			'25',
// 			'30',
// 			'35',
// 			'40',
// 			'45',
// 			'50',
// 			'55',
// 			'00',
// 		];
// 		let hours = '',
// 			minutes = '';
// 		let i = 0;
// 		for (i; i < 6; i++) {
// 			hours += `<div
// 							style="transform: rotate(${(i + 1) * 30}deg)"
// 							class="${IDs.clockHourFace}-number">
// 							<div
// 								style="transform: rotate(-${(i + 1) * 30}deg)"
// 								class="${IDs.clockHourFace}-number-content">
// 								<button
// 									id="${IDs.hour + '-' + hourNumbers[i]}"
// 									class="${IDs.clockHourFace}-number-button">
// 										${hourNumbers[i]}
// 								</button>
// 							</div>
// 						</div>`;
// 			minutes += `<div
// 							style="transform: rotate(${(i + 1) * 30}deg)"
// 							class="${IDs.clockMinuteFace}-number">
// 							<div
// 								style="transform: rotate(-${(i + 1) * 30}deg)"
// 								class="${IDs.clockMinuteFace}-number-content">
// 								<button
// 									id="${IDs.hour + '-' + minuteNumbers[i]}"
// 									class="${IDs.clockMinuteFace}-number-button">
// 										${minuteNumbers[i]}
// 								</button>
// 							</div>
// 						</div>`;
// 			hours += `<div
// 							style="transform: rotate(-${i * 30}deg)"
// 							class="${IDs.clockHourFace}-number">
// 							<div
// 								style="transform: rotate(${i * 30}deg)"
// 								class="${IDs.clockHourFace}-number-content">
// 								<button
// 									id="${IDs.hour + '-' + hourNumbers[11 - i]}"
// 									class="${IDs.clockHourFace}-number-button">
// 										${hourNumbers[11 - i]}
// 								</button>
// 							</div>
// 						</div>`;
// 			minutes += `<div
// 							style="transform: rotate(-${i * 30}deg)"
// 							class="${IDs.clockMinuteFace}-number">
// 							<div
// 								style="transform: rotate(${i * 30}deg)"
// 								class="${IDs.clockMinuteFace}-number-content">
// 								<button
// 									id="${IDs.hour + '-' + minuteNumbers[11 - i]}"
// 									class="${IDs.clockMinuteFace}-number-button">
// 										${minuteNumbers[11 - i]}
// 								</button>
// 							</div>
// 						</div>`;
// 		}

// 		clockHourFace.innerHTML = hours;
// 		clockMinuteFace.innerHTML = minutes;
// 	};
// 	const onInputFocused = () => {
// 		const main = getElById(IDs.main);
// 		if (!main.classList.contains('focused')) {
// 			main.classList.toggle('focused');
// 			onChangeHourFace(getElById(IDs.hourBtn));
// 		}
// 	};
// 	const onInputBlurred = () => {
// 		getElById(IDs.main).classList.remove('focused');
// 		const pattern = /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])$/;

// 		const input = getElById(IDs.input);

// 		if (!pattern.test(input.value)) {
// 			input.value =
// 				getElById(IDs.hourBtn).innerText +
// 				':' +
// 				getElById(IDs.minuteBtn).innerText;
// 		}
// 		if (pattern.test(input.value)) {
// 			getElById(IDs.hourBtn).innerText = addZero(
// 				+input.value.split(':')[0],
// 			);
// 			onRotateHourNeedle(getElById(IDs.hourBtn).innerText);
// 			getElById(IDs.minuteBtn).innerText = addZero(
// 				+input.value.split(':')[1],
// 			);
// 		}
// 	};
// 	const onOpen = () => {
// 		onInputFocused();
// 		getElById(IDs.input).focus();
// 	};
// 	const onChangeNeedle = (e) => {
// 		const needle = getElById(IDs.needle);
// 		needle.style.transform = e.target.parentNode.parentNode.style.transform;
// 		needle.childNodes[0].style.height = '63px';
// 	};
// 	const onRotateHourNeedle = (e) => {
// 		const needle = getElById(IDs.needle);
// 		needle.style.transform = `rotate(${+e * 30}deg)`;
// 	};
// 	const onRotateMinuteNeedle = (e) => {
// 		const needle = getElById(IDs.needle);
// 		needle.style.transform = `rotate(${+e * 6}deg)`;
// 	};
// 	const onChangeHourFace = (el) => {
// 		face = 0;
// 		const hourFace = getElById(IDs.clockHourFace);
// 		if (hourFace.style.transform === 'scale(0) translate(-50%, -50%)') {
// 			const minuteFace = getElById(IDs.clockMinuteFace);
// 			const minuteBtn = getElById(IDs.minuteBtn);
// 			onRotateHourNeedle(el.innerText);
// 			hourFace.style.transform = 'scale(1) translate(-50%, -50%)';
// 			el.classList.add('active');
// 			minuteFace.style.transform = 'scale(0) translate(-50%, -50%)';
// 			minuteBtn.classList.remove('active');
// 		}
// 		return;
// 	};
// 	const onChangeMinuteFace = (e) => {
// 		face = 1;
// 		const minuteFace = getElById(IDs.clockMinuteFace);
// 		if (minuteFace.style.transform !== 'scale(1) translate(-50%, -50%)') {
// 			const hourFace = getElById(IDs.clockHourFace);
// 			const hourBtn = getElById(IDs.hourBtn);
// 			onRotateMinuteNeedle(e.target.innerText);
// 			hourBtn.classList.remove('active');
// 			hourFace.style.transform = 'scale(0) translate(-50%, -50%)';
// 			minuteFace.style.transform = 'scale(1) translate(-50%, -50%)';
// 			e.target.classList.add('active');
// 		}
// 		return;
// 	};
// 	const onSwap = (e) => {
// 		const el = e.target;
// 		const timeType = getElById(IDs.timeType);
// 		if (el.innerText === 'AM') {
// 			el.innerText = 'PM';
// 			timeType.innerText = 'PM';
// 		} else {
// 			el.innerText = 'AM';
// 			timeType.innerText = 'AM';
// 		}
// 	};
// 	const onChangeValue = (e) => {
// 		const pattern = /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])$/;
// 		const input = getElById(IDs.input);

// 		if (pattern.test(input.value)) {
// 			getElById(IDs.hourBtn).innerText = addZero(
// 				+input.value.split(':')[0],
// 			);

// 			getElById(IDs.minuteBtn).innerText = addZero(
// 				+input.value.split(':')[1],
// 			);

// 			if (face === 0) {
// 				onRotateHourNeedle(getElById(IDs.hourBtn).innerText);
// 			} else {
// 				onRotateMinuteNeedle(getElById(IDs.minuteBtn).innerText);
// 			}
// 		}
// 	};
// 	const onCheckInputValue = (e) => {
// 		if (!/[0-9\\:]/.test(e.key)) {
// 			e.preventDefault();
// 		}
// 	};

// 	useEffect(() => {
// 		renderClockNumber();

// 		const input = getElById(IDs.input);
// 		input.addEventListener('keypress', (e) => onCheckInputValue(e));
// 		const hourButtons = document.querySelectorAll(
// 			`.${IDs.clockHourFace}-number-button`,
// 		);
// 		const minuteButtons = document.querySelectorAll(
// 			`.${IDs.clockMinuteFace}-number-button`,
// 		);
// 		hourButtons.forEach((button) => {
// 			button.addEventListener('click', (e) => onChangeHour(e));
// 		});
// 		const onChangeHour = (e) => {
// 			const hourButton = getElById(IDs.hourBtn);
// 			onChangeNeedle(e);
// 			if (+e.target.innerText < 10) {
// 				hourButton.innerText = '0' + e.target.innerText;
// 				input.value = '0' + e.target.innerText + ':00';
// 			} else {
// 				hourButton.innerText = e.target.innerText;
// 				input.value = e.target.innerText + ':00';
// 			}
// 		};
// 		minuteButtons.forEach((button) => {
// 			button.addEventListener('click', (e) => onChangeMinute(e));
// 		});
// 		const onChangeMinute = (e) => {
// 			const minuteButton = getElById(IDs.minuteBtn);
// 			onChangeNeedle(e);
// 			minuteButton.innerText = e.target.innerText;
// 			input.value = input.value.split(':')[0] + ':' + e.target.innerText;
// 		};

// 		onRotateHourNeedle(getElById(IDs.hourBtn).innerText);
// 		const needle = getElById(IDs.needle);
// 		needle.childNodes[0].style.height = '63px';
// 		return () => {
// 			hourButtons.forEach((button) => {
// 				button.removeEventListener('click', (e) => onChangeHour(e));
// 			});
// 			minuteButtons.forEach((button) => {
// 				button.removeEventListener('click', (e) => onChangeMinute(e));
// 			});
// 		};
// 	});

// 	return (
// 		<Container id={IDs.container}>
// 			<Label>
// 				<LabelContent id={IDs.label} htmlFor={IDs.input}>
// 					{label}
// 				</LabelContent>
// 			</Label>
// 			{variant === 'line' ? (
// 				<LineMain ref={mainRef} id={IDs.main}>
// 					<LineHeader id={IDs.header}>
// 						<Input
// 							disabled={disabled}
// 							id={IDs.input}
// 							maxLength={'5'}
// 							onChange={onChangeValue}
// 							onFocus={onInputFocused}
// 							placeholder={'hh:mm'}
// 							ref={inputRef}
// 							title={'Ex: 11:30, 23:30'}
// 						/>
// 						<TimeType id={IDs.timeType}>{timeType}</TimeType>
// 						<Icon id={IDs.icon}>
// 							<IconOpen id={IDs.iconOpen} onClick={onOpen}>
// 								<ClockIcon />
// 							</IconOpen>
// 							<IconClose
// 								id={IDs.iconClose}
// 								onClick={onInputBlurred}
// 							>
// 								<CancelIcon />
// 							</IconClose>
// 						</Icon>
// 					</LineHeader>
// 					<Clock id={IDs.clock}>
// 						<ClockTitle id={IDs.clockTitle}>
// 							<ClockTitleButton
// 								className={'active'}
// 								id={IDs.hourBtn}
// 								onClick={(e) => onChangeHourFace(e.target)}
// 							>
// 								{addZero(
// 									d.getHours() > 12
// 										? d.getHours() - 12
// 										: d.getHours(),
// 								)}
// 							</ClockTitleButton>
// 							:
// 							<ClockTitleButton
// 								id={IDs.minuteBtn}
// 								onClick={onChangeMinuteFace}
// 							>
// 								{addZero(d.getMinutes())}
// 							</ClockTitleButton>
// 							<ClockTitleButton id={IDs.swapBtn} onClick={onSwap}>
// 								{timeType}
// 							</ClockTitleButton>
// 						</ClockTitle>
// 						<ClockHourFace id={IDs.clockHourFace}></ClockHourFace>
// 						<ClockMinuteFace
// 							id={IDs.clockMinuteFace}
// 						></ClockMinuteFace>
// 						<ClockNeedleFace>
// 							<Needle id={IDs.needle}>
// 								<HourNeedle id={IDs.hourNeedle} />
// 							</Needle>
// 						</ClockNeedleFace>
// 					</Clock>
// 				</LineMain>
// 			) : (
// 				<BoxMain ref={mainRef} id={IDs.main}>
// 					<BoxHeader id={IDs.header}>
// 						<Input
// 							disabled={disabled}
// 							id={IDs.input}
// 							maxLength={'5'}
// 							onChange={onChangeValue}
// 							onFocus={onInputFocused}
// 							placeholder={'hh:mm'}
// 							ref={inputRef}
// 							title={'Ex: 11:30, 23:30'}
// 						/>
// 						<TimeType id={IDs.timeType}>{timeType}</TimeType>
// 						<Icon id={IDs.icon}>
// 							<IconOpen id={IDs.iconOpen} onClick={onOpen}>
// 								<ClockIcon />
// 							</IconOpen>
// 							<IconClose
// 								id={IDs.iconClose}
// 								onClick={onInputBlurred}
// 							>
// 								<CancelIcon />
// 							</IconClose>
// 						</Icon>
// 					</BoxHeader>
// 					<Clock id={IDs.clock}>
// 						<ClockTitle id={IDs.clockTitle}>
// 							<ClockTitleButton
// 								className={'active'}
// 								id={IDs.hourBtn}
// 								onClick={(e) => onChangeHourFace(e.target)}
// 							>
// 								{addZero(
// 									d.getHours() > 12
// 										? d.getHours() - 12
// 										: d.getHours(),
// 								)}
// 							</ClockTitleButton>
// 							:
// 							<ClockTitleButton
// 								id={IDs.minuteBtn}
// 								onClick={onChangeMinuteFace}
// 							>
// 								{addZero(d.getMinutes())}
// 							</ClockTitleButton>
// 							<ClockTitleButton id={IDs.swapBtn} onClick={onSwap}>
// 								{timeType}
// 							</ClockTitleButton>
// 						</ClockTitle>
// 						<ClockHourFace id={IDs.clockHourFace}></ClockHourFace>
// 						<ClockMinuteFace
// 							id={IDs.clockMinuteFace}
// 						></ClockMinuteFace>
// 						<ClockNeedleFace>
// 							<Needle id={IDs.needle}>
// 								<HourNeedle id={IDs.hourNeedle} />
// 							</Needle>
// 						</ClockNeedleFace>
// 					</Clock>
// 				</BoxMain>
// 			)}
// 		</Container>
// 	);
// });
// Clock.propTypes = {
// 	activeWidth: PropTypes.number,
// 	defaultWidth: PropTypes.number,
// 	disabled: PropTypes.bool,
// 	label: PropTypes.string,
// 	timeTypeProps: PropTypes.object,
// 	variant: PropTypes.string,
// };
// export default memo(CLock);
