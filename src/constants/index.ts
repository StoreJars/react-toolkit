export { default as countries } from './countries';
export { default as states } from './states';

const range = (start, end) => Array.from({ length: (end - start) }, (v, k) => k + start);

export const years = range(1990, 2019).reverse();