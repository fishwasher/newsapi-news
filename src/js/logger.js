import { isObject, jsonStringify } from "./util";

const enabled = /\bdbg\b/i.test(location.search);

const str = x => (isObject(x) ? jsonStringify(x, true) : x + "");

let counter = 0;

export default getLogger = (label = "dbg", active = true) => {
  return (...args) => {
    if (enabled && active && args.length) {
      let entries = args.map(x => str(x));
      let first = entries.splice(0, 1);
      const sep = first.includes("\n") ? ":\n" : ": ";
      first = `#${++counter}|${label}${sep}${first}`;
      entries = [first, ...entries];
      console.log(...entries);
    }
  };
};
