import { getItem, setItem } from 'localforage';
/**
 * default implemetation of locas storage
 */
export default class LocalStorage {
  private key;

  constructor(key) {
    this.key = key;
  }

  public async get() {
    return await getItem(this.key);
  };

  public async set(data) {
    return await setItem(this.key, data);
  }
}