import { writable } from "svelte/store";

// API calls is in progress
export const busy = writable(false);
