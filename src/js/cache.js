// caching data feed in local storage
import ls from "local-storage";
import { getProp, isObject } from "./util";
import getLogger from "./logger";

const log = getLogger("cache", 0);

const LIFESPAN = 30 * 60 * 1000;

const CACHEKEY = "datacache";
const TIMEKEY = "ts";
const DATAKEY = "feed";

export const readCache = () => {
  const cache = ls.get(CACHEKEY);
  const ts = getProp(cache, TIMEKEY);
  const data = getProp(cache, DATAKEY);
  if (!ts || Date.now() - ts > LIFESPAN || !data) {
    log("no valid data found");
    if (data) ls.remove(CACHEKEY);
    return null;
  }
  log("retrieving cached data");
  return data;
};

export const writeCache = data => {
  if (isObject(data)) {
    log(`caching data as '${CACHEKEY}'`);
    const stored = { [DATAKEY]: data, [TIMEKEY]: Date.now() };
    ls.set(CACHEKEY, stored);
  }
};
