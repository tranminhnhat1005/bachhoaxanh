import {getGlobal} from '../global';
import locale from '../locale';

const language = locale.get();
const localeName = language === 'en' ? 'en-US' : 'vi-VN';
const units = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'];

/**
 * 
 * @param {Date|String|Array} value is a date time
 * @param {String} format the input date format
 * @param {Boolean} setNow return current time if true
 */
const getDate = (value, format='MM/DD/YYYY', setNow=true) => {
    if (value) {
        if (Array.isArray(value)) {
            value = value.join('/');
        }
        if (typeof value === 'string') {
            if (format.replace(/\W/g, '/') === 'DD/MM/YYYY') {
                value = value.replace(/^(\d{1,2}\/)(\d{1,2}\/)/, '$2$1');
            }
        }
        return new Date(value);
    } else if (setNow) {
        return new Date();
    }
}
const getMethodOfUnit = (unit) => {
    switch (unit.toLowerCase()) {
        case 'years':
        case 'year':
            return 'FullYear';
        case 'months':
        case 'month':
            return 'Month';
        case 'days':
        case 'day':
            return 'Date';
        case 'hours':
        case 'hour':
            return 'Hours';
        case 'minutes':
        case 'minute':
            return 'Minutes';
        case 'seconds':
        case 'second':
            return 'Seconds';
        case 'millisecond':
            return 'Milliseconds'
        default:
            return 'Date';
    }
}

/**
 * check 1 value is a date
 * @param {Date|String|Array|Number} value the value to check
 * @param {String} formatInput the format date to check valid date
 * @returns {Boolean} valid date
 */
export const isValidDate = (value, formatInput) => {
    if (typeof value === 'string' || Array.isArray(value)) {
        if (String(getDate(value, formatInput)) !== 'Invalid Date') {
            return true;
        }
    } else if (Object.prototype.toString.call(value) === '[object Date]' && String(value) !== 'Invalid Date'){
        return true;
    }
    return false;
}

/**
 * get the end of month from month and year or from a date
 * @param {Number|String|Date|Array} month the month of year (can also be validated as year) or a value with date type
 * @param {Number} year the year (can also be validated as month if arg 1 is year)
 * @returns {Number} end day
 */
export const getEndDayOfMonth = (month, year) => {
    if (!year) {
        if (/number|string/.test(typeof month) || Array.isArray(month)) {
            month = getDate(getDate, undefined, false);
            if (String(month) !== 'Invalid Date') {
                return new Date(month.getFullYear(), month.getMonth(), 0).getDate();
            }
        } else if (isValidDate(month)) {
            return new Date(month.getFullYear(), month.getMonth(), 0).getDate();
        }
    } else if (!isNaN(month) && !isNaN(year)) {
        return new Date(year > 12 ? year : year-1, month > 12 ? month : month-1, 0)?.getDate?.();
    }
    return 'Invalid Date';
}

/**
 * return a date time follow the concrete format
 * @param {Date|String|Array} value is a date time
 * @param {String} formatOutput format of date
 * @param {Boolean} utc is utc time
 */
