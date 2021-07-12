import fetch from "unfetch";
import { ENDPOINT, APIKEY } from "../apiconfig";
import { obj2qs } from "./util";
import { setBusy, unsetBusy } from "./actions";
import getLogger from "./logger";

const log = getLogger("api", true);

const buildTopNewsUrl = (opts = null) => {
  const conf = Object.assign(
    {
      category: "general",
      country: "us",
      page: 1,
      pageSize: 50,
      apiKey: APIKEY,
    },
    opts
  );
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

const getNews = async (opts = null) => {
  const url = buildTopNewsUrl(opts);
};
