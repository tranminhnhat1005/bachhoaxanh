import React from 'react';
import Clock from './basic/digital-clock/index';
import Date from './basic/form/line-form-date/index';
import TimePicker from './basic/time-picker';
const App = () => {
	const ref = React.useRef(null);
	const [value, setValue] = React.useState({
		value: '00:00',
		timeType: 'AM',
	});
	const handleClick = () => {
		setValue(ref.current.onChange());
	};
	return (
		<div
			style={{
				width: '100%',
				height: '100vh',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<h1
					style={{
						color: '#428bff',
						fontWeight: 300,
						margin: '40px 0 40px 0',
						fontFamily: 'sans-serif',
					}}
				>
					Diginet - Core - UI Time Picker
				</h1>
			</div>
			<div
				id={'container'}
				style={{
					display: 'block',
					width: '300px',
					minHeight: '60vh',
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
			>
				{/* <button onClick={handleClick}>Show Time</button>
				<h1>
					{value.value}
					{value.timeType}
				</h1> */}
				{/* <Date /> */}
				<TimePicker />
				{/* <Clock label={'Label'} variant={'line'} ref={ref} /> */}
			</div>
		</div>
	);
};

export default App;
