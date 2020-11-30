export default function getRandomString(length = 10, options = {}) {
	const {
		allowNumber = true,
		allowLowercase = true,
		allowUppercase = true,
		allowSymbol = true,
	} = options;
	let string = '';
	if (allowNumber) {
		string += '0123456789';
	}
	if (allowLowercase) {
		string += 'abcdefghijklmnopqrstuvwxyz';
	}
	if (allowUppercase) {
		string += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	}
	if (allowSymbol) {
		string += '@$%^&*_+-';
	}

	let newString = '';
	for (let i = 0; i < length; i++) {
		newString += string[Math.floor(Math.random() * string.length)];
	}
	return newString;
}
