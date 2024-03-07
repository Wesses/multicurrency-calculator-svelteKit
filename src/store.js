import { writable } from 'svelte/store';

export const leftValue = writable(1);
export const rightValue = writable(1);
export const leftCurrency = writable("EUR");
export const rightCurrency = writable("USD");
