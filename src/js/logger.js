import { hasProp, isObject, jsonStringify, qs2obj, strval } from "./util";

const debugLevel = (qs => {
  if (!qs) return 0;
  const o = qs2obj(qs);
  return hasProp(o, "dbg") ? Number(o.dbg) : 0;
})(window.location.search);

const str = x => (isObject(x) ? jsonStringify(x, true) : x + "");

let counter = 0;

// logger is active if applied level is not negative and not greater than overall debug level
const getLogger = (label = "dbg", level = -1) => {
  return (...args) => {
    if (level >= 0 && level <= debugLevel && args.length) {
      let entries = args.map(x => strval(x));
      let first = entries.splice(0, 1);
      const sep = first.includes("\n") ? ":\n" : ": ";
      first = `#${++counter}|${label}${sep}${first}`;
      entries = [first, ...entries];
      console.log(...entries);
    }
  };
};

export default getLogger;
