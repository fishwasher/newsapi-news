import { busy, articles } from "./stores";

let callCount = 0; // active API calls number to control spinner

export const setBusy = (stateFlag = true) => {
  if (!stateFlag) {
    if (callCount > 0) callCount--;
    if (callCount === 0) busy.set(false);
  } else {
    if (callCount === 0) busy.set(true);
    callCount++;
  }
};

export const setNews = (data)=>{
  articles.set(data);
}