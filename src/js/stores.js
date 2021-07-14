import { writable } from "svelte/store";

// API calls is in progress
export const busy = writable(false);

// current data snapshot
export const articles = writable(null);
