const types = {
    '[object Array]' : 'array',
    '[object Date]'  : 'date',
    '[object Object]': 'object',
    '[object String]': 'string',
    '[object Null]'  : 'null' };

const type = (object) => {
    const typeOfObject = Object.prototype.toString.call(object);

    return typeof object === 'object' ?
        types[typeOfObject] || 'object' : typeof object;
};

const isBoolean = (object) => {
    return typeof object === 'boolean';
};

const isExponential = (value) => {
    return isNumeric(value) && value.toString().indexOf('e') !== -1;
};

const isDate = (object) => {
    return type(object) === 'date';
};

const isDefined = (object) => {
    return (object !== null) && (object !== undefined);
};

const isFunction = (object) => {
    return typeof object === 'function';
};

const isString = (object) => {
    return typeof object === 'string';
};

const isNumeric = (object) => {
    return ((typeof object === 'number') && isFinite(object) || !isNaN(object - parseFloat(object)));
};

const isObject = (object) => {
    return type(object) === 'object';
};

const isEmptyObject = (object) => {
    let property;

    for(property in object) {
        return false;
    }

    return true;
};

const isPlainObject = (object) => {
    if(!object || Object.prototype.toString.call(object) !== '[object Object]') {
        return false;
    }
    const proto = Object.getPrototypeOf(object);
    const ctor = Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor;

    return typeof ctor === 'function'
        && Object.toString.call(ctor) === Object.toString.call(Object);
};

const isPrimitive = (value) => {
    return ['object', 'array', 'function'].indexOf(type(value)) === -1;
};

const isWindow = (object) => {
    return object != null && object === object.window;
};

const isRenderer = (object) => {
    return !!(object.jquery || object.dxRenderer);
};

const isPromise = (object) => {
    return object && isFunction(object.then);
};

const isDeferred = (object) => {
    return object && isFunction(object.done) && isFunction(object.fail);
};

const isEvent = (object) => {
    return !!(object && object.preventDefault);
};

export {
    isBoolean,
    isExponential,
    isDate,
    isDefined,
    isFunction,
    isString,
    isNumeric,
    isObject,
    isEmptyObject,
    isPlainObject,
    isPrimitive,
    isWindow,
    isRenderer,
    isPromise,
    isDeferred,
    type,
    isEvent
};