export const formatDate = (value, formatOutput='DD/MM/YYYY', utc=false) => {
    if (!value) return formatOutput;
    if (typeof value === 'string') {
        value = new Date(value);
        if (String(value) === 'Invalid Date') {
            return 'Invalid Date';
        }
    }

    const dateTime = (() => {
        const UTC = utc ? 'UTC' : '';
        const year = value['get' + UTC + 'FullYear']();
        const month = value['get' + UTC + 'Month']();
        const day = value['get' + UTC + 'Day']();
        const dayOfYear = Math.ceil(value.valueOf() - new Date(year).valueOf()/86400000);
        const hours = value['get' + UTC + 'Hours']();
        const timeZone = value.toTimeString().match(/\+[0-9]{4}/)?.[0].replace(/\+(\d{2})/, '+$1:');
        return {
            // Date - Month - Year
            YY  : year.toString().slice(-2), // 21
            YYYY: year, // 2021
            M   : month + 1, // 1
            MM  : ('0' + (month + 1).toString()).slice(-2), // 01
            MMM : getGlobal(['months', 'notFull', month]), // Jan
            MMMM: getGlobal(['months', 'full', month]), // January
            D   : value['get' + UTC + 'Date'](), // 26
            DD  : ('0' + value['get' + UTC + 'Date']().toString()).slice(-2), // 26
            DDD : dayOfYear, // 26 - day of year
            DDDD: dayOfYear.toString().replace(/^(\d)$/, '0$1'), // 26 - 2 digit
            dddd: getGlobal(['days', 'full', day]),
            ddd : getGlobal(['days', 'notFull', day]),
            e   : day, // 2 - day of week
            E   : day + 1, // 3
            Q   : Math.ceil((month + 1) / 3), // 1

            // Hour + Minute + second
            H : hours,
            HH: ('0' + hours.toString()).slice(-2),
            h : hours > 12 ? hours%12 : hours,
            hh: (('0' + hours > 12 ? hours%12 : hours).toString()).slice(-2),
            K : hours + 1,
            KK: ('0' + (hours + 1).toString()).slice(-2),
            m : value['get' + UTC + 'Minutes'](),
            mm: ('0' + value['get' + UTC + 'Minutes']().toString()).slice(-2),
            s : value['get' + UTC + 'Seconds'](),
            ss: ('0' + value['get' + UTC + 'Seconds']().toString()).slice(-2),
            a : hours > 11 ? 'PM' : 'AM',
            A : hours > 11 ? 'PM' : 'AM',
            x : value.valueOf().toString(),
            X : (value.valueOf()/1000).toString(),
            Z : timeZone,
            ZZ: timeZone,
        }
    })();

    const dateTimeFormat = (options={}) => {
        return new Intl.DateTimeFormat(localeName, options).format(value);
    }

    const getFullTime = (unit) => {
        const fullDate = value.toLocaleDateString(localeName); // "1/26/2020"
        const lll = dateTimeFormat({dateStyle: 'medium', timeStyle: 'short'});
        switch (unit) {
            case 'L':
                return fullDate.split('/').map(v => v.length > 1 ? v : '0' + v).join('/');
            case 'l':
                return fullDate;
            case 'LL':
                return dateTimeFormat({dateStyle: 'long'});
            case 'll':
                return dateTimeFormat({dateStyle: 'medium'});
            case 'LLL':
                return dateTimeFormat({dateStyle: 'long', timeStyle: 'short'});
            case 'lll':
                return lll;
            case 'LLLL':
                return dateTimeFormat({dateStyle: 'full', timeStyle: 'short'});
            case 'llll':
                return dateTime.ddd + ', ' + lll;
            case 'LT':
                return dateTimeFormat({date: 'none', timeStyle: 'short'});
            case 'LTS':
                return dateTimeFormat({date: 'none', timeStyle: 'medium'});
            default:
                return 'Invalid format';
        }
    }

    const getUnitFormat = (unit) => {
        if (/l/i.test(unit)) {
            return getFullTime(unit);
        } {
            return dateTime[unit];
        }
    }

    const arrFormat = formatOutput.split(/\W+/g);
    if (arrFormat.length) {
        arrFormat.forEach(unit => {
            formatOutput = formatOutput.replace(unit, getUnitFormat(unit));
        })
        return formatOutput;
    }
}

/**
 * return a date like moment
 * @param {Date|String|Array} value is date time
 * @param {String} formatInput format of input date value
 * @returns {Object} date
 */
