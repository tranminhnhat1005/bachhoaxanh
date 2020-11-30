import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
// import mdx from '../index.mdx';
import Index from './index';
export default {
	title: 'Form',
	decorators: [withKnobs],
	// parameters: {
	// 	docs: { page: mdx },
	// },
};
export const TextEditor = () => {
	const disabled = boolean('Disabled', false),
		variant = text('Variant', 'line');
	return (
		<div
			style={{
				margin: '30px',
			}}
		>
			<Index></Index>
		</div>
	);
};
