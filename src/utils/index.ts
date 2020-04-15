export { default as imageValidator } from './imageValidator';

export function errorParser(errors, touched, key) {
  return errors[key] && touched[key] && errors[key]
}