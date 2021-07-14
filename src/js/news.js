// news feed utils

import {
  digObject,
  getProp,
  htmlText,
  isArray,
  isString,
  isValidDate,
} from "./util";

const formatDate = date => {
  // "2021-07-12T18:18:52Z"
  const d = isString(date) ? new Date(date) : date;
  if (!isValidDate(d)) return "";
  const formatTime = dateObj => {
    let ampm = " A.M.";
    let hr = dateObj.getHours();
    if (hr === 0) hr = 12;
    if (hr >= 12) ampm = " P.M.";
    return hr + ":" + dateObj.getMinutes() + ampm;
  };
  const showTime = new Date().toDateString() === d.toDateString();
  if (showTime) return formatTime(d);
  return d.toDateString();
};

const transformNewsItem = item => {
  const url = getProp(item, "url");
  const title= getProp(item, "title");
  if (!url || !title) return null;
  const source = digObject(item, "source", "name");
  const author = getProp(item, "author");
  return {
    url,
    title,
    by: source && author ? `${author} - "${source}"` : author || source || "",
    description: getProp(item, "description") || "",
    image: getProp(item, "urlToImage") || "",
    date: formatDate(getProp(item, "publishedAt")),
  };
};

export const transformNewsFeed = newsArray =>
  isArray(newsArray)
    ? newsArray.map(it => transformNewsItem(it)).filter(it => !!it)
    : [];
