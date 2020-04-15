import config from '../config';
import { windowExists } from '../globals';

/**
 * either you instantiate the class with your key pr use the already instantiated one
 */
class TokenStorage {
  private key;
  private salt: string;

  constructor(key) {
    this.key = key;
    this.salt = 'A~fe`;(-';
  }

  private encrypt(o) {
    o = JSON.stringify(o).split('');
    for (var i = 0, l = o.length; i < l; i++)
      if (o[i] == '{')
        o[i] = '}';
      else if (o[i] == '}')
        o[i] = '{';
    return encodeURI(this.salt + o.join(''));
  }

  private decrypt(o) {
    o = decodeURI(o);
    if (this.salt && o.indexOf(this.salt) != 0)
      throw new Error('object cannot be decrypted');
    o = o.substring(this.salt.length).split('');
    for (var i = 0, l = o.length; i < l; i++)
      if (o[i] == '{')
        o[i] = '}';
      else if (o[i] == '}')
        o[i] = '{';
    return JSON.parse(o.join(''));
  }

  public set(data) {
    const res = windowExists.localStorage.setItem(this.key, this.encrypt(data));
    return res;
  }

  public get() {
    try {
      const data = windowExists.localStorage.getItem(this.key);
      return this.decrypt(data);
    } catch (ex) {
      console.log('unable to get cache 😭');
      /**
       * no data was found in local storage, 
       * return empty token object and an empty cart object as the initial default state from server
       */
      return { token: '', cart: [] }
    }
  };
}

export default new TokenStorage(config.TOKEN_STORAGE_KEY);
