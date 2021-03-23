/**@jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';

const cutPX = (x) => {
	return isNaN(x) ? x : x + 'px';
};

const CircularChart = (props) => {
	/**@property */
	const { data, height, circle, width, ...other } = props;
	const canvasRef = React.useRef(null);
	const legendRef = React.useRef(null);
	const PI = Math.PI;

	/**@style */
	const circularCSS = {
		container: css`
			* {
				box-sizing: border-box;
				margin: 0;
				padding: 0;
			}
			display: grid;
			grid-template-columns: repeat(
				auto-fit,
				minmax(${cutPX(width)}, 1fr)
			);
			grid-template-rows: repeat(1, ${cutPX(height)});
			height: 100%;
			position: relative;
			transition: display 0.3s;
			width: 100%;
		`,
		canvasContainer: css`
			display: flex;
			justify-content: center;
			align-items: center;
		`,
		canvas: css`
			display: block;
			margin-left: auto;
			margin-right: auto;
		`,
		legendContainer: css`
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			padding: 30px 0;
			.legend {
				align-items: center;
				display: flex;
				flex-direction: row;
				font-family: sans-serif;
				font-size: ${cutPX(width / 15)};
				font-weight: 500;
			}
			.bullet {
				border-radius: 50%;
				box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.8);
				height: ${cutPX(width / 40)};
				margin-right: 8px;
				min-height: 10px;
				min-width: 10px;
				width: ${cutPX(width / 40)};
			}
			.content {
				flex: 4;
			}
			.value {
				flex: 4;
			}
		`,
	};

	/**@function */
	const drawLine = (ctx, startX, startY, endX, endY) => {
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke();
	};

	const drawArc = (ctx, centerX, centerY, radius, startAngle, endAngle) => {
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.stroke();
	};

	const drawPieSlice = (ctx, Ox, Oy, r, startA, endA, color) => {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(Ox, Oy);
		ctx.arc(Ox, Oy, r, startA, endA);
		ctx.closePath();
		ctx.fill();
	};

	const drawChart = () => {
		const canvas = canvasRef.current;
		canvas.height = height + 50;
		canvas.width = width + 50;

		const chartRadius = Math.min(width / 2 - 50, height / 2 - 50);

		const ctx = canvas.getContext('2d');

		let totalValue = 0,
			startAngel = - PI / 2;

		for (let i in data) {
			let value = data[i].value;
			totalValue += value;
		}
		

		startAngel = - PI / 2;
		for (let n in data) {
			let value = data[n].value > 0 ? data[n].value : null;
			let sliceAngel = 2 * PI * value / totalValue;
			const r = chartRadius + 30;
			let labelX = canvas.width / 2 + (r) * Math.cos(startAngel + sliceAngel / 2);
			let labelY = canvas.height / 2 + (r) * Math.sin(startAngel + sliceAngel / 2);
			let labelText = Math.round(100 * value / totalValue);
			ctx.fillStyle = '#111';
			ctx.font = `${cutPX(width / 20)} sans-serif`;
			ctx.textAlign = labelX < canvas.width / 2 ? 'end' : 'start';
			if (value > 0) {
				let startLabelX = labelX, endLabelX = labelX > canvas.width / 2 ? labelX + width / 10 : labelX - width / 10, startLabelY = labelY + 2, endLabelY = labelY + 2;
				drawLine(ctx, startLabelX, startLabelY, endLabelX, endLabelY);
				drawLine(ctx, canvas.width / 2, canvas.height / 2, startLabelX, endLabelY);
				ctx.fillText(labelText + '%', startLabelX, startLabelY - 2);
			}
			startAngel += sliceAngel;
		}
		

		for (let i in data) {
			let value = data[i].value;
			let sliceAngel = (2 * PI * value) / totalValue;
			drawPieSlice( ctx, canvas.width / 2, canvas.height / 2, chartRadius, startAngel, startAngel + sliceAngel, data[i].color );
			startAngel += sliceAngel;
		}

		if (circle) {
			drawPieSlice( ctx, canvas.width / 2, canvas.height / 2, chartRadius * 0.75, -PI / 2, 2 * PI, '#fff' );
		}
	};

	const upperCaseFirstChar = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const renderLegend = () => {
		const legend = legendRef.current;
		let legends = '';
		for (let i in data) {
			legends += `<span class='legend'>
				<div class='bullet' style='background-color: ${data[i].color}'></div>
				<span class='content'>${upperCaseFirstChar(data[i].name)}:</span>
				<span class='value'>${data[i].value}</span>
			</span>`;
		}
		legend.innerHTML = legends;
	};

	React.useEffect(() => {
		drawChart();
		renderLegend();
	});

	return (
		<div css={circularCSS.container} {...other}>
			<div css={circularCSS.canvasContainer}>
				<canvas css={circularCSS.canvas} ref={canvasRef} />
			</div>
			<div css={circularCSS.legendContainer} ref={legendRef}></div>
		</div>
	);
};

CircularChart.defaultProps = {
	data  : null,
	height: 120,
	circle: true,
	width : 120,
};

CircularChart.propTypes = {
	data  : PropTypes.array,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	circle: PropTypes.bool,
	width : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default React.memo(CircularChart);
