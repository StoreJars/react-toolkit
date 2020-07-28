import { windowExists } from '../';

/**
 * default implementation of local storage
 */
export default class LocalStorage {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public get() {
    const data = windowExists.localStorage.getItem(this.key);
    return JSON.parse(data);
  }

  public set(data) {
    return windowExists.localStorage.setItem(this.key, JSON.stringify(data));
  }
}
