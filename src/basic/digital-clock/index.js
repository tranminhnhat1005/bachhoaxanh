/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import IconClock from '../../icon/clock/clock';
import randomString from '../../utils/Diginet-Core-UI/randomString';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Id = randomString({ allowNumber: false, allowSymbol: false });
const IDs = {
	container: Id + 'time-picker-container',
	main: Id + 'time-picker-main',
	inputWrapper: Id + 'time-picker-input-wrapper',
	inputTypeText: Id + 'time-picker-input-type-text',
	icon: Id + 'time-picker-icon',
	clock: Id + 'time-picker-clock',
};

const TimePicker = React.forwardRef((props, ref) => {
	const { label, ...other } = props;

	const containerRef = React.useRef(null);
	const inputRef = React.useRef(null);
	const Container = css`
		* {
			border-radius: 4px;
			box-sizing: border-box;
		}
		box-sizing: border-box;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		margin: 0;
		padding: 0;
	`;
	const LabelContainer = css`
		label {
			font-size: 12px;
			font-weight: 700;
			color: #555868;
		}
	`;
	const BoxMain = css`
		background-color: transparent;
		border: 1px solid #7f828e;
		border-radius: 4px;
		height: 40px;
		min-height: 40px;
		position: relative;
		width: 145px;
		.background {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: #dfefff;
			opacity: 0;
			z-index: -1;
			transition: opacity 0.2s ease;
		}
		:hover:not(.time-picker-focused) {
			border: 1px solid #111d5e;
			.background {
				opacity: 1;
			}
			${'#' + IDs.inputTypeText}::placeholder {
				color: #111d5e;
			}
			${'#' + IDs.icon} .default {
				color: #111d5e;
			}
		}
		&.time-picker-focused {
			border: solid 2px #0095ff;
			${'#' + IDs.main} {
			}
		}
	`;
	const InputWrapper = css`
		display: flex;
		height: 18px;
		margin: 10px 16px;
		position: relative;
		width: auto;
	`;
	const Input = css`
		background-color: transparent;
		border: 0;
		height: 18px;
		line-height: 18px;
		margin: 0;
		outline: none;
		padding: 0;
		width: 100%;
		::placeholder {
			color: #7f828e;
		}
	`;
	const Icon = css`
		display: flex;
		position: absolute;
		right: 0;
		.default {
			color: #7f828e;
			height: 16px;
			width: 16px;
		}
	`;
	const Clock = css`
		transform: scale(0);
	`;

	const onFocus = () => {
        inputRef.current.parentNode.parentNode.classList.add('time-picker-focused');
    };
    const onBlur = () => {
        inputRef.current.parentNode.parentNode.classList.remove('time-picker-focused');
    }
    useOnClickOutside(containerRef, onBlur);

	return (
		<div {...other} id={IDs.container} css={Container}>
			<div css={LabelContainer}>
				<label id={IDs.label} htmlFor={IDs.inputTypeText}>
					{label}
				</label>
			</div>
			<div css={BoxMain} id={IDs.main} ref={containerRef}>
				<div css={InputWrapper} id={IDs.inputWrapper}>
					<input
						css={Input}
						type={'text'}
						id={IDs.inputTypeText}
						placeholder={'hh:mm AM'}
						ref={inputRef}
						onFocus={onFocus}
					/>
					<div css={Icon} id={IDs.icon}>
						<span className={'default'}>
							<IconClock />
						</span>
					</div>
				</div>
				<div css={Clock} id={IDs.clock} class='picker arrows'>
					<div class='swiper-container hours'>
						<div class='swiper-wrapper'>
							<div class='swiper-slide'>00</div>
							<div class='swiper-slide'>01</div>
							<div class='swiper-slide'>02</div>
							<div class='swiper-slide'>03</div>
							<div class='swiper-slide'>04</div>
							<div class='swiper-slide'>05</div>
							<div class='swiper-slide'>06</div>
							<div class='swiper-slide'>07</div>
							<div class='swiper-slide'>08</div>
							<div class='swiper-slide'>09</div>
							<div class='swiper-slide'>10</div>
							<div class='swiper-slide'>11</div>
							<div class='swiper-slide'>12</div>
							<div class='swiper-slide'>13</div>
							<div class='swiper-slide'>14</div>
							<div class='swiper-slide'>15</div>
							<div class='swiper-slide'>16</div>
							<div class='swiper-slide'>17</div>
							<div class='swiper-slide'>18</div>
							<div class='swiper-slide'>19</div>
							<div class='swiper-slide'>20</div>
							<div class='swiper-slide'>21</div>
							<div class='swiper-slide'>22</div>
							<div class='swiper-slide'>23</div>
						</div>
					</div>
					<div class='swiper-container minutes'>
						<div class='swiper-wrapper'>
							<div class='swiper-slide'>00</div>
							<div class='swiper-slide'>01</div>
							<div class='swiper-slide'>02</div>
							<div class='swiper-slide'>03</div>
							<div class='swiper-slide'>04</div>
							<div class='swiper-slide'>05</div>
							<div class='swiper-slide'>06</div>
							<div class='swiper-slide'>07</div>
							<div class='swiper-slide'>08</div>
							<div class='swiper-slide'>09</div>
							<div class='swiper-slide'>10</div>
							<div class='swiper-slide'>11</div>
							<div class='swiper-slide'>12</div>
							<div class='swiper-slide'>13</div>
							<div class='swiper-slide'>14</div>
							<div class='swiper-slide'>15</div>
							<div class='swiper-slide'>16</div>
							<div class='swiper-slide'>17</div>
							<div class='swiper-slide'>18</div>
							<div class='swiper-slide'>19</div>
							<div class='swiper-slide'>20</div>
							<div class='swiper-slide'>21</div>
							<div class='swiper-slide'>22</div>
							<div class='swiper-slide'>23</div>
							<div class='swiper-slide'>24</div>
							<div class='swiper-slide'>25</div>
							<div class='swiper-slide'>26</div>
							<div class='swiper-slide'>27</div>
							<div class='swiper-slide'>28</div>
							<div class='swiper-slide'>29</div>
							<div class='swiper-slide'>30</div>
							<div class='swiper-slide'>31</div>
							<div class='swiper-slide'>32</div>
							<div class='swiper-slide'>33</div>
							<div class='swiper-slide'>34</div>
							<div class='swiper-slide'>35</div>
							<div class='swiper-slide'>36</div>
							<div class='swiper-slide'>37</div>
							<div class='swiper-slide'>38</div>
							<div class='swiper-slide'>39</div>
							<div class='swiper-slide'>40</div>
							<div class='swiper-slide'>41</div>
							<div class='swiper-slide'>42</div>
							<div class='swiper-slide'>43</div>
							<div class='swiper-slide'>44</div>
							<div class='swiper-slide'>45</div>
							<div class='swiper-slide'>46</div>
							<div class='swiper-slide'>47</div>
							<div class='swiper-slide'>48</div>
							<div class='swiper-slide'>49</div>
							<div class='swiper-slide'>50</div>
							<div class='swiper-slide'>51</div>
							<div class='swiper-slide'>52</div>
							<div class='swiper-slide'>53</div>
							<div class='swiper-slide'>54</div>
							<div class='swiper-slide'>55</div>
							<div class='swiper-slide'>56</div>
							<div class='swiper-slide'>57</div>
							<div class='swiper-slide'>58</div>
							<div class='swiper-slide'>59</div>
						</div>
					</div>
					<div class='vizor'></div>
				</div>
				<div className={'background'} />
			</div>
		</div>
	);
});

export default React.memo(TimePicker);
