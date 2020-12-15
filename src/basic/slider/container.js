/**@jsx jsx */
import React from 'react';
import { jsx, css} from '@emotion/core';
// import { randomString, useOnClickOutside } from '../../utils';
import { randomString } from '../../utils/Diginet-Core-UI/randomString';
// import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const Id = randomString(7, { allowSymbol: false, allowNumber: false });
const IDs = {
	container     : Id + '-slider-container',
	iconLeft      : Id + '-slider-icon-left',
	iconRight     : Id + '-slider-icon-right',
	navigation    : Id + '-slider-navigation',
	navigationList: Id + '-slider-navigation-list',
	navigationItem: Id + '-slider-navigation-item',
	slideContainer: Id + '-slider-slide-container',
};
const icon = {
	left: (
		<svg width='24' height='24' viewBox='0 0 24 24'>
			<circle
				cx='12'
				cy='12'
				r='12'
				transform='rotate(-180 12 12)'
				fill='#111D5E'
			/>
			<path
				d='M7.6956 11.8155C7.69527 11.6838 7.71933 11.5533 7.76641 11.4316C7.81348 11.3099 7.88263 11.1994 7.96985 11.1065L13.4009 5.2937C13.5765 5.10567 13.8148 5.00002 14.0632 5C14.3116 4.99998 14.5499 5.10559 14.7256 5.2936C14.9013 5.48161 15 5.73661 15 6.00251C15 6.26841 14.9013 6.52342 14.7257 6.71146L9.9569 11.8155L14.7257 16.9195C14.8127 17.0126 14.8817 17.1231 14.9287 17.2448C14.9758 17.3664 15 17.4968 15 17.6284C15 17.7601 14.9758 17.8905 14.9287 18.0121C14.8816 18.1337 14.8126 18.2442 14.7256 18.3373C14.6386 18.4304 14.5353 18.5043 14.4217 18.5546C14.308 18.605 14.1862 18.6309 14.0632 18.6309C13.9402 18.6309 13.8184 18.605 13.7047 18.5546C13.5911 18.5042 13.4878 18.4303 13.4009 18.3372L10.6854 15.4308L7.96985 12.5244C7.88263 12.4315 7.81348 12.321 7.76641 12.1993C7.71933 12.0777 7.69526 11.9472 7.6956 11.8155Z'
				fill='currentColor'
			/>
		</svg>
	),
	right: (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
		>
			<circle cx='12' cy='12' r='12' fill='#111D5E' />
			<path
				d='M16.3044 12.1884C16.3047 12.3201 16.2807 12.4506 16.2336 12.5723C16.1865 12.694 16.1174 12.8045 16.0301 12.8974L10.5991 18.7102C10.4235 18.8982 10.1852 19.0039 9.9368 19.0039C9.68836 19.0039 9.45009 18.8983 9.27441 18.7103C9.09873 18.5223 9.00002 18.2673 9 18.0014C8.99998 17.7355 9.09865 17.4805 9.27431 17.2924L14.0431 12.1884L9.27431 7.08443C9.18733 6.99132 9.11835 6.88079 9.07128 6.75915C9.02421 6.63751 8.99999 6.50714 9 6.37548C9.00001 6.24382 9.02425 6.11345 9.07133 5.99181C9.11841 5.87018 9.18742 5.75966 9.27441 5.66657C9.3614 5.57348 9.46467 5.49964 9.57832 5.44926C9.69197 5.39888 9.81378 5.37296 9.9368 5.37297C10.0598 5.37298 10.1816 5.39892 10.2953 5.44932C10.4089 5.49971 10.5122 5.57356 10.5991 5.66667L13.3146 8.57306L16.0301 11.4795C16.1174 11.5724 16.1865 11.6829 16.2336 11.8046C16.2807 11.9263 16.3047 12.0567 16.3044 12.1884Z'
				fill='currentColor'
			/>
		</svg>
	),
};
export const Container = (props) => {
	/**@property */
	const { children, ...other } = props;

	/**@reference */
	const slideContainerRef = React.useRef(null);

	/**@style */
	const container = css`
		* {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}
		align-items: center;
		background-color: #aaa;
		display: flex;
		flex-direction: column;
		min-height: 500px;
		height: 100%;
		justify-items: center;
		position: relative;
		.${IDs.iconLeft}, .${IDs.iconRight} {
			align-items: center;
			border-radius: 50%;
			color: #eee;
			cursor: pointer;
			display: flex;
			height: 24px;
			justify-content: center;
			position: absolute;
			top: 45%;
			transform: translateY(-50%);
			transition: all 0.2s ease;
			width: 24px;
			svg {
				pointer-events: none;
				user-select: none;
			}
			:hover {
				color: #111d5e;
				circle {
					fill: #eee;
				}
			}
		}
	`;
	const slideContainer = css`
		background-color: #ccc;
		height: 90%;
		margin: 0 auto;
		overflow: hidden;
		position: relative;
		width: 100%;
	`;
	const iconLeft = css`
		left: 5%;
	`;
	const iconRight = css`
		right: 5%;
	`;
	const navigation = css`
		background-color: #fff;
		height: 10%;
		position: relative;
		width: 100%;
	`;
	const navigationList = css`
		display: flex;
		flex-direction: row;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		.${IDs.navigationItem} {
			background-color: #7F828E;
			border-radius: 50%;
			cursor: pointer;
			height: 8px;
			margin: 0 4px;
			position: relative;
			width: 8px;
			:hover:not(.item-focused) {
				background-color: #0095FF;
			}
			&.item-focused {
				background-color: #111d5e;
			}
		}
	`;
	
	/**@function */
	const removeClass = (className, selector) => {
		const array = document.querySelectorAll(`.${selector}`) || document.querySelectorAll(selector);
		array.forEach(a => {
			a.classList.remove(className);
		});
	};
	const onChangeActiveItem = e => {
		removeClass('item-focused', IDs.navigationItem);
		e.target.classList.add('item-focused');
	};
	const findActiveItem = () => {
		let childNodeList = [];
		childNodeList = slideContainerRef.current.childNodes;
		for (let i = 0; i < childNodeList.length; i++) {
			if (childNodeList[i].classList.contains('active')) {
				return i;
			}
		}
		return 0;
	};
	const renderNavigationItem = () => {
		const list = document.getElementById(IDs.navigationList);
		let items = '', childNodeList = [];
		if (slideContainerRef.current.hasChildNodes()) {
			childNodeList = slideContainerRef.current.childNodes;
		}
		for (let i = 0; i < childNodeList.length; i++) {
			items += `<span class='${i === findActiveItem() ? IDs.navigationItem + ' item-focused' : IDs.navigationItem}' id='${IDs.navigationItem}-${i}'></span>`;
		}
		list.innerHTML = items;
		document.querySelectorAll(`.${IDs.navigationItem}`).forEach(item => {
			item.addEventListener('click', e => {
				onChangeActiveItem(e);
			})
		})
	};

	React.useEffect(() => {
		renderNavigationItem();
	});
	return (
		<div css={container} className={IDs.container} id={IDs.container} {...other}>
			<div css={slideContainer} className={IDs.slideContainer} id={IDs.slideContainer} ref={slideContainerRef}>
				{children}
			</div>
			<span css={iconLeft} className={IDs.iconLeft} id={IDs.iconLeft}>
					{icon.left}
			</span>
			<span css={iconRight} className={IDs.iconRight} id={IDs.iconRight}>
				{icon.right}
			</span>
			<div css={navigation} className={IDs.navigation} id={IDs.navigation}>
				<div css={navigationList} className={IDs.navigationList} id={IDs.navigationList} />
			</div>
		</div>
	)
};
