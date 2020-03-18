import { ajax } from './';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const multipartHeaders = {
  // 'Accept': 'application/json',
  // 'Content-Type': 'multipart/form-data'
};

export default class API {
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
