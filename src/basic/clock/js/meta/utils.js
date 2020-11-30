/* eslint-disable no-extend-native */
/* eslint-disable no-const-assign */
/* eslint-disable no-redeclare */
function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}

function findMousePosition(event, object) {
	const rect = object.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
	};
}

function delay(t) {
	return new Promise(function (resolve) {
		setTimeout(resolve, t);
	});
}

Promise.delay = async function (fnc, t) {
	if (!t) {
		t = fnc;
		fnc = function () {};
	}
	const fn = await delay(t);
	return fn(fn);
};

Promise.prototype.delay = async function (fn, t) {
	await this;
	return Promise.delay(fn, t);
};

export default { toRadians, toDegrees, findMousePosition };
