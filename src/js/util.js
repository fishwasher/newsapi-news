/*
A collection of utility functions
Author: Vlad Podvorny
*/

// Object test
export const isObject = x => x && typeof x === "object";

// null and undefined test
export const isNone = x => typeof x === "undefined" || x === null;

// test if something is an array
export const isArray = x => Array.isArray(x);

// test if something is a string
export const isString = x => typeof x === "string";

// test if something is a finite number
export const isNumber = x => typeof x === "number" && isFinite(x);

// test if something is a NaN or (+-)Infinity
export const isBadNumber = x => typeof x === "number" && !isFinite(x);
ß;

// test if something is a function
export const isFunction = x => typeof x === "function";

// failsafe test if an object has a property
export const hasProp = (obj, propName) => isObject(obj) && propName in obj;

// get a property from an object
export const getProp = (obj, propName, fallback = null) =>
  hasProp(obj, propName) ? obj[propName] : fallback;

// test if something is an array, on success return length, otherwise 0
export const listSize = x => Array.isArray(x) && x.length;

// count an object's number of enumerable properties
export const propNum = x => (isObject(x) ? Object.keys(obj).length : 0);

// check something is 'empty': undefined, null, NaN, empty string, array or object
export const isEmpty = x =>
  isNone(x) ||
  x === "" ||
  (typeof x === "number" && isNaN(x)) ||
  (isArray(x) && !x.length) ||
  (typeof x === "object" && !Object.keys(x).length);

// stringify to JSON safely
export const jsonStringify = (obj, pretty = false) => {
  try {
    return pretty ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
  } catch (x) {}
  return "";
};

// parse JSON string safely
export const jsonParse = json => {
  try {
    return JSON.parse(json);
  } catch (x) {}
  return null;
};

// traverse an object's tree for a (nested) property
export const digObject = (obj, ...keyList) => {
  if (!keyList.length) return obj;
  if (!isObject(obj)) return null;
  const keys = [...keyList];
  let k = keys.shift(),
    nextObj = getProp(obj, k, null);
  return digObject(nextObj, ...keys);
};

// create query string from object
export const obj2qs = obj => {
  if (!isObject(obj)) return "";
  const parts = [];
  for (let key in obj) {
    let val = obj[key];
    if (!val && val !== 0) continue;
    let part = encodeURIComponent(key) + "=" + encodeURIComponent(val);
    parts.push(part);
  }
  if (!parts.length) return "";
  return "?" + parts.join("&");
};
