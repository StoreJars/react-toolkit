export { default as countries } from './countries';
export { default as states } from './states';

export const arrayFrom = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);
