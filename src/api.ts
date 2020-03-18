import { ajax } from './operators';
import config from '../config';
import localStorage from './localStorage';

const { AUTH_URL, STORE_URL } = config;

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

  public get$(route, token) {
    // options mat contain bearer token
    return ajax({
      url: `${this.URL}${route}`,
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${token}` },
    });
  }

  public post$(route, data, token) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'POST',
      headers: { ...headers, Authorization: `Bearer ${token}` },
      body: data,
    });
  }

  public multipartPost$(route, data, token) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'POST',
      headers: { ...multipartHeaders, Authorization: `Bearer ${token}` },
      body: data,
    });
  }

  public patch$(route, data, token) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'PATCH',
      headers: { ...headers, Authorization: `Bearer ${token}` },
      body: data,
    });
  }
}

export const authApi = new API(AUTH_URL);
export const storeApi = new API(STORE_URL);
