/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { forwardRef, memo, useEffect, useMemo, useRef } from 'react';
import Icon from '../../../icons';
import {
	blue13,
	brand,
	danger5,
	dark,
	dark12,
	dark4,
	dark6,
	dark8,
	info5,
} from '../../styles/Diginet-Core-UI/Diginet-Core-UI-styles/colors';
import { fontFamily } from '../../styles/Diginet-Core-UI/Diginet-Core-UI-styles/typography';
import { date as moment } from '../../utils/Diginet-Core-UI/date';

/**
 *
 * @description set Sunday (0) to the last day of week.
 * @param {Date} date
 * @returns number of day from 0 (Monday) to 6 (Sunday).
 */
const getDateOfWeek = (date) => {
	let day = date.getDay();
	if (day === 0) day = 7;
	return day - 1;
};

/**
 * @description Helper regex for DOM classes
 * @param {String} c
 * @returns {RegExp} className
 */
const classRegex = (c) => {
	return new RegExp('(^|\\s+)' + c + '(\\s+|$)');
};

/**
 * @description Check if an element has a class
 * @param {Element} el
 * @param {String} c
 * @returns {boolean} Does element el has className c?
 */
const hasClass = (el, c) => {
	if (!el) return;
	return classRegex(c).test(el.className);
};

/**
 * @description Add a class to the element
 * @param {Element} el
 * @param {String} c
 */
const addClass = (el, c) => {
	if (!hasClass(el, c)) {
		el.classList.add(c);
	}
};

/**
 * @description Remove class from element
 * @param {Element} el
 * @param {String} c
 */
const removeClass = (el, c) => {
	if (!el) return;
	el.className = el.className.replace(classRegex(c), ' ');
};

/**
 *
 * @description Compare time vs time
 * @param {Date} a
 * @param {Date} b
 * @returns timestamp of a - timestamp of b
 */
const compareTime = (a, b) => {
	return (
		Date.parse(new Date(a.getFullYear(), a.getMonth(), a.getDate())) -
		Date.parse(new Date(b.getFullYear(), b.getMonth(), b.getDate()))
	);
};

/**
 * @description detect value is a Date object
 * @param {String | Number | Array} value
 * @returns value or false
 */
const isValidDate = (value) => {
	if (value && moment(value).isValid()) {
		return new Date(value);
	}
	return false;
};

