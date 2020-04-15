import config from '../config';
import { windowExists } from '../globals';

/**
 * either you instantiate the class with your key pr use the already instantiated one
 */
class LocalStorage {
  private key;

  constructor(key) {
    this.key = key;
  }

  public set(data) {
    const res = windowExists.localStorage.setItem(this.key, data);
    return res;
  }

  public get() {
    try {
      return windowExists.localStorage.getItem(this.key);
    } catch (ex) {
      console.log('unable to get cache 😭');
      /**
       * no data was found in local storage, 
       * return empty token object and an empty cart object as the initial default state from server
       */
      return [];
    }
  };
}

export default new LocalStorage(config.CART_STORAGE_KEY);