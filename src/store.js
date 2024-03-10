import { writable } from 'svelte/store';

export const leftValue = writable(0);
export const rightValue = writable(0);
export const leftCurrency = writable("EUR");
export const rightCurrency = writable("USD");