const DateRangePicker = memo(
	forwardRef(
		(
			{
				defaultValue,
				disabled,
				error,
				errorProps,
				format,
				label,
				labelProps,
				inputProps,
				inputRef,
				inputStyle,
				onChange,
				onShowTooltip,
				placeholder,
				readOnly,
				required,
				value,
				viewType,
				...props
			},
			ref,
		) => {
			if (!ref) {
				ref = useRef(null);
			}
			if (!inputRef) {
				inputRef = useRef(null);
			}

			const iconRef = useRef(null);
			const inputContainerRef = useRef(null);

			const labelCSS = css`
				color: ${dark8};
				display: block;
				font-family: ${fontFamily};
				font-size: 12px;
				font-style: normal;
				font-weight: bold;
				margin-bottom: 5px;
				.DGN-required {
					color: ${danger5};
				}
			`;
			const errorCSS = css`
				font-family: ${fontFamily};
				font-size: 12px;
				font-style: normal;
				font-weight: normal;
				margin-top: 4px;
			`;
			const inputAreaCSS = css`
				display: flex;
				flex: 1 1 auto;
			`;
			const iconAreaCSS = css`
				align-items: center;
				color: inherit;
				display: flex;
				margin-left: 8px;
				margin-right: ${viewType === 'outlined' ? 14 : 0}px;
				width: 24px;
				.DGN-date-range-picker-icon {
					cursor: pointer;
					opacity: 0;
					transition: visibility 50ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
						opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 50ms;
					will-change: visibility, opacity;
				}
				.icon-close {
					transform: translateX(-100%);
					visibility: hidden;
				}
				.icon-calendar {
					opacity: 1;
				}
			`;
			const inputCSS = css`
				border: none;
				color: ${brand};
				font-family: ${fontFamily};
				font-size: 16px;
				font-style: normal;
				font-weight: 500;
				line-height: 20px;
				outline: none;
				padding-bottom: ${viewType !== 'outlined' ? 0 : 'inherit'};
				padding-left: ${viewType !== 'outlined' ? 0 : '16px'};
				padding-right: ${viewType !== 'outlined' ? 0 : '16px'};
				padding-top: 0;
				width: 100%;
				&:focus {
					background-color: transparent;
				}
				&::placeholder {
					color: ${dark6};
					user-select: none;
				}
			`;
			const inputContainerCSS =
				viewType !== 'outlined'
					? css`
							align-items: center;
							display: flex;
							flex: 1 1 auto;
							padding-bottom: 6px;
							padding-top: 6px;
							position: relative;
							&:not(:focus-within):hover {
								&::before {
									border-bottom-color: ${brand};
								}
							}
							&:focus-within {
								border-bottom-color: ${info5};
								&::after {
									border-bottom-color: inherit;
									transform: scaleX(1);
								}
							}
							&::before {
								border-bottom: 1px solid ${dark6};
								bottom: 0;
								content: '';
								left: 0;
								position: absolute;
								right: 0;
							}
							&::after {
								border-bottom: 2px solid transparent;
								bottom: -1px;
								content: '';
								left: 0px;
								position: absolute;
								right: 0px;
								transform-origin: center;
								transform: scaleX(0);
								transition: all 0.2s ease;
							}
					  `
					: css`
							align-items: center;
							border-radius: 4px;
							border: 1px solid ${dark6};
							box-sizing: border-box;
							display: flex;
							flex: 1 1 auto;
							height: 40px;
							position: relative;
							&:not(:focus-within):hover {
								background-color: ${blue13};
								border-color: ${brand};
								input {
									background-color: ${blue13};
								}
							}
							&:focus-within {
								border-color: ${info5};
								box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
								&::after {
									border-color: inherit;
								}
								&:not(.DGN-readOnly) > .icon-calendar {
									display: none;
								}
							}
							&::placeholder {
								color: ${dark6};
							}
							&::after {
								border-radius: 4px;
								border: 2px solid transparent;
								bottom: -2px;
								content: '';
								left: -2px;
								pointer-events: none;
								position: absolute;
								right: -2px;
								top: -2px;
							}
					  `;
			const rootComponentCSS = css`
				font-family: ${fontFamily};
				margin-bottom: 1rem;
				min-width: 200px;
				&.DGN-error {
					.css-${inputContainerCSS.name} {
						border-color: ${danger5};
						path {
							fill: ${danger5};
						}
						&::before {
							border-color: ${danger5};
						}
					}
					.css-${errorCSS.name} {
						color: ${danger5};
					}
				}
				&.DGN-disabled {
					pointer-events: none;
					user-select: none;
					.css-${labelCSS.name}, .css-${errorCSS.name} {
						color: ${dark4} !important;
					}
					.css-${inputCSS.name} {
						color: ${dark} !important;
					}
					.css-${inputContainerCSS.name} {
						${viewType === 'outlined'
							? `background-color: ${dark12};`
							: ''}
						border-color: ${dark4};
						.css-${inputAreaCSS.name} {
							input {
								${viewType === 'outlined'
									? `background-color: ${dark12};`
									: ''}
								::placeholder {
									color: ${dark4};
								}
							}
						}
						.css-${iconAreaCSS.name} {
							path {
								fill: ${dark4};
							}
						}
						&::before {
							border-color: ${dark4};
						}
					}
				}
			`;

			const onClickOutside = (e) => {
				if (
					inputContainerRef.current &&
					!inputContainerRef.current.contains(e.target) &&
					inputRef.current &&
					!inputRef.current.contains(e.target)
				) {
					onClosePicker();
				}
			};
			const onSwapIcon = (open) => {
				if (!iconRef.current) return;
				const t = iconRef.current.childNodes[+open];
				if (open) {
					t.style.visibility = 'hidden';
					t.style.opacity = 0;
					t.previousSibling.style.visibility = 'visible';
					t.previousSibling.style.opacity = 1;
					t.previousSibling.style.pointerEvents = 'none';
					setTimeout(() => {
						t.previousSibling.style.pointerEvents = null;
					}, 200);
				} else {
					t.style.visibility = 'hidden';
					t.style.opacity = 0;
					t.nextSibling.style.visibility = 'visible';
					t.nextSibling.style.opacity = 1;
					t.nextSibling.style.pointerEvents = 'none';
					setTimeout(() => {
						t.nextSibling.style.pointerEvents = null;
					}, 200);
				}
			};
			const onFocusInput = () => {
				if (
					!inputContainerRef.current.classList.contains('DGN-focus')
				) {
					addClass(inputContainerRef.current, 'DGN-focus');
					onSwapIcon(false);
					setTimeout(() => {
						onOpenPicker();
					}, 200);
				}
			};
			const onTriggerFocusInput = () => {
				onSwapIcon(false);
				if (
					!inputContainerRef.current.classList.contains('DGN-focus')
				) {
					inputRef.current.focus();
				} else {
					onClickOutside({ target: null });
				}
			};
			const onTriggerBlurInput = () => {
				onSwapIcon(true);
				onClickOutside({ target: null });
			};
			const onClosePicker = () => {
				onSwapIcon(true);
				removeClass(inputContainerRef.current, 'DGN-focus');
			};
			const onOpenPicker = () => {
				const { innerHeight } = window;
				const {
					left,
					height,
					top,
					width,
				} = inputContainerRef.current.getBoundingClientRect();
				console.log(left, height, top, width);
			};

			useEffect(() => {
				inputRef.current.readOnly = readOnly;
				if (disabled) {
					addClass(ref.current, 'DGN-disabled');
					iconRef.current.querySelector(
						'.icon-calendar',
					).style.pointerEvents = 'none';
					onClosePicker();
				} else if (!readOnly) {
					inputRef.current.addEventListener('focus', onFocusInput);
				} else {
					addClass(ref.current, 'DGN-read-only');
					iconRef.current.querySelector(
						'.icon-calendar',
					).style.pointerEvents = 'none';
					onClosePicker();
				}

				return () => {
					if (!ref.current || !inputRef.current || !iconRef.current)
						return;
					if (disabled) {
						removeClass(ref.current, 'DGN-disabled');
						iconRef.current.querySelector(
							'.icon-calendar',
						).style.pointerEvents = null;
					} else if (!readOnly) {
						inputRef.current.removeEventListener(
							'focus',
							onFocusInput,
						);
					} else {
						removeClass(ref.current, 'DGN-read-only');
						iconRef.current.querySelector(
							'.icon-calendar',
						).style.pointerEvents = null;
					}
				};
			}, []);

			const labelComp = useMemo(
				() =>
					label ? (
						<label {...labelProps} css={labelCSS}>
							{label}
							{required && (
								<span className={'DGN-required'}>*</span>
							)}
						</label>
					) : null,
				[label, required],
			);
			const errorComp = useMemo(
				() =>
					error ? (
						<div {...errorProps} css={errorCSS}>
							{error}
						</div>
					) : null,
				[error],
			);
			const inputComp = useMemo(
				() => (
					<div css={inputContainerCSS} ref={inputContainerRef}>
						<div css={inputAreaCSS}>
							<input
								{...inputProps}
								css={inputCSS}
								style={inputStyle}
								ref={inputRef}
								placeholder={placeholder}
							/>
						</div>
						<div css={iconAreaCSS} ref={iconRef}>
							<Icon
								onClick={onTriggerFocusInput}
								className={
									'DGN-date-range-picker-icon icon-calendar'
								}
								name={'CalendarNew'}
								style={{ maxHeight: '24px' }}
								viewBox
							/>
							<Icon
								onClick={onTriggerBlurInput}
								className={
									'DGN-date-range-picker-icon icon-close'
								}
								name={'Close'}
								style={{ maxHeight: '24px' }}
								viewBox
							/>
						</div>
					</div>
				),
				[viewType, inputProps, inputStyle, placeholder],
			);

			return useMemo(
				() => (
					<div {...props} css={rootComponentCSS} ref={ref}>
						{labelComp}
						{inputComp}
						{errorComp}
					</div>
				),
				[props],
			);
		},
	),
);

DateRangePicker.defaultProps = {
	disabled: false,
	format: 'DD/MM/YYYY',
	placeholder: 'DD/MM/YYYY',
	readOnly: false,
	required: false,
	viewType: 'underlined',
};
DateRangePicker.propTypes = {};

export default DateRangePicker;
