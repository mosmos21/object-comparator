"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectType;
(function (ObjectType) {
    ObjectType[ObjectType["Array"] = 0] = "Array";
    ObjectType[ObjectType["Bigint"] = 1] = "Bigint";
    ObjectType[ObjectType["Boolean"] = 2] = "Boolean";
    ObjectType[ObjectType["Class"] = 3] = "Class";
    ObjectType[ObjectType["Function"] = 4] = "Function";
    ObjectType[ObjectType["Number"] = 5] = "Number";
    ObjectType[ObjectType["Null"] = 6] = "Null";
    ObjectType[ObjectType["Object"] = 7] = "Object";
    ObjectType[ObjectType["String"] = 8] = "String";
    ObjectType[ObjectType["Symbol"] = 9] = "Symbol";
    ObjectType[ObjectType["Undefined"] = 10] = "Undefined";
})(ObjectType = exports.ObjectType || (exports.ObjectType = {}));
var EQUAL = { equal: true };
var NOT_EQUAL = { equal: false };
exports.typeOf = function (obj) {
    switch (typeof obj) {
        case 'bigint':
            return ObjectType.Bigint;
        case 'boolean':
            return ObjectType.Boolean;
        case 'function':
            return ObjectType.Function;
        case 'number':
            return ObjectType.Number;
        case 'string':
            return ObjectType.String;
        case 'symbol':
            return ObjectType.Symbol;
        case 'undefined':
            return ObjectType.Undefined;
    }
    if (obj === null) {
        return ObjectType.Null;
    }
    if (Array.isArray(obj)) {
        return ObjectType.Array;
    }
    if (obj.constructor.name !== 'Object') {
        return ObjectType.Class;
    }
    return ObjectType.Object;
};
exports.compareArray = function (arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return NOT_EQUAL;
    }
    var dupArr1 = __spread(arr1).sort(), dupArr2 = __spread(arr2).sort();
    return __spread(new Array(arr1.length).keys()).map(function (idx) { return [dupArr1[idx], dupArr2[idx]]; })
        .every(function (_a) {
        var _b = __read(_a, 2), obj1 = _b[0], obj2 = _b[1];
        return exports.compareObject(obj1, obj2);
    })
        ? EQUAL
        : NOT_EQUAL;
};
exports.compareObject = function (obj1, obj2) {
    var obj1Type = exports.typeOf(obj1);
    var obj2Type = exports.typeOf(obj2);
    if (obj1Type != obj2Type) {
        return NOT_EQUAL;
    }
    switch (obj1Type) {
        case ObjectType.Bigint:
        case ObjectType.Boolean:
        case ObjectType.Number:
        case ObjectType.String:
        case ObjectType.Symbol:
            return obj1 === obj2 ? EQUAL : NOT_EQUAL;
        case ObjectType.Null:
        case ObjectType.Undefined:
            return EQUAL;
        case ObjectType.Function:
            return obj1.name === obj2.name ? EQUAL : NOT_EQUAL;
        case ObjectType.Class:
            return obj1.constructor.name === obj2.constructor.name ? EQUAL : NOT_EQUAL;
        case ObjectType.Array:
            return exports.compareArray(obj1, obj2);
    }
    var obj1Keys = Object.keys(obj1);
    if (obj1Keys.length !== Object.keys(obj2).length) {
        return NOT_EQUAL;
    }
    if (obj1Keys.length === 0) {
        return EQUAL;
    }
    return obj1Keys.every(function (key) { return exports.compareObject(obj1[key], obj2[key]).equal; })
        ? EQUAL
        : NOT_EQUAL;
};
