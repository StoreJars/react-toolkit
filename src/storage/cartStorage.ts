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
    return windowExists.localStorage.getItem(this.key);
  }

  public set(data) {
    return windowExists.localStorage.setItem(this.key, data);
  }
}
