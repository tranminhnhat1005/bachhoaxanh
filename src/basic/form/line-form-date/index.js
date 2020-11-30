/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import CalendarIcon from '../../../icon/calendar/calender';
import Cancel from '../../../icon/cancel/cancel';
import Left from '../../../icon/left/left';
import Right from '../../../icon/right/right';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const FormLineDate = (props) => {
	const {
		activeWidth = 400,
		disabled = false,
		defaultWidth = 200,
		// label = 'Thời gian',
	} = props;
	const allDaysOfMonthRef = useRef();
	const inputContainerRef = useRef();
	useOnClickOutside(inputContainerRef, () => onClickOutside());
	/**UI */
	const Container = styled.div`
		background-color: transparent;
		font-family: sans-serif;
		position: relative;
		width: max-content;
	`;
	const HelperText = styled.div`
		position: relative;
		text-align: center;
		.helper-text {
			position: absolute;
			right: 0;
			top: 0;
			transform: translateY(-100%);
			visibility: hidden;
		}
		.valid {
			color: #00c875;
		}
		.invalid {
			color: #ff3d71;
		}
	`;
	const InputLabel = styled.label`
		color: ${(props) => (props.disabled ? '#AAACB4' : '#555868')};
		font-size: 12px;
		font-weight: 700;
		left: 0;
		line-height: 1;
		margin: 0;
		padding: 0;
		position: absolute;
		top: 0;
		transform: translateY(-200%);
		transition: color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1) 0ms;
		user-select: ${disabled ? 'none' : 'initial'};
	`;

	/// different
	const InputContainer = styled.div`
		align-items: center;
		box-sizing: border-box;
		cursor: text;
		display: inline-flex;
		justify-content: space-between;
		margin-bottom: 6px;
		pointer-events: ${disabled ? 'none' : 'initial'};
		transition: all 0.2s ease-out;
		width: ${defaultWidth}px;

		.svg {
			cursor: ${disabled ? 'none' : 'pointer'};
			color: #7f828e;
			transition: opacity 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) 0ms,
				color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1) 0ms;
		}
		.svg-focus {
			opacity: 0;
			transform: scale(1);
			visibility: hidden;
		}
		.svg-default {
			opacity: 1;
			transform: translateX(-100%);
		}
		&:after {
			border-bottom: 2px solid #0095ff;
			bottom: 0;
			content: '';
			left: 0;
			pointer-events: none;
			position: absolute;
			right: 0;
			top: -1;
			transform: scaleX(0);
			transform-origin: left;
			transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms;
		}
		&:before {
			border-bottom: solid 1px #7f828e;
			content: '\\00a0';
			left: 0;
			position: absolute;
			pointer-events: none;
			right: 0;
			top: 6px;
			transition: border-bottom-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)
				0ms;
		}
		&.focused {
			transition: width 0.3s ease-in-out;
			width: ${activeWidth}px;
			&:after {
				transform: scaleX(1);
			}
			input::placeholder {
				color: #111d5e;
			}
			.calendar {
				opacity: 1;
				display: flex;
				transform: scale(1);
			}
			.svg-default {
				opacity: 0;
				transform: translateY(100%);
				visibility: hidden;
			}
			.svg-focus {
				color: #ff3d71;
				opacity: 1;
				visibility: visible;
			}
		}
		&:hover:not(:focus-within) {
			&:before {
				border-bottom: solid 1px #111d5e;
			}
			.svg {
				color: #111d5e;
			}
			input::placeholder {
				color: #111d5e;
			}
		}
	`;
	const Input = styled.input`
		background-color: #fff;
		border: none;
		font-size: 16px;
		height: 20px;
		margin: 0;
		padding: 0;
		outline: none;
		&::placeholder {
			color: #7f828e;
			letter-spacing: 0.0675em;
			transition: color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1) 0ms;
		}
		&:disabled {
			pointer-events: none;
			&::placeholder {
				color: #151a30;
				user-select: none;
			}
			~ .svg {
				color: #aaacb4;
			}
			~ .input-container:before {
				border-bottom: 1px solid #aaacb4;
			}
		}
	`;
	const Calendar = styled.div`
		align-items: center;
		border-radius: 4px;
		box-sizing: border-box;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		flex-direction: column;
		height: auto;
		opacity: 0;
		padding: 20px;
		position: absolute;
		top: 25px;
		transform: scale(0);
		transform-origin: top left;
		transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
		width: ${activeWidth}px;
	`;
	const Header = styled.div`
		align-items: center;
		display: flex;
		justify-content: space-between;
		width: 100%;
		.calender-header {
			color: #111d5e;
			font-size: 16px;
			font-weight: 600;
		}
	`;
	const Button = styled.button`
		background-color: transparent;
		border: 0;
		border-radius: 50%;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		cursor: pointer;
		svg {
			font-size: 2em;
		}
		&:focus {
			outline: none;
			path {
				fill: #111d5e;
			}
		}
		&:hover:not(:focus) {
			path {
				fill: #0095ff;
			}
		}
	`;
	const Weekdays = styled.div`
		align-items: center;
		display: flex;
		height: 20px;
		margin-top: 10px;
		padding: 0 8px;
		width: 100%;
		justify-content: center;
		.weekday {
			align-items: center;
			color: #555868;
			display: flex;
			font-size: 14px;
			font-weight: 700;
			height: 20px;
			justify-content: center;
			letter-spacing: 0.05rem;
			width: calc(${activeWidth - 50}px / 7);
		}
	`;
	const Days = styled.div`
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		line-height: 20px;
		padding: 0 8px;
		width: 100%;
		justify-content: center;
		.days-of-month {
			align-items: center;
			border-radius: 50%;
			color: #151a30;
			cursor: pointer;
			display: flex;
			font-size: 14px;
			/* height: 20px; */
			justify-content: center;
			margin: 5px ${(activeWidth - 218) / 14}px;
			padding: 2px;
			transition: background-color 0.2s
					cubic-bezier(0.075, 0.82, 0.165, 1),
				color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
			user-select: none;
			width: 20px;
			&:hover:not(.today):not(.day-active) {
				background-color: #dfefff;
			}
		}
		.prev-date,
		.next-date {
			color: #7f828e;
		}
		.today:not(.day-active) {
			/* background-color: #eeefff; */
			font-weight: bold;
			color: #151a30;
			text-decoration: underline;
			border-radius: 50%;
			&:hover {
				background-color: #dfefff;
				text-decoration: none;
			}
		}
		.day-active {
			background-color: #a2cfff;
		}
	`;

	//call the useOnClickOutside when press esc key
	const escKeyFunc = (ev) => {
		if (ev.keyCode === 27) {
			onClickOutside();
			inputContainerRef.current.childNodes[0].blur();
		}
	};
	//process the arrow key pressed when open the calendar
	let onFocused = false;
	const arrowKeyFunc = (ev) => {
		if (!onFocused) {
			if (ev.keyCode === 37) {
				date.setMonth(date.getMonth() - 1);
				renderCalendar();
			}
			if (ev.keyCode === 39) {
				date.setMonth(date.getMonth() + 1);
				renderCalendar();
			}
		}
	};
	const onInputBlur = () => {
		onFocused = false;
	};
	const onInputFocus = (e) => {
		inputContainerRef.current.classList.add('focused');
		onFocused = true;
	};
	const onClickOutside = (e) => {
		inputContainerRef.current.classList.remove('focused');
	};
	const date = new Date();
	const changeDayOfWeek = (date) => {
		// get day number from 0 (monday) to 6 (sunday)
		let day = date.getDay();
		if (day === 0) day = 7; // make Sunday (0) the last day
		return day - 1;
	};
	const renderCalendar = () => {
		date.setDate(1);

		const monthDays = document.querySelector('.days');

		const lastDay = new Date(
			date.getFullYear(),
			date.getMonth() + 1,
			0,
		).getDate();

		const prevLastDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			0,
		).getDate();

		const firstDayIndex = changeDayOfWeek(date);

		const lastDayIndex = changeDayOfWeek(
			new Date(date.getFullYear(), date.getMonth() + 1, 0),
		);
		const daysOfNextMonth = 7 - lastDayIndex;

		const months = [
			'tháng 01',
			'tháng 02',
			'tháng 03',
			'tháng 04',
			'tháng 05',
			'tháng 06',
			'tháng 07',
			'tháng 08',
			'tháng 09',
			'tháng 10',
			'tháng 11',
			'tháng 12',
		];

		let days = '';
		let x = firstDayIndex;
		for (x; x > 0; x--) {
			days += `<div class='days-of-month prev-date'>${
				prevLastDay - x + 1
			}</div>`;
		}
		for (let i = 1; i <= lastDay; i++) {
			if (
				i === new Date().getDate() &&
				date.getMonth() === new Date().getMonth() &&
				date.getFullYear() === new Date().getFullYear()
			) {
				days += `<div class='days-of-month today'>${i}</div>`;
			} else {
				days += `<div class='days-of-month'>${i}</div>`;
			}
		}
		for (let j = 1; j <= daysOfNextMonth - 1; j++) {
			days += `<div class='days-of-month next-date'>${j}</div>`;
		}
		monthDays.innerHTML = days;

		document.querySelector('.calender-header').innerHTML = `${
			months[date.getMonth()]
		} năm ${date.getFullYear()}`;
		document.querySelectorAll('.days-of-month').forEach((dc) => {
			dc.addEventListener('click', (e) => findTheActiveDay(e));
		});
	};
	const onChangeValue = (e) => {
		if (e.target.value.length === 10) {
			if (onValidateDate(e.target.value)) {
				document.querySelector(
					'.helper-text.invalid',
				).style.visibility = 'hidden';
				document.querySelector('.helper-text.valid').style.visibility =
					'visible';
			} else {
				document.querySelector(
					'.helper-text.invalid',
				).style.visibility = 'visible';
				document.querySelector('.helper-text.valid').style.visibility =
					'hidden';
			}
		} else {
			document.querySelector('.helper-text.invalid').style.visibility =
				'visible';
			document.querySelector('.helper-text.valid').style.visibility =
				'hidden';
		}
	};
	const onValidateDate = (inputText) => {
		const dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\d{4}$/;
		// Match the date format through regular expression
		if (inputText.match(dateformat)) {
			//Test which separator is used '/' or '-'
			let opera1 = inputText.split('/');
			let opera2 = inputText.split('-');
			// Extract the string into month, date and year
			let pDate;
			if (opera1.length > 1) {
				pDate = inputText.split('/');
			} else if (opera2.length > 1) {
				pDate = inputText.split('-');
			}
			let dd = parseInt(pDate[0]);
			let mm = parseInt(pDate[1]);
			let yy = parseInt(pDate[2]);
			// Create list of days of a month [assume there is no leap year by default]
			const ListOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if (mm === 1 || mm > 2) {
				if (dd > ListOfDays[mm - 1]) {
					return false;
				}
			}
			if (mm === 2) {
				let lYear = false;
				if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
					lYear = true;
				}
				if (lYear === false && dd >= 29) {
					return false;
				}
				if (lYear === true && dd > 29) {
					return false;
				}
			}
			if (yy < 1900) {
				return false;
			}
		} else {
			return false;
		}
		return true;
	};

	//check the input's value
	const checkInputValue = (e) => {
		if (!/[0-9\\/-]/.test(e.key)) {
			e.preventDefault();
		}
	};
	//set the input's value with format dd/mm/yyyy (01/02/xxxx)
	const setValueInput = (d) => {
		inputContainerRef.current.querySelector('input').value = `${
			d < 10 ? '0' + d.toString() : d
		}/${
			date.getMonth() + 1 < 10
				? '0' + (date.getMonth() + 1).toString()
				: date.getMonth() + 1
		}/${date.getFullYear()}`;
	};
	//find the active day then remove this, add the new class active for the new day and set value for input
	const findTheActiveDay = (e) => {
		const find = document.querySelector('.days').querySelector('.day-active');
		if (find) {
			find.classList.remove('day-active');
		}
		e.target.classList.add('day-active');
		setValueInput(e.currentTarget.textContent);
	};
	//set month to the the previous month (month - 1) and re-render the calendar
	const setPrevMonth = () => {
		date.setMonth(date.getMonth() - 1);
		renderCalendar();
	};
	//set month to the the next month (month + 1) and re-render the calendar
	const setNextMonth = () => {
		date.setMonth(date.getMonth() + 1);
		renderCalendar();
	};

	useEffect(() => {
		//first render
		renderCalendar();
		//add keypress event for input
		document
			.querySelector('.input-type-date')
			.addEventListener('keypress', (e) => checkInputValue(e));

		//add event click for left and right button to change the month
		document
			.querySelector('.btn-prev-month')
			.addEventListener('click', setPrevMonth);
		document
			.querySelector('.btn-next-month')
			.addEventListener('click', setNextMonth);

		//add esc key event for close the calendar
		document.addEventListener('keydown', escKeyFunc);

		//add arrow key event for the left and right button for change the month
		document.addEventListener('keydown', arrowKeyFunc);
		return () => {
			//unMount
			document.removeEventListener('keydown', escKeyFunc);
			document.removeEventListener('keydown', arrowKeyFunc);

			document
				.querySelector('.btn-prev-month')
				.removeEventListener('click', setPrevMonth);
			document
				.querySelector('.btn-next-month')
				.removeEventListener('click', setNextMonth);

			document
				.querySelector('.input-type-date')
				.addEventListener('keypress', (e) => checkInputValue(e));
		};
	});
	return (
		<Container>
			<InputLabel disabled={disabled}>Label</InputLabel>
			<HelperText>
				<span className={'helper-text valid'}>Value is valid</span>
				<span className={'helper-text invalid'}>Value is invalid</span>
			</HelperText>
			<InputContainer
				disabled={disabled}
				className={'input-container'}
				ref={inputContainerRef}
			>
				<Input
					className={'input-type-date'}
					disabled={disabled}
					placeholder={'dd/mm/yyyy'}
					onBlur={onInputBlur}
					onFocus={(e) => onInputFocus(e)}
					onChange={(e) => onChangeValue(e)}
				/>
				<span
					onClick={(e) => onInputFocus(e)}
					className={'svg svg-default'}
				>
					<CalendarIcon />
				</span>
				<span
					onClick={(e) => onClickOutside(e)}
					className={'svg svg-focus'}
				>
					<Cancel />
				</span>
				<Calendar className={'calendar'}>
					<Header>
						<Button className={'btn-prev-month'}>
							<Left />
						</Button>
						<span className={'calender-header'} />
						<Button className={'btn-next-month'}>
							<Right />
						</Button>
					</Header>
					<Weekdays className={'weekdays'}>
						<div className={'weekday'}>Hai</div>
						<div className={'weekday'}>Ba</div>
						<div className={'weekday'}>Tư</div>
						<div className={'weekday'}>Năm</div>
						<div className={'weekday'}>Sáu</div>
						<div className={'weekday'}>Bảy</div>
						<div className={'weekday'}>CN</div>
					</Weekdays>
					<Days ref={allDaysOfMonthRef} className={'days'} />
				</Calendar>
			</InputContainer>
		</Container>
	);
};

export default FormLineDate;
