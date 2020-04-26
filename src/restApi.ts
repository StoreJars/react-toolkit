import { ajax } from './operators';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export default class API {
  private URL: string;
  private token: string;

  constructor(url: string, token: string | null) {
    this.URL = url
    this.token = token
  }

  public get$(route) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${this.token}` },
    });
  }

  public post$(route, data) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'POST',
      headers: { ...headers, Authorization: `Bearer ${this.token}` },
      body: data,
    });
  }

  public multipartPost$(route, data) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'POST',
      headers: { Authorization: `Bearer ${this.token}` },
      body: data,
    });
  }

  public patch$(route, data) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'PATCH',
      headers: { ...headers, Authorization: `Bearer ${this.token}` },
      body: data,
    });
  }
}

