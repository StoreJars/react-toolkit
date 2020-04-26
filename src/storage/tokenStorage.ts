import { getItem, setItem } from 'localforage';


/**
 * this encrypts data store and decrypts on retrieval
 */
export default class TokenStorage {
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

  public async set(data) {
    return setItem(this.key, this.encrypt(data));
  }

  public async get() {
    try {
      const data = await getItem(this.key);
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
