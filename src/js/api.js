import fetch from "unfetch";
import { ENDPOINT, APIKEY, CATEGORY, COUNTRY } from "../apiconfig";
import { obj2qs, getProp } from "./util";
import { setBusy, setNews } from "./actions";
import { readCache, writeCache } from "./cache";
import getLogger from "./logger";

const log = getLogger("api", 0);

const buildTopNewsUrl = () => {
  const conf = {
    category: CATEGORY,
    country: COUNTRY,
    page: 1,
    pageSize: 50,
    apiKey: APIKEY,
  };
  return ENDPOINT + obj2qs(conf);
};

const callApi = async (url, method = "GET", reqData = null) => {
  let ret = null;
  if (!url) {
    log(`url not provided`);
    return ret;
  }
  const opts = {
    method,
    mode: "cors",
  };
  if (method === "POST" && isObject(reqData)) {
    opts.headers = {
      "Content-Type": "application/json",
    };
    opts.body = JSON.stringify(reqData);
  }
  log("Sending request to " + url, opts);
  setBusy(true);
  try {
    const resp = await fetch(url, opts);
    log("response", resp);
    if (!resp.ok) throw Error(resp.statusText);
    ret = resp.json();
  } catch (x) {
    log(`request to ${url} has failed`, x);
  }
  setBusy(false);
  return ret;
};

export const loadFeed = async () => {
  let data = readCache();
  if (!data) {
    const url = buildTopNewsUrl();
    const result = await callApi(url);
    data = getProp(result, 'articles'); // array expected
    if (data) {
      writeCache(data);
    }
  }
  setNews(data ? [...data] : null);
};
