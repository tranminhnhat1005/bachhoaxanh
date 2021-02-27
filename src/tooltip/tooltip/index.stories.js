import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import * as colors from '../../styles/colors';
import mdx from './index.mdx';
import Tooltip from './tooltip';
import OldTooltip from './old_tooltip';

export default {
	title: 'Tooltip',
	decorators: [withKnobs],
	parameters: {
		docs: { page: mdx },
	},
};

export const tooltip = () => {
	return (
		<div
			style={{
				color: colors.brand,
				fontFamily: 'sans-serif',
				marginTop: 40,
				width: '100%',
			}}
		>
			<h1>Tooltip with static direction</h1>
			<div
				style={{
					display: 'grid',
					gap: '5px',
					gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))',
					gridTemplateRows: 'repeat(3, minmax(30px, 1fr))',
					justifyItems: 'center',
					padding: '20px 80px',
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						alignMode={'flex-start'}
						direction={'up'}
						forceDirection={true}
						title={'Top and flex start'}
					>
						alignMode: flex-start
						<br />
						direction: up
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						alignMode={'middle'}
						direction={'up'}
						forceDirection={true}
						title={'Top and middle'}
					>
						alignMode: middle
						<br />
						direction: up
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						alignMode={'flex-end'}
						direction={'up'}
						forceDirection={true}
						title={'Top and flex end'}
					>
						alignMode: flex-end
						<br />
						direction: up
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						direction={'left'}
						forceDirection={true}
						title={'Left'}
					>
						direction: left
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				></div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						direction={'right'}
						forceDirection={true}
						title={'Right'}
					>
						direction: right
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						alignMode={'flex-start'}
						direction={'down'}
						forceDirection={true}
						title={'Bottom and flex start'}
					>
						alignMode: flex-start
						<br />
						direction: down
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						alignMode={'middle'}
						direction={'down'}
						forceDirection={true}
						title={'Bottom and middle'}
					>
						alignMode: middle
						<br />
						direction: down
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						alignMode={'flex-end'}
						direction={'down'}
						forceDirection={true}
						title={'Bottom and flex end'}
					>
						alignMode: flex-end
						<br />
						direction: down
						<br />
						forceDirection: true
					</Tooltip>
				</div>
			</div>
			<h1>Tooltip with static direction and arrow</h1>
			<div
				style={{
					display: 'grid',
					gap: '5px',
					gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))',
					gridTemplateRows: 'repeat(3, minmax(30px, 1fr))',
					justifyItems: 'center',
					padding: '20px 80px',
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						alignMode={'flex-start'}
						arrow={true}
						direction={'up'}
						forceDirection={true}
						title={'Top and flex start'}
					>
						alignMode: flex-start
						<br />
						direction: up
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						alignMode={'middle'}
						arrow={true}
						direction={'up'}
						forceDirection={true}
						title={'Top and middle'}
					>
						alignMode: middle
						<br />
						direction: up
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						alignMode={'flex-end'}
						arrow={true}
						direction={'up'}
						forceDirection={true}
						title={'Top and flex end'}
					>
						alignMode: flex-end
						<br />
						direction: up
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						direction={'left'}
						arrow={true}
						forceDirection={true}
						title={'Left'}
					>
						direction: left
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				></div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						direction={'right'}
						arrow={true}
						forceDirection={true}
						title={'Right'}
					>
						direction: right
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						alignMode={'flex-start'}
						arrow={true}
						direction={'down'}
						forceDirection={true}
						title={'Bottom and flex start'}
					>
						alignMode: flex-start
						<br />
						direction: down
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						alignMode={'middle'}
						arrow={true}
						direction={'down'}
						forceDirection={true}
						title={'Bottom and middle'}
					>
						alignMode: middle
						<br />
						direction: down
						<br />
						forceDirection: true
					</Tooltip>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Tooltip
						alignMode={'flex-end'}
						arrow={true}
						direction={'down'}
						forceDirection={true}
						title={'Bottom and flex end'}
					>
						alignMode: flex-end
						<br />
						direction: down
						<br />
						forceDirection: true
					</Tooltip>
				</div>
			</div>
			<h1>Tooltip dynamic and arrow</h1>
			<div
				style={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center',
					margin: '20px 250px',
					width: '100%',
				}}>
				<Tooltip
					arrow={true}
					direction={'right'}
					title={'Dynamic position and direction'}
				>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum tortor sem, sed feugiat nisl congue eu. Fusce hendrerit, arcu nec efficitur suscipit, risus arcu ultrices tellus, ac varius lectus lectus vel tortor. Fusce dignissim tellus at laoreet rhoncus. Nulla congue mattis ligula, vel tincidunt leo gravida non. Pellentesque pharetra justo vitae tempor egestas. Integer fermentum efficitur orci. Donec consequat tincidunt luctus. Nunc vehicula accumsan turpis, eget eleifend ante porta at. Fusce tortor libero, vulputate sit amet libero sed, interdum vehicula tellus.
				</Tooltip>
			</div>
		</div>
	);
};
