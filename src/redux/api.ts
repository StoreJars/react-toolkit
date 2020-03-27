import { ajax } from './operators';
import config from '../config';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const multipartHeaders = {
  // 'Accept': 'application/json',
  // 'Content-Type': 'multipart/form-data'
};

class API {
  private URL;

  constructor(url) {
    this.URL = url
  }
  /**
   * By default a token is sent along with every request if it one present
   * Otherwise an empty string is passsed to the server
   */

  public get$(route: string, token: string) {
    // options mat contain bearer token
    return ajax({
      url: `${this.URL}${route}`,
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${token}` },
    });
  }

  public post$(route: string, data: object, token: string) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'POST',
      headers: { ...headers, Authorization: `Bearer ${token}` },
      body: data,
    });
  }

  public multipartPost$(route: string, data: object, token: string) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'POST',
      headers: { ...multipartHeaders, Authorization: `Bearer ${token}` },
      body: data,
    });
  }

  public patch$(route: string, data: object, token: string) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'PATCH',
      headers: { ...headers, Authorization: `Bearer ${token}` },
      body: data,
    });
  }
}

export const storeApi = new API(config.STORE_URL);
export const authApi = new API(config.AUTH_URL);