const date = (value, formatInput='MM/DD/YYYY') => {
    const originDate = getDate(value, formatInput);

    /**
     * compare two date time and return a period
     * @param {Date|String|Array} date is a date time
     * @param {String} unit one of milliseconds|seconds|minutes|hours|days|months|years
     * @param {Boolean|Number} floating allow odd numbers
     * @returns {Number} distance
     */
    const diff = (compareDate, unit='days', floating=false) => {
        compareDate = getDate(compareDate);
        if (String(compareDate) === 'Invalid Date' || !isValidDate(originDate, formatInput)) {
            return 'Invalid Date';
        }
        let result = [];
        if (/months|years/.test(unit.toLowerCase())) {
            const originDateArr = formatDate(originDate, 'YYYY/MM/DD HH:mm:ss').split(/\W+/);
            const compareDateArr = formatDate(compareDate, 'YYYY/MM/DD HH:mm:ss').split(/\W+/);
            const endDayOfMonth = getEndDayOfMonth(originDate);
            const similarMaxTimeArr = [1, 12, endDayOfMonth, 24, 60, 60, 1000];
            let decimalTotal = 0,
                currentValueOfUnit = 1;
        
            for (let i = originDateArr.length-1; i >= 0; i--) {
                result[i] = originDateArr[i] - compareDateArr[i];
                if (i > 1) {
                    currentValueOfUnit *= similarMaxTimeArr[i+1];
                    decimalTotal += result[i]*currentValueOfUnit;
                }
            }
            const decimalOfMonth = decimalTotal/(endDayOfMonth*86400000);
            result = result[0]*12 + result[1] + decimalOfMonth;
            if (unit.toLowerCase() === 'years') {
                result = result/12;
            }
        } else {
            const getValueOfUnit = (week=1) => {
                switch (unit.toLowerCase()) {
                    case 'days':
                        return 86400000;
                    case 'hours':
                        return 3600000;
                    case 'minutes':
                        return 60000;
                    case 'seconds':
                        return 1000;
                    case 'milliseconds':
                        return 1;
                    default:
                        return 86400000*week;
                }
            }
            result = (originDate.valueOf() - compareDate.valueOf())/getValueOfUnit(unit === 'weeks' ? 1 : 7);
        }
        return result.toFixed(floating ? (typeof floating === 'number' ? floating : 2) : 0);
    }

    /**
     * add or subtract date time
     * @param {Number} num the quantity to cal for unit
     * @param {String} unit the unit of date/time
     * @param {String} operator operator to cal (add/subtract)
     * @returns {Object} date
     */
    const calculation = (num, unit, operator) => {
        if (isNaN(num)) {
            return NaN;
        }
        // Example: unit === 'days' -> originDate.setDate(originDate.getDate() +/- num)
        originDate['set'+ getMethodOfUnit(unit)](originDate['get'+ getMethodOfUnit(unit)]() + (operator === 'add' ? +num : -num));
        return date(originDate, formatInput);
    }

    /**
     * get the moment of time follow unit time
     * @param {String} unit the unit of time
     * @param {String} moment start|end to get start|end of the moment
     * @returns {Object} date
     */
    const timeOf = (unit, moment) => {
        let temp = 1;
        if (!units.includes(unit)) {
            unit = 'day';
        }
        units.forEach((u => {
            const method = getMethodOfUnit(u);
            const valueUnitTime = originDate['get' + method]();
            if (u === unit) {
                const addTime = moment === 'start' ? 0 : 1;
                originDate['set' + method](valueUnitTime + addTime);
                temp = 0;
            } else {
                const time = u === 'millisecond'
                    ? (moment === 'start' ? 0 : -1)
                    : u === 'day'
                        ? Math.max(1, valueUnitTime*temp)
                        : valueUnitTime*temp;

                originDate['set' + method](time);
            }
        }))
        return date(originDate, formatInput);
    }

    /**
     * 
     * @param {Date|String|Number|Array} compareDate date to calculate moment, undefined will compare with now
     * @param {String|Array} unit year|month|day|hour|minute|second|millisecond, allow undefined
     * @param {Boolean|Number} floating allow odd numbers
     * @returns {String} moments
     */
    const relative = (compareDate, unit, floating) => {
        compareDate = getDate(compareDate);
        if (String(compareDate) === 'Invalid Date' || !isValidDate(originDate, formatInput)) {
            return 'Invalid Date';
        }
        if (typeof unit === 'string' && /s$/.test(unit)) {
            unit = unit.replace(/s$/, '');
        }
        if (!unit || (typeof unit === 'string' && !units.includes(unit))) {
            unit = units;
        }
        let num;
        if (Array.isArray(unit)) {
            for (let i = 0; i < unit.length; i++) {
                num = diff(compareDate, unit[i]+'s', floating ? (typeof floating === 'number' ? floating : 2) : 1);
                if (Math.abs(num) >= 1) {
                    unit = unit[i];
                    break;
                }
            }
        } else {
            num = diff(compareDate, unit+'s', floating ? (typeof floating === 'number' ? floating : 2) : 1);
        }
        num = (+num).toFixed(floating ? (typeof floating === 'number' ? floating : 2) : 0);
        try {
            return new Intl.RelativeTimeFormat(language, { numeric: "auto" }).format(-num, unit);
        } catch (e) {
            return e.message;
        }
    }

    return {
        value: originDate,
        /**
         * return a date time follow the concrete format
         * @param {String} formatOutput format of date
         * @param {Boolean} utc is utc time
         */
        format: (formatOutput, utc) => formatDate(originDate, formatOutput, utc),
        diff,
        /**
         * check 1 value is a date
         * @param {String} formatInput the format date to check valid date
         * @returns {Boolean} valid date
         */
        isValid: () => isValidDate(originDate, formatInput),
        add: (num, unit) => calculation(num, unit, 'add'),
        subtract: (num, unit) => calculation(num, unit, 'subtract'),
        startOf: unit => timeOf(unit, 'start'),
        endOf: unit => timeOf(unit, 'end'),
        relative,
    }
}

export default date;
