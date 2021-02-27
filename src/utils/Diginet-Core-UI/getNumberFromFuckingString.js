/**
 * 
 * @param {String} str 
 * @param {Number} num 
 * @returns {String}
 */
const returnRegexForFindingNumber = (str, num) => {
	if (str === num) return 'Nothing to do!';
	const res = [
		/^\D+/g,
		/\D+$/g,
		/^\D+|\D+$/g,
		/\D+/g,
		/\D.*/g,
		/.*\D/g,
		/^\D+|\D.*$/g,
		/.*\D(?=\d)|\D+$/g,
	];
	for (let i = 0; i < res.length; i++)
		if (str.replace(res[i], '') === num)
			return 'num = str.replace(/' + res[i].source + '/g, "")';
	return 'I have no idea!';
}

export default returnRegexForFindingNumber;
