import config from '../config';
import { windowExists } from '../globals';

/**
 * either you instantiae the class with your key pr use the already instantiated one
 */
class LocalStorage {
  private key;

  constructor(key) {
    this.key = key;
  }

  public set(data) {
    const res = windowExists.localStorage.setItem(this.key, JSON.stringify(data));
    return res;
  }

  public get() {
    return JSON.parse(windowExists.localStorage.getItem(this.key));
  }
}

export default new LocalStorage(config.LOCAL_STORAGE_KEY);
export const cartStorage = new LocalStorage('domain:cart');
