/* global console */
/* eslint no-console: off */

import { isFunction } from './type';

const noop = () => {};
const getConsoleMethod = function(method) {
    if(typeof console === 'undefined' || !isFunction(console[method])) {
        return noop;
    }
    return console[method].bind(console);
};

export const logger = {
    error: getConsoleMethod('error'),
    info : getConsoleMethod('info'),
    warn : getConsoleMethod('warn')
};

export const debug = (function() {
    function assert(condition, message) {
        if(!condition) {
            throw new Error(message);
        }
    }
    function assertParam(parameter, message) {
        assert(parameter !== null && parameter !== undefined, message);
    }
    return {
        assert     : assert,
        assertParam: assertParam
    };
}());
